import HttpError from '../helpers/HttpError.js'
import {
	updateContact as changeContact,
	updateContactStatus,
} from '../services/contactsServices.js'
import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} from '../services/contactsServices.js'

export const getAllContacts = async (req, res) => {
	const contacts = await listContacts()

	if (!contacts) {
		res.status(500).json({ message: 'Serwer error' })
		return
	}
	if (!contacts.length) {
		res.status(204).json({ message: 'The contact list is empty' })
		return
	}

	res.status(200).json(contacts)
}

export const getOneContact = async (req, res, next) => {
	const { id } = req.params
	const contact = await getContactById(id)

	!contact ? next(HttpError(404, 'Not found')) : res.status(200).json(contact)
}

export const deleteContact = async (req, res, next) => {
	const { id } = req.params
	const removedContact = await removeContact(id)

	!removedContact
		? next(HttpError(404, 'Not found'))
		: res.status(200).json(removedContact)
}

export const createContact = async (req, res, next) => {
	const newContact = await addContact(req.body)
	!newContact
		? next(HttpError(404, 'Not found'))
		: res.status(201).json(newContact)
}

export const updateContact = async (req, res, next) => {
	const { id } = req.params
	const { name, email, phone } = req.body

	if (!Object.keys(req.body).length) {
		next(HttpError(400, 'Body must have at least one field'))
		return
	}

	const changedContact = await changeContact(id, { name, email, phone })

	!changedContact
		? next(HttpError(404, 'Not found'))
		: res.status(200).json(changedContact)
}

export const updateStatusContact = async (req, res, next) => {
	const { id } = req.params
	const body = req.body

	const updatedContact = await updateContactStatus(id, body)

	!updatedContact ? next(HttpError(404)) : res.status(200).json(updatedContact)
}
