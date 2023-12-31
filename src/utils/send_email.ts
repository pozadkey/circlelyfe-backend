import nodemailer from 'nodemailer';

// Nodemailer transporter
let transporter = nodemailer.createTransport({
    service:  'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD 
    }
})

//  Testing transporter
transporter.verify((err, success)=> {
   if (err){
    console.log(err.message);
   } else {
    console.log(`Transporter is ready to send email.`);
   }
});

// Send email
 export const sendEmail = async(mailOptions: object) => {
    try {
        const emailSent =  transporter.sendMail(mailOptions);
        return emailSent;
    } catch (error) {
        throw error;
    }
}


