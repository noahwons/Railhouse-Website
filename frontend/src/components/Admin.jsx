import { useState, useEffect } from 'react'

const DEFAULT_EVENTS = [
  { id: 1, title: 'Wing Wednesday', description: '50% off all wing orders every Wednesday night', day: 'Every Wednesday', time: '5:00 PM - Close', recurring: true },
  { id: 2, title: 'Happy Hour', description: '$1 off all draft beers and well drinks', day: 'Monday - Friday', time: '3:00 PM - 6:00 PM', recurring: true },
  { id: 3, title: 'Trivia Night', description: 'Test your knowledge for a chance to win bar tabs and prizes', day: 'Every Thursday', time: '7:00 PM - 9:00 PM', recurring: true },
  { id: 4, title: 'Live Music Saturday', description: 'Live local bands every Saturday night', day: 'Every Saturday', time: '8:00 PM - 11:00 PM', recurring: true },
  { id: 5, title: 'Sunday Funday', description: 'Bottomless mimosas with any brunch entrée', day: 'Every Sunday', time: '11:00 AM - 3:00 PM', recurring: true },
]

const s = {
  page: { minHeight: '100vh', background: '#111', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' },
  h1: { marginBottom: '2rem', fontSize: '1.5rem', letterSpacing: 1 },
  tabs: { display: 'flex', gap: 4, marginBottom: '2rem' },
  tab: (active) => ({ padding: '0.5rem 1.25rem', background: active ? '#2b5cb8' : '#1e1e1e', color: active ? '#fff' : '#aaa', border: '1px solid ' + (active ? '#2b5cb8' : '#333'), borderRadius: 4, cursor: 'pointer', fontWeight: active ? 700 : 400 }),
  card: { maxWidth: 640, background: '#1e1e1e', padding: '2rem', borderRadius: 8, border: '1px solid #333' },
  label: { display: 'block', marginBottom: 6, fontSize: '0.82rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1 },
  input: { width: '100%', padding: '0.5rem 0.7rem', borderRadius: 4, border: '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box', fontSize: '0.9rem' },
  field: { marginBottom: '1.25rem' },
  divider: { borderColor: '#333', margin: '1.5rem 0' },
  success: { color: '#4caf50', marginBottom: '1rem', fontSize: '0.9rem' },
  error: { color: '#f44336', marginBottom: '1rem', fontSize: '0.9rem' },
  btn: { padding: '0.55rem 1.25rem', background: '#2b5cb8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' },
  btnGhost: { padding: '0.45rem 1rem', background: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: 4, cursor: 'pointer', fontSize: '0.85rem' },
  btnDanger: { padding: '0.35rem 0.75rem', background: 'transparent', color: '#f44336', border: '1px solid #f4433655', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem' },
  eventCard: { background: '#252525', border: '1px solid #333', borderRadius: 6, padding: '1rem', marginBottom: '0.75rem' },
  row: { display: 'flex', gap: 8, alignItems: 'center' },
}

function MenuTab({ apiKey }) {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(null)
  const [currentContentType, setCurrentContentType] = useState(null)

  useEffect(() => {
    fetch('/api/admin/menu-url')
      .then(r => r.json())
      .then(data => { setCurrentUrl(data.url); setCurrentContentType(data.contentType) })
      .catch(() => {})
  }, [])

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
      let data = {}
      try { data = await res.json() } catch {}
      if (res.ok) {
        setCurrentUrl(data.url)
        setFile(null)
        e.target.reset()
        setStatus({ type: 'success', message: 'Menu updated successfully.' })
      } else {
        setStatus({ type: 'error', message: `${res.status} ${res.statusText}: ${data.error || 'No error body'}` })
      }
    } catch (err) {
      setStatus({ type: 'error', message: `Fetch failed: ${err.message}` })
    }
    setLoading(false)
  }

  return (
    <div style={s.card}>
      <div style={s.field}>
        <p style={s.label}>Current Menu</p>
        {currentUrl ? (
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4a90d9', fontSize: '0.9rem' }}>
            {currentContentType === 'application/pdf' ? 'PDF' : 'Image'} — View current menu
          </a>
        ) : (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>No custom menu uploaded (showing default).</p>
        )}
      </div>
      <hr style={s.divider} />
      <form onSubmit={handleUpload}>
        <div style={s.field}>
          <label style={s.label}>Replace Menu (PDF or image)</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={e => setFile(e.target.files[0])} style={{ color: '#ccc' }} />
        </div>
        {status && <p style={status.type === 'success' ? s.success : s.error}>{status.message}</p>}
        <button type="submit" disabled={loading} style={{ ...s.btn, ...(loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}) }}>
          {loading ? 'Uploading...' : 'Upload Menu'}
        </button>
      </form>
    </div>
  )
}

