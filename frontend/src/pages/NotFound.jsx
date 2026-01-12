import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
	return (
		<Container
			width="md"
			sx={{
				textAlign: 'center',
			}}
		>
			<Typography variant="h1" fontWeight={700} sx={{ mb: 2 }}>
				404
			</Typography>

			<Typography variant="h5" sx={{ mb: 1 }}>
				Page not found
			</Typography>

			<Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
				The page you are looking for does not exist or has been moved.
			</Typography>

			<Button
				variant="contained"
				component={Link}
				to="/"
				sx={{
					textTransform: 'none',
					background: '#000',
					borderRadius: '30px',
					px: 3,
					'&:hover': { background: '#333' },
				}}
			>
				Go Home
			</Button>
		</Container>
	);
};
