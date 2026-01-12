const mongoose = require("mongoose");
const qs = require("qs");

/* -------------------- helpers -------------------- */

const isValidObjectId = (v) => mongoose.Types.ObjectId.isValid(v);

const toObjectId = (v) =>
  isValidObjectId(v) ? new mongoose.Types.ObjectId(v) : v;

const escapeRegex = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseValue = (value) => {
  if (value == null || value === "") return null;

  const values = Array.isArray(value)
    ? value
    : value
        .toString()
        .split(",")
        .map((v) => v.trim());

  // all ObjectIds
  if (values.every(isValidObjectId)) {
    const ids = values.map(toObjectId);
    return ids.length === 1 ? ids[0] : { $in: ids };
  }

  // numbers
  const numbers = values.map((v) => (!isNaN(v) && v !== "" ? Number(v) : v));

  return numbers.length === 1 ? numbers[0] : numbers;
};

/* -------------------- main -------------------- */

const prepareQuery = (reqQuery) => {
  const parsed = qs.parse(reqQuery);

  const { search, limit = 9, page = 1, sort, ...filters } = parsed;

  const query = {};

  /* -------- search -------- */
  if (search && typeof search === "object") {
    Object.entries(search).forEach(([field, value]) => {
      if (value == null || value === "") return;

      // $in search (checkboxes)
      if (Array.isArray(value)) {
        const parsedValue = parseValue(value);
        if (parsedValue) query[field] = parsedValue;
        return;
      }

      // text search
      query[field] = {
        $regex: escapeRegex(value),
        $options: "i",
      };
    });
  }

  /* -------- filters -------- */
  Object.entries(filters).forEach(([key, rawValue]) => {
    const value = parseValue(rawValue);
    if (value == null) return;

    if (key.endsWith("Min")) {
      const field = key.replace(/Min$/, "");
      query[field] = { ...(query[field] || {}), $gte: value };
    } else if (key.endsWith("Max")) {
      const field = key.replace(/Max$/, "");
      query[field] = { ...(query[field] || {}), $lte: value };
    } else {
      query[key] = value;
    }
  });

  /* -------- sort -------- */
  let sortObj = { createdAt: -1 };

  if (sort) {
    sortObj = {};
    const sortArray = Array.isArray(sort) ? sort : [sort];

    sortArray.forEach((s) => {
      const [field, direction] = s.split("_");
      if (field) sortObj[field] = direction === "desc" ? -1 : 1;
    });
  }

  /* -------- pagination -------- */
  const pageNumber = Math.max(1, Number(page));
  const limitNumber = Math.max(1, Number(limit));
  const skip = (pageNumber - 1) * limitNumber;

  return {
    query,
    sortObj,
    skip,
    limit: limitNumber,
  };
};

module.exports = prepareQuery;
