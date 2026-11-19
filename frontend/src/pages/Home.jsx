import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dashboardApi } from '../services/api'
import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDashboard()
  }, [])

  async function cargarDashboard() {
    try {
      const resumen = await dashboardApi.getResumen()
      setData(resumen)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="loading">Cargando tu organizador...</p>

  const { metricas, proximasEvaluaciones, tareasUrgentes, materias } = data || {
    metricas: { totalMaterias: 0, totalEvaluacionesProximas: 0, totalTareasPendientes: 0, totalTareasCompletadas: 0 },
    proximasEvaluaciones: [],
    tareasUrgentes: [],
    materias: []
  }

  const totalTareas = (metricas.totalTareasPendientes || 0) + (metricas.totalTareasCompletadas || 0)
  const porcentajeProgreso = totalTareas > 0 ? Math.round((metricas.totalTareasCompletadas / totalTareas) * 100) : 0

  return (
    <div className="home-dashboard">
      <div className="dashboard-welcome">
        <h1>👋 ¡Hola! Tu resumen de estudio</h1>
        <p className="subtitle">Mantené al día tus entregas, parciales y tareas en un solo lugar</p>
      </div>

      {/* Métricas destacadas */}
      <div className="metricas-grid">
        <Link to="/materias" className="metrica-card card">
          <span className="metrica-icon">📖</span>
          <div className="metrica-content">
            <span className="metrica-numero">{metricas.totalMaterias}</span>
            <span className="metrica-label">Materias cursando</span>
          </div>
        </Link>

        <Link to="/evaluaciones" className="metrica-card card">
          <span className="metrica-icon">📝</span>
          <div className="metrica-content">
            <span className="metrica-numero">{metricas.totalEvaluacionesProximas}</span>
            <span className="metrica-label">Próximas evaluaciones</span>
          </div>
        </Link>

        <Link to="/tareas" className="metrica-card card">
          <span className="metrica-icon">✅</span>
          <div className="metrica-content">
            <span className="metrica-numero">{metricas.totalTareasPendientes}</span>
            <span className="metrica-label">Tareas pendientes</span>
          </div>
        </Link>
      </div>

      {/* Barra de Progreso de Tareas */}
      {totalTareas > 0 && (
        <div className="progreso-card card">
          <div className="progreso-header">
            <span>🎯 <strong>Progreso de Tareas:</strong> {metricas.totalTareasCompletadas} de {totalTareas} completadas</span>
            <span className="progreso-porcentaje">{porcentajeProgreso}%</span>
          </div>
          <div className="barra-fondo">
            <div className="barra-llenado" style={{ width: `${porcentajeProgreso}%` }}></div>
          </div>
        </div>
      )}

      {/* Accesos directos a Materias con su color */}
      {materias && materias.length > 0 && (
        <div className="materias-chips-container">
          <span className="chips-label">Tus materias:</span>
          <div className="materias-chips">
            {materias.map(m => (
              <Link
                key={m.id}
                to="/materias"
                className="materia-chip"
                style={{ borderLeft: `4px solid ${m.color}`, backgroundColor: m.color + '25' }}
              >
                {m.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-columns">
        {/* Próximas Evaluaciones */}
        <section className="dashboard-section card">
          <div className="section-header">
            <h2>📅 Próximas Fechas (14 días)</h2>
            <Link to="/evaluaciones" className="ver-mas">Ver tablero →</Link>
          </div>

          {proximasEvaluaciones.length === 0 ? (
            <p className="empty-notice">No tenés evaluaciones programadas para las próximas 2 semanas 🙌</p>
          ) : (
            <div className="fechas-lista">
              {proximasEvaluaciones.map(ev => (
                <div key={ev.id} className="fecha-item" style={{ borderLeft: `4px solid ${ev.materia_color || '#A9D6F5'}` }}>
                  <div className="fecha-detalles">
                    <strong>{ev.titulo}</strong>
                    <span className="fecha-sub">{ev.materia_nombre} • {ev.tipo}</span>
                  </div>
                  <div className="fecha-dia">
                    <span>{ev.fecha}</span>
                    <span className={`badge badge-${ev.estado.toLowerCase().replace(/[\/\s]/g, '-')}`}>{ev.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tareas Urgentes */}
        <section className="dashboard-section card">
          <div className="section-header">
            <h2>🚨 Tareas Urgentes de la Semana</h2>
            <Link to="/tareas" className="ver-mas">Gestionar to-do →</Link>
          </div>

          {tareasUrgentes.length === 0 ? (
            <p className="empty-notice">No tenés tareas urgentes pendientes esta semana 🎉</p>
          ) : (
            <div className="tareas-urgentes-lista">
              {tareasUrgentes.map(t => (
                <div key={t.id} className="tarea-urgente-item">
                  <span className={`prioridad-dot prioridad-${t.prioridad.toLowerCase()}`} title={`Prioridad ${t.prioridad}`} />
                  <span className="tarea-urgente-titulo">{t.titulo}</span>
                  {t.fecha_limite && <span className="tarea-urgente-fecha">📅 {t.fecha_limite}</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
