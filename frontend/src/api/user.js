import { request } from '@/utils';

export const userApi = {
	getAll(filters) {
		return request(`users?${filters}`);
	},

	getRoles() {
		return request('users/roles');
	},

	updateRole(userId, roleId) {
		return request(`users/${userId}`, 'PATCH', { roleId });
	},

	delete(id) {
		return request(`users/${id}`, 'DELETE');
	},
};
