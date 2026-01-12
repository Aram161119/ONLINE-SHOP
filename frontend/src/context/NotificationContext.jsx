import { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';

const NotificationContext = createContext();

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('useNotification must be used within NotificationProvider');
	}
	return context;
};

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	const removeNotification = useCallback((id) => {
		setNotifications((prev) => prev.filter((notif) => notif.id !== id));
	}, []);

	const addNotification = useCallback(
		(message, severity = 'info', duration = 4000) => {
			const id = Math.random().toString(36).substr(2, 9);
			const notification = { id, message, severity, duration };

			setNotifications((prev) => [...prev, notification]);

			// Auto-remove notification after duration
			if (duration > 0) {
				setTimeout(() => {
					removeNotification(id);
				}, duration);
			}

			return id;
		},
		[removeNotification],
	);

	const success = useCallback(
		(message, duration) => addNotification(message, 'success', duration),
		[addNotification],
	);

	const error = useCallback(
		(message, duration) => addNotification(message, 'error', duration),
		[addNotification],
	);

	const warning = useCallback(
		(message, duration) => addNotification(message, 'warning', duration),
		[addNotification],
	);

	const info = useCallback(
		(message, duration) => addNotification(message, 'info', duration),
		[addNotification],
	);

	const value = {
		notifications,
		addNotification,
		removeNotification,
		success,
		error,
		warning,
		info,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
			<Stack
				spacing={1}
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
					zIndex: 9999,
					maxWidth: 360,
				}}
			>
				{notifications.map((notification) => (
					<Snackbar
						key={notification.id}
						open={true}
						autoHideDuration={notification.duration}
						onClose={() => removeNotification(notification.id)}
						sx={{
							position: 'relative',
							bottom: 'auto',
							right: 'auto',
						}}
					>
						<Alert
							onClose={() => removeNotification(notification.id)}
							severity={notification.severity}
							sx={{ width: '100%' }}
						>
							{notification.message}
						</Alert>
					</Snackbar>
				))}
			</Stack>
		</NotificationContext.Provider>
	);
};
