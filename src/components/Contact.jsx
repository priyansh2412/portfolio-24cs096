import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section className={darkMode ? "contact dark" : "contact"}>
      <h1>Contact Me</h1>

      <button
        className="theme-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="contact-form">
        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Message</label>

        <textarea
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />

        <h3>Message Preview</h3>

        <p className="preview">
          {message || "Your message will appear here..."}
        </p>

        <p>
          Characters: {message.length}
        </p>

        <button className="submit-button">
          Submit
        </button>
      </div>
    </section>
  );
}

export default Contact;