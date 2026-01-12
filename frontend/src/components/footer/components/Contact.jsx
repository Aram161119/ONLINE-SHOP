import { Box, Typography, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const contactInfo = [
	{
		icon: PhoneIcon,
		text: '+7 (999) 123-45-67',
		alignItems: 'center',
	},
	{
		icon: EmailIcon,
		text: 'info@shop.ru',
		alignItems: 'center',
	},
	{
		icon: LocationOnIcon,
		text: 'Moscow, Example St., 1',
		alignItems: 'flex-start',
		iconMarginTop: 0.5,
	},
];

export const Contact = () => (
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
			Contact
		</Typography>
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{contactInfo.map((contact, index) => {
				const IconComponent = contact.icon;
				return (
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: contact.alignItems,
							gap: 1,
						}}
					>
						<IconComponent
							sx={{
								color: '#b0b0b0',
								fontSize: 20,
								...(contact.iconMarginTop && {
									mt: contact.iconMarginTop,
								}),
							}}
						/>
						<Typography variant="body2" sx={{ color: '#b0b0b0' }}>
							{contact.text}
						</Typography>
					</Box>
				);
			})}
		</Box>
	</Grid>
);
