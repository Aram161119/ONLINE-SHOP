import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import {
	authReducer,
	cartReducer,
	loadingReducer,
	productsReducer,
	categoriesReducer,
	usersReducer,
} from './reducers';

const reducer = combineReducers({
	auth: authReducer,
	users: usersReducer,
	cart: cartReducer,
	loading: loadingReducer,
	products: productsReducer,
	categories: categoriesReducer,
});

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
