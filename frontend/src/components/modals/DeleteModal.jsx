import { Box, Button, Typography, Modal } from '@mui/material';

const style = {
	position: 'absolute',
	top: '40%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'max-content',
	bgcolor: 'background.paper',
	border: '1px solid transparent',
	borderRadius: '8px',
	boxShadow: 24,
	p: '12px 16px',
};

export const DeleteModal = ({ open, onClose, onSubmit, text }) => (
	<Modal
		open={open}
		onClose={onClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<Box sx={style}>
			<Typography id="modal-modal-title" variant="h6">
				{text}
			</Typography>
			<Box
				sx={{
					marginTop: '16px',
					textAlign: 'center',
				}}
			>
				<Button sx={{ marginRight: '8px' }} variant="outlined" onClick={onClose}>
					No
				</Button>
				<Button variant="outlined" color="error" onClick={onSubmit}>
					Yes
				</Button>
			</Box>
		</Box>
	</Modal>
);
