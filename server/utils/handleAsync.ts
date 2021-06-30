const handleAsync = async <T>(promise: Promise<T>) => {
	try {
		const data = await promise;

		return [data, null];
	} catch (e) {
		const error = {
			status: 500,
			message: 'Error at Middleware',
		};

		return [null, error];
	}
};

export default handleAsync;
