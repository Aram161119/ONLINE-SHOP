import { ACTION_TYPE } from './action-type';
import { clearCart } from './cart-actions';
import { authApi } from '@/api';
import { setLoading } from './set-loading';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});

export const setAuthChecked = (isAuthChecked = true) => ({
	type: ACTION_TYPE.SET_AUTH_CHECKED,
	payload: isAuthChecked,
});

export const setAuthError = (message) => ({
	type: ACTION_TYPE.SET_AUTH_ERROR,
	payload: message,
});

export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));

	try {
		const { user } = await authApi.login({ email, password });

		dispatch(setUser(user));
		sessionStorage.setItem('userData', JSON.stringify(user));
	} catch (err) {
		dispatch(setAuthError(err?.message || 'Login failed!'));
		throw err;
	} finally {
		dispatch(setLoading(false));
	}
};

export const register = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));

	try {
		const { user } = await authApi.register({ email, password });

		dispatch(setUser(user));
		sessionStorage.setItem('userData', JSON.stringify(user));
	} catch (err) {
		dispatch(setAuthError(err?.message || 'Register failed!'));
		throw err;
	} finally {
		dispatch(setLoading(false));
	}
};

export const logout = () => async (dispatch) => {
	try {
		await authApi.logout();
	} catch (err) {
		console.error('Logout failed:', err?.message || err);
	}

	dispatch(clearCart());
	dispatch({ type: ACTION_TYPE.LOGOUT });
};
