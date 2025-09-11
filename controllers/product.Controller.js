const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const {
  responseHandler,
} = require("../middlewares/responseHandler.middleware");
const xss = require("xss");
const fs = require("fs");
const path = require("path");
const { createError, createResponse } = require("../utils/response.utils");

const addProduct = async (req, res, next) => {
  const { category, ...rest } = req.body;
  const imagesPath = req.files.map(
    (file) => `/uploads/products/${file.filename}`
  );

  try {

    const baseData = {
      name: rest.name,
      price: rest.price,
      brand: rest.brand,
      category,
      releaseDate: rest.releaseDate,
      imagesPath,
      count: rest.count,
    };

    const categoryData = { ...rest };
    delete categoryData.name;
    delete categoryData.price;
    delete categoryData.brand;
    delete categoryData.releaseDate;
    delete categoryData.imagesPath;
    delete categoryData.count;

    const prismaData = {
      ...baseData,
      [category]: {
        create: categoryData,
      },
    };

    const newProduct = await prisma.product.create({
      data: prismaData,
      include: { [category]: true },
    });

    responseHandler(createResponse(201, newProduct), res);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    let {
      category,
      maxPrice,
      minPrice,
      brand,
      minReleaseDate,
      maxReleaseDate,
      q,
      page,
      limit,
    } = req.query;

    category = xss(category)
    brand = xss(brand)
    q = xss(q)

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    if (page < 1) page = 1;
    if (limit < 20 || limit > 50) limit = 20;

    const skip = (page - 1) * limit;

    const include = {};
    const allowedCategories = ["laptop", "mobile", "tablet", "headphone"];
    if (category && allowedCategories.includes(category.toLowerCase())) {
      include[category.toLowerCase()] = true;
    } else {
      allowedCategories.forEach((cat) => (include[cat] = true));
    }

    const andConditions = [];

    if (category) {
      andConditions.push({ category : category.toLowerCase() });
    }

    if (brand && typeof brand === "string") {
      andConditions.push({ brand : brand.toLowerCase() });
    }

    if (!isNaN(maxPrice) && maxPrice >= 1) {
      andConditions.push({
        price: { lte: parseInt(maxPrice) },
      });
    }

    if (!isNaN(minPrice) && minPrice >= 1) {
      andConditions.push({
        price: { gte: parseInt(minPrice) },
      });
    }

    if (
      !isNaN(maxReleaseDate) &&
      parseInt(maxReleaseDate) <= new Date().getFullYear()
    ) {
      andConditions.push({
        releaseDate: { lte: parseInt(maxReleaseDate) },
      });
    }
    if (!isNaN(minReleaseDate) && minReleaseDate > 2000) {
      andConditions.push({
        releaseDate: { gte: parseInt(minReleaseDate) },
      });
    }

    if (q && typeof q === "string") {
      andConditions.push({
        OR: [
          {
            name: {
              contains: q.toLocaleLowerCase().trim(),
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: q.toLocaleLowerCase().trim(),
              mode: "insensitive",
            },
          },
        ],
      });
    }

    const where = {};
    if (andConditions.length) {
      where.AND = andConditions;
    }

    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      include,
    });

    const details = {
      totalPages,
      page,
      limit,
      totalProducts,
      products,
    };

    responseHandler(createResponse(200, details), res);
  } catch (error) {
    next(error);
  }
};

const getProductInfo = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId || !productId || productId < 1))
    return next(createError(400, "Please send a valid productId"));
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        laptop: true,
        mobile: true,
        tablet: true,
        headphone: true,
      },
    });

    if (!product) return next(createError(404, "Product not found"));

    responseHandler(createResponse(200, product), res);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const category = req.params.category;
  if (!productId || productId < 1) {
    return next(createError(404, "Please send a valid product id"));
  }
  const { name, price, brand, releaseDate, ...other } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        category,
        brand,
        releaseDate,
        laptop: category === "laptop" ? { update: other } : undefined,
        tablet: category === "tablet" ? { update: other } : undefined,
        mobile: category === "mobile" ? { update: other } : undefined,
        headphone: category === "headphone" ? { update: other } : undefined,
      },
      include: {
        laptop: true,
        tablet: true,
        headphone: true,
        mobile: true,
      },
    });

    responseHandler(createResponse(200, updatedProduct), res);
  } catch (error) {
    next(error);
  }
};

const delProductImg = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const imgUrl = req.body.imgUrl;

  if (isNaN(productId) || !productId || productId < 1) {
    return next(createError(401, "Please send a valid product id"));
  }

  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    const updatedImages = product.imagesPath.map((img) => {
      return img !== imgUrl;
    });

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { imagesPath: updatedImages },
    });

    fs.unlink(path.join(imgUrl), (err) => {
      if (err) {
        return next(createError(500, "Error removing file"));
      }
    });
    responseHandler(createResponse(200, updatedProduct), res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductInfo,
  updateProduct,
  delProductImg,
};
