import { productApi } from '@/api';
import { ACTION_TYPE } from './action-type';

export const setProducts = (products, lastPage) => ({
	type: ACTION_TYPE.SET_PRODUCTS,
	payload: { products, lastPage },
});

export const addProduct = (product) => ({
	type: ACTION_TYPE.ADD_PRODUCT,
	payload: product,
});

export const updateProduct = (product) => ({
	type: ACTION_TYPE.UPDATE_PRODUCT,
	payload: product,
});

export const deleteProduct = (productId) => ({
	type: ACTION_TYPE.DELETE_PRODUCT,
	payload: productId,
});

export const setProductError = (message) => ({
	type: ACTION_TYPE.SET_PRODUCT_ERROR,
	payload: message,
});

export const setProductLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_PRODUCT_LOADING,
	payload: isLoading,
});

export const fetchProducts = (filters) => async (dispatch) => {
	dispatch(setProductLoading(true));

	try {
		const {
			data: { lastPage, products },
		} = await productApi.getAll(filters);

		dispatch(setProducts(products, lastPage));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to load products'));
	}
};

export const createProduct = (payload) => async (dispatch) => {
	dispatch(setProductLoading(true));

	try {
		const { data } = await productApi.create(payload);

		dispatch(addProduct(data));
		return data;
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to create product'));
		throw err;
	}
};

export const editProduct = (id, payload) => async (dispatch) => {
	dispatch(setProductLoading(true));

	try {
		const { data } = await productApi.update(id, payload);
		dispatch(updateProduct(data));
		return data;
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to update product'));
		throw err;
	}
};

export const removeProduct = (id) => async (dispatch) => {
	dispatch(setProductLoading(true));

	try {
		await productApi.remove(id);
		dispatch(deleteProduct(id));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to delete product'));
		throw err;
	}
};

export const likeAndUpdateProduct = (productId) => async (dispatch) => {
	try {
		await productApi.like(productId);
		const { data: updatedProduct } = await productApi.getById(productId);

		dispatch(updateProduct(updatedProduct));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to like product'));
		throw err;
	}
};

export const addComment = (productId, commentText) => async (dispatch) => {
	try {
		await productApi.addComment(productId, commentText);
		const { data: updatedProduct } = await productApi.getById(productId);

		dispatch(updateProduct(updatedProduct));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to add comment'));
		throw err;
	}
};

export const deleteComment = (productId, commentId) => async (dispatch) => {
	try {
		await productApi.removeComment(productId, commentId);
		const { data: updatedProduct } = await productApi.getById(productId);

		dispatch(updateProduct(updatedProduct));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to delete comment'));
		throw err;
	}
};

export const fetchProductById = (productId) => async (dispatch, getState) => {
	dispatch(setProductLoading(true));

	try {
		const existing = getState().products.byId[productId];
		if (existing) return;

		const { data } = await productApi.getById(productId);
		dispatch(updateProduct(data));
	} catch (err) {
		dispatch(setProductError(err?.message || 'Failed to fetch product'));
		throw err;
	}
};
