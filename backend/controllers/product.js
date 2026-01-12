const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { deleteFile } = require("../helpers/fileHelper");
const ApiError = require("../errors/ApiError");
const { LOOKUPS, COMPUTED_FIELDS } = require("../constants/products");
const buildAggregation = require("../builders/buildAggregation");
const buildComputedSort = require("../builders/buildComputedSort");
const roles = require("../constants/roles");

const populateProduct = (productQuery) => {
  return productQuery
    .populate("author", "_id email")
    .populate({
      path: "likes",
      populate: "user",
    })
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("category", "slug name _id");
};

async function getProducts(query, sortObj, skip, limit = 9) {
  const countPromise = Product.countDocuments(query);

  const { addFields, sortStage } = buildComputedSort(sortObj, COMPUTED_FIELDS);

  let productsPromise;

  const needsAggregation =
    Object.keys(addFields).length > 0 ||
    Object.keys(query).some((key) => key.includes("."));

  if (needsAggregation) {
    const pipeline = buildAggregation({
      query,
      addFields,
      sortStage,
      skip,
      limit,
      lookups: LOOKUPS,
    });

    productsPromise = Product.aggregate(pipeline);
  } else {
    productsPromise = populateProduct(
      Product.find(query).sort(sortObj).skip(skip).limit(limit)
    );
  }

  const [products, count] = await Promise.all([productsPromise, countPromise]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

async function getProduct(id) {
  return await populateProduct(Product.findById(id));
}

async function addProduct(data) {
  const newProduct = await Product.create(data);

  await newProduct.populate("author", "email");
  await newProduct.populate("category", "slug name _id");

  return newProduct;
}

async function updateProduct(id, currentUser, data) {
  const query =
    currentUser.role === roles.ROOT
      ? { _id: id }
      : { _id: id, author: currentUser._id };

  const product = await Product.findOne(query);

  if (!product) throw new ApiError("Product not found", 404);

  if (data.image && product.image && product.image !== data.image) {
    await deleteFile(product.image);
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) product[key] = value;
  });

  return await product.save();
}

async function deleteProduct(id, currentUser) {
  const query =
    currentUser.role === roles.ROOT
      ? { _id: id }
      : { _id: id, author: currentUser._id };

  const product = await Product.findOne(query);

  if (!product) throw new ApiError("Product not found!", 404);

  const carts = await Cart.find({ "items.product": id });

  for (const cart of carts) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== id.toString()
    );

    await cart.save();
  }

  await Product.deleteOne({ _id: id });

  if (product.image) {
    await deleteFile(product.image);
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
