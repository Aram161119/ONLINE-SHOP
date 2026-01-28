const express = require("express");
const upload = require("../helpers/upload");
const { getImageUrl } = require("../helpers/fileHelper");
const mapProduct = require("../mappers/mapProduct");
const mapComment = require("../mappers/mapComment");
const auth = require("../middlewares/auth");
const hasRole = require("../middlewares/hasRole");
const roles = require("../constants/roles");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { addLike, deleteLike, findOne } = require("../controllers/like");
const { addComment, deleteComment } = require("../controllers/comment");
const prepareQuery = require("../helpers/prepareQuery");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { query, sortObj, skip, limit } = prepareQuery(req.query);

  const { products, lastPage } = await getProducts(query, sortObj, skip, limit);

  res.status(200).json({
    data: { lastPage, products: products?.map(mapProduct) },
    error: null,
  });
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  res.status(200).json({ data: mapProduct(product), error: null });
});

router.post(
  "/",
  auth,
  hasRole([roles.ADMIN]),
  upload.single("image"),
  async (req, res) => {
    const imageUrl = getImageUrl(req);

    const newProduct = await addProduct({
      ...req.body,
      author: req.user._id,
      image: imageUrl,
    });

    res.status(201).json({ data: mapProduct(newProduct), error: null });
  },
);

router.put(
  "/:id",
  auth,
  hasRole([roles.ADMIN]),
  upload.single("image"),
  async (req, res) => {
    const imageUrl = getImageUrl(req);

    const updatedProduct = await updateProduct(req.params.id, req.user, {
      ...req.body,
      image: imageUrl,
    });

    res.status(200).json({ data: mapProduct(updatedProduct), error: null });
  },
);

router.delete("/:id", auth, hasRole([roles.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id, req.user);
  res.status(204).json({ error: null });
});

router.post("/:productId/comments", auth, async (req, res) => {
  const newComment = await addComment(req.params.productId, {
    text: req.body.comment,
    author: req.user.id,
  });
  res.status(201).json({ data: mapComment(newComment), error: null });
});

router.delete("/:productId/comments/:commentId", auth, async (req, res) => {
  await deleteComment(req.params.commentId, req.params.productId, req.user.id);
  res.status(204).json({ error: null });
});

router.post("/:productId/likes", auth, async (req, res) => {
  const hasLike = await findOne(req.params.productId, req.user.id);

  if (hasLike) {
    await deleteLike(hasLike._id, req.params.productId);
  } else {
    await addLike(req.params.productId, req.user.id);
  }

  res.status(204).json({ error: null });
});

module.exports = router;
