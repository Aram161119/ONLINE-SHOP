import { AppBar, Tooltip, Toolbar, Box, Button, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '@/redux/selectors';
import { ROLE } from '@/constants';
import { logout } from '@/redux/actions';
import { checkAccess } from '@/utils';
import { AdminLinks } from './components/AdminLinks';
import { UserLinks } from './components/UserLinks';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user, isAuth } = useSelector(selectAuth);

	const isAdmin = checkAccess([ROLE.ADMIN, ROLE.ROOT], user?.roleId);
	const authorizeText = location.pathname === '/login' ? 'register' : 'login';

	const onLogout = async () => {
		await dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	return (
		<AppBar
			position="static"
			sx={{
				background: '#f2f2f2',
				boxShadow: 'none',
				py: '10px',
				color: '#000',
				marginBottom: '40px',
			}}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
					shop
				</Typography>

				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 3,
						position: 'relative',
					}}
				>
					<UserLinks />
					{isAdmin && <AdminLinks />}
				</Box>

				{isAuth ? (
					<Box>
						<Link to="/profile">
							<Tooltip title={user.email}>
								<PersonIcon />
							</Tooltip>
						</Link>
						<Tooltip title={'Logout'}>
							<LogoutIcon
								sx={{
									':hover': { cursor: 'pointer' },
									ml: 1,
								}}
								onClick={onLogout}
							/>
						</Tooltip>
					</Box>
				) : (
					<Button
						sx={{
							textTransform: 'none',
							background: '#000',
							borderRadius: '30px',
							px: 3,
							'&:hover': { background: '#333' },
						}}
					>
						<Link to={`/${authorizeText}`}>
							<Typography sx={{ color: '#fff' }}>
								{authorizeText}
							</Typography>
						</Link>
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
