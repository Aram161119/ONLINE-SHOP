import { Box, Pagination, Typography } from '@mui/material';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { selectProductsList, selectProductsLastPage } from '@/redux/selectors';
import { useMemo } from 'react';

const EmptyProducts = () => (
	<Typography sx={{ textAlign: 'center', mt: 5 }}>No products yet.</Typography>
);

export const ProductsGrid = ({ currentPage, onPageChange }) => {
	const productsIds = useSelector(selectProductsList);
	const lastPage = useSelector(selectProductsLastPage);

	const cards = useMemo(
		() => productsIds.map((id) => <Card key={id} productId={id} />),
		[productsIds],
	);

	if (!productsIds.length) return <EmptyProducts />;

	return (
		<>
			<Box
				sx={{
					display: 'grid',
					gap: 4,
					gridTemplateColumns: {
						xs: '1fr',
						sm: '1fr 1fr',
						md: '1fr 1fr 1fr',
					},
				}}
			>
				{cards}
			</Box>

			<Pagination
				sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
				count={lastPage}
				page={currentPage}
				onChange={(_, value) => onPageChange(value)}
				variant="outlined"
				color="primary"
			/>
		</>
	);
};
