import { Grid, Typography } from '@mui/material';

const aboutText =
	'Your trusted partner in online shopping. We offer a wide range of quality products at affordable prices.';

export const About = () => (
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
			About Us
		</Typography>
		<Typography
			variant="body2"
			sx={{
				color: '#b0b0b0',
				lineHeight: 1.8,
				mb: 2,
			}}
		>
			{aboutText}
		</Typography>
	</Grid>
);
