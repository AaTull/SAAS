# HungryScan Backend

A robust Node.js backend for the HungryScan Hotel Admin Panel, providing authentication, hotel management, and staff operations.

## 🚀 Features

- **Authentication System**: JWT-based login/registration for hotels and kitchen staff
- **Hotel Management**: Complete hotel profile and subscription management
- **User Management**: Staff member operations with role-based access control
- **Database Integration**: PostgreSQL with proper schema and relationships
- **Security**: Password hashing, rate limiting, and input validation
- **API Documentation**: RESTful endpoints with proper error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🗄️ Database Setup

1. **Create Database and User**:
```sql
CREATE DATABASE hungryscan_dev;
CREATE USER hungryscan_user WITH PASSWORD 'HungryPass123';
GRANT ALL PRIVILEGES ON DATABASE hungryscan_dev TO hungryscan_user;
```

2. **Run Schema**:
```bash
psql -U hungryscan_user -d hungryscan_dev -f ../hungryscan_schema.sql
```

3. **Initialize Data**:
```bash
node init-db.js
```

## ⚙️ Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Environment Configuration**:
```bash
cp config.env .env
# Edit .env with your database credentials
```

3. **Start Development Server**:
```bash
npm run dev
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `hungryscan_user` |
| `DB_HOST` | Database host | `localhost` |
| `DB_NAME` | Database name | `hungryscan_dev` |
| `DB_PASSWORD` | Database password | `HungryPass123` |
| `DB_PORT` | Database port | `5432` |
| `JWT_SECRET` | JWT signing secret | `hungryscan-secret-key-2024` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Hotel registration | Public |
| `POST` | `/api/auth/login` | Hotel admin login | Public |
| `POST` | `/api/auth/kitchen-login` | Kitchen staff login | Public |
| `GET` | `/api/auth/me` | Get current user | Private |
| `POST` | `/api/auth/refresh` | Refresh JWT token | Private |

### Hotels

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/hotels/profile` | Get hotel profile | Private |
| `PUT` | `/api/hotels/profile` | Update hotel profile | Private |
| `GET` | `/api/hotels/subscription` | Get subscription details | Private |
| `GET` | `/api/hotels/stats` | Get hotel statistics | Private |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/users/profile` | Get user profile | Private |
| `PUT` | `/api/users/profile` | Update user profile | Private |
| `GET` | `/api/users/staff` | Get all staff members | Admin |
| `POST` | `/api/users/staff` | Add new staff member | Admin |
| `PUT` | `/api/users/staff/:id/status` | Toggle staff status | Admin |

## 🔐 Authentication

### JWT Token Format
```json
{
  "user": {
    "id": "user_id",
    "hotelId": "hotel_id",
    "email": "user@email.com",
    "role": "admin|kitchen_staff"
  }
}
```

### Request Headers
```
Authorization: Bearer <jwt_token>
x-auth-token: <jwt_token>
```

## 📊 Database Schema

The backend uses the following main tables:
- `hotels` - Hotel information and subscriptions
- `users` - Staff members with roles
- `subscription_plans` - Available plans
- `menu_items` - Food items
- `orders` - Customer orders
- `hotel_tables` - QR code tables

## 🧪 Testing

### Demo Credentials

After running `init-db.js`, you can use these test accounts:

**Hotel Admin**:
- Email: `admin@demo.com`
- Password: `demo123`

**Kitchen Staff**:
- Email: `chef@demo.com`
- Password: `demo123`

## 🚨 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for frontend origin
- **Helmet Security**: HTTP headers security
- **JWT Expiration**: 7-day token validity

## 📝 Development

### Project Structure
```
backend/
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── db.js           # Database connection
├── server.js       # Main server file
├── init-db.js      # Database initialization
└── config.env      # Environment configuration
```

### Adding New Routes
1. Create route file in `routes/` directory
2. Import and use in `server.js`
3. Add authentication middleware where needed
4. Implement proper error handling

### Database Queries
- Use parameterized queries to prevent SQL injection
- Implement proper transaction handling for complex operations
- Add appropriate indexes for performance

## 🚀 Deployment

### Production Considerations
1. Use environment variables for sensitive data
2. Set `NODE_ENV=production`
3. Configure proper CORS origins
4. Use strong JWT secrets
5. Implement HTTPS
6. Set up database connection pooling
7. Add logging and monitoring

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write clear commit messages
5. Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the API documentation
2. Review error logs
3. Verify database connectivity
4. Ensure proper environment configuration
