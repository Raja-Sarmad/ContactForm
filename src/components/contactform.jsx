import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form.current, 'PUBLIC_KEY')
    emailjs.sendForm(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  form.current,
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
)
    .then((result) => {
        console.log("Success:", result.text);
        setLoading(false);
        setMessageSent(true);
        form.current.reset(); // Form clear kar dega
        setTimeout(() => setMessageSent(false), 5000); // 5 sec baad success message hat jayega
    }, (error) => {
        console.log("Error:", error.text);
        setLoading(false);
        alert("Nakaam! Shayad Template ID ya Public Key galat hai.");
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 border border-gray-100">
        
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">Contact Us</h2>
          <p className="text-gray-500 mt-2">Humein message bheinjein, hum jald jawab dein gy.</p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="user_name" // Template mein {{user_name}} likha hona chahiye
              required 
              placeholder="Arslan Ahmed"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="user_email" // Template mein {{user_email}} likha hona chahiye
              required 
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Message</label>
            <textarea 
              name="message" // Template mein {{message}} likha hona chahiye
              rows="4" 
              required 
              placeholder="Yahan apna message likhein..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 resize-none bg-gray-50 focus:bg-white"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg transition duration-300 shadow-lg ${
                loading ? 'bg-gray-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Success Notification */}
        {messageSent && (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-pulse text-center">
            <p className="font-bold font-lg">Success! ✅</p>
            <p className="text-sm">Aapka message bhej diya gaya hai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;