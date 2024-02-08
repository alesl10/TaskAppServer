import { Router } from 'express'
import { create, getTasks, getTask, deleteTask, updateTask, deleteTasks } from "../controllers/task.controllers.js";
import { authRequired } from '../middlewares/validateToken.js'


const router = Router()

router.get('/tasks',authRequired, getTasks)
router.get('/tasks/:id',authRequired, getTask)
router.post('/tasks', authRequired, create)
router.delete('/tasks/:id', authRequired, deleteTask)
router.delete('/tasks', authRequired, deleteTasks)
router.put('/tasks/:id', authRequired, updateTask)


export default router