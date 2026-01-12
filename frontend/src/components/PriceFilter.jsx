import { useState } from 'react';
import {
	Box,
	Button,
	Popover,
	Slider,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { PRICE_RANGE } from '@/constants';

export const PriceFilter = ({
	value = [PRICE_RANGE.min, PRICE_RANGE.max],
	onChange,
	min = PRICE_RANGE.min,
	max = PRICE_RANGE.max,
	sx = {},
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [draft, setDraft] = useState(value);

	const openPopover = (event) => {
		setDraft(value);
		setAnchorEl(event.currentTarget);
	};

	const closePopover = () => setAnchorEl(null);

	const applyAndClose = () => {
		onChange(draft);
		closePopover();
	};

	const clearAndClose = () => {
		onChange([PRICE_RANGE.min, PRICE_RANGE.max]);
		closePopover();
	};

	const [minVal, maxVal] = draft;

	const handleSlider = (e, newValue) => setDraft(newValue);

	const handleMinInput = (e) => {
		const v = Number(e.target.value);
		if (v <= maxVal) setDraft([v, maxVal]);
	};

	const handleMaxInput = (e) => {
		const v = Number(e.target.value);
		if (v >= minVal) setDraft([minVal, v]);
	};

	return (
		<>
			<PriceButton value={value} onClick={openPopover} />

			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={closePopover}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<Box sx={{ p: 2, width: 250 }}>
					<Typography variant="subtitle2" mb={1}>
						Select Price Range
					</Typography>

					<Slider value={draft} onChange={handleSlider} min={min} max={max} />

					<Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
						<TextField
							label="Min"
							size="small"
							type="number"
							value={minVal}
							onChange={handleMinInput}
							fullWidth
						/>

						<TextField
							label="Max"
							size="small"
							type="number"
							value={maxVal}
							onChange={handleMaxInput}
							fullWidth
						/>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						<Button onClick={clearAndClose} variant="outlined" size="small">
							Clear
						</Button>
						<Button onClick={applyAndClose} variant="contained" size="small">
							Apply
						</Button>
					</Box>
				</Box>
			</Popover>
		</>
	);
};

const PriceButton = ({
	value = [PRICE_RANGE.min, PRICE_RANGE.max],
	onClick,
	sx,
	...props
}) => {
	const theme = useTheme();

	const isDefaultRange =
		Array.isArray(value) &&
		value[0] === PRICE_RANGE.min &&
		value[1] === PRICE_RANGE.max;

	const buttonStyles = {
		ml: 3,
		border: '1px solid rgba(0,0,0,0.23)',
		borderColor: !isDefaultRange ? theme.palette.primary.main : undefined,
		boxShadow: !isDefaultRange
			? `0 0 0 2px ${theme.palette.primary.main}33`
			: undefined,
		...sx,
	};

	const textColor = !isDefaultRange
		? theme.palette.primary.main
		: theme.palette.text.secondary;

	return (
		<Button variant="outlined" onClick={onClick} sx={buttonStyles} {...props}>
			<Typography variant="body2" sx={{ color: textColor }}>
				Price: {value[0]} – {value[1]}
			</Typography>
		</Button>
	);
};
