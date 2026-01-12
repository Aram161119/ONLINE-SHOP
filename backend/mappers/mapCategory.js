module.exports = function mapCategory(category) {
  if (!category) return null;

  return {
    id: category._id?.toString(),
    name: category?.name,
    slug: category?.slug,
    description: category?.description,
    isActive: category?.isActive,
    createdAt: category?.createdAt,
    updatedAt: category?.updatedAt,
  };
};
