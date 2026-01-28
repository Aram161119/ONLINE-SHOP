import { AuthFormError } from '@/components';
import { selectIsAuth, selectAuthError, selectLoading } from '@/redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
	Box,
	Button,
	TextField,
	Typography,
	Link,
	CircularProgress,
} from '@mui/material';
import { login, fetchCart } from '@/redux/actions';
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
		.min(4, 'Password must be at least 4 characters')
		.max(30, 'Password must be at most 30 characters'),
});

export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
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
			await dispatch(login(email, password));
			reset();

			const returnPath = location?.state?.from?.pathname || '/';
			navigate(returnPath, { replace: true });

			dispatch(fetchCart());
			success('Successfully registered!');
		} catch (err) {
			showError(err.message || 'Something went wrong!');
		}
	};

	const formError = errors?.email?.message || errors?.password?.message;
	const errorMessage = authError || formError;

	if (isAuth) {
		const returnPath = location?.state?.from?.pathname || '/';
		return <Navigate to={returnPath} replace />;
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
				Login
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

				<Button type="submit" variant="contained" disabled={!!formError}>
					Sign In
				</Button>

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

				<Link
					component={RouterLink}
					to="/register"
					align="center"
					mt={2}
					sx={{ textDecoration: 'underline', fontSize: 16 }}
				>
					Registration
				</Link>
			</Box>
		</Box>
	);
};
