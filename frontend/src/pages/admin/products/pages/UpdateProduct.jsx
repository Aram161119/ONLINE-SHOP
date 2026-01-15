import { useEffect } from 'react';
import { useParams, useNavigate, useNavigationType } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Container,
	Tooltip,
	Box,
	Button,
	TextField,
	Paper,
	Typography,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemText,
	Grid,
	IconButton,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector, useDispatch } from 'react-redux';
import { useNotification } from '@/context';
import { ImageUploader } from '@/components';
import { buildFormData } from '@/builders';
import { editProduct, fetchProductById, fetchCategories } from '@/redux/actions';
import { selectLoading, selectCategories, selectProductById } from '@/redux/selectors';
import { PRICE_RANGE } from '@/constants';

const TEXT_FIELDS = [
	{ name: 'title', label: 'Title' },
	{ name: 'characters', label: 'Characters' },
	{ name: 'description', label: 'Description', multiline: true, rows: 3 },
	{ name: 'price', label: 'Price', type: 'number', step: '0.01' },
];

const schema = yup.object({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	price: yup
		.number()
		.transform((value, originalValue) =>
			originalValue === '' ? undefined : Number(originalValue),
		)
		.typeError('Price must be a number')
		.min(0.01, 'Price must be at least 0.01')
		.max(PRICE_RANGE.max, `Price must be at most ${PRICE_RANGE.max}`)
		.required('Price is required'),
	characters: yup.string().required('Characters are required'),
	image: yup.mixed().nullable(),
	category: yup.string().required('Category is required'),
});

export const UpdateProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const navigationType = useNavigationType();

	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);

	const { error: showError, success } = useNotification();

	const categories = useSelector(selectCategories);
	const product = useSelector((state) => selectProductById(state, id));

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchProductById(id));
				await dispatch(fetchCategories());
			} catch (err) {
				showError(err?.message || 'Product not found!');
				navigate('/catalog');
			}
		};

		if (navigationType !== 'PUSH') {
			fetchData();
		}
	}, []);

	useEffect(() => {
		if (product) {
			reset({
				title: product.title || '',
				description: product.description || '',
				price: product.price || 0,
				characters: product.characters || '',
				image: product.image || null,
				category: product.category?.id || '',
			});
		}
	}, [product, reset]);

	const onSubmit = async (data) => {
		const formData = buildFormData({
			...data,
			...(typeof data.image === 'string' ? {} : { image: data.image }),
		});

		try {
			const updatedProduct = await dispatch(editProduct(id, formData));

			success('Product updated successfully!');
			if (updatedProduct.image) reset({ ...data, image: updatedProduct.image });

			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		} catch (err) {
			showError(err.message || 'Failed to update product');
		}
	};

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" mt={7}>
				<CircularProgress />
			</Box>
		);
	}

	if (!product) return null;

	return (
		<Container maxWidth="md">
			<Paper sx={{ p: 3, borderRadius: 3 }}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h5">Edit Product</Typography>
					<Tooltip title="Back" arrow>
						<IconButton onClick={() => navigate(-1)} color="primary">
							<KeyboardBackspaceIcon fontSize="large" />
						</IconButton>
					</Tooltip>
				</Box>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid item xs={12} mt={2}>
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<ImageUploader
									value={
										field.value instanceof File
											? URL.createObjectURL(field.value)
											: field.value || product?.image
									}
									onChange={field.onChange}
									width="100%"
									height={'400px'}
								/>
							)}
						/>
						{errors.image && (
							<Typography color="error" mt={1} fontSize={14}>
								{errors.image.message}
							</Typography>
						)}
					</Grid>
					{TEXT_FIELDS.map(({ name, label, type, multiline, rows, step }) => (
						<TextField
							key={name}
							label={label}
							fullWidth
							margin="normal"
							type={type || 'text'}
							multiline={multiline}
							minRows={rows}
							inputProps={{ step: '0.01' }}
							{...register(name)}
							error={!!errors[name]}
							helperText={errors[name]?.message}
						/>
					))}
					<FormControl fullWidth margin="normal" error={!!errors.category}>
						<InputLabel>Category</InputLabel>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									label="Category"
									value={field.value || ''}
									displayEmpty
								>
									{categories
										.filter((c) => c.isActive)
										.map((cat) => (
											<MenuItem key={cat.id} value={String(cat.id)}>
												{cat.name}
											</MenuItem>
										))}
								</Select>
							)}
						/>
						{errors.category && (
							<Typography color="error" fontSize={12} mt={0.5} ml={1.5}>
								{errors.category.message}
							</Typography>
						)}
					</FormControl>
					<Divider sx={{ my: 3 }} />
					<Box mb={3}>
						<Typography variant="h6">Likes</Typography>
						<Typography
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								background: '#f5f5f5',
								p: 1,
								borderRadius: 1,
								fontSize: 18,
							}}
						>
							<FavoriteBorderIcon />{' '}
							{Array.isArray(product.likes)
								? product.likes.length
								: product.likes || 0}
						</Typography>
					</Box>
					<Box mb={3}>
						<Typography variant="h6">Comments</Typography>
						{product.comments.length === 0 ? (
							<Typography sx={{ color: 'gray' }}>
								No comments yet
							</Typography>
						) : (
							<List sx={{ background: '#fafafa', borderRadius: 2 }}>
								{product.comments.map((comment) => (
									<ListItem key={comment.id || comment.text} divider>
										<ListItemText
											primary={comment.text}
											secondary={comment.author}
										/>
									</ListItem>
								))}
							</List>
						)}
					</Box>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{ py: 1.5 }}
						disabled={!isValid || isSubmitting}
					>
						{isSubmitting ? <CircularProgress size={22} /> : 'Save Changes'}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};
