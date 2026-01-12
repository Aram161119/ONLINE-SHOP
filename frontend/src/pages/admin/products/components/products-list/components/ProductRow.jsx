import { TableCell, TableRow, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '@/utils';
import { selectUser } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { ROLE } from '@/constants';

export const ProductRow = ({ product, onEdit, onDelete }) => {
	const currentUser = useSelector(selectUser);
	return (
		<TableRow key={product.id} hover>
			<TableCell sx={{ width: 'max-content', wordBreak: 'break-word' }}>
				{product.title}
			</TableCell>
			<TableCell sx={{ width: 'max-content', wordBreak: 'break-word' }}>
				{product.characters}
			</TableCell>
			<TableCell sx={{ width: 'max-content' }}>{product.price}</TableCell>
			<TableCell sx={{ width: 'max-content' }}>
				{product.category?.name || '-'}
			</TableCell>
			<TableCell sx={{ width: 'max-content' }}>
				{product.likes?.length || 0}
			</TableCell>
			<TableCell sx={{ width: 'max-content' }}>{product.comments.length}</TableCell>
			<TableCell sx={{ width: 'max-content' }}>
				<Box mt={2}>
					<img
						src={product.image}
						alt="Preview"
						style={{
							width: 50,
							height: 50,
							objectFit: 'cover',
							borderRadius: 8,
						}}
					/>
				</Box>
			</TableCell>
			<TableCell sx={{ width: 'max-content' }}>{product.author.email}</TableCell>
			<TableCell sx={{ width: 'max-content' }}>
				{formatDate(product.createdAt)}
			</TableCell>
			<TableCell align="right">
				<Box display={'flex'}>
					<IconButton
						disabled={
							currentUser.id !== product.author.id &&
							currentUser.roleId !== ROLE.ROOT
						}
						color="primary"
						onClick={onEdit}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						disabled={
							currentUser.id !== product.author.id &&
							currentUser.roleId !== ROLE.ROOT
						}
						color="error"
						onClick={onDelete}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</TableCell>
		</TableRow>
	);
};
