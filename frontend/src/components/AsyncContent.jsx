import { Box, Typography, CircularProgress } from '@mui/material';

export const AsyncContent = ({ isLoading = true, error, children }) => {
	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Typography color="error" variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
				{error}
			</Typography>
		);
	}

	return children;
};
