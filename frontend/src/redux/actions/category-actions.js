import { categoryApi } from '@/api';
import { ACTION_TYPE } from './action-type';
import { setLoading } from '@/redux/actions';

export const setCategories = (categories) => ({
	type: ACTION_TYPE.SET_CATEGORIES,
	payload: categories,
});

export const addCategory = (category) => ({
	type: ACTION_TYPE.ADD_CATEGORY,
	payload: category,
});

export const updateCategory = (category) => ({
	type: ACTION_TYPE.UPDATE_CATEGORY,
	payload: category,
});

export const deleteCategory = (categoryId) => ({
	type: ACTION_TYPE.DELETE_CATEGORY,
	payload: categoryId,
});

export const setCategoryError = (message) => ({
	type: ACTION_TYPE.SET_CATEGORY_ERROR,
	payload: message,
});

export const fetchCategories =
	(filters = '') =>
	async (dispatch) => {
		try {
			const { data } = await categoryApi.getAll(filters);

			dispatch(setCategories(data));
		} catch (err) {
			dispatch(setCategoryError(err?.message || 'Failed to load categories'));
		}
	};

export const createCategory = (payload) => async (dispatch) => {
	try {
		const { data } = await categoryApi.create(payload);

		dispatch(addCategory(data));
		return data;
	} catch (err) {
		dispatch(setCategoryError(err?.message || 'Failed to create category'));
		throw err;
	}
};

export const editCategory = (id, payload) => async (dispatch) => {
	try {
		const { data } = await categoryApi.update(id, payload);
		dispatch(updateCategory(data));
		return data;
	} catch (err) {
		dispatch(setCategoryError(err?.message || 'Failed to update category'));
		throw err;
	}
};

export const removeCategory = (id) => async (dispatch) => {
	try {
		await categoryApi.delete(id);
		dispatch(deleteCategory(id));
	} catch (err) {
		dispatch(setCategoryError(err?.message || 'Failed to delete category'));
		throw err;
	}
};
