export const handleAsync = async <T>(promise: Promise<T>) => {
	try {
		const data = await promise;

		return [data, null];
	} catch (e) {
		const error = {
			status: 500,
			message: e,
		};

		console.error(e);
		return [null, error];
	}
};
