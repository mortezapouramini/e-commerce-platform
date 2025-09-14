require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const { errorHandler } = require("./middlewares/responseHandler.middleware");
const limiter = require("./middlewares/limiter");
const { port } = require("./config/env.config");
const swaggerSpec = require("./config/swagger.config");
const logger = require("./middlewares/logger.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");


// ================================
// Initialize App
// ================================
const app = express();

// ================================
// Global Middlewares
// ================================
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(logger);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================================
// Routes
// ================================
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

// ================================
// Swagger Documentation
// ================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================================
// Error Handler
// ================================
app.use(errorHandler);

// ================================
// Start Server
// ================================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
