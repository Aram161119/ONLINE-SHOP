import { AuthFormError } from '@/components';
import { selectIsAuth, selectLoading, selectAuthError } from '@/redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { register as registerAction } from '@/redux/actions';
import {
	Box,
	Button,
	TextField,
	Typography,
	Link,
	CircularProgress,
} from '@mui/material';
import { useNotification } from '@/context';

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.email('Email must be a valid email address'),

	password: yup
		.string()
		.required('Password is required')
		.matches(/^[\w#%]+$/, 'Password can only contain letters, numbers, _, #, %')
		.min(4, 'Password must be at least 6 characters')
		.max(30, 'Password must be at most 30 characters'),

	confirm_password: yup
		.string()
		.required('Password check is required')
		.oneOf([yup.ref('password'), null], 'Passwords not match!'),
});

export const Register = () => {
	const dispatch = useDispatch();

	const isAuth = useSelector(selectIsAuth);
	const authError = useSelector(selectAuthError);
	const isLoading = useSelector(selectLoading);

	const { error: showError, success } = useNotification();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = async ({ email, password }) => {
		try {
			await dispatch(registerAction(email, password));
			reset();
			success('Successfully registered!');
		} catch (error) {
			showError(error.message || 'Something went wrong!');
		}
	};

	const formError =
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirm_password?.message;

	const errorMessage = formError || authError;

	if (isAuth) {
		return <Navigate to="/" />;
	}

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" mt={7}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column" alignItems="center" mt={5}>
			<Typography variant="h4" component="h2" mb={3}>
				Sign up
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				display="flex"
				flexDirection="column"
				width={280}
				gap={2}
			>
				<TextField
					label="Email"
					variant="outlined"
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>

				<TextField
					label="Password"
					type="password"
					variant="outlined"
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<TextField
					label="Confirm password"
					type="password"
					variant="outlined"
					{...register('confirm_password')}
					error={!!errors.confirm_password}
					helperText={errors.confirm_password?.message}
				/>

				<Button type="submit" variant="contained" disabled={!!formError}>
					Sign up
				</Button>

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

				<Link
					component={RouterLink}
					to="/login"
					align="center"
					mt={2}
					sx={{ textDecoration: 'underline', fontSize: 16 }}
				>
					Login
				</Link>
			</Box>
		</Box>
	);
};
