import { useState, useEffect } from 'react'
import { tareasApi } from '../services/api'
import './Tareas.css'

const PRIORIDADES = ['Alta', 'Media', 'Baja']

export default function Tareas() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevaPrioridad, setNuevaPrioridad] = useState('Media')
  const [nuevaFecha, setNuevaFecha] = useState('')
  const [filtro, setFiltro] = useState('todas') // 'todas', 'pendientes', 'completadas'

  useEffect(() => {
    cargarTareas()
  }, [])

  async function cargarTareas() {
    try {
      const data = await tareasApi.getAll()
      setTareas(data)
    } catch {
      setError('Error al cargar tareas')
    } finally {
      setLoading(false)
    }
  }

  async function agregarTarea(e) {
    e.preventDefault()
    if (!nuevoTitulo.trim()) return

    try {
      await tareasApi.create({
        titulo: nuevoTitulo,
        prioridad: nuevaPrioridad,
        fecha_limite: nuevaFecha || null
      })
      setNuevoTitulo('')
      setNuevaFecha('')
      cargarTareas()
    } catch (err) {
      alert(err.message)
    }
  }

  async function toggleCompletada(id) {
    try {
      await tareasApi.toggle(id)
      cargarTareas()
    } catch (err) {
      alert(err.message)
    }
  }

  async function eliminarTarea(id) {
    try {
      await tareasApi.delete(id)
      cargarTareas()
    } catch (err) {
      alert(err.message)
    }
  }

  const tareasFiltradas = tareas.filter(t => {
    if (filtro === 'pendientes') return !t.completada
    if (filtro === 'completadas') return t.completada
    return true
  })

  if (loading) return <p className="loading">Cargando tareas...</p>

  return (
    <div className="tareas-page">
      <div className="page-header">
        <div>
          <h1>✅ Tareas y Pendientes</h1>
          <p className="subtitle">Organizador diario estilo To-Do con prioridades</p>
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {/* Formulario rápido para crear tarea */}
      <form className="nueva-tarea-form card" onSubmit={agregarTarea}>
        <input
          type="text"
          className="tarea-input"
          placeholder="¿Qué tenés que hacer hoy? (Ej: Leer capítulo 3 de Física)"
          value={nuevoTitulo}
          onChange={e => setNuevoTitulo(e.target.value)}
          required
        />
        <div className="form-inline-controls">
          <select
            className="prioridad-select"
            value={nuevaPrioridad}
            onChange={e => setNuevaPrioridad(e.target.value)}
          >
            {PRIORIDADES.map(p => (
              <option key={p} value={p}>Prioridad {p}</option>
            ))}
          </select>
          <input
            type="date"
            className="fecha-input"
            value={nuevaFecha}
            onChange={e => setNuevaFecha(e.target.value)}
            title="Fecha límite opcional"
          />
          <button type="submit" className="btn btn-primary">+ Agregar</button>
        </div>
      </form>

      {/* Barra de Filtros */}
      <div className="filtros-bar">
        <button
          className={`filtro-btn ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas ({tareas.length})
        </button>
        <button
          className={`filtro-btn ${filtro === 'pendientes' ? 'active' : ''}`}
          onClick={() => setFiltro('pendientes')}
        >
          Pendientes ({tareas.filter(t => !t.completada).length})
        </button>
        <button
          className={`filtro-btn ${filtro === 'completadas' ? 'active' : ''}`}
          onClick={() => setFiltro('completadas')}
        >
          Completadas ({tareas.filter(t => t.completada).length})
        </button>
      </div>

      {/* Lista de Tareas */}
      <div className="tareas-lista">
        {tareasFiltradas.length === 0 ? (
          <div className="empty-state card">
            <p>No hay tareas en esta categoría. ¡Buen momento para descansar o crear una!</p>
          </div>
        ) : (
          tareasFiltradas.map(t => (
            <div key={t.id} className={`tarea-item card ${t.completada ? 'completada' : ''}`}>
              <div className="tarea-main">
                <input
                  type="checkbox"
                  className="tarea-checkbox"
                  checked={!!t.completada}
                  onChange={() => toggleCompletada(t.id)}
                />
                <span className="tarea-titulo">{t.titulo}</span>
              </div>

              <div className="tarea-meta">
                <span className={`prioridad-badge prioridad-${t.prioridad.toLowerCase()}`}>
                  {t.prioridad}
                </span>
                {t.fecha_limite && (
                  <span className="tarea-fecha">📅 {t.fecha_limite}</span>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarTarea(t.id)}
                  title="Eliminar tarea"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
