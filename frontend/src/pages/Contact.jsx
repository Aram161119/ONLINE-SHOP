import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const Contact = () => {
	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Box sx={{ width: '100%' }}>
				<Typography variant="h4" fontWeight="bold" mb={3}>
					Contact Us
				</Typography>

				<Typography variant="body1" mb={3}>
					If you have any questions, need support, or want to collaborate — feel
					free to contact us using the information below.
				</Typography>

				<Card elevation={3} sx={{ borderRadius: 3 }}>
					<CardContent>
						<Stack spacing={2}>
							<Stack direction="row" spacing={2} alignItems="center">
								<EmailIcon color="primary" />
								<Typography>Email: support@example.com</Typography>
							</Stack>

							<Stack direction="row" spacing={2} alignItems="center">
								<PhoneIcon color="primary" />
								<Typography>Phone: +1 (234) 567-89-00</Typography>
							</Stack>

							<Stack direction="row" spacing={2} alignItems="center">
								<AccessTimeIcon color="primary" />
								<Typography>
									Working hours: Mon–Fri, 09:00–18:00
								</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</Card>

				<Typography variant="body2" mt={3} color="text.secondary">
					We usually reply within 24 hours. Thank you for choosing our shop!
				</Typography>
			</Box>
		</Container>
	);
};
