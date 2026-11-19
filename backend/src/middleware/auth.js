/**
 * Middleware stub para autenticación futura (T10)
 * 
 * En versiones posteriores, este middleware verificará un JSON Web Token (JWT)
 * o una sesión de usuario en la cabecera Authorization: Bearer <token>.
 * 
 * Actualmente permite el paso agregando un usuario ficticio por defecto.
 */
function authMiddleware(req, res, next) {
  // Stub: inyecta usuario default para preparar el sistema a multi-usuario
  req.user = {
    id: 1,
    nombre: 'Estudiante',
    email: 'estudiante@demo.com'
  }
  next()
}

module.exports = authMiddleware
