import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Materias from './pages/Materias'
import Evaluaciones from './pages/Evaluaciones'
import Tareas from './pages/Tareas'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materias" element={<Materias />} />
            <Route path="/evaluaciones" element={<Evaluaciones />} />
            <Route path="/tareas" element={<Tareas />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
