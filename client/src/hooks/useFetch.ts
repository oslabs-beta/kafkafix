import fetch from 'node-fetch';
import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
	const [state, setState] = useState<any>(null);

	useEffect(() => {
		const abortController = new AbortController();

		void (async function fetchData() {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setState(data);
			} catch (e) {
				console.error(e);
			}
		})();

		// cancel pending fetch request on component unmount
		return () => abortController.abort();
	}, [url, setState]);

	return state;
};
