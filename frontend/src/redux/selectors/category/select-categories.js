export const selectCategories = (state) => {
	const categoriesState = state.categories;

	if (!categoriesState) return [];

	const list = categoriesState.list ?? [];
	const byId = categoriesState.byId ?? {};

	return list.map((id) => byId[id]).filter(Boolean);
};
