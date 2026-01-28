import { ACTION_TYPE } from '../actions';

const initialState = {
	user: null,
	isAuth: false,
	isAuthChecked: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				user: { ...action.payload },
				isAuth: true,
				isAuthChecked: true,
				error: null,
			};
		}
		case ACTION_TYPE.LOGOUT:
			return {
				user: initialState.user,
				isAuth: false,
				isAuthChecked: true,
				error: null,
			};
		case ACTION_TYPE.SET_AUTH_CHECKED:
			return { ...state, isAuthChecked: action.payload, error: null };
		case ACTION_TYPE.SET_AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
