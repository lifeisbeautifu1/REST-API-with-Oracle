import { Router } from "express";

import {
   createSession, getSessions, getSession, getUserSessions, updateSession, deleteSession
} from '../controllers/sessions'

const router = Router()

router.post('/', createSession)

router.get('/', getSessions)

router.get('/user/:id', getUserSessions)

router.get('/:id', getSession)

router.patch('/:id', updateSession)

router.delete('/:id', deleteSession)

export default router;