export const selectProducts = (state) => {
	const productsState = state.products;

	if (!productsState) return [];

	const list = productsState.list ?? [];
	const byId = productsState.byId ?? {};

	return list.map((id) => byId[id]).filter(Boolean);
};
