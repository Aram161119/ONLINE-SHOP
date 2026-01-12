import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@/components';

export const ProductHeader = ({
	searchPhrase,
	onSearch,
	onClear,
	onCreateClick,
}) => {
	return (
		<Box display="flex" justifyContent="space-between">
			<Search
				value={searchPhrase}
				onChange={onSearch}
				onClear={onClear}
				sx={{ marginBottom: '15px' }}
			/>
			<Button
				sx={{ marginBottom: '16px' }}
				color="primary"
				variant="outlined"
				onClick={onCreateClick}
			>
				<AddIcon />
				Add new Product
			</Button>
		</Box>
	);
};

