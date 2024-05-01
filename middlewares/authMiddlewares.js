import HttpError from '../helpers/HttpError.js'
import { User } from '../models/userModel.js'
import { checkToken } from '../services/jwtServices.js'

export const protect = async (req, res, next) => {
	console.log('=================1')
	const token =
		req.headers.authorization?.startsWith('Bearer ') &&
		req.headers.authorization.split(' ')[1]

	console.log('=================2', token)
	const userId = checkToken(token)
	if (!userId) return next(HttpError(401))

	console.log('=================3', userId)
	try {
		const currentUser = await User.findById(userId)
		if (!currentUser) return next(HttpError(401))
		console.log('=================4', currentUser)

		req.user = currentUser

		next()
	} catch (error) {
		console.error(error)
		next(error)
	}
}
