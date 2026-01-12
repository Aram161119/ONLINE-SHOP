import { IconButton, Popover, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const ActiveSearchWithPopover = ({ name, value, onChange }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	return (
		<>
			<IconButton
				size="small"
				sx={{ ml: 0.5 }}
				onClick={(e) => setAnchorEl(e.currentTarget)}
			>
				<SearchIcon fontSize="small" />
			</IconButton>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<TextField
					size="small"
					autoFocus
					placeholder={`Search ${name}`}
					value={value}
					onChange={(e) => onChange(name, e.target.value)}
					sx={{ m: 1, width: 200 }}
				/>
			</Popover>
		</>
	);
};
