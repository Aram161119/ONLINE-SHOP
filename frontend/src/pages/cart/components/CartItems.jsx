import { Box, Typography, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartPrice } from '@/redux/selectors';
import { Card } from './Card';

export const CartItems = () => {
	const items = useSelector(selectCartItems);
	const totalPrice = useSelector(selectCartPrice);

	if (items.length === 0) {
		return (
			<Typography variant="h6" color="text.secondary">
				Cart is empty
			</Typography>
		);
	}

	return (
		<>
			{items.map((item) => (
				<Card key={item.id} item={item} />
			))}

			<Divider sx={{ my: 3 }} />

			<Box textAlign={'end'} pb={5}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant="h5">Sum:</Typography>
					<Typography variant="h5" fontWeight={700}>
						{totalPrice} USD
					</Typography>
				</Box>

				<Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
					Order
				</Button>
			</Box>
		</>
	);
};
