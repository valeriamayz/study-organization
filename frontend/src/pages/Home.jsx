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

  const { metricas, proximasEvaluaciones, tareasUrgentes } = data || {
    metricas: { totalMaterias: 0, totalEvaluacionesProximas: 0, totalTareasPendientes: 0 },
    proximasEvaluaciones: [],
    tareasUrgentes: []
  }

  return (
    <div className="home-dashboard">
      <div className="dashboard-welcome">
        <h1>👋 ¡Hola! Tu resumen de estudio</h1>
        <p className="subtitle">Mantené al día tus entregas, parciales y tareas</p>
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
          <span className="metrica-icon">⚡</span>
          <div className="metrica-content">
            <span className="metrica-numero">{metricas.totalTareasPendientes}</span>
            <span className="metrica-label">Tareas pendientes</span>
          </div>
        </Link>
      </div>

      <div className="dashboard-columns">
        {/* Próximas Evaluaciones */}
        <section className="dashboard-section card">
          <div className="section-header">
            <h2>📅 Próximas Fechas</h2>
            <Link to="/evaluaciones" className="ver-mas">Ver todas →</Link>
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
                    <span className="badge badge-pendiente">{ev.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tareas Urgentes */}
        <section className="dashboard-section card">
          <div className="section-header">
            <h2>🚨 Tareas Urgentes</h2>
            <Link to="/tareas" className="ver-mas">Gestionar →</Link>
          </div>

          {tareasUrgentes.length === 0 ? (
            <p className="empty-notice">No tenés tareas urgentes pendientes esta semana 🎉</p>
          ) : (
            <div className="tareas-urgentes-lista">
              {tareasUrgentes.map(t => (
                <div key={t.id} className="tarea-urgente-item">
                  <span className={`prioridad-dot prioridad-${t.prioridad.toLowerCase()}`} />
                  <span className="tarea-urgente-titulo">{t.titulo}</span>
                  {t.fecha_limite && <span className="tarea-urgente-fecha">{t.fecha_limite}</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
