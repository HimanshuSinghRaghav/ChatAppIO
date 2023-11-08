import express from 'express'
import { addMessage, getMessages } from '../Controllers/chat/messageController.js'
import auth from '../middalware/auth.js'

const router = express.Router()

router.use(auth)

router.post('/' , addMessage)
router.get('/:chatId' , getMessages)

export default router