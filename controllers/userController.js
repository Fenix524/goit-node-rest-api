import HttpError from '../helpers/HttpError.js'
import { User } from '../models/userModel.js'

export const chngeUserToken = async (userId, token) => {
	try {
		const user = await User.findById(userId)
		if (!user) {
			throw new HttpError(404)
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ token },
			{ new: true }
		)
		return updatedUser
	} catch (error) {
		console.error(error)
		throw new HttpError(500, 'Internal Server Error')
	}
}
