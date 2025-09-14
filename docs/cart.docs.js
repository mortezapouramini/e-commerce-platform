/**
 * @swagger
 * /carts/{productId}:
 *   post:
 *     summary: Add to cart
 *     tags: [carts]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
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
 *         description: Product added to cart
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: user cart
 *
 *       404:
 *         description: Not found (invalid productId)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Product not found"
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

/**
 * @swagger
 * /carts/{itemId}:
 *   delete:
 *     summary: Delete product from cart
 *     tags: [carts]
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: ID of the item
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
 *         description: Product removed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: user cart
 *
 *       404:
 *         description: Not found (invalid productId)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Item not found"
 *
 *       401:
 *         description: unauthorized (invalid userId or token)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Invalid access token or || Token experied || invalid userId"
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
 * /carts:
 *   get:
 *     summary: Get user cart
 *     tags: [carts]
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
 *         description: User cart
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: user cart
 *
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
