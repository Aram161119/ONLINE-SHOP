import { Outlet } from 'react-router-dom';
import { Box, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartCount, selectCart } from '@/redux/selectors';

export const Layout = () => {
	const cartCount = useSelector(selectCartCount);
	const cart = useSelector(selectCart);
	const navigate = useNavigate();

	return (
		<Box>
			<Outlet />

			<Box
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
				}}
			>
				<Badge badgeContent={cartCount} color="primary">
					<IconButton
						onClick={() => navigate('/cart')}
						sx={{
							color: '#1976d2',
							transition: 'transform 0.2s ease-in-out',

							'&:hover': {
								transform: 'scale(1.25)',
								color: '#0d47a1',
							},
						}}
					>
						<ShoppingCartIcon
							sx={{
								width: 56,
								height: 56,
							}}
						/>
					</IconButton>
				</Badge>
			</Box>
		</Box>
	);
};
