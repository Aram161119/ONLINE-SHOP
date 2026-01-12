const fs = require("fs");
const path = require("path");

function getLocalPathFromUrl(url) {
  if (!url) return null;
  return path.join(process.cwd(), url.replace(/^https?:\/\/[^\/]+/, ""));
}

async function deleteFile(url) {
  const filePath = getLocalPathFromUrl(url);
  if (!filePath) return;

  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.warn("Failed to delete file:", err.message);
  }
}

function getImageUrl(req) {
  return req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;
}

module.exports = { getLocalPathFromUrl, deleteFile, getImageUrl };
