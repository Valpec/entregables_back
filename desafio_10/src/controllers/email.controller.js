import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js';
import userModel from '../services/dao/db/models/user.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server listo para recibir mensajes');
    }
})

const mailOptions = {
    from: "E-commerce Cattalina Test - " + config.gmailAccount,
    to: config.gmailAccount,
    subject: 'Correo enviado desde el e-commerce de Cata deco-home',
    html: `<div><h3> Esto es un test de envio del e-commerce </h3></div>`,
    attachments: []
}


const mailOptionsWithAttachments = {
    from: "Coder Test - " + config.gmailAccount,
    to: config.gmailAccount,
    subject: 'Correo de prueba desde el e-commerce de Cattalina deco-home',
    html: ` <div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Enviando imagenes: </p>
              
            </div>`,
    attachments: [
        {
            filename: "Logo test",
            path: __dirname + '/public/images/logo_gris.png',
            cid: 'logo cattalina'
        }
    ]
}

export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: 'Error', payload: error });
            }
            console.log('Mensaje enviado: %s', info.messageId);
            res.send({ message: 'Success', payload: info });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}


export const sendEmailWithAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error });
            }
            console.log('Mensaje enviado %s', info.messageId);
            res.send({ message: "Success", payload: info });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}



export const sendEmailPasswordReset = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const resetUrl = `http://localhost:8080/api/users/resetPassword`
        const passwordReset = {
            from: "E-commerce Cattalina Test - " + config.gmailAccount,
            to: email,
            subject: 'Restablecer contrasena Cattalina Deco-home',
            html: `<div><h3> El siguiente link lo redirigira para cambiar su contrasena. Tenga en cuenta que tiene validez de una hora.  </h3>
        <a href="${resetUrl}"><button>Reestablecer contrasena</button></a>
    </div>`,
            attachments: []
        }

        transporter.sendMail(passwordReset, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: 'Error', payload: error });
            }
            console.log('Mensaje enviado: %s', info.messageId);
            res.send({ message: 'Success', payload: info });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}



