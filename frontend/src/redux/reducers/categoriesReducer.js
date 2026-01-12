import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	list: [],
	byId: {},
	error: null,
};

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES: {
			const byId = {};
			const list = [];

			const data = action.payload;

			data.forEach((category) => {
				byId[category.id] = category;
				list.push(category.id);
			});

			return {
				...state,
				list,
				byId,
				error: null,
			};
		}

		case ACTION_TYPE.ADD_CATEGORY: {
			const category = action.payload;

			return {
				...state,
				list: state.list.includes(category.id)
					? state.list
					: [category.id, ...state.list],
				byId: {
					[category.id]: category,
					...state.byId,
				},
				error: null,
			};
		}
		case ACTION_TYPE.DELETE_CATEGORY: {
			const categoryId = action.payload;

			const { [categoryId]: removed, ...restById } = state.byId;

			return {
				...state,
				list: state.list.filter((id) => id !== categoryId),
				byId: restById,
				error: null,
			};
		}

		case ACTION_TYPE.UPDATE_CATEGORY: {
			const category = action.payload;

			return {
				...state,
				byId: {
					...state.byId,
					[category.id]: category,
				},
				list: state.list.includes(category.id)
					? state.list
					: [...state.list, category.id],
			};
		}

		case ACTION_TYPE.SET_CATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
