import express from 'express'
import {
	getMe,
	login,
	logout,
	register,
} from '../controllers/authController.js'
import validateBody from '../helpers/validateBody.js'
import {
	userLoginValidation,
	userRegisterValidation,
} from '../schemas/usersSchema.js'
import { protect } from '../middlewares/authMiddlewares.js'

const authRouter = express.Router()

authRouter.post('/register', validateBody(userRegisterValidation), register)
authRouter.post('/login', validateBody(userLoginValidation), login)
authRouter.post('/logout', protect, logout)
authRouter.get('/current', protect, getMe)

export default authRouter
