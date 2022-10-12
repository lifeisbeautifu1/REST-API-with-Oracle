import { Router } from 'express';

import {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  createStudent,
  getRecord,
} from '../controllers/students';

const router = Router();

router.post('/', createStudent);

router.get('/', getStudents);

router.get('/record', getRecord);

router.get('/:id', getStudent);

router.patch('/:id', updateStudent);

router.delete('/:id', deleteStudent);

export default router;
