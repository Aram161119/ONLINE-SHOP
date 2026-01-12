import { NavItem } from './NavItem';

export const UserLinks = () => {
	return (
		<>
			<NavItem to="/">Home</NavItem>
			<NavItem to="/catalog">Catalog</NavItem>
			<NavItem to="/contact">Contact</NavItem>
		</>
	);
};
