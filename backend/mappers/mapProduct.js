const mapComment = require("./mapComment");
const mapLike = require("./mapLike");
const mapCategory = require("./mapCategory");
const mapUser = require("./mapUser");

module.exports = function mapProduct(product) {
  if (!product) return null;

  const mapComments = (comments) => {
    if (!Array.isArray(comments)) return [];

    return comments.map((comment) => mapComment(comment));
  };

  const mapLikes = (likes) => {
    if (!Array.isArray(likes)) return [];
    return likes.map((like) => mapLike(like));
  };

  return {
    id: product._id?.toString(),
    title: product.title,
    characters: product.characters,
    description: product.description,
    price: product.price,
    image: product.image,
    author: mapUser(product.author),
    category: mapCategory(product.category),
    likes: mapLikes(product.likes),
    comments: mapComments(product.comments),
    createdAt: product.createdAt,
  };
};
