import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Header, AdminLayout, Footer } from '@/components';
import {
	Home,
	Contact,
	Login,
	Register,
	Products,
	Cart,
	Catalog,
	Users,
	UpdateProduct,
	NotFound,
	ProductView,
	Profile,
	Categories,
} from '@/pages';
import { Layout } from './components/Layout';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser, fetchCart, setAuthChecked } from '@/redux/actions';

function Shop() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const userData = JSON.parse(sessionStorage.getItem('userData'));

		if (userData) {
			dispatch(
				setUser({
					...userData,
					roleId: Number(userData.roleId),
				}),
			);

			dispatch(fetchCart());
		} else {
			dispatch(setAuthChecked());
		}
	}, [dispatch]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />

			<Box sx={{ flex: 1 }}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/catalog" element={<Catalog />} />
						<Route path="/catalog/:id" element={<ProductView />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/profile" element={<Profile />} />
					</Route>

					<Route path="/cart" element={<Cart />} />

					<Route path="admin" element={<AdminLayout />}>
						<Route path="products" index element={<Products />} />
						<Route path="categories" element={<Categories />} />
						<Route path="products/update/:id" element={<UpdateProduct />} />
						<Route path="users" element={<Users />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>

			<Footer />
		</Box>
	);
}

export default Shop;
