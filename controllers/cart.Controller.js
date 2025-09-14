const { PrismaClient } = require("../generated/prisma");
const {
  responseHandler,
} = require("../middlewares/responseHandler.middleware");
const prisma = new PrismaClient();
const { createError, createResponse } = require("../utils/response.utils");

const addToCart = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const userId = req.user.id;

  if (isNaN(productId) || !productId || productId < 1) {
    return next(createError(401, "Please send a valid productId"));
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    let userCart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { userId },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: product.id,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: product.id,
          quantity: 1,
        },
      });
    }

    const fullCart = await prisma.cart.findUnique({
      where: { id: userCart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    responseHandler(createResponse(201, fullCart), res);
  } catch (err) {
    next(err);
  }
};

const delFromCart = async (req, res, next) => {
  const userId = parseInt(req.user.id);
  const itemId = parseInt(req.params.itemId);

  if (isNaN(itemId) || !itemId || itemId < 1) {
    return next(createError(401, "Please send a valid id"));
  }

  try {
    const existItem = await prisma.cartItem.findFirst({
      where: { id: itemId },
    });
    if (!existItem) {
      return next(createError(401, "Item not found"));
    }

    let userCart = await prisma.cart.findFirst({
      where: { userId },
    });

    const product = await prisma.cartItem.delete({
      where: { id: existItem.id, cartId: userCart.id },
    });

    const newCart = await prisma.cart.findFirst({
      where: { id: userCart.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    responseHandler(createResponse(200, newCart), res);
  } catch (err) {
    next(err);
  }
};

const getUserCart = async (req, res, next) => {
  const userId = parseInt(req.user.id);

  try {
    const userCart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    responseHandler(createResponse(200, userCart), res);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  if (page < 1) page = 1;
  if (limit < 20 || limit > 50) limit = 20;

  try {
    const orders = await prisma.cart.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        items: {
          include: { product: true },
        },
        user: true,
      },
    });
    responseHandler(createResponse(200, orders), res);
  } catch (err) {
    next(err);
  }
};

module.exports = { addToCart, delFromCart, getUserCart, getAllOrders };
