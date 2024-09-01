import express from 'express';
import {
  CreateContent,
  GetTopicContent,
  GetTopicContents,
  UpdateContent,
  DeleteTopicContent,
} from '../controllers/TopicContentController';

const TopicContentRouter = express.Router();

TopicContentRouter.post('/topicContents', CreateContent);
TopicContentRouter.get('/topicContents', GetTopicContents);
TopicContentRouter.get('/topicContents/:id', GetTopicContent);
TopicContentRouter.put('/topicContents/:id', UpdateContent);
TopicContentRouter.delete('/topicContents', DeleteTopicContent);

export default TopicContentRouter;
