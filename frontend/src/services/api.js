const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${endpoint}`, options)
  const data = await res.json()

  if (!res.ok) throw new Error(data.error || 'Error en la solicitud')
  return data
}

// Materias
export const materiasApi = {
  getAll: () => request('GET', '/api/materias'),
  getById: (id) => request('GET', `/api/materias/${id}`),
  create: (data) => request('POST', '/api/materias', data),
  update: (id, data) => request('PUT', `/api/materias/${id}`, data),
  delete: (id) => request('DELETE', `/api/materias/${id}`)
}

// Evaluaciones
export const evaluacionesApi = {
  getAll: (params = '') => request('GET', `/api/evaluaciones${params}`),
  getById: (id) => request('GET', `/api/evaluaciones/${id}`),
  create: (data) => request('POST', '/api/evaluaciones', data),
  update: (id, data) => request('PUT', `/api/evaluaciones/${id}`, data),
  delete: (id) => request('DELETE', `/api/evaluaciones/${id}`)
}

// Tareas
export const tareasApi = {
  getAll: (params = '') => request('GET', `/api/tareas${params}`),
  create: (data) => request('POST', '/api/tareas', data),
  toggle: (id) => request('PATCH', `/api/tareas/${id}/toggle`),
  update: (id, data) => request('PUT', `/api/tareas/${id}`, data),
  delete: (id) => request('DELETE', `/api/tareas/${id}`)
}

// Notas
export const notasApi = {
  getAll: (materia_id = '') => request('GET', `/api/notas${materia_id ? `?materia_id=${materia_id}` : ''}`),
  create: (data) => request('POST', '/api/notas', data),
  update: (id, data) => request('PUT', `/api/notas/${id}`, data),
  delete: (id) => request('DELETE', `/api/notas/${id}`)
}

// Dashboard
export const dashboardApi = {
  getResumen: () => request('GET', '/api/dashboard')
}
