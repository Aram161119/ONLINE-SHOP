export const selectAuth = ({ auth }) => ({
	user: auth.user,
	isAuth: auth.isAuth,
	isAuthChecked: auth.isAuthChecked,
});
