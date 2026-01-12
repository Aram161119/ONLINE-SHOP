import { Box, Container, Grid, Typography } from '@mui/material';
import { Navigation, About, Contact, SocialIcons } from './components';

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: '#1a1a1a',
				color: '#fff',
				mt: 6,
				pt: 3,
				pb: 3,
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<About />
					<Navigation />
					<Contact />
					<SocialIcons />
				</Grid>

				<Typography
					variant="body2"
					sx={{
						mt: 4,
						pt: 3,
						borderTop: '1px solid #333',
						color: '#b0b0b0',
					}}
				>
					© {currentYear} Online Shop. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
};
