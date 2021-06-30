import { Router } from 'express';

import { AdminController } from './admin.controller';

const router = Router();

router.post('/port', AdminController.kafka, (req, res) => {
	return res.sendStatus(200);
});

export default router;
