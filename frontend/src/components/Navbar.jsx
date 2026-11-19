import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📚</span>
        <span className="navbar-title">Study Org</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            🏠 Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/materias" className={({ isActive }) => isActive ? 'active' : ''}>
            📖 Materias
          </NavLink>
        </li>
        <li>
          <NavLink to="/evaluaciones" className={({ isActive }) => isActive ? 'active' : ''}>
            📝 Evaluaciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/tareas" className={({ isActive }) => isActive ? 'active' : ''}>
            ✅ Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
