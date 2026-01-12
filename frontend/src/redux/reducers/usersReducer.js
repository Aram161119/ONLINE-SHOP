import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	list: [],
	byId: {},
	lastPage: 1,
	error: null,
};

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USERS: {
			const byId = {};
			const list = [];

			const { users, lastPage } = action.payload;

			users.forEach((user) => {
				byId[user.id] = user;
				list.push(user.id);
			});

			return {
				...state,
				list,
				byId,
				lastPage,
				error: null,
			};
		}

		case ACTION_TYPE.ADD_USER: {
			const user = action.payload;

			return {
				...state,
				list: state.list.includes(user.id)
					? state.list
					: [user.id, ...state.list],
				byId: {
					[user.id]: user,
					...state.byId,
				},
				error: null,
			};
		}

		case ACTION_TYPE.DELETE_USER: {
			const userId = action.payload;

			const { [userId]: removed, ...restById } = state.byId;

			return {
				...state,
				list: state.list.filter((id) => id !== userId),
				byId: restById,
				error: null,
			};
		}

		case ACTION_TYPE.UPDATE_USER: {
			const user = action.payload;

			return {
				...state,
				byId: {
					...state.byId,
					[user.id]: user,
				},
				list: state.list.includes(user.id)
					? state.list
					: [...state.list, user.id],
			};
		}

		case ACTION_TYPE.SET_USER_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
