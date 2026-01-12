import { Box } from '@mui/material';

export const AuthFormError = ({ children }) => (
	<Box
		sx={{
			backgroundColor: '#fcadad',
			fontSize: '18px',
			margin: '10px 0 0',
			padding: '10px',
		}}
	>
		{children ?? 'An unexpected error occurred. Please try again later.'}
	</Box>
);
