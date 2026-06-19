import './About.css'

export default function About() {
  const features = [
    { icon: '🎰', title: 'Slots Gaming', description: 'Try your luck on our exciting selection of slot machines for entertainment.' },
    { icon: '🍗', title: 'Award-Winning Wings', description: 'From classic buffalo to Nashville hot, our wings are made fresh daily.' },
    { icon: '🍺', title: 'Full Bar', description: 'Craft beers on tap, premium spirits, and handcrafted cocktails.' },
    { icon: '🎵', title: 'Live Entertainment', description: 'Live music, trivia nights, and weekly events to keep the good times rolling.' },
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <h2 className="section-title">
            ABOUT <span>RAILHOUSE</span>
          </h2>
          <p className="section-subtitle">Your neighborhood bar and grill with a whole lot of personality</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Railhouse Bar & Grill is more than just a restaurant—it's a destination.
              Nestled in the heart of the community, we've been bringing people together
              over great food, cold drinks, and unforgettable entertainment.
            </p>
            <p>
              Whether you're here for our world-famous wings, a round of slots,
              live music on the weekend, or just to unwind after a long day,
              the Railhouse is your home away from home.
            </p>
            <a href="#menu" className="btn btn-primary">Explore Our Menu</a>
          </div>
          <div className="about-features">
            {features.map(f => (
              <div className="feature-card" key={f.title}>
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
