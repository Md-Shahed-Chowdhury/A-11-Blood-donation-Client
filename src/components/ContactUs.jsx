import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just console.log, later you can send to backend
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-red-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-700">Contact Us</h2>
          <p className="mt-2 text-gray-700">
            Have questions? Reach out to us via the form or call us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <label className="label mb-2 block font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input mb-4 w-full border border-gray-300 rounded-lg p-3"
              placeholder="Your Name"
            />

            <label className="label mb-2 block font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input mb-4 w-full border border-gray-300 rounded-lg p-3"
              placeholder="Your Email"
            />

            <label className="label mb-2 block font-semibold text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="input mb-4 w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
              placeholder="Your Message"
            ></textarea>

            <button
              type="submit"
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Phone:</span> +880 1234 567890
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> info@ecotrack.com
            </p>
            <p className="text-gray-700">
              We are available 24/7 to answer your questions and help you join our lifesaving community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
