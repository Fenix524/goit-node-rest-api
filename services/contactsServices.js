import { Contact } from '../models/contactModel.js'

export async function listContacts() {
	try {
		return await Contact.find()
	} catch (error) {
		console.log('DB not read', error)
		return null
	}
}

export async function getContactById(contactId) {
	try {
		return Contact.findById(contactId)
	} catch (error) {
		console.log('DB not read', error)
		return null
	}
}

export async function removeContact(contactId) {
	try {
		return Contact.findByIdAndDelete(contactId)
	} catch (error) {
		console.log('Contact not delete', error)
		return null
	}
}

export async function addContact({ name, email, phone }) {
	try {
		return Contact.create({ name, email, phone })
	} catch (error) {
		return null
	}
}

export async function updateContact(id, userObj) {
	try {
		return await Contact.findByIdAndUpdate(id, userObj, { new: true })
	} catch (error) {
		return null
	}
}

export async function updateContactStatus(id, stateValue) {
	try {
		return await Contact.findByIdAndUpdate(id, stateValue, { new: true })
	} catch (error) {
		return null
	}
}
