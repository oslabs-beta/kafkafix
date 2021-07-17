import { exec } from 'child_process';
import { chdir } from 'process';
import { RequestHandler } from 'express';

export class Docker {
	// ADD command to cd into directory
	// add command to docker compose down
	static docker: RequestHandler = async (req, res, next) => {
		const { filePath, folderPath } = req.body;

		console.log('folderpath', folderPath);
		chdir(filePath);
		exec(`cd ${filePath}`, (error, stdout, stderr) => {
			if (error) return console.error('error: ', error);
			if (stderr) return console.log('stderr: ', stderr);
			console.log('stdout: ', stdout);
		});

		return next();
	};
}
