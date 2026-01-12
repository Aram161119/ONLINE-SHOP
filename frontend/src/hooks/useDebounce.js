import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	const reset = (val) => {
		setDebounced(val);
	};

	return [debounced, reset];
};
