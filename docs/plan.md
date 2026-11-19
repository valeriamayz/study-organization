# plan.md — Study Organization

## Arquitectura general

```
[Navegador / Móvil]
        ↓ HTTP/JSON
[Frontend — React + Vite]  ←→  [Backend — Express + Node.js]  ←→  [SQLite]
```

- El frontend solo muestra datos y llama a la API; no tiene lógica de negocio.
- El backend valida, aplica las reglas de negocio y persiste en SQLite.
- En producción, SQLite se reemplaza por PostgreSQL (Neon) cambiando solo la capa `db/`.

---

## Justificación de tecnologías

| Decisión | Motivo |
|---|---|
| SQLite en desarrollo | Sin configuración; el archivo `.db` vive en el repo local. |
| `better-sqlite3` | API síncrona, más simple para un proyecto educativo. |
| Vite + React | Build rápido, hot reload, estándar actual para React. |
| Express | Minimal, fácil de entender, amplia documentación. |
| CSS plano (sin framework UI) | Control total del diseño; más educativo que usar Tailwind o MUI. |

---

## Modelo de datos

### Tabla `materias`
```sql
CREATE TABLE materias (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT    NOT NULL UNIQUE,
  color     TEXT    NOT NULL,          -- ej: "#A9D6F5"
  creado_en TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

### Tabla `evaluaciones`
```sql
CREATE TABLE evaluaciones (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER NOT NULL REFERENCES materias(id) ON DELETE CASCADE,
  titulo     TEXT    NOT NULL,
  fecha      TEXT    NOT NULL,          -- formato ISO: YYYY-MM-DD
  tipo       TEXT    NOT NULL           -- 'examen' | 'parcial' | 'trabajo_practico' | 'entrega'
               CHECK(tipo IN ('examen','parcial','trabajo_practico','entrega')),
  estado     TEXT    NOT NULL DEFAULT 'pendiente'
               CHECK(estado IN ('pendiente','en_preparacion','listo','rendido_entregado')),
  notas      TEXT,
  creado_en  TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

### Tabla `tareas`
```sql
CREATE TABLE tareas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo      TEXT    NOT NULL,
  prioridad   TEXT    NOT NULL
                CHECK(prioridad IN ('alta','media','baja')),
  fecha_limite TEXT   NOT NULL,          -- formato ISO: YYYY-MM-DD
  estado      TEXT    NOT NULL DEFAULT 'pendiente'
                CHECK(estado IN ('pendiente','completada')),
  creado_en   TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

### Tabla `notas`
```sql
CREATE TABLE notas (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER NOT NULL REFERENCES materias(id) ON DELETE CASCADE,
  contenido  TEXT    NOT NULL,
  creado_en  TEXT    NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);
```

> **PA01 pendiente**: si se decide vincular tareas a materias, se agregará `materia_id` a la tabla `tareas` como columna nullable con FK a `materias`.

---

## Endpoints de la API

### Materias — `/api/materias`

| Método | Ruta | Descripción | RN |
|---|---|---|---|
| GET | `/api/materias` | Listar todas las materias | — |
| POST | `/api/materias` | Crear materia | RN01, RN03 |
| PUT | `/api/materias/:id` | Editar materia | RN01, RN03 |
| DELETE | `/api/materias/:id` | Eliminar materia (con cascada) | RN02 |

### Evaluaciones — `/api/evaluaciones`

| Método | Ruta | Descripción | RN |
|---|---|---|---|
| GET | `/api/evaluaciones` | Listar evaluaciones (con filtros: `?proximas=true`, `?historicas=true`) | RN08 |
| GET | `/api/evaluaciones/recordatorios` | Evaluaciones en los próximos 14 días, no finalizadas | RN10, RN17 |
| POST | `/api/evaluaciones` | Crear evaluación | RN04, RN05, RN06 |
| PUT | `/api/evaluaciones/:id` | Editar evaluación | RN07 |

### Tareas — `/api/tareas`

| Método | Ruta | Descripción | RN |
|---|---|---|---|
| GET | `/api/tareas` | Listar tareas (con filtros: `?estado=pendiente`, `?semana=true`) | RN16 |
| GET | `/api/tareas/recordatorios` | Tareas en los próximos 14 días, pendientes | RN15, RN17 |
| POST | `/api/tareas` | Crear tarea | RN11, RN12, RN13 |
| PUT | `/api/tareas/:id` | Editar tarea / marcar completada | RN14 |

### Notas — `/api/materias/:id/notas`

| Método | Ruta | Descripción | RN |
|---|---|---|---|
| GET | `/api/materias/:id/notas` | Obtener notas de una materia | RN19 |
| PUT | `/api/materias/:id/notas` | Crear o reemplazar la nota de una materia | RN19, RN20 |

### Dashboard — `/api/dashboard`

| Método | Ruta | Descripción | RN |
|---|---|---|---|
| GET | `/api/dashboard` | Resumen: próximas evaluaciones + tareas urgentes + recordatorios | RN09, RN10, RN15, RN17, RN18 |

---

## Dónde vive cada regla de negocio

| RN | Ubicación en el código |
|---|---|
| RN01, RN03 | `backend/src/services/materias.service.js` |
| RN02 | Base de datos (CASCADE) + confirmación en frontend |
| RN04–RN07 | `backend/src/services/evaluaciones.service.js` |
| RN08–RN10 | `backend/src/services/evaluaciones.service.js` (queries con filtro de fecha) |
| RN11–RN16 | `backend/src/services/tareas.service.js` |
| RN17–RN18 | `backend/src/services/dashboard.service.js` |
| RN19, RN20 | `backend/src/services/notas.service.js` |

---

## Decisiones técnicas

**DT01** — Formato de fechas: ISO 8601 (`YYYY-MM-DD`) en la base de datos; el frontend formatea para mostrar.

**DT02** — Validación: se valida en el backend (fuente de verdad) y también en el frontend (UX).

**DT03** — Errores HTTP: 400 para validación, 404 para recurso no encontrado, 409 para conflictos (ej: nombre duplicado), 500 para errores inesperados.

**DT04** — CORS: el backend solo acepta pedidos desde la URL del frontend (variable de entorno `FRONTEND_URL`).

**DT05** — Variables de entorno: `DATABASE_URL` (producción), `FRONTEND_URL`, `PORT`. Archivo `.env` en `.gitignore`.

---

## Preguntas para el analista

1. ¿Las tareas se vinculan a una materia? (PA01 — bloquea el modelo de datos de tareas)
2. ¿Las notas de materia son texto plano o enriquecido? (PA02 — afecta el componente de edición)
