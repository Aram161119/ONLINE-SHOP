import { userApi } from '@/api';
import { ACTION_TYPE } from './action-type';

export const setUsers = (users, lastPage) => ({
	type: ACTION_TYPE.SET_USERS,
	payload: { users, lastPage },
});

export const addUser = (user) => ({
	type: ACTION_TYPE.ADD_USER,
	payload: user,
});

export const updateUser = (user) => ({
	type: ACTION_TYPE.UPDATE_USER,
	payload: user,
});

export const deleteUser = (userId) => ({
	type: ACTION_TYPE.DELETE_USER,
	payload: userId,
});

export const setUserError = (message) => ({
	type: ACTION_TYPE.SET_USER_ERROR,
	payload: message,
});

export const setUserLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_USER_LOADING,
	payload: isLoading,
});

export const fetchUsers = (filters) => async (dispatch) => {
	dispatch(setUserLoading(true));

	try {
		const {
			data: { lastPage, users },
		} = await userApi.getAll(filters);

		dispatch(setUsers(users, lastPage));
	} catch (err) {
		dispatch(setUserError(err?.message || 'Failed to load users'));
	}
};

export const editUser = (id, roleId) => async (dispatch) => {
	try {
		const { data } = await userApi.updateRole(id, roleId);
		dispatch(updateUser(data));
		return data;
	} catch (err) {
		dispatch(setUserError(err?.message || 'Failed to update user'));
		throw err;
	}
};

export const removeUser = (id) => async (dispatch) => {
	dispatch(setUserLoading(true));

	try {
		await userApi.delete(id);
		dispatch(deleteUser(id));
	} catch (err) {
		dispatch(setUserError(err?.message || 'Failed to delete user'));
		throw err;
	}
};
