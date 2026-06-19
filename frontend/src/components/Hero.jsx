import logo from '/railhouse_logo.png'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-logo">
          <img src={logo} alt="Railhouse Bar and Grill" className="hero-logo-img" />
        </div>
        <p className="hero-description">
          Your local spot for cold drinks, crispy wings, and a great time.
          <br />
          Come in, kick back, and enjoy the ride.
        </p>
        <div className="hero-actions">
          <a href="#menu" className="btn btn-primary">View Menu</a>
          <a href="#contact" className="btn btn-secondary">Book an Event</a>
        </div>
        <div className="hero-hours">
          <span>Open Tuesday - Sunday: 5PM–2AM</span>
          <span className="divider"></span>
        </div>
      </div>
    </section>
  )
}
