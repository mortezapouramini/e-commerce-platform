# E-commerce Platform 🛍️

Server-side of a store project with professional authentication, product management, caching, and security features.

---

## Built With

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Prisma
- **Caching:** Redis
- **Authentication & Security:** JWT, bcrypt, Helmet, CSRF, XSS protection, Rate limiter
- **Validation:** Joi
- **File Upload:** Multer
- **Caching:** Redis (for OTP service)
- **API Documentation:** Swagger
- **Logging:** Custom manual logging system
- **Routing:** Express Router

---

## Features

- User authentication & role-based access control
- Product management (CRUD operations)
- Shopping cart system
- Admin dashboard
- Forgot password system with OTP via email
- Secure registration with mail OTP (cached in Redis)
- Centralized response & error handling
- Request validation and input sanitization
- Password hashing with bcrypt
- File upload support for product images
- OTP service with caching for better performance and security

---

## Prerequisites

Before running the project, make sure you have installed:

- **Node.js** >= 18.x → [Download](https://nodejs.org/en/)
- **PostgreSQL** >= 14 → [Download](https://www.postgresql.org/download/)
- **Redis** >= 6 → [Download](https://redis.io/download)

## Dependencies

- express
- prisma
- bcryptjs
- jsonwebtoken
- joi
- multer
- nodemailer
- ioredis
- helmet
- cors
- csurf
- express-rate-limit
- swagger-jsdoc
- swagger-ui-express
- xss

Optional:

- **npm** (comes with Node.js) or **yarn**

---

## Installation & Usage

Follow these steps to get the project running locally:

```bash
# 1. Clone and install dependencies
git clone https://github.com/mortezapouramini/e-commerce-platform.git
cd e-commerce-platform
npm install


# 3. Create a `.env` file in the root and add the following
# (all required environment variables in one place)
DATABASE_URL=your_postgres_url
PORT=your_node_port
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
NODE_ENV=development
ADMIN_EMAIL=your_email
ADMIN_EMAIL_PASS=your_email_password (app password)
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port

# 4. Run the server
npm run dev
# or
node server

# 5. Access API documentation
# Once the server is running:
# http://localhost:your-port/api/docs


## 6. Screenshots / Demo
   soon...
```
