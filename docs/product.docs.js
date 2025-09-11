/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get product details
 *     tags: [products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: product details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: product Info
 *
 *       401:
 *         description: unauthorized (invalid productId or token expired)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Access denied"
 *
 *       404:
 *         description: Not found (invalid productId)
 *         content:
 *           application/json:
 *             example:
 *                success: false
 *                details: "Product not found"
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
 * /products:
 *   get:
 *     summary: Get products
 *     tags: [products]
 *     description: Filter and search products with queris
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         description: Category of the product
 *         schema:
 *           type: string
 *           enum: ["laptop", "mobile", "tablet", "headphone"]
 *       - name: maxPrice
 *         in: query
 *         required: false
 *         description: Max price of the product
 *         schema:
 *           type: integer
 *       - name: minPrice
 *         in: query
 *         required: false
 *         description: Min price of the product
 *         schema:
 *           type: integer
 *       - name: brand
 *         in: query
 *         required: false
 *         description: Brand of the product
 *         schema:
 *           type: string
 *       - name: minReleaseDate
 *         in: query
 *         required: false
 *         description: Min release date of the product
 *         schema:
 *           type: integer
 *       - name: maxReleaseDate
 *         in: query
 *         required: false
 *         description: Max release date of the product
 *         schema:
 *           type: integer
 *       - name: q
 *         in: query
 *         required: false
 *         description: Name or brand of the product for searching
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Number of the page
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of the limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: products
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               details: {totalPages, page, limit, totalProducts, products}
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               details: "Something went wrong"
 */
