import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Events from './components/Events'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'

function MainSite() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Events />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
