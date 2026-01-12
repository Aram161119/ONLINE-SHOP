import { Container, Button, Typography, Box } from '@mui/material';
import { CreateProductModal, ProductsList } from '../components';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '@/hooks';
import { initialFilters } from '@/constants';
import { buildQueryParams } from '@/builders';
import { fetchProducts, fetchCategories } from '@/redux/actions';
import AddIcon from '@mui/icons-material/Add';
import { isDeepEqual } from '@/utils';

export const Products = () => {
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [filters, setFilters] = useState(initialFilters);

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
		dispatch(fetchProducts(queryParams), false);
	}, [dispatch, queryParams]);

	useEffect(() => {
		dispatch(fetchCategories(), false);
	}, []);

	const onClear = () => {
		setFilters(initialFilters);
		resetDebouncedSearch(initialFilters.search);
	};

	return (
		<Container maxWidth="lg" sx={{ textAlign: 'end' }}>
			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography variant="h5">Products</Typography>

				<Box>
					<Button
						onClick={onClear}
						disabled={isDeepEqual(initialFilters, filters)}
						variant="outlined"
						color="primary"
					>
						Clear All filters
					</Button>
					<Button
						sx={{ ml: 2 }}
						color="primary"
						variant="outlined"
						onClick={() => setOpenCreateModal(true)}
					>
						<AddIcon />
						Add new Product
					</Button>
				</Box>
			</Box>

			<ProductsList filters={filters} setFilters={setFilters} />

			<CreateProductModal
				open={openCreateModal}
				onClose={() => setOpenCreateModal(false)}
			/>
		</Container>
	);
};
