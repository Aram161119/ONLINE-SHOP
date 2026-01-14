import {
	Table,
	TableBody,
	TableCell as MuiTableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Pagination,
	Typography,
	CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCategories,
	selectProducts,
	selectProductsLastPage,
	selectProductsError,
	selectProductLoading,
} from '@/redux/selectors';
import { ProductRow } from './components';
import { useNotification } from '@/context';
import { useNavigate } from 'react-router-dom';
import { DeleteModal, TableCell } from '@/components';
import { removeProduct } from '@/redux/actions';
import { useState } from 'react';

const EmptyProducts = () => (
	<Typography sx={{ textAlign: 'center', mt: 5 }}>No products yet.</Typography>
);

export const ProductsList = ({ filters, setFilters }) => {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteProductId, setDeleteProductId] = useState(null);

	const error = useSelector(selectProductsError);
	const products = useSelector(selectProducts);
	const lastPage = useSelector(selectProductsLastPage);
	const categories = useSelector(selectCategories);
	const isLoading = useSelector(selectProductLoading);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { success, error: showError } = useNotification();

	const [orderBy = '', order = 'asc'] = filters.sort?.split('_') || [];

	const handleSortChange = (field) => {
		const isAsc = orderBy === field && order === 'asc';

		setFilters({
			...filters,
			sort: `${field}_${isAsc ? 'desc' : 'asc'}`,
			page: 1,
		});
	};

	const handleSearchChange = (field, value) => {
		setFilters((prev) => ({
			...prev,
			page: 1,
			search: {
				...prev.search,
				[field]: value,
			},
		}));
	};

	const handleCategoryChange = (name, value) => {
		setFilters((prev) => ({
			...prev,
			page: 1,
			[name]: value,
		}));
	};

	const onEdit = (id) => navigate(`/admin/products/update/${id}`);

	const onDelete = async () => {
		if (!deleteProductId) return;

		try {
			await dispatch(removeProduct(deleteProductId));
			success('Product successfully deleted!');
			handleCloseDeleteModal();
		} catch (err) {
			showError(err?.message || 'Something went wrong!');
		}
	};

	const handleCloseDeleteModal = () => {
		setDeleteProductId(null);
		setOpenDeleteModal(false);
	};

	const handleOpenDeleteModal = (id) => {
		setDeleteProductId(id);
		setOpenDeleteModal(true);
	};

	const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));

	if (error)
		<Typography color="error" variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
			{error}
		</Typography>;

	const COLUMNS = [
		{ id: 'title', label: 'Title', searchable: true },
		{ id: 'characters', label: 'Characters', searchable: true },
		{ id: 'price', label: 'Price / USD' },
		{
			id: 'category',
			label: 'Category',
			sortable: false,
			dropdown_search: true,
			options: categories,
			selectedValues: filters?.category || [],
		},
		{ id: 'likes', label: 'Likes' },
		{ id: 'comments', label: 'Comments' },
		{ id: 'image', label: 'Image', sortable: false },
		{ id: 'author.email', label: 'Author', searchable: true },
		{ id: 'createdAt', label: 'Created at' },
	];

	return (
		<>
			<TableContainer
				component={Paper}
				sx={{
					borderRadius: 2,
					overflowX: 'auto',
				}}
			>
				<Table>
					<TableHead>
						<TableRow>
							{COLUMNS.map((col) => (
								<TableCell
									key={col.id}
									col={col}
									order={order}
									orderBy={orderBy}
									searchValue={filters.search?.[col.id] || ''}
									handleSortChange={handleSortChange}
									handleSearchChange={handleSearchChange}
									handleOptionalChange={handleCategoryChange}
									sx={{ padding: '16px 6px', textAlign: 'center' }}
								/>
							))}
							<MuiTableCell align="center">Actions</MuiTableCell>
						</TableRow>
					</TableHead>

					{isLoading ? (
						<caption style={{ textAlign: 'center' }}>
							<CircularProgress />
						</caption>
					) : (
						products.length === 0 && (
							<caption>
								<EmptyProducts />
							</caption>
						)
					)}

					<TableBody>
						{products.map((product) => (
							<ProductRow
								key={product.id}
								product={product}
								onEdit={() => onEdit(product.id)}
								onDelete={() => handleOpenDeleteModal(product.id)}
							/>
						))}
					</TableBody>
				</Table>

				<Pagination
					sx={{ p: 2, display: 'flex', justifyContent: 'center' }}
					count={lastPage}
					page={filters.page}
					onChange={(_, page) => handlePageChange(page)}
					variant="outlined"
					color="primary"
				/>
			</TableContainer>

			<DeleteModal
				open={openDeleteModal}
				onClose={handleCloseDeleteModal}
				onSubmit={onDelete}
				text="Are you sure you want to delete this product?"
			/>
		</>
	);
};
