import {
	Table,
	TableBody,
	TableCell as MuiTableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Typography,
	Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableCell, DeleteModal } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductsError, selectCategories } from '@/redux/selectors';
import { useNotification } from '@/context';
import { useState } from 'react';
import { removeCategory } from '@/redux/actions';

export const CategoriesList = ({ filters, setFilters, onEdit }) => {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);

	const error = useSelector(selectProductsError);
	const categories = useSelector(selectCategories);

	const dispatch = useDispatch();

	const { success, error: showError } = useNotification();

	const COLUMNS = [
		{ id: 'name', label: 'Name', searchable: true },
		{ id: 'slug', label: 'Slug', searchable: true },
		{ id: 'description', label: 'Description', searchable: true },
		{ id: 'isActive', label: 'Active' },
	];

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

	const onDelete = async () => {
		if (!deleteCategoryId) return;

		try {
			await dispatch(removeCategory(deleteCategoryId));
			success('Category successfully deleted!');
			handleCloseDeleteModal();
		} catch (err) {
			showError(err?.message || 'Something went wrong!');
		}
	};

	const handleCloseDeleteModal = () => {
		setDeleteCategoryId(null);
		setOpenDeleteModal(false);
	};

	const handleOpenDeleteModal = (id) => {
		setDeleteCategoryId(id);
		setOpenDeleteModal(true);
	};

	if (error)
		<Typography color="error" variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
			{error}
		</Typography>;

	return (
		<>
			<TableContainer
				component={Paper}
				sx={{
					borderRadius: '16px',
					overflow: 'hidden',
				}}
			>
				{!categories.length ? (
					<Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
						No categories found.
					</Typography>
				) : (
					<>
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
										/>
									))}
									<MuiTableCell align="center">Actions</MuiTableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{categories.map((category) => (
									<TableRow key={category.id} hover>
										<MuiTableCell>{category.name}</MuiTableCell>
										<MuiTableCell>{category.slug}</MuiTableCell>
										<MuiTableCell>
											{category.description || '-'}
										</MuiTableCell>
										<MuiTableCell>
											{category.isActive ? 'Yes' : 'No'}
										</MuiTableCell>
										<MuiTableCell align="right">
											<Box display={'flex'} justifyContent="center">
												<IconButton
													color="primary"
													onClick={() => onEdit(category)}
												>
													<EditIcon />
												</IconButton>
												<IconButton
													color="error"
													onClick={() =>
														handleOpenDeleteModal(category.id)
													}
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</MuiTableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</>
				)}
			</TableContainer>

			<DeleteModal
				open={openDeleteModal}
				onClose={handleCloseDeleteModal}
				onSubmit={onDelete}
				text="Are you sure you want to delete this category?"
			/>
		</>
	);
};
