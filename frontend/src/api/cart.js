import { request } from '@/utils';

export const cartApi = {
	get() {
		return request('cart');
	},

	addItem(productId, quantity = 1) {
		return request('cart', 'POST', { productId, quantity });
	},

	updateItem(productId, quantity) {
		return request(`cart/items/${productId}`, 'PUT', { quantity });
	},

	removeItem(productId) {
		return request(`cart/items/${productId}`, 'DELETE');
	},
};
