import { Router } from "express";

import {
    getStudents, getStudent, updateStudent, deleteStudent, createStudent,
} from '../controllers/students'

const router = Router()


router.post('/', createStudent);

router.get('/', getStudents)

router.get('/:id', getStudent)

router.patch('/:id', updateStudent)

router.delete('/:id', deleteStudent)

export default router;