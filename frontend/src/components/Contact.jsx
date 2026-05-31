import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const contactData = {
  email: "harshalkatkar76@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/harshal-katkar-1aa38a281",
  github:
    "https://github.com/harshalkatkaryk06",
};

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_BACKEND_URI
    : import.meta.env.VITE_DEV_BACKEND_URI;

const Contact = ({ refProp }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_URL}/api/contact`,
        formData
      );

      toast.success(
        response.data.message ||
          "Message sent successfully!"
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      if (error.response?.status === 429) {
        toast.error(
          error.response.data.message ||
            "Too many requests. Please try again later."
        );
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={refProp}
      className="min-h-screen bg-gray-950 text-white px-8 py-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Let's Connect
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Get In Touch
            </h3>

            <p className="text-gray-400 mb-8">
              Open to collaborating on MERN,
              AI-powered applications,
              backend systems, and innovative
              full-stack projects.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-green-400 text-xl" />
                <span>{contactData.email}</span>
              </div>

              <div className="flex gap-4">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xl hover:border-blue-500 hover:text-blue-500 transition"
                >
                  <FaLinkedin />
                </a>

                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-xl hover:border-green-400 hover:text-green-400 transition"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none focus:border-green-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none focus:border-green-400"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none focus:border-green-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;