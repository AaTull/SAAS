# HungryScan - Hotel Admin Panel

A comprehensive hotel management system with a modern React frontend and secure Node.js backend with PostgreSQL integration.

## 🏗️ Project Structure

```
SAAS/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Customer-facing pages
│   │   ├── hotel-admin/     # Admin panel components and pages
│   │   └── ...
│   └── package.json
├── backend/                  # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Database and app configuration
│   └── package.json
└── README.md
```

## ✨ Features

### Customer-Facing Features
- 🍽️ Interactive restaurant menu with categories
- 🛒 Shopping cart functionality
- 📱 Responsive design for all devices
- 💳 Order placement and tracking
- 📄 Invoice generation

### Hotel Admin Panel
- 🏠 **Home Page**: Marketing page with features and subscription plans
- 🔐 **Authentication**: Secure login/registration system
- 📊 **Dashboard**: Overview with statistics and recent orders
- 📋 **Order Management**: View and manage customer orders
- 🍽️ **Menu Management**: Add, edit, and organize menu items
- 📈 **Reports**: Analytics and business insights
- 👥 **User Management**: Staff and customer management
- 💳 **Subscription Management**: Plan management and billing

### Kitchen Staff Panel
- 🔐 **Kitchen Login**: Dedicated login for kitchen staff
- 📋 **Order Viewing**: Real-time order notifications
- ✅ **Status Updates**: Mark orders as prepared/ready
- 🔔 **Notifications**: Order alerts and updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Customer App: `http://localhost:5173/`
   - Admin Panel: `http://localhost:5173/admin`
   - Kitchen Panel: `http://localhost:5173/kitchen/login`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/hungryscan
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=7d
   ```

4. **Set up PostgreSQL database:**
   ```sql
   CREATE DATABASE hungryscan;
   CREATE USER hungryscan_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE hungryscan TO hungryscan_user;
   ```

5. **Run database migrations:**
   ```bash
   npm run migrate
   ```

6. **Start the server:**
   ```bash
   npm run dev
   ```

## 🔐 Demo Credentials

### Hotel Admin
- **Email:** `admin@hotel.com`
- **Password:** `admin123`

### Kitchen Staff
- **Email:** `kitchen@hotel.com`
- **Password:** `kitchen123`

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt
- **Input Validation** and sanitization
- **SQL Injection Prevention** with parameterized queries
- **CORS Configuration** for cross-origin requests
- **Rate Limiting** to prevent abuse
- **Helmet.js** for security headers
- **Environment Variables** for sensitive data
- **HTTPS** support for production

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create new hotel
- `GET /api/hotels/:id` - Get hotel by ID
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Menu Items
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item
- `GET /api/menu/:id` - Get menu item by ID
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables on your server
2. Install dependencies: `npm install --production`
3. Run database migrations: `npm run migrate`
4. Start the server: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact:
- Email: support@hungryscan.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/hhhsss/issues)

---

**Made with ❤️ for the hospitality industry**
