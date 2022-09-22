import { Router } from "express";

import {
    getStudents, getStudent
} from '../controllers/students'

const router = Router()


router.get('/', getStudents)

router.get('/:id', getStudent)

export default router;