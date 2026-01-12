import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const NavItem = ({ to, children, sx = {}, ...props }) => {
	return (
		<Link to={to} {...props}>
			<Typography
				sx={{
					textTransform: 'none',
					color: '#000',
					fontSize: '16px',
					...sx,
				}}
			>
				{children}
			</Typography>
		</Link>
	);
};
