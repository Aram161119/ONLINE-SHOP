module.exports = function buildComputedSort(sortObj = {}, computedFields = {}) {
  const addFields = {};
  const sortStage = {};

  for (const [field, direction] of Object.entries(sortObj)) {
    if (computedFields[field]) {
      const { field: computedField, expr } = computedFields[field];
      addFields[computedField] = expr;
      sortStage[computedField] = direction;
    } else {
      sortStage[field] = direction;
    }
  }

  return { addFields, sortStage };
};
