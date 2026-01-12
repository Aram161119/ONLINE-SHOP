import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	items: [],
	totalPrice: 0,
	totalQuantity: 0,
	error: null,
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.CART_SET: {
			const cart = action.payload;
			if (!cart) return initialState;

			const newItems = cart.items || [];
			const newTotalPrice = cart.totalPrice || 0;
			const newTotalQuantity = cart.totalQuantity || 0;

			const itemsChanged =
				state.items.length !== newItems.length ||
				!state.items.every((item) => {
					const newItem = newItems.find((ni) => ni.id === item.id);
					return (
						newItem &&
						newItem.quantity === item.quantity &&
						newItem.price === item.price
					);
				});

			if (
				!itemsChanged &&
				state.totalPrice === newTotalPrice &&
				state.totalQuantity === newTotalQuantity
			) {
				return state;
			}

			return {
				...state,
				items: newItems,
				totalPrice: newTotalPrice,
				totalQuantity: newTotalQuantity,
				error: null,
			};
		}

		case ACTION_TYPE.CART_CLEAR:
			return initialState;

		case ACTION_TYPE.CART_SET_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
