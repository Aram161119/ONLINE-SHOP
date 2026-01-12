import { request } from '@/utils';

export const productApi = {
	getAll: (filters) => request(`products?${filters}`),
	getById: (id) => request(`products/${id}`),
	create: (data) => request('products', 'POST', data),
	update: (id, data) => request(`products/${id}`, 'PUT', data),
	remove: (id) => request(`products/${id}`, 'DELETE'),
	like: (id) => request(`products/${id}/likes`, 'POST'),
	addComment: (productId, commentText) =>
		request(`products/${productId}/comments`, 'POST', {
			comment: commentText,
		}),
	removeComment: (productId, commentId) =>
		request(`products/${productId}/comments/${commentId}`, 'DELETE'),
};
