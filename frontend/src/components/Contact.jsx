const contactData = {
  email: "yourmail@example.com",
  linkedin: "#",
  github: "#",
};

const Contact = ({ refProp }) => {
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
              Open to collaborating on MERN, AI-powered applications,
              backend systems, and innovative full-stack projects.
            </p>

            <div className="space-y-4">
              <p className="text-gray-300">
                Email: {contactData.email}
              </p>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-blue-400 transition"
              >
                LinkedIn
              </a>

              <a
                href={contactData.github}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-blue-400 transition"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right Side */}
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-800 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;