export const selectUsers = (state) => {
	const usersState = state.users;

	if (!usersState) return [];

	const list = usersState.list ?? [];
	const byId = usersState.byId ?? {};

	return list.map((id) => byId[id]).filter(Boolean);
};
