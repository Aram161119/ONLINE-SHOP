import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
	IconButton,
	Popover,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
} from '@mui/material';
import { useState } from 'react';

export const ActiveSelectWithPopover = ({ name, options, selectedValues, onChange }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleCheckboxChange = (value) => {
		let newSelected;
		if (selectedValues?.includes(value)) {
			newSelected = selectedValues?.filter((v) => v !== value);
		} else {
			newSelected = [...selectedValues, value];
		}

		onChange(name, newSelected);
	};

	const handleClear = () => {
		onChange(name, '');
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size="small"
				sx={{ ml: 0.5 }}
				onClick={(e) => setAnchorEl(e.currentTarget)}
			>
				<ArrowDropDownIcon fontSize="small" />
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
				<FormGroup sx={{ m: 1, width: 250 }}>
					{options?.map((option) => (
						<FormControlLabel
							key={option.id}
							control={
								<Checkbox
									checked={selectedValues?.includes(option.id)}
									onChange={() => handleCheckboxChange(option.id)}
								/>
							}
							label={option.name}
						/>
					))}
					<Button size="small" onClick={handleClear}>
						Clear
					</Button>
				</FormGroup>
			</Popover>
		</>
	);
};
