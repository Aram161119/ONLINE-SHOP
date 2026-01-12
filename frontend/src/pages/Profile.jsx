import { Container, Paper, Typography, Box, Divider, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '@/redux/selectors';
import { ROLE_REVERSE } from '@/constants';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { checkAccess } from '@/utils';
import { ROLE } from '@/constants';

export const Profile = () => {
	const user = useSelector(selectUser);

	if (!user || !user.id) {
		return <Navigate to="/login" replace />;
	}

	const roleName = ROLE_REVERSE[user.roleId] || 'User';
	const isAdmin = checkAccess([ROLE.ADMIN, ROLE.ROOT], user?.roleId);

	return (
		<Container maxWidth="md">
			<Typography variant="h4" fontWeight="bold" mb={4}>
				User Profile
			</Typography>

			<Paper
				elevation={3}
				sx={{
					p: 4,
					borderRadius: 3,
					background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						mb: 3,
						gap: 2,
					}}
				>
					<Box
						sx={{
							width: 80,
							height: 80,
							borderRadius: '50%',
							background:
								'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff',
						}}
					>
						<PersonIcon sx={{ fontSize: 40 }} />
					</Box>
					<Box>
						<Typography variant="h5" fontWeight="bold">
							{user.email}
						</Typography>
						<Chip
							icon={isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
							label={roleName}
							color={isAdmin ? 'primary' : 'default'}
							sx={{ mt: 1 }}
						/>
					</Box>
				</Box>

				<Divider sx={{ my: 3 }} />

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							p: 2,
							background: 'rgba(255, 255, 255, 0.7)',
							borderRadius: 2,
						}}
					>
						<EmailIcon color="primary" />
						<Box>
							<Typography variant="body2" color="text.secondary">
								Email
							</Typography>
							<Typography variant="body1" fontWeight="medium">
								{user.email}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							p: 2,
							background: 'rgba(255, 255, 255, 0.7)',
							borderRadius: 2,
						}}
					>
						<AdminPanelSettingsIcon color="primary" />
						<Box>
							<Typography variant="body2" color="text.secondary">
								Role
							</Typography>
							<Typography variant="body1" fontWeight="medium">
								{roleName}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							p: 2,
							background: 'rgba(255, 255, 255, 0.7)',
							borderRadius: 2,
						}}
					>
						<PersonIcon color="primary" />
						<Box>
							<Typography variant="body2" color="text.secondary">
								User ID
							</Typography>
							<Typography variant="body1" fontWeight="medium">
								{user.id}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>

			{isAdmin && (
				<Paper
					elevation={2}
					sx={{
						mt: 3,
						p: 3,
						borderRadius: 2,
						background: '#e3f2fd',
						border: '1px solid #90caf9',
					}}
				>
					<Typography variant="h6" fontWeight="bold" mb={1}>
						Admin Privileges
					</Typography>
					<Typography variant="body2" color="text.secondary">
						You have administrator access. You can manage products and users
						from the admin panel.
					</Typography>
				</Paper>
			)}
		</Container>
	);
};
