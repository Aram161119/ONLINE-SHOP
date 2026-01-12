import { request } from '@/utils';

export const categoryApi = {
	getAll(filters) {
		return request(`categories?${filters}`);
	},

	create(data) {
		return request('categories', 'POST', data);
	},

	update(id, data) {
		return request(`categories/${id}`, 'PUT', data);
	},

	delete(id) {
		return request(`categories/${id}`, 'DELETE');
	},
};
