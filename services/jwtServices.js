import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

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
