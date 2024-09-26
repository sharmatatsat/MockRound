// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // or your email provider
//     auth: {
//         user: 'sharmatatsat23@gmail.com', // Your email
//         pass: 'Gmail@23122002', // Your email password
//     },
// });

// router.post('/contact', async (req, res) => {
//     const { name, email, message } = req.body;

//     const mailOptions = {
//         from: email,
//         to: 'sharmatatsat23@gmail.com',
//         subject: `Message from ${name}`,
//         text: message,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: 'Email sent' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, message: 'Failed to send email' });
//     }
// });

// module.exports = router;