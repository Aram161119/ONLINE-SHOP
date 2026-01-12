import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export const Search = ({
	value,
	onChange,
	onClear,
	placeholder = 'Search...',
	width = 300,
	sx = {},
}) => {
	const showClear = Boolean(value);

	return (
		<Box
			sx={{
				width,
				...sx,
			}}
		>
			<TextField
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{showClear ? (
								<IconButton size="small" onClick={onClear}>
									<CloseIcon />
								</IconButton>
							) : (
								<SearchIcon sx={{ color: '#8d8d8d' }} />
							)}
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};
