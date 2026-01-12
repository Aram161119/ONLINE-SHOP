import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
	Card as MuiCard,
	CardMedia,
	CardContent,
	Typography,
	Box,
	IconButton,
} from '@mui/material';
import { removeFromCart, updateItemQuantity } from '@/redux/actions';

const areEqual = (a, b) =>
	a.item.id === b.item.id &&
	a.item.quantity === b.item.quantity &&
	a.item.price === b.item.price &&
	a.item.product?.name === b.item.product?.name &&
	a.item.product?.image === b.item.product?.image;

export const Card = memo(({ item }) => {
	const dispatch = useDispatch();

	const handleDecrease = useCallback(() => {
		const newQuantity = item.quantity - 1;

		if (newQuantity > 0) {
			dispatch(updateItemQuantity(item.id, newQuantity));
		} else {
			dispatch(removeFromCart(item.id));
		}
	}, [dispatch, item.id, item.quantity]);

	const handleIncrease = useCallback(() => {
		dispatch(updateItemQuantity(item.id, item.quantity + 1));
	}, [dispatch, item.id, item.quantity]);

	const handleRemove = useCallback(() => {
		dispatch(removeFromCart(item.id));
	}, [dispatch, item.id]);

	const productName = item.product?.title || 'Product';
	const productImage = item.product?.image || item.image || '';

	return (
		<MuiCard
			key={item.id}
			sx={{
				display: 'flex',
				alignItems: 'center',
				mb: 2,
				p: 1,
				borderRadius: 2,
			}}
		>
			<CardMedia
				component="img"
				sx={{
					width: 120,
					height: 120,
					borderRadius: 2,
					mr: 2,
					objectFit: 'cover',
				}}
				image={productImage}
				alt={productName}
			/>

			<CardContent sx={{ flex: 1 }}>
				<Typography variant="h6">{productName}</Typography>

				<Typography color="text.secondary" fontSize="14px">
					Price: {item.price} USD
				</Typography>

				<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
					<IconButton size="small" onClick={handleDecrease}>
						<RemoveIcon />
					</IconButton>

					<Typography px={1}>{item.quantity}</Typography>

					<IconButton size="small" onClick={handleIncrease}>
						<AddIcon />
					</IconButton>
				</Box>
			</CardContent>

			<IconButton color="error" onClick={handleRemove}>
				<DeleteIcon />
			</IconButton>
		</MuiCard>
	);
}, areEqual);
