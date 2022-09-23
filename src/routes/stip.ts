import { Router } from "express";

import {
    getStips, getStip, updateStip, deleteStip, createStip,
} from '../controllers/stip'

const router = Router()


router.post('/', createStip);

router.get('/', getStips)

router.get('/:id', getStip)

router.patch('/:id', updateStip)

router.delete('/:id', deleteStip)

export default router;