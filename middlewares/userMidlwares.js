import multer from 'multer'
import path from 'path'
import { v4 } from 'uuid'
import HttpError from '../helpers/HttpError.js'

const multerStorage = multer.diskStorage({
	destination: (req, file, cbk) => {
		cbk(null, path.join('temp'))
	},
	filename: (req, file, cbk) => {
		const fileType = file.mimetype.split('/')[1]

		cbk(null, `${req.user._id}-${v4()}.${fileType}`)
	},
})

const multerFilter = (req, file, cbk) => {
	if (file.mimetype.startsWith('image/')) {
		cbk(null, true)
	} else {
		cbk(HttpError(400, 'Please upload images only'), false)
	}
}

const MB_SIZE = 1024 * 1024

export const uploadAvatar = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: {
		fieldSize: 2 * MB_SIZE,
	},
}).single('avatar')
