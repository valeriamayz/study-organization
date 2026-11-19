# Study Organization

> Web centralizada para que los estudiantes organicen sus materias, evaluaciones, tareas y notas en un solo lugar.

## 🔗 App en vivo

> _Se agregará el enlace al publicar en T11._

## 📋 Descripción

Study Organization resuelve el problema de la información dispersa: evaluaciones en el chat del grupo, tareas en el cuaderno, fechas en el celular. Todo en una web simple, mobile-first, con estética inspirada en Notion.

**Funcionalidades del MVP:**
- Gestión de materias con color identificador
- Evaluaciones y entregas con estado (Pendiente → Rendido/Entregado)
- Tareas con prioridad y fecha límite
- Dashboard con recordatorios de los próximos 14 días
- Notas por materia

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + CSS (Vite) |
| Backend | Node.js + Express |
| Base de datos | SQLite (dev) / PostgreSQL Neon (prod) |

## 🚀 Cómo levantar el proyecto en local

### Requisitos previos
- Node.js 18 o superior
- npm

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd study-organization
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # completar las variables
npm run dev            # levanta en localhost:3000
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # completar VITE_API_URL=http://localhost:3000
npm run dev            # levanta en localhost:5173
```

## 📁 Documentación

Toda la documentación del proceso está en la carpeta [`docs/`](./docs/):

| Archivo | Contenido |
|---|---|
| `idea.md` | Qué problema resuelve y qué hace la app |
| `decisiones.md` | Decisiones tomadas con su justificación |
| `glosario.md` | Términos del negocio |
| `preguntas-abiertas.md` | Dudas pendientes |
| `spec.md` | Reglas de negocio e historias de usuario |
| `plan.md` | Arquitectura, modelo de datos y endpoints |
| `tasks.md` | Tareas del proyecto con su estado |

## 📄 Licencia

Proyecto educativo — Bootcamp IA-First, Generación T, Módulo 4/5.
