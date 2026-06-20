import { useState, useEffect } from 'react'
import './About.css'

const DEFAULT_ABOUT = {
  subtitle: 'Your neighborhood bar and grill with a whole lot of personality',
  paragraph1: "Railhouse Bar & Grill is more than just a restaurant—it's a destination. Nestled in the heart of the community, we've been bringing people together over great food, cold drinks, and unforgettable entertainment.",
  paragraph2: "Whether you're here for our world-famous wings, a round of slots, live music on the weekend, or just to unwind after a long day, the Railhouse is your home away from home.",
  features: [
    { id: 1, icon: '🎰', title: 'Slots Gaming', description: 'Try your luck on our exciting selection of slot machines for entertainment.' },
    { id: 2, icon: '🍗', title: 'Award-Winning Wings', description: 'From classic buffalo to Nashville hot, our wings are made fresh daily.' },
    { id: 3, icon: '🍺', title: 'Full Bar', description: 'Craft beers on tap, premium spirits, and handcrafted cocktails.' },
    { id: 4, icon: '🎵', title: 'Live Entertainment', description: 'Live music, trivia nights, and weekly events to keep the good times rolling.' },
  ],
}

export default function About() {
  const [about, setAbout] = useState(DEFAULT_ABOUT)

  useEffect(() => {
    fetch('/api/admin/about')
      .then(r => r.json())
      .then(data => { if (data) setAbout(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">
            ABOUT <span>RAILHOUSE</span>
          </h2>
          <p className="section-subtitle">{about.subtitle}</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>{about.paragraph1}</p>
            <p>{about.paragraph2}</p>
            <a href="#menu" className="btn btn-primary">Explore Our Menu</a>
          </div>
          <div className="about-features">
            {about.features.map(f => (
              <div className="feature-card" key={f.id}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
