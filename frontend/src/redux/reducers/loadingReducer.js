import { ACTION_TYPE } from '../actions';

const initialState = {
	isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_LOADING:
			return { ...state, isLoading: action.payload };
		default:
			return state;
	}
};
