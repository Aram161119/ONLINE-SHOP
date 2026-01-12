const LOOKUPS = [
  { from: "users", localField: "author" },
  { from: "categories", localField: "category" },
];

const COMPUTED_FIELDS = {
  likes: {
    field: "likesCount",
    expr: { $size: { $ifNull: ["$likes", []] } },
  },
  comments: {
    field: "commentsCount",
    expr: { $size: { $ifNull: ["$comments", []] } },
  },
};

const PRICE_RANGE = {
  min: parseInt(process.env.PRICE_RANGE_MIN) || 0,
  max: parseInt(process.env.PRICE_RANGE_MAX) || 100000,
};

module.exports = {
  LOOKUPS,
  COMPUTED_FIELDS,
  PRICE_RANGE,
};
