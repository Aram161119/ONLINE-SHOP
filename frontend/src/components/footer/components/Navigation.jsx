import { Box, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const navigationLinks = [
	{ to: '/', label: 'Home' },
	{ to: '/catalog', label: 'Catalog' },
	{ to: '/contact', label: 'Contact' },
];

export const Navigation = () => (
	<Grid item xs={12} sm={6} md={3}>
		<Typography
			variant="h6"
			sx={{
				fontWeight: 'bold',
				mb: 2,
				color: '#fff',
				textTransform: 'uppercase',
				letterSpacing: 1,
			}}
		>
			Navigation
		</Typography>
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
			{navigationLinks.map((link) => (
				<Link
					key={link.to}
					component={RouterLink}
					to={link.to}
					sx={{
						color: '#b0b0b0',
						textDecoration: 'none',
						transition: 'color 0.3s ease',
						'&:hover': {
							color: '#fff',
						},
					}}
				>
					{link.label}
				</Link>
			))}
		</Box>
	</Grid>
);
