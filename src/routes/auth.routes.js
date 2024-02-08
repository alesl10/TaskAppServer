import { Router } from "express";
import { login, logout, profile, register, verifyToken  } from "../controllers/auth.controllers.js";
import {authRequired} from '../middlewares/validateToken.js'

const router = Router()

router.post('/register', register)
router.post('/login', login )
router.post('/logout', logout )

router.get('/auth/verify', verifyToken)

router.get('/profile', authRequired, profile)

export default router;