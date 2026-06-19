import { useState, useEffect } from 'react'
import './Events.css'

const FALLBACK_EVENTS = [
  { id: 1, title: 'Wing Wednesday', description: '50% off all wing orders every Wednesday night', day: 'Every Wednesday', time: '5:00 PM - Close', recurring: true },
  { id: 2, title: 'Happy Hour', description: '$1 off all draft beers and well drinks', day: 'Monday - Friday', time: '3:00 PM - 6:00 PM', recurring: true },
  { id: 3, title: 'Trivia Night', description: 'Test your knowledge for a chance to win bar tabs and prizes', day: 'Every Thursday', time: '7:00 PM - 9:00 PM', recurring: true },
  { id: 4, title: 'Live Music Saturday', description: 'Live local bands every Saturday night', day: 'Every Saturday', time: '8:00 PM - 11:00 PM', recurring: true },
  { id: 5, title: 'Sunday Funday', description: 'Bottomless mimosas with any brunch entrée', day: 'Every Sunday', time: '11:00 AM - 3:00 PM', recurring: true },
]

export default function Events() {
  const [events, setEvents] = useState(FALLBACK_EVENTS)

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => setEvents(data))
      .catch(() => {})
  }, [])

  return (
    <section id="events" className="events-section">
      <div className="events-bg-accent"></div>
      <div className="container">
        <div className="events-header">
          <h2 className="section-title">EVENTS & <span>SPECIALS</span></h2>
          <p className="section-subtitle">Something happening every night of the week</p>
        </div>
        <div className="events-grid">
          {events.map(event => (
            <div className="event-card" key={event.id}>
              {event.recurring && <span className="event-badge">Weekly</span>}
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <div className="event-day">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {event.day}
                </div>
                <div className="event-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {event.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
