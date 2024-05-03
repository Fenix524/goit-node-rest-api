import HttpError from '../helpers/HttpError.js'
import { User } from '../models/userModel.js'
import path from 'path'
import fs from 'fs/promises'
import Jimp from 'jimp'

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

export const updateMeAvatar = async (req, res, next) => {
	try {
		const pathFrom = path.join('temp', req.file.filename)
		const pathTo = path.join('public', 'avatars/')
		await Jimp.read(pathFrom).then(image => {
			return image
				.resize(250, 250)
				.quality(100)
				.write(pathTo + req.file.filename)
		})
		const relativePathTo = path.join('avatars/')

		const avatarURL = {
			avatarURL: relativePathTo + req.file.filename,
		}

		req.user.avatarURL = avatarURL.avatarURL
		await req.user.save()

		await fs.unlink(pathFrom)

		res.status(200).json(avatarURL)
	} catch (error) {
		// Handle errors
		console.error('Error making image public:', error)
		return res.status(500).json({
			message: 'Internal Server Error',
		})
	}
}
