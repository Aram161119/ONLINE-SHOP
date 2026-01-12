function generateSlug(name) {
  if (!name || typeof name !== "string") {
    return "";
  }

  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

module.exports = { generateSlug };

