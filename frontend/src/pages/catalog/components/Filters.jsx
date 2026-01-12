import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search, Sort, PriceFilter } from '@/components';
import { isDeepEqual } from '@/utils';
import { initialFilters, sortingItems, PRICE_RANGE } from '@/constants';
import { selectCategories } from '@/redux/selectors';
import { useSelector } from 'react-redux';

export const Filters = ({ filters, onChangeFilters, onClear }) => {
	const categories = useSelector(selectCategories);

	const handleSearch = (field = 'title', value) => {
		onChangeFilters({
			...filters,
			page: 1,
			search: {
				...filters.search,
				[field]: value,
			},
		});
	};

	const handleSortChange = (value) => {
		onChangeFilters({
			...filters,
			sort: value,
			page: 1,
		});
	};

	const handlePriceChange = ({ min, max }) => {
		onChangeFilters({
			...filters,
			price: { min, max },
			page: 1,
		});
	};

	const handleCategoryChange = (value) => {
		onChangeFilters({
			...filters,
			category: [value],
			page: 1,
		});
	};

	return (
		<Box display="flex" justifyContent="space-between" mb={3}>
			<Box display="flex">
				<Search
					value={filters.search.title}
					onChange={(e) => handleSearch('title', e.target.value)}
					onClear={() => handleSearch('title', '')}
					placeholder="Search products by title..."
				/>
				<Sort
					value={filters.sort}
					onChange={(e) => handleSortChange(e.target.value)}
					items={sortingItems}
					sx={{ ml: 3 }}
				/>
				<PriceFilter
					value={[
						filters.price.min || PRICE_RANGE.min,
						filters.price.max || PRICE_RANGE.max,
					]}
					onChange={(arr) => handlePriceChange({ min: arr[0], max: arr[1] })}
					sx={{ ml: 3 }}
				/>
				<FormControl sx={{ ml: 3, minWidth: 200 }}>
					<InputLabel>Category</InputLabel>
					<Select
						value={filters.category || ''}
						label="Category"
						onChange={(e) => handleCategoryChange(e.target.value)}
					>
						<MenuItem value="">All Categories</MenuItem>
						{categories
							.filter((category) => category.isActive)
							.map((category) => (
								<MenuItem key={category.id} value={category.id}>
									{category.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Box>
			<Button
				onClick={onClear}
				disabled={isDeepEqual(initialFilters, filters)}
				variant="outlined"
				color="primary"
				sx={{ ml: 3 }}
			>
				Clear All
			</Button>
		</Box>
	);
};
