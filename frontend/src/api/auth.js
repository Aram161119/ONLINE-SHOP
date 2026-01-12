import { request } from '@/utils';

export const authApi = {
	login(data) {
		return request('login', 'POST', data);
	},

	register(data) {
		return request('register', 'POST', data);
	},

	logout() {
		return request('logout', 'POST');
	},
};
