import { isValidObjectId } from 'mongoose'
import HttpError from './HttpError.js'

export const validationID = async (req, res, next) => {
	const { id } = req.params

	if (!isValidObjectId(id)) {
		next(HttpError(400, 'Invalid ID'))
		return
	}
	next()
}
