import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,    // process.env ki jagah ye
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,   // VITE_ prefix ke sath
  form.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY     // VITE_ prefix ke sath
)

    .then((result) => {
        setLoading(false);
        setStatus({ 
            type: 'success', 
            message: 'Thank you! Your message has been sent successfully.' 
        });
        form.current.reset();
        setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }, (error) => {
        setLoading(false);
        setStatus({ 
            type: 'error', 
            message: 'Something went wrong. Please try again later.' 
        });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="mt-2 text-indigo-100 opacity-90">We'd love to hear from you. Drop us a message below.</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="user_name"
                  required 
                  placeholder="John Doe"
                  className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white text-slate-800"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="user_email"
                required 
                placeholder="john@example.com"
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white text-slate-800"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
              <textarea 
                name="message"
                rows="4" 
                required 
                placeholder="How can we help you?"
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-slate-50/50 focus:bg-white text-slate-800 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                  loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>

          {/* Status Notifications */}
          {status.message && (
            <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
            }`}>
              {status.type === 'success' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Secure Communication</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;