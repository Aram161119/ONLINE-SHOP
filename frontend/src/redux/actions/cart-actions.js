import { ACTION_TYPE } from './action-type';
import { setLoading } from './set-loading';
import { cartApi } from '@/api';

export const setCart = (cart) => ({
	type: ACTION_TYPE.CART_SET,
	payload: cart,
});

export const setCartError = (error) => ({
	type: ACTION_TYPE.CART_SET_ERROR,
	payload: error,
});

export const clearCart = () => ({
	type: ACTION_TYPE.CART_CLEAR,
});

const cartError = (err, fallback) => setCartError(err?.message || fallback);

export const fetchCart = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await cartApi.get();
		dispatch(setCart(data));
	} catch (err) {
		dispatch(cartError(err, 'Failed to load cart'));
		throw err;
	} finally {
		dispatch(setLoading(false));
	}
};

export const addToCart =
	(productId, quantity = 1) =>
	async (dispatch) => {
		try {
			const { data } = await cartApi.addItem(productId, quantity);
			dispatch(setCart(data));
		} catch (err) {
			dispatch(cartError(err, 'Failed to add product to cart'));
			throw err;
		}
	};

export const updateItemQuantity = (productId, quantity) => async (dispatch) => {
	try {
		const { data } = await cartApi.updateItem(productId, quantity);
		dispatch(setCart(data));
	} catch (err) {
		dispatch(cartError(err, 'Failed to update quantity'));
		throw err;
	}
};

export const removeFromCart = (productId) => async (dispatch) => {
	try {
		const { data } = await cartApi.removeItem(productId);
		dispatch(setCart(data));
	} catch (err) {
		dispatch(cartError(err, 'Unable to remove product from cart'));
		throw err;
	}
};
