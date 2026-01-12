import { Typography, Container, Paper } from '@mui/material';

export const Home = () => (
	<Container maxWidth="md" sx={{ py: 4 }}>
		<Typography variant="h4" fontWeight="bold" mb={3}>
			E-Commerce Store — Study Project
		</Typography>

		<Typography variant="body1" sx={{ mb: 4 }}>
			This project is a fully functional e-commerce application featuring a product
			catalog, shopping cart, checkout system, and user account. This page is
			created to describe the structure and functionality of the application.
		</Typography>

		<Paper sx={{ p: 3, mb: 3 }}>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Target Audience
			</Typography>
			<Typography>
				Busy people who want to quickly find and order products, appreciate
				convenience, simplicity, and fast performance of the service.
			</Typography>
		</Paper>

		<Paper sx={{ p: 3, mb: 3 }}>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Why This Project Was Chosen
			</Typography>
			<Typography>
				This project is practical and modern. It is ideal for building a portfolio
				and showcasing skills in: React development API integration Routing Layout
				and styling Material UI (MUI)
			</Typography>
		</Paper>

		<Paper sx={{ p: 3, mb: 3 }}>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Application Features
			</Typography>
			<ul>
				<li>User registration and login</li>
				<li>Product catalog with filtering and search</li>
				<li>
					Product detail page (description, photos, characteristics, reviews)
				</li>
				<li>Shopping cart</li>
				<li>Checkout (delivery info, payment method)</li>
				<li>User account (profile, order history)</li>
				<li>Admin panel (adding/editing products)</li>
			</ul>
		</Paper>

		<Paper sx={{ p: 3, mb: 3 }}>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Main Pages of the Project
			</Typography>
			<ul>
				Admin Panel (optional)
				<li>Home Page – information about the project</li>
				<li>Catalog – product list with filters</li>
				<li>Product Page – item details</li>
				<li>Cart – selected products, total amount</li>
				<li>Checkout – delivery info, confirmation</li>
				<li>User Profile – personal data, history of orders</li>
				<li>Login / Registration</li>
			</ul>
		</Paper>
	</Container>
);
