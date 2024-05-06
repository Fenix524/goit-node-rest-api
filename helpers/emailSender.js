import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config()
const { SENDGRID_API_KEY, MAIL_RECEIVER, HOST } = process.env

const msgConfig = {
	to: MAIL_RECEIVER,
	from: 'zgerzanic@gmail.com',
	subject: '',
	text: '',
	html: '',
}

export class EmailSender {
	constructor() {
		sgMail.setApiKey(SENDGRID_API_KEY)
	}

	send(msg = msgConfig) {
		return sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent')
			})
			.catch(error => {
				console.error(error)
			})
	}
}

export const sendVerifyMail = verificationToken => {
	const msg = {
		to: MAIL_RECEIVER,
		from: 'zgerzanic@gmail.com',
		subject: 'Проходження верефікації',
		text: 'Проходження верефікації',
		html: `<p>Для успішного проходження верефікації, перейдіть за цим посиланням --> <a href="${HOST}/api/users/verify/${verificationToken}">Підтвердити😊</a></p>`,
	}

	const emailSender = new EmailSender()
	emailSender.send(msg)
}
