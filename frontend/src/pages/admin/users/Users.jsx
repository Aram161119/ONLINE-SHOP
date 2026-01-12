import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNotification } from '@/context';
import { UsersList } from './components';
import { userApi } from '@/api';
import { useDebounce } from '@/hooks';
import { buildQueryParams } from '@/builders';
import { fetchUsers } from '@/redux/actions';
import { Container, Typography, Box, Button } from '@mui/material';
import { isDeepEqual } from '@/utils';
import { initialUserFilters } from '@/constants';

export const Users = () => {
	const [roles, setRoles] = useState([]);
	const [rolesError, setRolesError] = useState(null);
	const [filters, setFilters] = useState(initialUserFilters);

	const dispatch = useDispatch();

	const { error: showError } = useNotification();
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
		dispatch(fetchUsers(queryParams), false);
	}, [dispatch, queryParams]);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const rolesResp = await userApi.getRoles();
				setRoles(rolesResp?.data || []);
			} catch (err) {
				setRolesError(err);
				showError('Failed to fetch roles');
			}
		};

		fetchRoles();
	}, []);

	const onClear = () => {
		setFilters(initialUserFilters);
		resetDebouncedSearch(initialUserFilters.search);
	};

	if (rolesError)
		<Typography color="error" variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
			{rolesError}
		</Typography>;

	return (
		<Container maxWidth="lg" sx={{ textAlign: 'end' }}>
			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography variant="h5">Users</Typography>

				<Button
					onClick={onClear}
					disabled={isDeepEqual(initialUserFilters, filters)}
					variant="outlined"
					color="primary"
				>
					Clear All filters
				</Button>
			</Box>

			<UsersList filters={filters} setFilters={setFilters} roles={roles} />
		</Container>
	);
};
