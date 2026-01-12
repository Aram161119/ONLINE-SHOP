module.exports = function buildAggregation({
  query,
  addFields,
  sortStage,
  skip = 0,
  limit = 10,
  lookups = [],
}) {
  const pipeline = [];

  if (query && Object.keys(query).length) {
    pipeline.push({ $match: query });
  }

  if (Object.keys(addFields).length) {
    pipeline.push({ $addFields: addFields });
  }

  lookups.forEach((lookup) => {
    pipeline.push(...lookupStage(lookup));
  });

  if (Object.keys(sortStage).length) {
    pipeline.push({ $sort: { ...sortStage, _id: 1 } });
  }

  pipeline.push({ $skip: skip }, { $limit: limit });

  return pipeline;
};

const lookupStage = ({ from, localField, as = localField }) => [
  {
    $lookup: {
      from,
      localField,
      foreignField: "_id",
      as,
    },
  },
  {
    $unwind: {
      path: `$${as}`,
      preserveNullAndEmptyArrays: true,
    },
  },
];
