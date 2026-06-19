import { useState, useEffect } from 'react'

export default function Admin() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('adminKey') || '')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(null)
  const [currentContentType, setCurrentContentType] = useState(null)

  useEffect(() => {
    fetch('/api/admin/menu-url')
      .then(r => r.json())
      .then(data => {
        setCurrentUrl(data.url)
        setCurrentContentType(data.contentType)
      })
      .catch(() => {})
  }, [])

  const handleKeyChange = e => {
    setApiKey(e.target.value)
    localStorage.setItem('adminKey', e.target.value)
  }

  const handleUpload = async e => {
    e.preventDefault()
    if (!file) return setStatus({ type: 'error', message: 'Please select a file.' })

    setLoading(true)
    setStatus(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'x-admin-key': apiKey },
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setCurrentUrl(data.url)
        setFile(null)
        e.target.reset()
        setStatus({ type: 'success', message: 'Menu updated successfully.' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Upload failed.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    }
    setLoading(false)
  }

  const s = {
    page: { minHeight: '100vh', background: '#111', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' },
    h1: { marginBottom: '2rem', fontSize: '1.5rem', letterSpacing: 1 },
    card: { maxWidth: 520, background: '#1e1e1e', padding: '2rem', borderRadius: 8, border: '1px solid #333' },
    label: { display: 'block', marginBottom: 6, fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
    input: { width: '100%', padding: '0.6rem 0.8rem', borderRadius: 4, border: '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' },
    field: { marginBottom: '1.5rem' },
    divider: { borderColor: '#333', margin: '1.5rem 0' },
    previewLabel: { fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
    link: { color: '#4a90d9', wordBreak: 'break-all', fontSize: '0.9rem' },
    success: { color: '#4caf50', marginBottom: '1rem', fontSize: '0.9rem' },
    error: { color: '#f44336', marginBottom: '1rem', fontSize: '0.9rem' },
    btn: { padding: '0.6rem 1.5rem', background: '#2b5cb8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' },
    btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Railhouse Admin</h1>
      <div style={s.card}>
        <div style={s.field}>
          <label style={s.label}>Admin API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={handleKeyChange}
            placeholder="Paste your API key"
            style={s.input}
          />
        </div>

        <hr style={s.divider} />

        <div style={s.field}>
          <p style={s.previewLabel}>Current Menu</p>
          {currentUrl ? (
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" style={s.link}>
              {currentContentType === 'application/pdf' ? 'PDF' : 'Image'} — View current menu
            </a>
          ) : (
            <p style={{ color: '#666', fontSize: '0.9rem' }}>No custom menu uploaded yet (showing default).</p>
          )}
        </div>

        <hr style={s.divider} />

        <form onSubmit={handleUpload}>
          <div style={s.field}>
            <label style={s.label}>Replace Menu (PDF or image)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={e => setFile(e.target.files[0])}
              style={{ color: '#ccc' }}
            />
          </div>

          {status && (
            <p style={status.type === 'success' ? s.success : s.error}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }}
          >
            {loading ? 'Uploading...' : 'Upload Menu'}
          </button>
        </form>
      </div>
    </div>
  )
}
