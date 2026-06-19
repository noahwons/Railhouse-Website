import './Menu.css'
import menuImg from '/menu.png'

export default function Menu() {
  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="menu-header">
          <h2 className="section-title">OUR <span>MENU</span></h2>
          <p className="section-subtitle">View or download our full menu</p>
        </div>

        <div className="menu-pdf-wrapper">
          <div className="menu-image-container" role="img" aria-label="Rail House Menu image">
            <img src={menuImg} alt="Rail House Menu" className="menu-image" />
          </div>

          <div className="menu-actions">
            <a className="menu-btn" href={menuImg} download>Download Menu</a>
            <a className="menu-btn outline" href={menuImg} target="_blank" rel="noopener noreferrer">Open Image</a>
          </div>
        </div>
      </div>
    </section>
  )
}
