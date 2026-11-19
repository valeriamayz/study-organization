export default function Home() {
  return (
    <div className="home-page">
      <div className="page-header">
        <h1>🏠 Panel Principal</h1>
      </div>
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <h2>¡Bienvenida a Study Organization!</h2>
        <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-soft)' }}>
          Tu espacio centralizado para organizar materias, evaluaciones y tareas.
        </p>
      </div>
    </div>
  )
}
