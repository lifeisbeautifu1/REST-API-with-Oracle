import { Router } from 'express';

import {
  createSession,
  getSessions,
  getSession,
  getUserSessions,
  updateSession,
  deleteSession,
} from '../controllers/sessions';

const router = Router();

router.post('/', createSession);

router.get('/', getSessions);

router.get('/user/:id', getUserSessions);

router.get('/:userId/:id', getSession);

router.patch('/:userId/:id', updateSession);

router.delete('/:userId/:id', deleteSession);

export default router;