function EventsTab({ apiKey }) {
  const [events, setEvents] = useState(null)
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => setEvents(data))
      .catch(() => setEvents(DEFAULT_EVENTS))
  }, [])

  const updateEvent = (id, field, value) => {
    setEvents(ev => ev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const deleteEvent = id => {
    setEvents(ev => ev.filter(e => e.id !== id))
  }

  const addEvent = () => {
    const newId = Date.now()
    setEvents(ev => [...ev, { id: newId, title: '', description: '', day: '', time: '', recurring: false }])
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
        body: JSON.stringify(events),
      })
      let data = {}
      try { data = await res.json() } catch {}
      if (res.ok) {
        setStatus({ type: 'success', message: 'Events saved successfully.' })
      } else {
        setStatus({ type: 'error', message: `${res.status} ${res.statusText}: ${data.error || 'No error body'}` })
      }
    } catch (err) {
      setStatus({ type: 'error', message: `Fetch failed: ${err.message}` })
    }
    setSaving(false)
  }

  if (!events) return <p style={{ color: '#666' }}>Loading events...</p>

  return (
    <div style={{ maxWidth: 680 }}>
      {events.map(event => (
        <div key={event.id} style={s.eventCard}>
          <div style={{ ...s.row, marginBottom: 8, justifyContent: 'space-between' }}>
            <input
              value={event.title}
              onChange={e => updateEvent(event.id, 'title', e.target.value)}
              placeholder="Event title"
              style={{ ...s.input, fontWeight: 700, flex: 1 }}
            />
            <button onClick={() => deleteEvent(event.id)} style={s.btnDanger}>Remove</button>
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              value={event.description}
              onChange={e => updateEvent(event.id, 'description', e.target.value)}
              placeholder="Description"
              style={s.input}
            />
          </div>
          <div style={{ ...s.row, gap: 8 }}>
            <input
              value={event.day}
              onChange={e => updateEvent(event.id, 'day', e.target.value)}
              placeholder="Day (e.g. Every Wednesday)"
              style={{ ...s.input, flex: 1 }}
            />
            <input
              value={event.time}
              onChange={e => updateEvent(event.id, 'time', e.target.value)}
              placeholder="Time (e.g. 7:00 PM - 9:00 PM)"
              style={{ ...s.input, flex: 1 }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#aaa', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              <input
                type="checkbox"
                checked={event.recurring}
                onChange={e => updateEvent(event.id, 'recurring', e.target.checked)}
              />
              Weekly
            </label>
          </div>
        </div>
      ))}

      <button onClick={addEvent} style={{ ...s.btnGhost, marginBottom: '1.5rem' }}>+ Add Event</button>

      <div>
        {status && <p style={status.type === 'success' ? s.success : s.error}>{status.message}</p>}
        <button onClick={handleSave} disabled={saving} style={{ ...s.btn, ...(saving ? { opacity: 0.6, cursor: 'not-allowed' } : {}) }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default function Admin() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('adminKey') || '')
  const [tab, setTab] = useState('menu')

  const handleKeyChange = e => {
    setApiKey(e.target.value)
    localStorage.setItem('adminKey', e.target.value)
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Railhouse Admin</h1>

      <div style={{ ...s.card, maxWidth: 400, marginBottom: '2rem' }}>
        <label style={s.label}>Admin API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={handleKeyChange}
          placeholder="Paste your API key"
          style={s.input}
        />
      </div>

      <div style={s.tabs}>
        <button style={s.tab(tab === 'menu')} onClick={() => setTab('menu')}>Menu</button>
        <button style={s.tab(tab === 'events')} onClick={() => setTab('events')}>Events & Specials</button>
      </div>

      {tab === 'menu' && <MenuTab apiKey={apiKey} />}
      {tab === 'events' && <EventsTab apiKey={apiKey} />}
    </div>
  )
}
