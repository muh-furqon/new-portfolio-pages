import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Simple SVG Icons for contact links
const MailIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const GithubIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactSection() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace with your actual IDs from EmailJS
    emailjs.sendForm('service_k9ttyuz', 'template_6i5bq5q', form.current, 'C007BBKJSLZfZXelB')
      .then((result) => {
          console.log(result.text);
          setIsSending(false);
          setIsSent(true);
      }, (error) => {
          console.log(error.text);
          setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto flex flex-col items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 className="text-3xl font-bold text-center text-blue-400 mb-12" variants={itemVariants}>
          Get in Touch
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-16 w-full">
          {/* Left Column: Contact Info */}
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <p className="text-gray-400 mb-8">
              Feel free to reach out via email or connect with me on other platforms. I'm always open to discussing new projects or creative ideas!
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:your.email@example.com" className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors">
                <MailIcon />
                <span>your.email@example.com</span>
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors">
                <GithubIcon />
                <span>github.com/yourusername</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="flex gap-6">
                <input type="text" name="first_name" placeholder="First Name" required className="w-1/2 bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="last_name" placeholder="Last Name" required className="w-1/2 bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input type="email" name="user_email" placeholder="Your Email" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Your Message" rows="5" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              <button
                type="submit"
                disabled={isSending || isSent}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : isSent ? 'Message Sent ✔' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}