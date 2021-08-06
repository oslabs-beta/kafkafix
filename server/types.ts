export interface Instance {
	metric: {
		__name__: string;
		instance: string;
		job: string;
	};
	value: string | number[];
}

export interface Area {
	metric: {
		__name__: string;
		area: string;
		instance: string;
		job: string;
	};
	value: string | number[];
}

export interface DelayedOperation {
	metric: {
		__name__: string;
		delayedOperation: string;
		instance: string;
		job: string;
	};
	value: string | number[];
}

export interface GarbageCollection {
	metric: {
		__name__: string;
		gc: string;
		instance: string;
		job: string;
	};
	value: string | number[];
}

export interface Quantile {
	metric: {
		__name__: string;
		instance: string;
		job: string;
		quantile: string;
	};
	value: string | number[];
}

export interface QuantileRequest {
	metric: {
		__name__: string;
		instance: string;
		job: string;
		quantile: string;
		request: string;
	};
	value: string | number[];
}

export interface QuantileData {
	'0.50': string | number[];
	'0.75': string | number[];
	'0.95': string | number[];
	'0.98': string | number[];
	'0.99': string | number[];
	'0.999': string | number[];
}

export interface RequestVersion {
	metric: {
		__name__: string;
		instance: string;
		job: string;
		request: string;
		version: string;
	};
	value: string | number[];
}

export interface Pool {
	metric: {
		__name__: string;
		instance: string;
		job: string;
		pool: string;
	};
	value: string | number[];
}
