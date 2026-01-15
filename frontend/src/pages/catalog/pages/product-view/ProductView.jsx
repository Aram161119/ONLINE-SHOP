import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	Typography,
	Paper,
	Button,
	IconButton,
	Tooltip,
	Divider,
	Grid,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '@/utils';
import { selectCartItems, selectAuth } from '@/redux/selectors';
import {
	addToCart,
	likeAndUpdateProduct,
	fetchProductById,
	addComment,
} from '@/redux/actions';
import { selectProductById } from '@/redux/selectors';
import { CommentModal } from '@/components';
import { useNotification } from '@/context';
import { CommentsBlock } from './components/CommentsBlock';

export const ProductView = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);
	const { isAuth, user } = useSelector(selectAuth);
	const product = useSelector((state) => selectProductById(state, id));

	const [openCommentModal, setOpenCommentModal] = useState(false);
	const [isSubmittingComment, setIsSubmittingComment] = useState(false);

	const { success, error: showError } = useNotification();

	useEffect(() => {
		dispatch(fetchProductById(id)).catch(() => {
			showError('Product not found!');
			navigate('/catalog');
		});
	}, [id, dispatch, navigate, showError]);

	if (!product) return null;

	const isInCart = cartItems.some((item) => item.id === id);
	const cartItem = cartItems.find((item) => item.id === id);
	const isLiked = product?.likes?.some((l) => l.user === user?.email);
	const commentsCount = product?.comments?.length || 0;

	const handleLikeClick = () => dispatch(likeAndUpdateProduct(id));
	const handleAddToCart = () => dispatch(addToCart(id));

	const handleCommentSubmit = async (commentText) => {
		setIsSubmittingComment(true);
		try {
			await dispatch(addComment(id, commentText));
			success('Comment added successfully!');
			setOpenCommentModal(false);
		} catch (err) {
			showError(err?.message || 'Failed to add comment');
		} finally {
			setIsSubmittingComment(false);
		}
	};

	return (
		<Container maxWidth="lg">
			<Paper sx={{ p: 4, borderRadius: 3 }}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={3}
				>
					<Typography variant="h4" sx={{ fontWeight: 'bold' }}>
						{product.title}
					</Typography>
					<Tooltip title="Back" arrow>
						<IconButton
							onClick={() => navigate(-1)}
							sx={{ color: '#1976d2' }}
						>
							<KeyboardBackspaceIcon sx={{ width: 36, height: 36 }} />
						</IconButton>
					</Tooltip>
				</Box>

				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box sx={{ position: 'relative' }}>
							{isInCart && (
								<Box
									sx={{
										position: 'absolute',
										top: 16,
										right: 16,
										zIndex: 1,
										backgroundColor: 'primary.main',
										color: 'white',
										borderRadius: '50%',
										width: 48,
										height: 48,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '16px',
										fontWeight: 'bold',
										boxShadow: 3,
									}}
								>
									{cartItem?.quantity || 1}
								</Box>
							)}
							<Box
								component="img"
								src={product.image}
								alt={product.title}
								sx={{
									width: '300px',
									height: '300px',
									borderRadius: 2,
									objectFit: 'cover',
								}}
							/>
						</Box>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box>
							<Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
								{product.characters}
							</Typography>

							<Typography
								variant="body1"
								sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}
							>
								{product.description}
							</Typography>

							<Box display="flex" alignItems="center" gap={2} mb={3}>
								<Typography
									variant="h4"
									sx={{ fontWeight: 'bold', color: 'primary.main' }}
								>
									{product.price} $
								</Typography>
								<Button
									variant="contained"
									size="large"
									color={isInCart ? 'success' : 'primary'}
									disabled={!isAuth}
									startIcon={
										isInCart ? (
											<ShoppingCartCheckoutIcon />
										) : (
											<AddShoppingCartIcon />
										)
									}
									onClick={handleAddToCart}
									sx={{ px: 3 }}
								>
									{isInCart ? 'In Cart' : 'Add to Cart'}
								</Button>
							</Box>

							<Box display="flex" gap={2} mb={3}>
								<IconButton
									disabled={!isAuth}
									onClick={handleLikeClick}
									sx={{ border: '1px solid #e0e0e0' }}
								>
									<FavoriteIcon color={isLiked ? 'error' : 'default'} />
									<Typography sx={{ ml: 1 }}>
										{product.likes?.length || 0}
									</Typography>
								</IconButton>

								<IconButton
									disabled={!isAuth}
									onClick={() => setOpenCommentModal(true)}
									sx={{ border: '1px solid #e0e0e0' }}
								>
									<CommentIcon />
									<Typography sx={{ ml: 1 }}>
										{commentsCount}
									</Typography>
								</IconButton>
							</Box>

							<Typography variant="body2" color="text.secondary">
								Created: {formatDate(product.createdAt)}
							</Typography>
							{product.author?.email && (
								<Typography variant="body2" color="text.secondary">
									Author: {product.author?.email}
								</Typography>
							)}
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Box>
					<Typography variant="h6" mb={2}>
						Comments ({commentsCount})
					</Typography>

					<CommentsBlock productId={id} comments={product?.comments} />
				</Box>
			</Paper>

			<CommentModal
				open={openCommentModal}
				onClose={() => setOpenCommentModal(false)}
				onSubmit={handleCommentSubmit}
				isLoading={isSubmittingComment}
			/>
		</Container>
	);
};
