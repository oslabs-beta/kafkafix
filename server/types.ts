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
