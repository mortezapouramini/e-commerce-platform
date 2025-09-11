/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: Send OTP code
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: "The OTP code has been sent to you"
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Email must be a valid email"
 *
 *       409:
 *         description: Conflict (Email already exists)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Email already exists"
 *
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Confirm the OTP code
 *     description: Confirm the OTP code sent to the entered email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *               - otp
 *             properties:
 *               name:
 *                 type: string
 *                 minLength : 3
 *                 example: 'tom'
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 32
 *                 example: "StrongPass123"
 *               confirmPassword:
 *                 type: string
 *                 description: "Must match the password"
 *                 example: "StrongPass123"
 *               otp:
 *                 type: string
 *                 description: "Sent to your email"
 *                 minLength: 5
 *                 maxLength: 5
 *                 example: "12345"
 *
 *
 *     responses:
 *       201:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: {id: 1 , name: "tom" , email: "example@gmail.com", role: "user"}
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "name and email and password and confirmPassword must be valid "
 *
 *       401:
 *         description: unauthorized (Invalid OTP)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Invalid OTP"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 32
 *                 example: "StrongPass123"
 *     responses:
 *       200:
 *         description: Successful login and jwt token has been sent
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly cookie containing the access token
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: {id: 1 , name: "tom" , email: "example@gmail.com", role: "user"}
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "User not found || Password does not match"
 *
 *       401:
 *         description: unauthorized (Invalid jwt token)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Invalid jwt token"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   get:
 *     summary: Request for access token
 *     tags: [Auth]
 *     parameters:
 *       - name: refreshToken
 *         in: cookie
 *         required: true
 *         description: Authentication token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: access token refreshed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: "New token sent."
 *
 *       401:
 *         description: authorization fail (The token in the cookie has expired or the token has been deleted and not sent.)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Please login"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: Send OTP code
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: "The OTP code has been sent to you"
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Email must be a valid email"
 *
 *       404:
 *         description: Not found (User not found)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "User not found"
 *       502:
 *         description: Mail Service Unavailable
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Service Unavailable"
 *
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 32
 *                 example: "StrongPass123"
 *               confirmPassword:
 *                 type: string
 *                 description: "Must match the password"
 *                 example: "StrongPass123"
 *               otp:
 *                 type: string
 *                 description: "Sent to your email"
 *                 minLength: 5
 *                 maxLength: 5
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Password changed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: Password changed successful
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "name and email and password and confirmPassword must be valid "
 *
 *       401:
 *         description: unauthorized (Invalid OTP)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Invalid OTP"
 *
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */
