export const buildQueryParams = (filters) => {
	const params = new URLSearchParams();

	if (filters.limit) {
		params.append('limit', filters.limit);
	}

	if (filters.page) {
		params.append('page', filters.page);
	}

	if (filters.sort) {
		if (Array.isArray(filters.sort)) {
			filters.sort.forEach((s) => params.append('sort', s));
		} else {
			params.append('sort', filters.sort);
		}
	}

	if (filters.search && typeof filters.search === 'object') {
		Object.entries(filters.search).forEach(([field, value]) => {
			if (value?.trim()) {
				params.append(`search[${field}]`, value.trim());
			}
		});
	}

	Object.entries(filters).forEach(([key, value]) => {
		if (value && typeof value === 'object' && ('min' in value || 'max' in value)) {
			if (value.min != null && value.min !== '')
				params.append(`${key}Min`, value.min);

			if (value.max != null && value.max !== '')
				params.append(`${key}Max`, value.max);
		}
	});

	Object.entries(filters).forEach(([key, value]) => {
		if (
			value != null &&
			value !== '' &&
			Array.isArray(value) &&
			!['sort', 'page', 'search'].includes(key)
		) {
			params.append(key, value.join(','));
		}
	});

	return params.toString();
};
