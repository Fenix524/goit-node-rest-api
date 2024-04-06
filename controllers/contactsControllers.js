import HttpError from '../helpers/HttpError.js'
import { updateContact as changeContact } from '../services/contactsServices.js'
import {
	getContacts,
	getContactById,
	removeContact,
	addContact,
} from '../services/contactsServices.js'

export const getAllContacts = async (req, res) => {
	const contacts = await getContacts()

	if (!contacts) {
		res.status(500).json({ message: 'Serwer error' })
		return
	}
	if (!contacts.length) {
		res.status(204).json({ message: 'The contact list is empty' })
		return
	}

	res.status(200).json({
		message: 'Request successful',
		status: 200,
		contacts,
	})
}

export const getOneContact = async (req, res, next) => {
	const { id } = req.params
	const contact = await getContactById(id)

	!contact
		? next(HttpError(404, 'Not found'))
		: res.status(200).json({
				message: 'Request successful',
				status: 200,
				contact,
		  })
}

export const deleteContact = async (req, res, next) => {
	const { id } = req.params
	const removedContact = await removeContact(id)

	!removedContact
		? next(HttpError(404, 'Not found'))
		: res.status(200).json({
				message: 'Request successful',
				status: 200,
				removedContact,
		  })
}

export const createContact = async (req, res, next) => {
	const { name, email, phone } = req.body
	const newContact = await addContact(name, email, phone)
	!newContact
		? next(HttpError(404, 'Not found'))
		: res.status(201).json(newContact)
}

export const updateContact = async (req, res, next) => {
	const { id } = req.params
	const { name, email, phone } = req.body

	if (!Object.keys(req.body).length) {
		next(HttpError(404, 'Body must have at least one field'))
		return
	}

	const changedContact = await changeContact(id, { name, email, phone })

	!changeContact
		? next(HttpError(404, 'Not found'))
		: res.status(200).json(changedContact)
}
