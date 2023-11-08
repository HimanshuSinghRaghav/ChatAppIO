import express from 'express'
import { addUser, getUsers } from '../Controllers/chat/usersController.js'
import verifyToken from '../middalware/auth.js'

const router = express.Router()
router.use(verifyToken)
router.post('/user',addUser)
router.get('/users',getUsers)
export default router