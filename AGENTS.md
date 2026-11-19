# AGENTS.md — Study Organization

## ¿Qué es este proyecto?

**Study Organization** es una web para que los estudiantes organicen sus materias, evaluaciones, tareas y notas en un solo lugar. No hay roles de docente ni autenticación en el MVP.

---

## Fuente de verdad

| Documento | Qué contiene |
|---|---|
| `docs/idea.md` | Qué problema resuelve y qué hace la app |
| `docs/decisiones.md` | Cada decisión tomada, con su pregunta y motivo |
| `docs/glosario.md` | Definición de cada término del negocio |
| `docs/preguntas-abiertas.md` | Dudas pendientes de resolver |
| `docs/spec.md` | Reglas de negocio (RN) e historias de usuario (HU) — es el documento central |
| `docs/plan.md` | Arquitectura, modelo de datos, endpoints y decisiones técnicas |
| `docs/tasks.md` | Lista completa de tareas atómicas con su estado |

**Regla fundamental**: si algo no está en `spec.md`, no se implementa. Si hay ambigüedad, se registra en `preguntas-abiertas.md` y se consulta antes de escribir código.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + CSS (mobile-first), Vite |
| Backend | Node.js + Express |
| Base de datos | SQLite (via `better-sqlite3`) |
| Control de versiones | Git + GitHub |
| Despliegue sugerido | Frontend → Netlify · Backend → Render · BD en producción → Neon (PostgreSQL) |

---

## Estructura de carpetas

```
study-organization/
├── frontend/          ← App React (Vite)
│   ├── src/
│   │   ├── components/   ← Componentes reutilizables
│   │   ├── pages/        ← Vistas principales (Dashboard, Lista, etc.)
│   │   ├── styles/       ← Sistema de diseño: tokens, base, componentes
│   │   └── api/          ← Funciones que llaman al backend
│   └── ...
├── backend/           ← API Express
│   ├── src/
│   │   ├── routes/       ← Endpoints por entidad
│   │   ├── controllers/  ← Lógica de cada ruta
│   │   ├── services/     ← Reglas de negocio
│   │   ├── db/           ← Configuración de SQLite y queries
│   │   └── middleware/   ← CORS, validación, errores
│   └── ...
├── docs/              ← Toda la documentación del proyecto
└── README.md
```

---

## Reglas generales para todos los agentes

1. **No inventar**: si un requisito no está en `spec.md`, no se implementa. Se registra la duda.
2. **No cambiar el stack** sin aprobación explícita.
3. **Git es de la responsable**: ningún agente ejecuta `git commit` ni `git push`. Solo se propone el mensaje de commit.
4. **Un commit por tarea**: al terminar cada tarea se propone un commit atómico con el mensaje en formato `feat(T0X): descripción breve`.
5. **Separación de responsabilidades**: la UI no tiene lógica de negocio; la lógica va en los servicios del backend.
6. **Secretos fuera del código**: las credenciales y cadenas de conexión van en `.env` (incluido en `.gitignore`).
7. **Tests primero**: el tester escribe los tests antes de que el desarrollador implemente. Una tarea está terminada cuando sus tests pasan.

---

## Agentes del proyecto

### Analista
- **Qué hace**: define y refina los requisitos. Redacta y actualiza `spec.md`, `decisiones.md` y `preguntas-abiertas.md`. Pide aclaraciones antes de que el arquitecto diseñe.
- **No hace**: escribir código ni tomar decisiones técnicas.

### Arquitecto
- **Qué hace**: diseña la estructura técnica. Escribe y mantiene `docs/plan.md`: modelo de datos, endpoints, decisiones de arquitectura.
- **No hace**: escribir código de negocio ni UI.

### Desarrollador Backend
- **Qué hace**: implementa los endpoints y las reglas de negocio en `backend/src/`. Sigue el plan del arquitecto y las reglas de `spec.md`.
- **No hace**: modificar tests ya escritos por el tester.

### Desarrollador Frontend
- **Qué hace**: implementa las pantallas y componentes en `frontend/src/`. Consume la API del backend.
- **No hace**: poner lógica de negocio en la UI; eso va en el backend.

### Tester
- **Qué hace**: escribe los tests (unitarios e integración) antes de que el desarrollador implemente. Verifica que los tests pasen antes de dar la tarea por terminada.
- **No hace**: modificar el código de producción para que pasen los tests.

### Revisor
- **Qué hace**: revisa que el código esté limpio, legible y sin errores evidentes. Da el visto bueno antes del commit.
- **No hace**: reescribir código funcional por preferencias estéticas.

---

## Ciclo de trabajo por tarea

```
1. Analista confirma que la tarea tiene requisitos claros en spec.md
2. Arquitecto revisa que el plan técnico esté actualizado
3. Tester escribe los tests (en rojo 🔴)
4. Desarrollador implementa hasta que los tests pasen (en verde 🟢)
5. Desarrollador hace refactor si es necesario (sin romper tests)
6. Revisor da el visto bueno
7. Se propone el mensaje de commit → la responsable ejecuta git commit + git push
```
