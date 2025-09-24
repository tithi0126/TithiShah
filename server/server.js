require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://tithishah26:tithi0126@tithiportfolio.ckgfpbg.mongodb.net/?retryWrites=true&w=majority&appName=TithiPortfolio';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., 'smtp.mailgun.org' or 'smtp.sendgrid.net'
  port: process.env.EMAIL_PORT, // e.g., 587 for TLS, 465 for SSL
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

// Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tithishah26@gmail.com', // Recipient email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Only attempt to send email if transporter is configured
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn('Email transporter not fully configured. Skipping email notification.');
    }

    res.status(200).json({ msg: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

console.log('Attempting to start server...');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
