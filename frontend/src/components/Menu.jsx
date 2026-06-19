import { useState, useEffect } from 'react'
import './Menu.css'
import menuImg from '/menu.png'

export default function Menu() {
  const [menuUrl, setMenuUrl] = useState(null)
  const [contentType, setContentType] = useState(null)

  useEffect(() => {
    fetch('/api/admin/menu-url')
      .then(r => r.json())
      .then(data => {
        if (data.url) {
          setMenuUrl(data.url)
          setContentType(data.contentType)
        }
      })
      .catch(() => {})
  }, [])

  const isPdf = contentType === 'application/pdf'
  const displayUrl = menuUrl || menuImg

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="menu-header">
          <h2 className="section-title">OUR <span>MENU</span></h2>
          <p className="section-subtitle">View or download our full menu</p>
        </div>

        <div className="menu-pdf-wrapper">
          <div className="menu-image-container" role={isPdf ? undefined : 'img'} aria-label="Rail House Menu">
            {isPdf ? (
              <iframe src={displayUrl} title="Rail House Menu" className="menu-pdf-frame" />
            ) : (
              <img src={displayUrl} alt="Rail House Menu" className="menu-image" />
            )}
          </div>

          <div className="menu-actions">
            <a className="menu-btn" href={displayUrl} download>Download Menu</a>
            <a className="menu-btn outline" href={displayUrl} target="_blank" rel="noopener noreferrer">
              {isPdf ? 'Open PDF' : 'Open Image'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
