import axios from "axios";

export const sendMail = async ({
  to,
  subject,
  htmlContent,
  textContent = "",
}) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Portfolio Website",
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent,
        textContent,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API,
        },
      }
    );

    console.log("Mail sent:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Brevo Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};