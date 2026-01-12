import { Box, Typography } from '@mui/material';

export const Error = ({ error }) =>
	error && (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 4,
				gap: 1,
			}}
		>
			<Typography variant="h5">Error</Typography>
			<Typography color="error" variant="h6" sx={{ textAlign: 'center' }}>
				{error}
			</Typography>
		</Box>
	);
