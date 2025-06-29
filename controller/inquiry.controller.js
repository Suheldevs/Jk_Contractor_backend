import Inquiry from '../model/inquiry.model.js';
import nodemailer from 'nodemailer';
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message,service } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message || !service) {
      return res.status(400).json({ success: false, message: 'Name, Email, Phone, and Message are required.' });
    }

    // Validate phone number format
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

    // Create new inquiry
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      service
    });

    await newInquiry.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'suhel.codecrafter@gmail.com',
      subject: 'Ashok Kumar Website New Inquiry Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #0073e6;">New Inquiry Received</h2>
          <p>Dear Director,</p>
          <p>You have received a new inquiry from the website <a href="https://adv-ashok-kumar.netlify.app/" target="_blank">https://adv-ashok-kumar.netlify.app</a>. Below are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${service}</td></tr>
          </table>
    
          <p>Please respond to this inquiry as soon as possible.</p>
          <p style="margin-top: 20px;">
            Kindest Regards,<br>
            <strong>Code Crafter Web Solutions</strong><br>
            <strong>P:</strong> +91 9336969289<br>
            <strong>O:</strong> +91 8840700176<br>
            <strong>W:</strong> <a href="https://codecrafter.co.in/" target="_blank">https://codecrafter.co.in/</a>
          </p>
        </div>
      `,
    };

    // Send email using Nodemailer
    const info = await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', inquiry: newInquiry });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get a single inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Delete an inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
