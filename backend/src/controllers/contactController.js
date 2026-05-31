import Enquiry from "../models/enquiryModel.js";
import { sendMail } from "../services/mailService.js";

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save enquiry
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    // Send email notification
    await sendMail({
      to: process.env.RECEIVER_EMAIL,

      subject: `New Portfolio Contact Request from ${name}`,

      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Portfolio Contact Request</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <h3>Message</h3>

          <p>${message}</p>
        </div>
      `,

      textContent: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      enquiry,
    });
  } catch (error) {
    console.error(
      "Contact Form Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};