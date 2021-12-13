'use strict';

const Contact = require('../models/contact');

const nodemailer = require("nodemailer");


/* For get Contact Page */
const contactPage = (req, res) => {
    res.render('contact',{

    });
}

/* Process SendMail when User submitted Form Contact */  /* Use nodemailer library and SMTP of mailgun */
const contactPagePostSendMail = async (req, res) => {

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Email: ${req.body.emailUser}</li>
      <li>Name: ${req.body.nameUser}</li>
      <li>Message: ${req.body.messageUser}</li>
  `;

    
// async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'postmaster@sandboxb2ee2380ffb64711bd269fabc6300d09.mailgun.org', // generated ethereal user
        pass: 'f359dea00de35057aef886832cfe0ff2-7dcc6512-e182142a', // generated ethereal password
      },
    });
    var emailUser = req.body.emailUser;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"From VBIstock User 👻" <${emailUser}>`, // sender address
      to: "testvbi123@gmail.com", // list of receivers
      subject: "Message Contact ✔", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);

  
  
}

/* Process Save Data to mongoDB when User submitted Form Contact */
const getUserFormData = (req, res, next) => {
    const contact = new Contact();
    contact.email = req.body.emailUser;
    contact.name = req.body.nameUser;
    contact.message = req.body.messageUser;

    contact.save((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('User Form Data Has been saved.')
            res.redirect('contact');
        }

    });
    next();
}







module.exports = {
    contactPage,
    getUserFormData,
    contactPagePostSendMail,
   
}