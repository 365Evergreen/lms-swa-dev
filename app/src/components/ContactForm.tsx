import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState('');
  const [message, setMessage] = useState('');

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setEmployees('');
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Intentionally no submit action — UI only as requested
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get in Touch</h2>
        <p className={styles.subtitle}>Have questions? Our team is here to help you get started</p>

        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fullName">Full Name <span className={styles.req}>*</span></label>
              <input id="fullName" className={styles.input} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Work Email <span className={styles.req}>*</span></label>
              <input id="email" type="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" required />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="company">Company Name <span className={styles.req}>*</span></label>
              <input id="company" className={styles.input} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your Company Inc." required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input id="phone" className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="employees">Number of Employees <span className={styles.req}>*</span></label>
              <select id="employees" className={styles.select} value={employees} onChange={(e) => setEmployees(e.target.value)} required>
                <option value="">Select...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label} htmlFor="message">How can we help you?</label>
              <textarea id="message" className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your learning and development needs..." rows={6} />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.primary}>Send Message</button>
            <button type="button" className={styles.secondary} onClick={clearForm}>Clear Form</button>
          </div>

          <p className={styles.legal}>By submitting this form, you agree to our privacy policy and terms of service.</p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
