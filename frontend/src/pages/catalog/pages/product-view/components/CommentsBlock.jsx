import {
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
	Avatar,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '@/utils';
import { deleteComment } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/context';
import { selectAuth } from '@/redux/selectors';

export const CommentsBlock = ({ productId, comments }) => {
	const dispatch = useDispatch();
	const { isAuth, user } = useSelector(selectAuth);

	const { success, error: showError } = useNotification();

	if (!comments || comments?.length === 0) {
		return (
			<Typography sx={{ color: 'gray', textAlign: 'center', py: 4 }}>
				No comments yet. Be the first to comment!
			</Typography>
		);
	}

	const handleCommentDelete = async (commentId) => {
		try {
			await dispatch(deleteComment(productId, commentId));
			success('Comment removed successfully!');
		} catch (err) {
			showError(err?.message || 'Failed to delete comment');
		}
	};

	return (
		<List sx={{ background: '#fafafa', borderRadius: 2 }}>
			{comments.map((comment) => (
				<ListItem key={comment.id} divider>
					<Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
						{comment.author?.[0]?.toUpperCase() || 'U'}
					</Avatar>
					<ListItemText
						primary={comment.text}
						secondary={
							<Box
								justifyContent="space-between"
								display="flex"
								alignItems="center"
							>
								<Box>
									<Typography variant="caption" color="text.secondary">
										{comment.author || 'Anonymous'}
									</Typography>
									{comment.createdAt && (
										<Typography
											variant="caption"
											color="text.secondary"
											sx={{ ml: 1 }}
										>
											• {formatDate(comment.createdAt)}
										</Typography>
									)}
								</Box>

								<IconButton
									color="error"
									disabled={user.email !== comment.author || !isAuth}
									onClick={() => handleCommentDelete(comment.id)}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						}
						secondaryTypographyProps={{
							component: 'div',
						}}
					/>
				</ListItem>
			))}
		</List>
	);
};
