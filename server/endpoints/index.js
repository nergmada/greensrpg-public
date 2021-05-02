import {Router} from 'express';

const endpoints = Router();
import campaigns from './campaigns';

endpoints.use('/campaigns', campaigns);

export default endpoints;