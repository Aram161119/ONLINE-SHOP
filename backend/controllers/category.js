const Category = require("../models/Category");
const Product = require("../models/Product");
const ApiError = require("../errors/ApiError");
const { generateSlug } = require("../helpers/slugHelper");

async function getCategories(query, sortObj, skip, limit = 100) {
  return await Category.find(query).sort(sortObj).skip(skip).limit(limit);
}

async function getCategory(id) {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  return category;
}

async function addCategory(data) {
  if (!data.name || !data.name.trim()) {
    throw new ApiError("Category name is required", 400);
  }

  const slug = data.slug?.trim() || generateSlug(data.name);

  if (!slug) {
    throw new ApiError("Cannot generate slug from category name", 400);
  }

  const existingCategory = await Category.findOne({
    $or: [{ name: data.name.trim() }, { slug }],
  });

  if (existingCategory) {
    throw new ApiError("Category with this name or slug already exists", 400);
  }

  const categoryData = {
    name: data.name.trim(),
    slug,
    description: data.description?.trim() || "",
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  const newCategory = await Category.create(categoryData);
  return newCategory;
}

async function updateCategory(id, data) {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  const updateData = {};

  if (data.name !== undefined) {
    if (!data.name || !data.name.trim()) {
      throw new ApiError("Category name cannot be empty", 400);
    }
    updateData.name = data.name.trim();
  }

  if (data.slug !== undefined) {
    if (!data.slug || !data.slug.trim()) {
      throw new ApiError("Category slug cannot be empty", 400);
    }
    updateData.slug = data.slug.trim().toLowerCase();
  } else if (data.name !== undefined) {
    updateData.slug = generateSlug(data.name);
  }

  if (data.description !== undefined) {
    updateData.description = data.description?.trim() || "";
  }

  if (data.isActive !== undefined) {
    updateData.isActive = data.isActive;
  }

  if (updateData.name || updateData.slug) {
    const queryConditions = [];
    if (updateData.name) queryConditions.push({ name: updateData.name });
    if (updateData.slug) queryConditions.push({ slug: updateData.slug });

    if (queryConditions.length > 0) {
      const existingCategory = await Category.findOne({
        $or: queryConditions,
        _id: { $ne: id },
      });

      if (existingCategory) {
        throw new ApiError(
          "Category with this name or slug already exists",
          400
        );
      }
    }
  }

  Object.entries(updateData).forEach(([key, value]) => {
    category[key] = value;
  });

  const updatedCategory = await category.save();
  return updatedCategory;
}

async function deleteCategory(id) {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError("Category not found", 404);
  }

  const productsCount = await Product.countDocuments({ category: id });

  if (productsCount > 0) {
    throw new ApiError(
      `Cannot delete category. It is used in ${productsCount} product(s)`,
      400
    );
  }

  await Category.deleteOne({ _id: id });
  return true;
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
