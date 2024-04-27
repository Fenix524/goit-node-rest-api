import express from 'express'
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateStatusContact,
} from '../controllers/contactsControllers.js'
import validateBody from '../helpers/validateBody.js'
import {
	createContactSchema,
	updateContactSchema,
	updateContactStatusSchema,
} from '../schemas/contactsSchemas.js'
import { validationID } from '../helpers/verificationID.js'

const contactsRouter = express.Router()

contactsRouter.get('/', getAllContacts)

contactsRouter.get('/:id', validationID, getOneContact)

contactsRouter.delete('/:id', validationID, deleteContact)

contactsRouter.post('/', validateBody(createContactSchema), createContact)

contactsRouter.put(
	'/:id',
	validationID,
	validateBody(updateContactSchema),
	updateContact
)

contactsRouter.patch(
	'/:id/favorite',
	validationID,
	validateBody(updateContactStatusSchema),
	updateStatusContact
)

export default contactsRouter
