import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLoading, selectCartError } from '@/redux/selectors';
import { AsyncContent } from '@/components';
import { CartItems } from './components/CartItems';

export const Cart = () => {
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectCartError);

	return (
		<Box maxWidth="md" mx="auto" mt={4} mb={4}>
			<Typography variant="h4" fontWeight={600} mb={3}>
				Cart
			</Typography>

			<AsyncContent isLoading={isLoading} error={error}>
				<CartItems />
			</AsyncContent>
		</Box>
	);
};
