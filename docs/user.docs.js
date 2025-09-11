/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Update user info
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - name: accessToken
 *         in: cookie
 *         required: true
 *         description: Authentication token
 *         schema:
 *           type: string
 *     tags: [users]
 *     requestBody:
 *       required: At least one
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "tom"
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 32
 *                 example: "StrongPass123"
 *               address:
 *                 type: string
 *                 descriptinon: "Write the full address in text"
 *                 example: "netherland - amsterdam"
 *               postalCode:
 *                 type: string
 *                 minLength: 10
 *                 example: "12345678910"
 *               phone:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 example: "+12345678910"
 *     responses:
 *       200:
 *         description: User info updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: updated User
 *
 *       401:
 *         description: unauthorized (invalid userId)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Access denied"
 *
 *
 *       400:
 *         description: Bad Request (validation error)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Please enter a valid postal code or ..."
 *
 *
 *       404:
 *         description: Not found (User not found)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "User not found"
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
 * /users/{userId}:
 *   get:
 *     summary: Get user profile
 *     tags: [users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - name: accessToken
 *         in: cookie
 *         required: true
 *         description: Authentication token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: user Info
 * 
 * 
 *
 *       400:
 *         description:  invalid userId
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details:  Please send a valid userId
 *       401:
 *         description: unauthorized (invalid userId or token)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Invalid access token or || Token experied || invalid userId"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */
