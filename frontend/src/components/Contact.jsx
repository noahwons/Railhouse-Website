import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', message: data.message })
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Unable to send message. Please try again.' })
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">GET IN <span>TOUCH</span></h2>
            <p className="contact-intro">
              Have a question, want to book a private event, or just want to say hello?
              We'd love to hear from you.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>415 Railroad Ave<br />Round Lake, IL 60073</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>(847) 886-7245</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>railhousebarandgrill@yahoo.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🕐</div>
                <div>
                  <h4>Hours</h4>
                  <p>
                    Tuesday - Sunday: 5PM–2AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Select a topic</option>
                    <option value="reservation">Private Event / Reservation</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us more..." rows={5} />
              </div>

              {status && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
