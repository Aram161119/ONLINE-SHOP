export const request = async (endpoint, method = 'GET', body = null) => {
	const url = `/api/${endpoint}`;

	const options = {
		method,
		headers: {},
		credentials: 'include',
	};

	if (body instanceof FormData) {
		options.body = body;
	} else if (body !== null) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (!response.ok) {
			const errorMessage =
				data?.error || `HTTP Error: ${response.status} ${response.statusText}`;
			const error = new Error(errorMessage);
			error.status = response.status;
			throw error;
		}

		if (data?.error) {
			const error = new Error(data.error);
			error.status = response.status;
			throw error;
		}

		return data;
	} catch (error) {
		if (error instanceof Error && error.message) {
			throw error;
		}

		if (error instanceof TypeError && error.message.includes('fetch')) {
			throw new Error('Network error: Unable to connect to server');
		}

		if (error instanceof SyntaxError) {
			throw new Error('Invalid response format from server');
		}

		throw new Error(error?.message || 'An unexpected error occurred');
	}
};
