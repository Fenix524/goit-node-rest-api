import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contactsPath = path.join(__dirname, '../', 'db', 'contacts.json')

export async function getContacts() {
	try {
		const readData = await readFile(contactsPath)
		return JSON.parse(readData)
	} catch (error) {
		console.log('File not read', error)
		return null
	}
}

export async function getContactById(contactId) {
	try {
		const readData = await readFile(contactsPath)
		return (
			JSON.parse(readData).find(contact => contact.id === contactId) || null
		)
	} catch (error) {
		console.log('File not read', error)
		return null
	}
}

export async function removeContact(contactId) {
	try {
		let readData = await readFile(contactsPath)
		let contacts = JSON.parse(readData)

		const removedContactIndex = contacts.findIndex(
			contact => contact.id === contactId
		)
		if (removedContactIndex === -1) return null

		const removedContact = contacts.splice(removedContactIndex, 1)[0]
		// console.log('sdf', removeContact)

		await writeFile(contactsPath, JSON.stringify(contacts))

		return removedContact
	} catch (error) {
		console.log('File not write', error)
		return null
	}
}

export async function addContact(name, email, phone) {
	try {
		const data = await readFile(contactsPath)
		let contacts = JSON.parse(data)
		const newContact = {
			id: Date.now().toString(),
			name,
			email,
			phone,
		}
		contacts.push(newContact)
		await writeFile(contactsPath, JSON.stringify(contacts))
		return newContact
	} catch (error) {
		return null
	}
}

// export async function updateContact(id, userObj = {}) {
// 	//userObj = {name, email, phone}
// 	try {
// 		const data = await readFile(contactsPath)
// 		let contacts = JSON.parse(data)
// 		const index = contacts.findIndex(contact => contact.id === id)
// 		console.log(contacts[index])
// 		if (index !== -1) {
// 			contacts[index] = {
// 				id,
// 				...contacts[index],
// 				...userObj,
// 			}
// 			await writeFile(contactsPath, JSON.stringify(contacts))
// 			return contacts[index]
// 		}
// 		return null
// 	} catch (error) {
// 		return null
// 	}
// }
export async function updateContact(id, userObj = {}) {
	// userObj = {name, email, phone}
	try {
		const data = await readFile(contactsPath)
		let contacts = JSON.parse(data)
		const index = contacts.findIndex(contact => contact.id === id)
		console.log(contacts[index])
		if (index !== -1) {
			const updatedContact = {
				...contacts[index],
				name: userObj.name || contacts[index].name,
				email: userObj.email || contacts[index].email,
				phone: userObj.phone || contacts[index].phone,
			}
			contacts[index] = updatedContact
			await writeFile(contactsPath, JSON.stringify(contacts))
			return contacts[index]
		}
		return null
	} catch (error) {
		return null
	}
}
