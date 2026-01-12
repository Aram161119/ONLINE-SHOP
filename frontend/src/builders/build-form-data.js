export const buildFormData = (data) => {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value === null || value === undefined) return;

		if (value instanceof File) {
			formData.append(key, value);
		} else {
			formData.append(key, value);
		}
	});

	return formData;
};
