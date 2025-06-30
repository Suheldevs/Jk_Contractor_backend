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
      subject: 'JK Contractor Website New Inquiry Received',
      html: `<div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  <!-- Header -->
  <div style="background-color: #06425F; color: #fff; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 22px;">🔔 New Inquiry Received</h1>
  </div>

  <!-- Body -->
  <div style="padding: 20px; background-color: #f9f9f9;">
    <p style="margin: 0 0 10px;">Dear Director,</p>
    <p style="margin: 0 0 10px;">You have received a new inquiry from the website <a href="https://jkcontractor.co.in" style="color: #0073e6;" target="_blank">https://jkcontractor.co.in</a>.</p>
    <p style="margin: 0 0 20px;">Here are the details:</p>

    <table style="width: 100%; border-collapse: collapse; background: #fff;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${service}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
      </tr>
    </table>

    <p style="margin: 20px 0 0;">Please respond to this inquiry as soon as possible.</p>
  </div>

  <!-- Footer -->
  <div style="background-color: #f1f1f1; padding: 20px; font-size: 14px; text-align: center;">
    <p style="margin: 0 0 5px;"><strong>Mohd Suhel</strong></p>
    <p style="margin: 5px 0;"><strong>P:</strong> +91 9519838720 
    <p style="margin: 5px 0;"><strong>E:</strong> <a href="mailto:mohdsuhel.dev@gmail.com" style="color: #0073e6;" target="_blank">mohdsuhel.dev@gmail.com</a></p>
  </div>
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
