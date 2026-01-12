import { Container } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildQueryParams } from '@/builders';
import { selectLoading, selectProductsError } from '@/redux/selectors';
import { fetchProducts, fetchCategories } from '@/redux/actions';
import { Filters, ProductsGrid } from '../components';
import { initialFilters } from '@/constants';
import { AsyncContent } from '@/components';
import { useDebounce } from '@/hooks';

export const Catalog = () => {
	const [filters, setFilters] = useState(initialFilters);

	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectProductsError);

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

	const handlePageChange = (value) => {
		setFilters((prev) => ({ ...prev, page: value }));
	};

	const onClear = () => {
		setFilters(initialFilters);
		resetDebouncedSearch(initialFilters.search);
	};

	return (
		<Container maxWidth="lg">
			<Filters filters={filters} onChangeFilters={setFilters} onClear={onClear} />

			<AsyncContent isLoading={isLoading} error={error}>
				<ProductsGrid
					currentPage={filters.page}
					onPageChange={handlePageChange}
				/>
			</AsyncContent>
		</Container>
	);
};
