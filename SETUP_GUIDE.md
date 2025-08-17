# 🚀 HungryScan Complete Setup Guide

This guide will help you set up the complete HungryScan Hotel Admin Panel with both frontend and backend components.

## 📋 Prerequisites

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### System Requirements
- **RAM**: Minimum 4GB, Recommended 8GB
- **Storage**: At least 2GB free space
- **OS**: Windows 10+, macOS 10.14+, or Linux

## 🗄️ Database Setup

### 1. Install PostgreSQL
1. Download and install PostgreSQL from the official website
2. During installation, note down the password for the `postgres` user
3. Keep the default port (5432)

### 2. Create Database and User
Open **pgAdmin** or **psql** and run:

```sql
-- Create database
CREATE DATABASE hungryscan_dev;

-- Create user
CREATE USER hungryscan_user WITH PASSWORD 'HungryPass123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hungryscan_dev TO hungryscan_user;

-- Connect to the database
\c hungryscan_dev

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO hungryscan_user;
```

### 3. Run Database Schema
```bash
# Navigate to project root
cd /path/to/hungryscan

# Run the schema file
psql -U hungryscan_user -d hungryscan_dev -f hungryscan_schema.sql
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Run Setup Script

**On Windows:**
```cmd
setup.bat
```

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**
```bash
# Install dependencies
npm install

# Copy environment file
cp config.env .env

# Edit .env with your database credentials
# (Optional: modify if you used different database settings)

# Initialize database
node init-db.js
```

### 3. Start Backend Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 4. Test Backend
Visit `http://localhost:5000/api/health` to verify the server is running.

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔐 Testing the System

### Demo Credentials

After running `init-db.js`, you can test with these accounts:

**Hotel Admin Login:**
- URL: `http://localhost:5173/admin/login`
- Email: `admin@demo.com`
- Password: `demo123`

**Kitchen Staff Login:**
- URL: `http://localhost:5173/kitchen/login`
- Email: `chef@demo.com`
- Password: `demo123`

**Hotel Registration:**
- URL: `http://localhost:5173/admin/register`
- Fill out the complete form to test registration

## 📁 Project Structure

```
hungryscan/
├── backend/                 # Node.js backend
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   ├── db.js              # Database connection
│   ├── server.js          # Main server file
│   ├── init-db.js         # Database initialization
│   └── setup scripts      # Automated setup
├── frontend/               # React frontend
│   ├── src/
│   │   ├── hotel-admin/   # Admin panel components
│   │   └── components/    # Shared components
│   └── package.json
├── hungryscan_schema.sql   # Database schema
└── SETUP_GUIDE.md         # This file
```

## 🌐 API Endpoints

### Base URL: `http://localhost:5000/api`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Hotel registration |
| `/auth/login` | POST | Admin login |
| `/auth/kitchen-login` | POST | Kitchen staff login |
| `/auth/me` | GET | Get current user |
| `/hotels/profile` | GET/PUT | Hotel profile management |
| `/users/staff` | GET/POST | Staff management |

## 🚨 Troubleshooting

### Common Issues

**1. Database Connection Failed**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database and user exist

**2. Port Already in Use**
- Backend: Change port in `.env` or kill process on port 5000
- Frontend: Change port in `vite.config.js` or kill process on port 5173

**3. CORS Errors**
- Verify backend is running on port 5000
- Check CORS configuration in `server.js`

**4. Module Not Found Errors**
- Run `npm install` in both frontend and backend directories
- Clear `node_modules` and reinstall if needed

### Debug Commands

```bash
# Check PostgreSQL status
sudo systemctl status postgresql  # Linux
brew services list | grep postgres # macOS

# Check Node.js processes
lsof -i :5000   # Backend port
lsof -i :5173   # Frontend port

# Database connection test
psql -U hungryscan_user -d hungryscan_dev -c "SELECT NOW();"
```

## 🔒 Security Notes

### Development Environment
- JWT secret is set to a default value
- Database password is visible in configuration
- CORS is configured for localhost

### Production Deployment
1. Change all default passwords
2. Use strong JWT secrets
3. Configure proper CORS origins
4. Enable HTTPS
5. Use environment variables for sensitive data
6. Implement proper logging and monitoring

## 📚 Additional Resources

### Documentation
- [Backend README](./backend/README.md)
- [Design System](./frontend/DESIGN_SYSTEM.md)
- [API Documentation](./backend/README.md#api-endpoints)

### Useful Commands

```bash
# Backend development
cd backend
npm run dev          # Start development server
npm start           # Start production server
node init-db.js     # Initialize database

# Frontend development
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# Database operations
psql -U hungryscan_user -d hungryscan_dev  # Connect to database
pg_dump -U hungryscan_user hungryscan_dev > backup.sql  # Backup database
```

## 🎯 Next Steps

After successful setup:

1. **Explore the Admin Panel**: Navigate through different sections
2. **Test Registration**: Create a new hotel account
3. **Customize Design**: Modify colors, fonts, and layout
4. **Add Features**: Implement menu management, order tracking
5. **Deploy**: Set up production environment

## 🤝 Support

If you encounter issues:

1. Check this setup guide thoroughly
2. Review error logs in the terminal
3. Verify all prerequisites are met
4. Check the troubleshooting section above
5. Review the backend and frontend README files

---

**Happy coding! 🎉**

The HungryScan Hotel Admin Panel is now ready to transform your restaurant's dining experience.
