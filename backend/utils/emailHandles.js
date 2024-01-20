
import nodemailer from 'nodemailer'
import sendgrid from 'nodemailer-sendgrid-transport'

const api_key = "sampleKEy"

export const sendEmail = async (options)=>{
const transport = nodemailer.createTransport(sendgrid({
    auth : {
        api_key : api_key
    }
}))

const emailOptions = {
    from : 'support',
    to : options.email,
    subject  : options.subject,
    text : options.message
}

await transport.sendMail(emailOptions)
}