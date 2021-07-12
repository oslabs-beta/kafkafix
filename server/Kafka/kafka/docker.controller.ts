import { exec } from 'child_process';
import { RequestHandler } from 'express';

export class Docker {
	static docker: RequestHandler = async (req, res, next) => {
		exec('docker compose up', (error, stdout, stderr) => {
			if (error) return console.error('error: ', error);
			if (stderr) return console.log('stderr: ', stderr);
			console.log('stdout: ', stdout);
		});

		return next();
	};
}
