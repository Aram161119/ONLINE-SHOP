import { useState, useCallback } from 'react';
import {
	CardActions,
	Card as MuiCard,
	Typography,
	CardContent,
	IconButton,
	Box,
	Tooltip,
	CardMedia,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectIsAuth,
	selectCartItems,
	selectProductById,
	selectUserEmail,
} from '@/redux/selectors';
import { CommentModal } from '@/components';
import { useNotification } from '@/context';
import { likeAndUpdateProduct, addToCart, addComment } from '@/redux/actions';

export const Card = ({ productId }) => {
	const [openCommentModal, setOpenCommentModal] = useState(false);
	const [isSubmittingComment, setIsSubmittingComment] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { success, error: showError } = useNotification();

	const { product, cartItems, userEmail, isAuth } = useSelector((state) => ({
		product: selectProductById(state, productId),
		cartItems: selectCartItems(state),
		userEmail: selectUserEmail(state),
		isAuth: selectIsAuth(state),
	}));

	if (!product) return null;

	const isInCart = cartItems.some((item) => item.id === productId);
	const cartItem = cartItems.find((item) => item.id === productId);
	const isLiked = product.likes?.some((like) => like.user === userEmail);

	const handleLikeClick = () => dispatch(likeAndUpdateProduct(productId));
	const handleAddToCart = () => dispatch(addToCart(productId));

	const handleCommentSubmit = async (commentText) => {
		setIsSubmittingComment(true);
		try {
			await dispatch(addComment(productId, commentText));
			success('Comment added successfully!');
			setOpenCommentModal(false);
		} catch (err) {
			showError(err?.message || 'Failed to add comment');
		} finally {
			setIsSubmittingComment(false);
		}
	};

	return (
		<MuiCard
			sx={{
				minWidth: 275,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box sx={{ position: 'relative' }}>
				{isInCart && (
					<Box
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							zIndex: 1,
							backgroundColor: 'primary.main',
							color: 'white',
							borderRadius: '50%',
							width: 32,
							height: 32,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 12,
							fontWeight: 'bold',
							boxShadow: 2,
						}}
					>
						{cartItem?.quantity || 1}
					</Box>
				)}
				<CardMedia
					component="img"
					height="180"
					image={product.image}
					alt={product.title}
					sx={{ objectFit: 'cover' }}
				/>

				<CardContent sx={{ minHeight: 120 }}>
					<Box display="flex" justifyContent="space-between" mb={1}>
						<Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
							{product.title}
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							{formatDate(product.createdAt)}
						</Typography>
					</Box>

					{product.category && (
						<Typography
							sx={{
								color: 'primary.main',
								fontSize: 12,
								mb: 1,
								fontWeight: 500,
							}}
						>
							{product.category.name}
						</Typography>
					)}

					<Typography
						variant="h6"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 1,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{product.characters}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{product.description}
					</Typography>
				</CardContent>
			</Box>

			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Box>
					<IconButton disabled={!isAuth} onClick={handleLikeClick}>
						<FavoriteIcon color={isLiked ? 'error' : 'default'} />
						<Typography
							sx={{
								position: 'absolute',
								fontSize: 10,
								right: 5,
								bottom: 5,
							}}
						>
							{product.likes?.length || 0}
						</Typography>
					</IconButton>

					<IconButton
						disabled={!isAuth}
						onClick={() => setOpenCommentModal(true)}
					>
						<CommentIcon />
						<Typography
							sx={{
								position: 'absolute',
								fontSize: 10,
								right: 3,
								bottom: 5,
							}}
						>
							{product.comments?.length || 0}
						</Typography>
					</IconButton>
				</Box>

				<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					{product.price} $
					<Tooltip
						title={isInCart ? 'In cart' : 'Add to cart'}
						sx={{ cursor: 'pointer' }}
					>
						{isInCart ? (
							<IconButton
								disabled={!isAuth}
								color="success"
								onClick={handleAddToCart}
							>
								<ShoppingCartCheckoutIcon />
							</IconButton>
						) : (
							<IconButton
								disabled={!isAuth}
								color="primary"
								onClick={handleAddToCart}
							>
								<AddShoppingCartIcon />
							</IconButton>
						)}
					</Tooltip>
				</Typography>

				<Tooltip title="View details">
					<IconButton onClick={() => navigate(`/catalog/${product.id}`)}>
						<ArrowForwardIcon />
					</IconButton>
				</Tooltip>
			</CardActions>

			<CommentModal
				open={openCommentModal}
				onClose={() => setOpenCommentModal(false)}
				onSubmit={handleCommentSubmit}
				isLoading={isSubmittingComment}
			/>
		</MuiCard>
	);
};
