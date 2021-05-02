import {Router} from 'express';

const router = Router();

import getCampaigns from './get';
router.get('/', getCampaigns);
import uploadCampaign from './upload';
router.post('/upload', uploadCampaign);

export default router;