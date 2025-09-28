import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Log environment variables (remove this in production)
console.log('Environment variables check:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://tithishah26:tithi0126@tithiportfolio.ckgfpbg.mongodb.net/?retryWrites=true&w=majority&appName=TithiPortfolio';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email configuration check
const isEmailConfigured = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  // Verify email configuration
  transporter.verify()
    .then(() => console.log('✅ Email transporter configured successfully'))
    .catch(err => console.warn('❌ Email configuration error:', err.message));
} else {
  console.warn('❌ Email not configured. Please check your .env file');
}

// Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submission received:", { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Contact saved to database");

    // Send email notification if configured
    if (transporter) {
      try {
        const mailOptions = {
          to: 'tithishah26@gmail.com',
          subject: `New Contact Form Submission from ${name} through Portfolio`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #333;">New Contact Message from Portfolio</h2>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="margin-top: 15px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; background: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
              </div>
            </div>
          `
        };

        console.log("📧 Attempting to send email...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
        // Don't fail the request, just log the error
      }
    } else {
      console.warn('⚠️ Email transporter not configured. Skipping email notification.');
    }

    res.status(200).json({ 
      msg: 'Message sent successfully!',
      emailSent: !!transporter 
    });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    emailConfigured: !!transporter,
    timestamp: new Date().toISOString()
  });
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  if (!transporter) {
    return res.status(400).json({ 
      error: 'Email not configured',
      details: 'Check your .env file for EMAIL_HOST, EMAIL_USER, and EMAIL_PASS'
    });
  }

  try {
    await transporter.verify();
    res.json({ status: '✅ Email transporter is configured correctly' });
  } catch (error) {
    res.status(500).json({ error: '❌ Email configuration error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Email test: http://localhost:${PORT}/api/test-email`);
  
  if (!isEmailConfigured) {
    console.log('\n⚠️  EMAIL CONFIGURATION REQUIRED:');
    console.log('   Create a .env file in the root directory with:');
    console.log('   EMAIL_HOST=smtp.gmail.com');
    console.log('   EMAIL_PORT=587');
    console.log('   EMAIL_USER=your-email@gmail.com');
    console.log('   EMAIL_PASS=your-app-password');
    console.log('   EMAIL_SECURE=false');
  }
});