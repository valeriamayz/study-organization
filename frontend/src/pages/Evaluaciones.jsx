import { useState, useEffect } from 'react'
import { evaluacionesApi, materiasApi } from '../services/api'
import './Evaluaciones.css'

const TIPOS = ['Examen', 'Parcial', 'Trabajo Práctico', 'Entrega']
const ESTADOS = ['Pendiente', 'En preparación', 'Listo', 'Rendido/Entregado']

export default function Evaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([])
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('todas') // 'todas', 'proximas', 'rendidas'

  const [showModal, setShowModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    materia_id: '',
    titulo: '',
    fecha: '',
    tipo: 'Parcial',
    estado: 'Pendiente',
    notas: ''
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [evalsData, matsData] = await Promise.all([
        evaluacionesApi.getAll(),
        materiasApi.getAll()
      ])
      setEvaluaciones(evalsData)
      setMaterias(matsData)
      if (matsData.length > 0 && !form.materia_id) {
        setForm(prev => ({ ...prev, materia_id: matsData[0].id }))
      }
    } catch {
      setError('Error al cargar datos de evaluaciones')
    } finally {
      setLoading(false)
    }
  }

  function abrirModalNuevo() {
    setEditando(null)
    setForm({
      materia_id: materias[0]?.id || '',
      titulo: '',
      fecha: new Date().toISOString().split('T')[0],
      tipo: 'Parcial',
      estado: 'Pendiente',
      notas: ''
    })
    setFormError('')
    setShowModal(true)
  }

  function abrirModalEditar(ev) {
    setEditando(ev)
    setForm({
      materia_id: ev.materia_id,
      titulo: ev.titulo,
      fecha: ev.fecha,
      tipo: ev.tipo,
      estado: ev.estado,
      notas: ev.notas || ''
    })
    setFormError('')
    setShowModal(true)
  }

  async function guardar(e) {
    e.preventDefault()
    setFormError('')
    try {
      if (editando) {
        await evaluacionesApi.update(editando.id, form)
      } else {
        await evaluacionesApi.create(form)
      }
      setShowModal(false)
      cargarDatos()
    } catch (err) {
      setFormError(err.message)
    }
  }

  async function cambiarEstado(ev, nuevoEstado) {
    try {
      await evaluacionesApi.update(ev.id, { estado: nuevoEstado })
      cargarDatos()
    } catch (err) {
      alert(err.message)
    }
  }

  async function eliminar(ev) {
    if (!confirm(`¿Eliminar la evaluación "${ev.titulo}"?`)) return
    try {
      await evaluacionesApi.delete(ev.id)
      cargarDatos()
    } catch (err) {
      alert(err.message)
    }
  }

  const evaluacionesFiltradas = evaluaciones.filter(ev => {
    if (filtro === 'proximas') return ev.estado !== 'Rendido/Entregado'
    if (filtro === 'rendidas') return ev.estado === 'Rendido/Entregado'
    return true
  })

  if (loading) return <p className="loading">Cargando evaluaciones...</p>

  return (
    <div className="evaluaciones-page">
      <div className="page-header">
        <div>
          <h1>📝 Evaluaciones y Entregas</h1>
          <p className="subtitle">Fechas de exámenes, entregas y parciales</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={abrirModalNuevo}
          disabled={materias.length === 0}
        >
          + Nueva evaluación
        </button>
      </div>

      {materias.length === 0 && (
        <div className="card alert-card">
          ⚠️ Primero debes registrar al menos una <strong>Materia</strong> para poder asignarle evaluaciones.
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      {/* Filtros */}
      <div className="filtros-bar">
        <button
          className={`filtro-btn ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas ({evaluaciones.length})
        </button>
        <button
          className={`filtro-btn ${filtro === 'proximas' ? 'active' : ''}`}
          onClick={() => setFiltro('proximas')}
        >
          ⏳ Próximas ({evaluaciones.filter(e => e.estado !== 'Rendido/Entregado').length})
        </button>
        <button
          className={`filtro-btn ${filtro === 'rendidas' ? 'active' : ''}`}
          onClick={() => setFiltro('rendidas')}
        >
          ✅ Finalizadas ({evaluaciones.filter(e => e.estado === 'Rendido/Entregado').length})
        </button>
      </div>

      {/* Grid de Evaluaciones */}
      {evaluacionesFiltradas.length === 0 ? (
        <div className="empty-state card">
          <p>No hay evaluaciones para mostrar en este filtro.</p>
        </div>
      ) : (
        <div className="evals-grid">
          {evaluacionesFiltradas.map(ev => (
            <div key={ev.id} className="eval-card card" style={{ borderTop: `4px solid ${ev.materia_color || '#A9D6F5'}` }}>
              <div className="eval-header">
                <span className="eval-materia-badge" style={{ backgroundColor: ev.materia_color + '40', color: '#111' }}>
                  {ev.materia_nombre}
                </span>
                <span className="eval-tipo">{ev.tipo}</span>
              </div>

              <h3 className="eval-titulo">{ev.titulo}</h3>

              <div className="eval-meta">
                <span className="eval-fecha">📅 {ev.fecha}</span>
              </div>

              {ev.notas && <p className="eval-notas">"{ev.notas}"</p>}

              <div className="eval-footer">
                <select
                  className={`estado-select estado-${ev.estado.toLowerCase().replace(/[\/\s]/g, '-')}`}
                  value={ev.estado}
                  onChange={(e) => cambiarEstado(ev, e.target.value)}
                >
                  {ESTADOS.map(est => (
                    <option key={est} value={est}>{est}</option>
                  ))}
                </select>

                <div className="eval-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => abrirModalEditar(ev)}>✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminar(ev)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Formulario */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editando ? 'Editar evaluación' : 'Nueva evaluación'}</h2>
            <form onSubmit={guardar}>
              <div className="form-group">
                <label>Materia *</label>
                <select
                  value={form.materia_id}
                  onChange={e => setForm({ ...form, materia_id: e.target.value })}
                  required
                >
                  {materias.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={e => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ej: Primer Parcial Teórico"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha *</label>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm({ ...form, fecha: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo *</label>
                  <select
                    value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value })}
                  >
                    {TIPOS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select
                  value={form.estado}
                  onChange={e => setForm({ ...form, estado: e.target.value })}
                >
                  {ESTADOS.map(est => (
                    <option key={est} value={est}>{est}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Notas / Temas (opcional)</label>
                <textarea
                  rows="2"
                  value={form.notas}
                  onChange={e => setForm({ ...form, notas: e.target.value })}
                  placeholder="Capítulos, aula, apuntes..."
                />
              </div>

              {formError && <p className="error-msg">{formError}</p>}

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
