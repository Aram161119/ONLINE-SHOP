import { useState } from 'react';
import {
	Box,
	Button,
	Typography,
	Modal,
	TextField,
	CircularProgress,
} from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid transparent',
	borderRadius: '16px',
	boxShadow: 24,
	p: 3,
};

export const CommentModal = ({ open, onClose, onSubmit, isLoading }) => {
	const [comment, setComment] = useState('');

	const handleSubmit = () => {
		if (comment.trim()) {
			onSubmit(comment.trim());
			setComment('');
		}
	};

	const handleClose = () => {
		setComment('');
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="comment-modal-title"
			aria-describedby="comment-modal-description"
		>
			<Box sx={style}>
				<Typography id="comment-modal-title" variant="h6" mb={2}>
					Add Comment
				</Typography>
				<TextField
					fullWidth
					multiline
					minRows={4}
					placeholder="Write your comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					disabled={isLoading}
					sx={{ mb: 2 }}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
					<Button variant="outlined" onClick={handleClose} disabled={isLoading}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={handleSubmit}
						disabled={isLoading || !comment.trim()}
					>
						{isLoading ? <CircularProgress size={20} /> : 'Submit'}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
