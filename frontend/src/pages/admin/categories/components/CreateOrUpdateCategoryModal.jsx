import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControlLabel,
	Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createCategory, editCategory } from '@/redux/actions';
import { useNotification } from '@/context';
import { useEffect } from 'react';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	slug: yup.string(),
	description: yup.string(),
	isActive: yup.boolean(),
});

export const CreateOrUpdateCategoryModal = ({ open, onClose, category }) => {
	const { success, error: showError } = useNotification();
	const isEditMode = !!category;

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			isActive: true,
		},
	});

	useEffect(() => {
		if (category && open) {
			reset({
				name: category.name,
				slug: category.slug,
				description: category.description || '',
				isActive: category.isActive,
			});
		} else if (open && !category) {
			reset({
				name: '',
				slug: '',
				description: '',
				isActive: true,
			});
		}
	}, [category, open, reset]);

	const handleClose = () => {
		onClose();
		reset({
			name: '',
			slug: '',
			description: '',
			isActive: true,
		});
	};

	const onSubmit = async (data) => {
		try {
			if (isEditMode) {
				await dispatch(editCategory(category.id, data));
				success('Category successfully updated!');
			} else {
				await dispatch(createCategory(data));
				success('Category successfully created!');
			}

			handleClose();
		} catch (err) {
			showError(
				err?.message || `Failed to ${isEditMode ? 'update' : 'create'} category`,
			);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle>{isEditMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
			<DialogContent>
				<form id="category-form" onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							mt: 1,
						}}
					>
						<TextField
							fullWidth
							label="Name"
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>

						<TextField
							fullWidth
							label={
								isEditMode
									? 'Slug'
									: 'Slug (optional, auto-generated if empty)'
							}
							{...register('slug')}
							error={!!errors.slug}
							helperText={errors.slug?.message}
						/>

						<TextField
							fullWidth
							multiline
							minRows={3}
							label="Description"
							{...register('description')}
							error={!!errors.description}
							helperText={errors.description?.message}
						/>

						<Controller
							name="isActive"
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Switch
											checked={field.value}
											onChange={field.onChange}
										/>
									}
									label="Active"
								/>
							)}
						/>
					</Box>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit" form="category-form" variant="contained">
					{isEditMode ? 'Update Category' : 'Save Category'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
