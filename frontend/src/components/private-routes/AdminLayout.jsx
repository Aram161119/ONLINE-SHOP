import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/selectors';
import { ROLE } from '@/constants/role';
import { checkAccess } from '@/utils';

export const AdminLayout = () => {
	const { user, isAuth, isAuthChecked } = useSelector(selectAuth);
	const location = useLocation();

	if (!isAuthChecked) {
		return null;
	}

	if (!isAuth) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	const roleId = Number(user?.roleId || user?.role || 0);
	const accessRolesArray = [ROLE.ADMIN, ROLE.ROOT];

	if (!checkAccess(accessRolesArray, roleId)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
