import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useState, useRef } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';

export const AdminLinks = () => {
	const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
	const closeTimerRef = useRef(null);
	const navigate = useNavigate();

	const handleAdminMenuOpen = (event) => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
		setAdminMenuAnchor(event.currentTarget);
	};

	const handleAdminMenuClose = () => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
		}
		closeTimerRef.current = setTimeout(() => {
			setAdminMenuAnchor(null);
		}, 150);
	};

	const handleMenuClick = (path) => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
		navigate(path);
		setAdminMenuAnchor(null);
	};

	return (
		<Box
			onMouseEnter={handleAdminMenuOpen}
			onMouseLeave={handleAdminMenuClose}
			sx={{ position: 'relative' }}
		>
			<NavItem
				to="#"
				sx={{
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: 0.5,
					'&:hover': { opacity: 0.7 },
				}}
			>
				<AdminPanelSettingsIcon sx={{ fontSize: 18 }} />
				Admin
			</NavItem>

			<Menu
				anchorEl={adminMenuAnchor}
				open={Boolean(adminMenuAnchor)}
				onClose={handleAdminMenuClose}
				MenuListProps={{
					onMouseEnter: () => {
						if (closeTimerRef.current) {
							clearTimeout(closeTimerRef.current);
							closeTimerRef.current = null;
						}
					},
					onMouseLeave: handleAdminMenuClose,
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				sx={{
					mt: 0.5,
					'& .MuiPaper-root': {
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						borderRadius: 2,
						minWidth: 150,
					},
				}}
			>
				<MenuItem onClick={() => handleMenuClick('/admin/users')}>Users</MenuItem>
				<MenuItem onClick={() => handleMenuClick('/admin/products')}>
					Products
				</MenuItem>
				<MenuItem onClick={() => handleMenuClick('/admin/categories')}>
					Categories
				</MenuItem>
			</Menu>
		</Box>
	);
};
