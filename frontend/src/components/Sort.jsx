import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';

export const Sort = ({ value, onChange, items, sx }) => (
	<FormControl sx={{ minWidth: 150, height: '100%', ...sx }}>
		<InputLabel>Sort by</InputLabel>

		<Select value={value} label="Sort by" onChange={onChange}>
			<MenuItem value="">None</MenuItem>

			{items.map((item) => (
				<MenuItem key={item.value} value={item.value}>
					{item.name}
				</MenuItem>
			))}
		</Select>
	</FormControl>
);
