import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	list: [],
	byId: {},
	lastPage: 1,
	error: null,
	isLoading: true,
};

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS: {
			const byId = {};
			const list = [];

			const { products, lastPage } = action.payload;

			products.forEach((product) => {
				byId[product.id] = product;
				list.push(product.id);
			});

			return {
				...state,
				list,
				byId,
				lastPage,
				error: null,
				isLoading: false,
			};
		}

		case ACTION_TYPE.ADD_PRODUCT: {
			const product = action.payload;

			return {
				...state,
				list: state.list.includes(product.id)
					? state.list
					: [product.id, ...state.list],
				byId: {
					[product.id]: product,
					...state.byId,
				},
				error: null,
				isLoading: false,
			};
		}

		case ACTION_TYPE.DELETE_PRODUCT: {
			const productId = action.payload;

			const { [productId]: removed, ...restById } = state.byId;

			return {
				...state,
				list: state.list.filter((id) => id !== productId),
				byId: restById,
				error: null,
				isLoading: false,
			};
		}

		case ACTION_TYPE.UPDATE_PRODUCT: {
			const product = action.payload;

			return {
				...state,
				byId: {
					...state.byId,
					[product.id]: product,
				},
				list: state.list.includes(product.id)
					? state.list
					: [...state.list, product.id],
			};
		}

		case ACTION_TYPE.SET_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};

		default:
			return state;
	}
};
