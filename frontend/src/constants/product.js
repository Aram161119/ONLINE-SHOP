export const initialFilters = {
	price: '',
	search: {
		title: '',
		author: '',
		characters: '',
	},
	sort: '',
	category: '',
	page: 1,
};

export const sortingItems = [
	{ name: 'Most Liked', value: 'likes_desc' },
	{ name: 'Least Liked', value: 'likes_asc' },
	{ name: 'Newest', value: 'createdAt_desc' },
	{ name: 'Oldest', value: 'createdAt_asc' },
];

export const PER_PAGE = 9;
export const PRICE_RANGE = { min: 0, max: 100000 };
