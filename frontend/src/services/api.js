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
