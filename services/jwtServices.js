import jwt from 'jsonwebtoken'
import HttpError from '../helpers/HttpError.js'

const JWT_SECRET = 'kkj207q8asQ8-3KL'
const JWT_EXPIRES_IN = '15d'

export const signToken = id => {
	const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
	console.log(token)
	return token
}

export const checkToken = token => {
	if (!token) return
	try {
		const { id } = jwt.verify(token, JWT_SECRET)
		return id
	} catch (error) {
		console.log(error)
		return
	}
}
