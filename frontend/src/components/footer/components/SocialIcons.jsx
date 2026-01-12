import { Box, Typography, IconButton, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const socialLinks = [
	{
		icon: FacebookIcon,
		href: 'https://facebook.com',
		hoverColor: '#1877f2',
	},
	{
		icon: InstagramIcon,
		href: 'https://instagram.com',
		hoverColor: '#e4405f',
	},
	{
		icon: TwitterIcon,
		href: 'https://twitter.com',
		hoverColor: '#1da1f2',
	},
];

export const SocialIcons = () => (
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
			Follow Us
		</Typography>
		<Box sx={{ display: 'flex', gap: 1 }}>
			{socialLinks.map((social, index) => {
				const IconComponent = social.icon;
				return (
					<IconButton
						key={index}
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							color: '#b0b0b0',
							border: '1px solid #b0b0b0',
							transition: 'all 0.3s ease',
							'&:hover': {
								color: social.hoverColor,
								borderColor: social.hoverColor,
								transform: 'translateY(-2px)',
							},
						}}
					>
						<IconComponent />
					</IconButton>
				);
			})}
		</Box>
	</Grid>
);
