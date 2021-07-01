import { Application } from 'express';

export abstract class RouteConfig {
	app: Application;
	name: string;

	constructor(app: Application, name: string) {
		this.app = app;
		this.name = name;
		this.routes();
	}

	routeName() {
		return this.name;
	}

	abstract routes(): Application;
}
