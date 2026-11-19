import { useState, useEffect } from 'react'
import { materiasApi } from '../services/api'
import './Materias.css'

const COLORES = [
  { nombre: 'Azul', valor: '#A9D6F5' },
  { nombre: 'Verde', valor: '#A8E6C3' },
  { nombre: 'Rosa', valor: '#F5B8C4' },
  { nombre: 'Naranja', valor: '#FFDAB3' },
  { nombre: 'Lila', valor: '#D4B8F5' },
  { nombre: 'Amarillo', valor: '#FFF3A3' },
  { nombre: 'Turquesa', valor: '#B3EDE8' },
  { nombre: 'Salmón', valor: '#FFCDB8' },
]

export default function Materias() {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: '', color: COLORES[0].valor })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    cargarMaterias()
  }, [])

  async function cargarMaterias() {
    try {
      const data = await materiasApi.getAll()
      setMaterias(data)
    } catch {
      setError('No se pudieron cargar las materias')
    } finally {
      setLoading(false)
    }
  }

  function abrirFormNuevo() {
    setEditando(null)
    setForm({ nombre: '', color: COLORES[0].valor })
    setFormError('')
    setShowForm(true)
  }

  function abrirFormEditar(materia) {
    setEditando(materia)
    setForm({ nombre: materia.nombre, color: materia.color })
    setFormError('')
    setShowForm(true)
  }

  function cerrarForm() {
    setShowForm(false)
    setFormError('')
  }

  async function guardar(e) {
    e.preventDefault()
    setFormError('')
    try {
      if (editando) {
        await materiasApi.update(editando.id, form)
      } else {
        await materiasApi.create(form)
      }
      cerrarForm()
      cargarMaterias()
    } catch (err) {
      setFormError(err.message)
    }
  }

  async function eliminar(materia) {
    if (!confirm(`¿Eliminar la materia "${materia.nombre}"?`)) return
    try {
      await materiasApi.delete(materia.id)
      cargarMaterias()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p className="loading">Cargando...</p>

  return (
    <div className="materias-page">
      <div className="page-header">
        <h1>📖 Materias</h1>
        <button className="btn btn-primary" onClick={abrirFormNuevo}>+ Nueva materia</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {/* Modal formulario */}
      {showForm && (
        <div className="modal-overlay" onClick={cerrarForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editando ? 'Editar materia' : 'Nueva materia'}</h2>
            <form onSubmit={guardar}>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej: Matemáticas"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Color *</label>
                <div className="color-picker">
                  {COLORES.map(c => (
                    <button
                      key={c.valor}
                      type="button"
                      className={`color-dot ${form.color === c.valor ? 'selected' : ''}`}
                      style={{ background: c.valor }}
                      title={c.nombre}
                      onClick={() => setForm({ ...form, color: c.valor })}
                    />
                  ))}
                </div>
              </div>

              {formError && <p className="error-msg">{formError}</p>}

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={cerrarForm}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de materias */}
      {materias.length === 0 ? (
        <div className="empty-state">
          <p>Todavía no tenés materias cargadas.</p>
          <button className="btn btn-primary" onClick={abrirFormNuevo}>Crear la primera</button>
        </div>
      ) : (
        <div className="materias-grid">
          {materias.map(m => (
            <div key={m.id} className="materia-card card" style={{ borderLeft: `5px solid ${m.color}` }}>
              <div className="materia-info">
                <span className="materia-dot" style={{ background: m.color }} />
                <span className="materia-nombre">{m.nombre}</span>
              </div>
              <div className="materia-actions">
                <button className="btn btn-secondary" onClick={() => abrirFormEditar(m)}>Editar</button>
                <button className="btn btn-danger" onClick={() => eliminar(m)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
