import { pool } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { signToken } from '../utils/jwt.js';

// Basic shape expected from frontend
// {
//   hotel: {
//     name, hotel_type, cuisine_type?, phone_number, address, city, state?, pincode?, logo_url?
//   },
//   admin: {
//     full_name, email, password, phone_number?
//   },
//   business?: {
//     pan_number?, business_type?, seating_capacity?, gst_number?
//   },
//   subscription?: {
//     plan_id?  // OR plan_name?
//   }
// }

export async function register(req, res) {
  const client = await pool.connect();
  try {
    const data = req.body || {};

    const hotel = {
      name: data.hotelName,
      hotel_type: data.hotelType,
      cuisine_type: data.cuisine || null,
      phone_number: data.phone,
      address: data.address,
      city: data.city,
      state: data.state || null,
      pincode: data.pincode || null,
      logo_url: null
    };

    const admin = {
      full_name: data.adminName,
      email: data.adminEmail,
      password: data.password,
      phone_number: data.adminPhone || null
    };

    const business = {
      gst_number: data.gstNumber || null,
      pan_number: data.panNumber || null,
      business_type: data.businessType || null,
      seating_capacity: data.seatingCapacity || null
    };

    const subscription = {
      plan_name: data.subscriptionPlan || null
    };

    if (!hotel.name || !hotel.hotel_type || !hotel.phone_number || !hotel.address || !hotel.city) {
      return res.status(400).json({ error: 'Missing required hotel fields.' });
    }
    if (!admin.full_name || !admin.email || !admin.password) {
      return res.status(400).json({ error: 'Missing required admin fields.' });
    }

    await client.query('BEGIN');

    const hotelRes = await client.query(
      `INSERT INTO hotels (name, hotel_type, cuisine_type, phone_number, address, city, state, pincode, logo_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING hotel_id, name, city, created_at;`,
      [hotel.name, hotel.hotel_type, hotel.cuisine_type, hotel.phone_number, hotel.address, hotel.city, hotel.state, hotel.pincode, hotel.logo_url]
    );
    const newHotel = hotelRes.rows[0];

    if (business.gst_number || business.pan_number || business.business_type || business.seating_capacity) {
      await client.query(
        `INSERT INTO business_details (hotel_id, pan_number, business_type, seating_capacity, gst_number)
         VALUES ($1,$2,$3,$4,$5);`,
        [newHotel.hotel_id, business.pan_number, business.business_type, business.seating_capacity, business.gst_number]
      );
    }

    const password_hash = await hashPassword(admin.password);
    const adminRes = await client.query(
      `INSERT INTO hotel_admins (hotel_id, full_name, email, phone_number, password_hash, role, is_active)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING admin_id, email, role;`,
      [newHotel.hotel_id, admin.full_name, admin.email, admin.phone_number, password_hash, 'owner', true]
    );
    const newAdmin = adminRes.rows[0];

    if (subscription.plan_name) {
      const planRow = await client.query(`SELECT plan_id, duration_months FROM subscription_plans WHERE LOWER(name) = LOWER($1)`, [subscription.plan_name]);
      if (planRow.rows.length) {
        const { plan_id, duration_months } = planRow.rows[0];
        await client.query(
          `INSERT INTO hotel_subscriptions (hotel_id, plan_id, start_date, end_date)
           VALUES ($1,$2,CURRENT_DATE, (CURRENT_DATE + ($3 || ' months')::interval))`,
          [newHotel.hotel_id, plan_id, duration_months]
        );
      }
    }

    await client.query('COMMIT');

    const token = signToken({ admin_id: newAdmin.admin_id, hotel_id: newHotel.hotel_id, role: newAdmin.role });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newAdmin.admin_id,
        email: newAdmin.email,
        role: newAdmin.role,
        hotelId: newHotel.hotel_id
      }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err?.code === '23505') return res.status(409).json({ error: 'Email already registered' });
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
}


// LOGIN controller
export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find admin by email (email column is citext so case-insensitive)
    const { rows } = await pool.query(
      `SELECT admin_id, hotel_id, full_name, email, phone_number, password_hash, role, is_active
       FROM hotel_admins
       WHERE email = $1
       LIMIT 1`,
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = rows[0];

    if (!admin.is_active) {
      return res.status(403).json({ error: 'Account is inactive. Contact support.' });
    }

    // Compare password
    const ok = await comparePassword(password, admin.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch hotel name
    const { rows: hotelRows } = await pool.query(
      'SELECT name FROM hotels WHERE hotel_id = $1 LIMIT 1',
      [admin.hotel_id]
    );
    const hotelName = hotelRows[0]?.name || null;

    // Sign token
    const token = signToken({
      admin_id: admin.admin_id,
      hotel_id: admin.hotel_id,
      role: admin.role
    });

    // Return shape expected by frontend
    return res.status(200).json({
      token,
      user: {
        id: admin.admin_id,
        email: admin.email,
        role: admin.role,
        hotelId: admin.hotel_id,
        hotelName
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}