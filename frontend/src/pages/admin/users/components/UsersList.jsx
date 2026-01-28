import {
	Table,
	TableBody,
	TableCell as MuiTableCell,
	TableContainer,
	TableHead,
	TableRow,
	CircularProgress,
	Paper,
	Pagination,
	Button,
	Box,
	Select,
	MenuItem,
	Typography,
} from '@mui/material';
import { DeleteModal } from '@/components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectUser,
	selectUsers,
	selectUsersLastPage,
	selectUserLoading,
} from '@/redux/selectors';
import { useNotification } from '@/context';
import { removeUser, editUser } from '@/redux/actions';
import { useDispatch } from 'react-redux';
import { TableCell } from '@/components';
import { formatDate } from '@/utils';
import { ROLE } from '@/constants';

const EmptyUsers = () => (
	<Typography sx={{ textAlign: 'center', mt: 5 }}>No users yet.</Typography>
);

export const UsersList = ({ filters, setFilters, roles }) => {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [changedUsers, setChangedUsers] = useState([]);

	const currentUser = useSelector(selectUser);
	const users = useSelector(selectUsers);
	const lastPage = useSelector(selectUsersLastPage);
	const isLoading = useSelector(selectUserLoading);

	const { success, error: showError } = useNotification();

	const dispatch = useDispatch();

	const handleOpenDeleteModal = (user) => {
		setSelectedUser(user);
		setOpenDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setSelectedUser(null);
		setOpenDeleteModal(false);
	};

	const onDelete = async () => {
		if (!selectedUser) return;

		try {
			await dispatch(removeUser(selectedUser.id));
			success('User deleted successfully!');
		} catch (err) {
			showError(err?.message || 'Failed to delete user!');
		}

		handleCloseDeleteModal();
	};

	const onUpdate = async (userId) => {
		const userToUpdate = changedUsers.find((u) => u.id === userId);

		if (!userToUpdate) {
			showError('No pending changes for this user!');
			return;
		}

		try {
			await dispatch(editUser(userId, userToUpdate.roleId));
			success('User role updated successfully!');
			setChangedUsers((prev) => prev.filter((u) => u.id !== userId));
		} catch (err) {
			showError(err?.message || 'Failed to update user role!');
		}
	};

	const handlePageChange = (page) => setFilters((prev) => ({ ...prev, page }));

	const getCurrentRole = (user) => {
		const changed = changedUsers.find((u) => u.id === user.id);
		return changed ? changed.roleId : user.roleId;
	};

	const onRoleChange = (user, newRoleId) => {
		const originalRole = user.roleId;
		const existing = changedUsers.find((u) => u.id === user.id);

		if (existing) {
			if (newRoleId === originalRole) {
				setChangedUsers((prev) => prev.filter((u) => u.id !== user.id));
			} else {
				setChangedUsers((prev) =>
					prev.map((u) => (u.id === user.id ? { ...u, roleId: newRoleId } : u)),
				);
			}
		} else {
			if (newRoleId !== originalRole) {
				setChangedUsers((prev) => [...prev, { ...user, roleId: newRoleId }]);
			}
		}
	};

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

	const handleRoleChange = (name, value) => {
		setFilters((prev) => ({
			...prev,
			page: 1,
			[name]: value,
		}));
	};

	const COLUMNS = [
		{ id: 'id', label: 'ID', searchable: true },
		{ id: 'email', label: 'Email', searchable: true },
		{
			id: 'role',
			label: 'Role',
			sortable: false,
			dropdown_search: true,
			options: roles,
			selectedValues: filters?.role || [],
		},
		{ id: 'createdAt', label: 'Created at' },
	];

	return (
		<TableContainer
			component={Paper}
			sx={{
				borderRadius: '16px',
				overflow: 'hidden',
				margin: '0 auto',
			}}
		>
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
									handleOptionalChange={handleRoleChange}
								/>
							))}
							<MuiTableCell align="right">Actions</MuiTableCell>
						</TableRow>
					</TableHead>
					{isLoading ? (
						<caption style={{ textAlign: 'center' }}>
							<CircularProgress />
						</caption>
					) : (
						users.length === 0 && (
							<caption>
								<EmptyUsers />
							</caption>
						)
					)}
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id} hover>
								<MuiTableCell>{user.id}</MuiTableCell>
								<MuiTableCell>{user.email}</MuiTableCell>
								<MuiTableCell>
									<Box
										sx={{
											cursor: 'pointer',
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Select
											disabled={
												currentUser.roleId !== ROLE.ROOT ||
												user.roleId === ROLE.ROOT
											}
											labelId="demo-select-small-label"
											id="demo-select-small"
											value={getCurrentRole(user)}
											label="Role"
											onChange={(e) =>
												onRoleChange(user, e.target.value)
											}
										>
											{roles.map((role) => (
												<MenuItem
													key={role.id}
													value={role.id}
													disabled={role.id === ROLE.ROOT}
												>
													{role.name}
												</MenuItem>
											))}
										</Select>
									</Box>
								</MuiTableCell>

								<MuiTableCell>{formatDate(user.createdAt)}</MuiTableCell>

								<MuiTableCell align="right">
									<Button
										variant="outlined"
										size="small"
										color="primary"
										disabled={
											!changedUsers.find((u) => u.id === user.id)
										}
										sx={{ mr: 1 }}
										onClick={() => onUpdate(user.id)}
									>
										Save
									</Button>
									<Button
										variant="outlined"
										size="small"
										color="error"
										onClick={() => handleOpenDeleteModal(user)}
										disabled={
											currentUser.roleId !== ROLE.ROOT ||
											user.roleId === ROLE.ROOT
										}
									>
										Delete
									</Button>
								</MuiTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Pagination
					sx={{
						p: 2,
						display: 'flex',
						justifyContent: 'center',
					}}
					count={lastPage}
					page={filters.page}
					onChange={(_, page) => handlePageChange(page)}
					variant="outlined"
					color="primary"
				/>

				<DeleteModal
					open={openDeleteModal}
					onClose={handleCloseDeleteModal}
					onSubmit={onDelete}
					text="Are you sure you want to delete this user?"
				/>
			</>
		</TableContainer>
	);
};
