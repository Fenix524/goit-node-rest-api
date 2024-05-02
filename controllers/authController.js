import HttpError from '../helpers/HttpError.js'
import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { signToken } from '../services/jwtServices.js'
import { chngeUserToken } from './userController.js'

export const register = async (req, res, next) => {
	try {
		const userData = req.body
		const { email, password } = userData

		const userExists = await User.findOne({ email })
		if (userExists) return next(HttpError(409, 'Email in use'))

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password, salt)

		const newUser = await User.create({
			email,
			password: hashedPassword,
		})

		res.status(201).json({
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
			},
		})
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			throw HttpError(401, 'Email or password is wrong')
		}

		const isPasswordValid = bcrypt.compareSync(password, user.password)
		if (!isPasswordValid) {
			throw HttpError(401, 'Email or password is wrong')
		}

		const token = signToken(user._id)
		user.token = token

		const userWithToken = await chngeUserToken(user._id, token)

		res.status(200).json({
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		})
	} catch (error) {
		next(error)
	}
}

export const logout = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id)
		if (!user) {
			throw HttpError(401, 'Not authorized')
		}

		await chngeUserToken(req.user._id, null)
		res.status(204).end()
	} catch (error) {
		next(error)
	}
}

export const getMe = async (req, res, next) => {
	try {
		const currentUser = req.user
		if (!currentUser) {
			throw HttpError(401, 'Not authorized')
		}

		res.status(200).json({
			email: currentUser.email,
			subscription: currentUser.subscription,
		})
	} catch (error) {
		next(error)
	}
}
