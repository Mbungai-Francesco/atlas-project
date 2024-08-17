import { Router } from 'express';
import {
  CreateTopic,
  GetTopics,
  GetTopic,
  UpdateTopic,
  DeleteTopic,
} from '../controllers/TopicController';

const TopicRoutes = Router();

TopicRoutes.get('/topics', GetTopics);
TopicRoutes.get('/topics/:id', GetTopic);
TopicRoutes.post('/topics', CreateTopic);
TopicRoutes.put('/topics/:id', UpdateTopic);
TopicRoutes.delete('/topics/:id', DeleteTopic);

export default TopicRoutes;
