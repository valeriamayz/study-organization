# tasks.md — Study Organization

## Formato de cada tarea
Cada tarea tiene: número, título, agente responsable, qué hacer, RN/HU que cubre, dependencias, criterio de terminado y estado.

Estados: `[ ]` = pendiente · `[x]` = hecha · `[-]` = en curso

---

## T01 — Esqueleto inicial del repositorio

- **Agente**: Arquitecto + Desarrollador Backend + Desarrollador Frontend
- **Qué hacer**: inicializar el repositorio Git, crear la estructura de carpetas `frontend/` y `backend/`, agregar `.gitignore`, configurar Vite + React en el frontend y Express en el backend.
- **RN/HU**: —
- **Dependencias**: ninguna
- **Criterio de terminado**: `npm run dev` levanta el frontend en `localhost:5173`; `node src/index.js` levanta el backend en `localhost:3000` y responde `{ ok: true }` en `GET /health`.
- **Estado**: `[ ]`

---

## T02 — Base de datos SQLite y esquema inicial

- **Agente**: Arquitecto + Desarrollador Backend
- **Qué hacer**: instalar `better-sqlite3`, crear el archivo de migración con las tablas `materias`, `evaluaciones`, `tareas` y `notas`, y el script de seed con datos de ejemplo.
- **RN/HU**: RN01, RN04, RN11, RN19
- **Dependencias**: T01
- **Criterio de terminado**: el backend levanta, crea las tablas automáticamente al iniciar, y los datos de ejemplo se cargan si la base está vacía.
- **Estado**: `[ ]`

---

## T03 — Sistema de diseño base (tokens, tipografía, componentes)

- **Agente**: Desarrollador Frontend
- **Qué hacer**: crear `frontend/src/styles/tokens.css` con variables CSS (colores, tipografía, espaciado, radios), `reset.css`, y los componentes base: `Button`, `Card`, `Badge`, `Input`, `Select`, `Modal`.
- **RN/HU**: —
- **Dependencias**: T01
- **Criterio de terminado**: existe una página de muestra (`/design`) donde se ven todos los componentes con la paleta definida.
- **Estado**: `[ ]`

---

## T04 — Materias: API y pantalla

- **Agente**: Tester → Desarrollador Backend → Desarrollador Frontend → Revisor
- **Qué hacer**: implementar los 4 endpoints de `/api/materias`, los tests de cada endpoint, y la pantalla de gestión de materias en el frontend (listar, crear, editar, eliminar con confirmación).
- **RN/HU**: RN01, RN02, RN03 · HU01, HU02, HU03
- **Dependencias**: T02, T03
- **Criterio de terminado**: todos los tests pasan; se puede crear, editar y eliminar una materia desde el navegador.
- **Estado**: `[ ]`

---

## T05 — Evaluaciones: API y pantalla

- **Agente**: Tester → Desarrollador Backend → Desarrollador Frontend → Revisor
- **Qué hacer**: implementar los endpoints de `/api/evaluaciones` (incluido el de recordatorios), los tests, y la pantalla de evaluaciones (lista de próximas + historial + formulario de creación/edición).
- **RN/HU**: RN04–RN10 · HU04, HU05, HU06
- **Dependencias**: T04
- **Criterio de terminado**: todos los tests pasan; se puede crear y editar una evaluación, cambiar su estado, y ver el historial.
- **Estado**: `[ ]`

---

## T06 — Tareas: API y pantalla

- **Agente**: Tester → Desarrollador Backend → Desarrollador Frontend → Revisor
- **Qué hacer**: implementar los endpoints de `/api/tareas` (incluido el de recordatorios), los tests, y la pantalla de tareas (lista ordenada por prioridad + formulario de creación/edición + botón "completar").
- **RN/HU**: RN11–RN16 · HU07, HU08
- **Dependencias**: T04
- **Criterio de terminado**: todos los tests pasan; se puede crear una tarea, cambiar su prioridad y marcarla como completada.
- **Estado**: `[ ]`

---

## T07 — Dashboard y recordatorios

- **Agente**: Tester → Desarrollador Backend → Desarrollador Frontend → Revisor
- **Qué hacer**: implementar `GET /api/dashboard`, los tests, y la pantalla de dashboard con las tres secciones: próximas evaluaciones, tareas urgentes y recordatorios.
- **RN/HU**: RN09, RN10, RN15, RN17, RN18 · HU09
- **Dependencias**: T05, T06
- **Criterio de terminado**: todos los tests pasan; el dashboard muestra datos reales y los recordatorios respetan la ventana de 14 días.
- **Estado**: `[ ]`

---

## T08 — Notas por materia

- **Agente**: Tester → Desarrollador Backend → Desarrollador Frontend → Revisor
- **Qué hacer**: implementar los endpoints de `/api/materias/:id/notas`, los tests, y la sección de notas dentro de la pantalla de detalle de una materia.
- **RN/HU**: RN19, RN20 · HU10
- **Dependencias**: T04
- **Criterio de terminado**: todos los tests pasan; se puede escribir, editar y ver la nota de cada materia.
- **Estado**: `[ ]`

---

## T09 — Integración y pruebas generales

- **Agente**: Tester + Revisor
- **Qué hacer**: probar el flujo completo end-to-end, verificar los casos borde (CB01–CB05), armar la colección de Postman con todos los endpoints y documentar los resultados en el informe.
- **RN/HU**: todos
- **Dependencias**: T07, T08
- **Criterio de terminado**: ningún caso borde produce error inesperado; la colección de Postman está exportada en `docs/postman_collection.json`.
- **Estado**: `[ ]`

---

## T10 — Preparación para autenticación futura

- **Agente**: Arquitecto + Desarrollador Backend
- **Qué hacer**: agregar middleware de autenticación opcional (stub), documentar en `plan.md` la estrategia sugerida (JWT), y asegurarse de que las rutas estén estructuradas para aceptar un `userId` en el futuro.
- **RN/HU**: D02 (decisión de arquitectura)
- **Dependencias**: T09
- **Criterio de terminado**: el backend compila y los tests existentes siguen pasando; hay un comentario claro en el código donde se agregará el middleware real.
- **Estado**: `[ ]`

---

## T11 — Despliegue y verificación móvil

- **Agente**: Arquitecto + Revisor
- **Qué hacer**: desplegar el frontend en Netlify, el backend en Render, configurar las variables de entorno, actualizar el CORS del backend, y verificar que la app funciona desde un celular.
- **RN/HU**: —
- **Dependencias**: T10
- **Criterio de terminado**: la URL de Netlify es pública, el backend en Render responde, y la app se ve bien en móvil.
- **Estado**: `[ ]`

---

## T12 — README final

- **Agente**: Analista + Revisor
- **Qué hacer**: redactar el README con: descripción del proyecto, capturas de pantalla, stack, cómo levantar el proyecto en local, enlace público de la app y enlace al repositorio.
- **RN/HU**: —
- **Dependencias**: T11
- **Criterio de terminado**: el README tiene el enlace público y se puede seguir para levantar el proyecto desde cero.
- **Estado**: `[ ]`
