import logo from '/railhouse_logo.png'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Railhouse Bar and Grill" className="footer-logo-img" />
            </div>
            <p>Your neighborhood bar and grill. Cold drinks, great wings, and a good time—every time.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Hours</h4>
            <p>Tuesday - Sunday: 5PM–2AM</p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="http://m.facebook.com/RailHouseRoundLake" aria-label="Facebook" className="social-btn">f</a>
              <a href="https://www.instagram.com/railhouse_roundlake?utm_source=qr" aria-label="Instagram" className="social-btn">ig</a>
              <a href="#" aria-label="Twitter" className="social-btn">tw</a>
            </div>
            <div className="footer-contact">
              <p className="footer-address">415 Railroad Ave<br />Round Lake, IL 60073</p>
              <p><a href="tel:+18478867245">(847) 886-7245</a></p>
              <p><a href="mailto:railhousebarandgrill@yahoo.com">railhousebarandgrill@yahoo.com</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Railhouse Bar & Grill. All rights reserved.</p>
          <p className="footer-legal">Must be 21+ to participate in gaming activities.</p>
        </div>
      </div>
    </footer>
  )
}
