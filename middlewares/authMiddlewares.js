import HttpError from '../helpers/HttpError.js'
import { User } from '../models/userModel.js'
import { checkToken } from '../services/jwtServices.js'

export const protect = async (req, res, next) => {
	const token =
		req.headers.authorization?.startsWith('Bearer ') &&
		req.headers.authorization.split(' ')[1]

	const userId = checkToken(token)
	if (!userId) return next(HttpError(401))

	try {
		const currentUser = await User.findById(userId)
		if (!currentUser) return next(HttpError(401))

		req.user = currentUser

		next()
	} catch (error) {
		console.error(error)
		next(error)
	}
}
