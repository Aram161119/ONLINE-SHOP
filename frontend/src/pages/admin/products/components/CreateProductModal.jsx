import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { buildFormData } from '@/builders';
import { useNotification } from '@/context';
import { ImageUploader } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '@/redux/actions';
import { PRICE_RANGE } from '@/constants';
import { selectCategories } from '@/redux/selectors';

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	characters: yup.string().required('Characters are required'),
	price: yup
		.number()
		.typeError('Price must be a number')
		.min(PRICE_RANGE.min, `Price must be at least ${PRICE_RANGE.min}`)
		.max(PRICE_RANGE.max, `Price must be at most ${PRICE_RANGE.max}`)
		.required('Price is required'),
	description: yup.string().required('Description is required'),
	image: yup.mixed().required('Image is required'),
	category: yup.string().required('Category is required'),
});

export const CreateProductModal = ({ open, onClose }) => {
	const { success, error: showError } = useNotification();
	const dispatch = useDispatch();

	const categories = useSelector(selectCategories);

	const handleClose = () => {
		onClose();
		reset();
	};

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			title: '',
			characters: '',
			description: '',
			price: 0,
			image: null,
			category: '',
		},
	});

	const onSubmit = async (data) => {
		const formData = buildFormData(data);

		await dispatch(createProduct(formData))
			.then(() => {
				success('Product successfully created!');
			})
			.catch((error) => {
				showError(error.message);
			});
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
			<DialogTitle>Add Product</DialogTitle>

			<DialogContent>
				<form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} direction="column">
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Title"
								{...register('title')}
								error={!!errors.title}
								helperText={errors.title?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Characters"
								{...register('characters')}
								error={!!errors.characters}
								helperText={errors.characters?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								multiline
								minRows={4}
								label="Description"
								{...register('description')}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Price"
								type="number"
								{...register('price')}
								error={!!errors.price}
								helperText={errors.price?.message}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth error={!!errors.category}>
								<InputLabel>Category</InputLabel>
								<Controller
									name="category"
									control={control}
									render={({ field }) => (
										<Select {...field} label="Category">
											{categories.length === 0 ? (
												<MenuItem disabled>
													<CircularProgress size={20} />
												</MenuItem>
											) : (
												categories
													.filter((cat) => cat.isActive)
													.map((category) => (
														<MenuItem
															key={category.id}
															value={category.id}
														>
															{category.name}
														</MenuItem>
													))
											)}
										</Select>
									)}
								/>
								{errors.category && (
									<Typography
										color="error"
										fontSize={12}
										mt={0.5}
										ml={1.5}
									>
										{errors.category.message}
									</Typography>
								)}
							</FormControl>
						</Grid>

						<Box mt={3}>
							<Controller
								name="image"
								control={control}
								render={({ field }) => (
									<ImageUploader
										value={
											field.value
												? URL.createObjectURL(field.value)
												: null
										}
										onChange={(file) => field.onChange(file)}
										label="Upload Image"
										width={'100%'}
										height={300}
									/>
								)}
							/>

							{errors.image && (
								<Typography color="error" mt={1} fontSize={14}>
									{errors.image.message}
								</Typography>
							)}
						</Box>
					</Grid>
				</form>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					disabled={!isValid || isSubmitting}
					type="submit"
					form="create-product-form"
					variant="contained"
				>
					Save Product
				</Button>
			</DialogActions>
		</Dialog>
	);
};
