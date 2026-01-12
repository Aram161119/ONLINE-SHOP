import { TableCell as MuiTableCell, TableSortLabel } from '@mui/material';
import { ActiveSelectWithPopover, ActiveSearchWithPopover } from '@/components';

export const TableCell = ({
	col,
	orderBy = null,
	order = null,
	searchValue = '',
	handleSortChange,
	handleSearchChange,
	handleOptionalChange,
	sx = {},
}) => (
	<MuiTableCell
		sx={{
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			...sx,
		}}
	>
		{col?.sortable === false ? (
			col.label
		) : (
			<TableSortLabel
				active={orderBy === col.id}
				direction={orderBy === col.id ? order : 'asc'}
				onClick={() => handleSortChange(col.id)}
			>
				{col.label}
			</TableSortLabel>
		)}

		{col?.searchable && (
			<ActiveSearchWithPopover
				name={col.id}
				value={searchValue || ''}
				onChange={handleSearchChange}
			/>
		)}

		{col?.dropdown_search && (
			<ActiveSelectWithPopover
				name={col.id}
				options={col.options}
				selectedValues={col.selectedValues}
				onChange={handleOptionalChange}
			/>
		)}
	</MuiTableCell>
);
