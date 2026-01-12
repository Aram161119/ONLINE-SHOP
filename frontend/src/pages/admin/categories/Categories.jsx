import { Button, Container, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { CreateOrUpdateCategoryModal, CategoriesList } from './components';
import { buildQueryParams } from '@/builders';
import { useDebounce } from '@/hooks';
import { isDeepEqual } from '@/utils';
import { fetchCategories } from '@/redux/actions';

const categoriesInitialFilters = {
	search: {
		name: '',
		slug: '',
		description: '',
	},
	sort: '',
	page: 1,
	limit: 100,
};

export const Categories = () => {
	const [filters, setFilters] = useState(categoriesInitialFilters);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [openCategoryModal, setOpenCategoryModal] = useState(false);

	const dispatch = useDispatch();

	const [debouncedSearch, resetDebouncedSearch] = useDebounce(filters.search, 800);

	const queryParams = useMemo(() => {
		return buildQueryParams({
			...filters,
			search: Object.fromEntries(
				Object.entries(debouncedSearch).filter(([_, value]) => value?.trim()),
			),
		});
	}, [filters, debouncedSearch]);

	useEffect(() => {
		dispatch(fetchCategories(queryParams), false);
	}, [dispatch, queryParams]);

	const handleOpenCreateOrEditModal = (category = null) => {
		setSelectedCategory(category);
		setOpenCategoryModal(true);
	};

	const handleCloseCreateOrEditModal = () => {
		setSelectedCategory(null);
		setOpenCategoryModal(false);
	};

	const onClear = () => {
		setFilters(categoriesInitialFilters);
		resetDebouncedSearch(categoriesInitialFilters.search);
	};

	return (
		<Container maxWidth="lg">
			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography variant="h5">Categories</Typography>

				<Box>
					<Button
						onClick={onClear}
						disabled={isDeepEqual(categoriesInitialFilters, filters)}
						variant="outlined"
						color="primary"
					>
						Clear All filters
					</Button>
					<Button
						sx={{ ml: 2 }}
						color="primary"
						variant="outlined"
						onClick={() => handleOpenCreateOrEditModal()}
					>
						<AddIcon />
						Add new Category
					</Button>
				</Box>
			</Box>

			<CategoriesList
				filters={filters}
				setFilters={setFilters}
				onEdit={handleOpenCreateOrEditModal}
			/>

			<CreateOrUpdateCategoryModal
				open={openCategoryModal}
				onClose={handleCloseCreateOrEditModal}
				category={selectedCategory}
			/>
		</Container>
	);
};
