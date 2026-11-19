# 📋 Informe Técnico del Proyecto — Study Organization

**Bootcamp IA-First · Generación T · Proyecto Final**  
**Autora**: Estudiante en formación  
**Fecha**: Noviembre 2026  

---

## 1. Resumen Ejecutivo
Study Organization es una solución integral desarrollada para centralizar y simplificar la gestión académica de estudiantes. Permite administrar materias, calendarizar evaluaciones y entregas con estados de avance, organizar tareas con prioridad (estilo to-do) y registrar notas de estudio por asignatura, complementado con un panel de control (Dashboard) de alertas tempranas.

---

## 2. Justificación del Orden de las Tareas (Criterio Metodológico)

De acuerdo con las buenas prácticas de ingeniería de software y lo exigido en la consigna, el orden de implementación de tareas respondió estrictamente a dependencias lógicas y niveles de criticidad:

1. **T01 — Esqueleto inicial, Git y AGENTS.md**:  
   *Justificación*: Establecer la estructura base y el contrato de trabajo de los agentes de IA antes de codificar.
2. **T02 — Base de datos SQLite y esquema relacional**:  
   *Justificación*: La persistencia y el modelo relacional son el cimiento de todo el sistema. No se puede construir lógica de negocio sin un esquema claro con claves foráneas e integridad referencial (`ON DELETE CASCADE`).
3. **T03 — Sistema de diseño base (tokens, componentes y layout)**:  
   *Justificación*: Evita duplicación de estilos y garantiza consistencia visual (mobile-first, estética Notion) antes de armar las pantallas funcionales.
4. **T04 — Materias (Entidad Independiente Raíz)**:  
   *Justificación*: En el dominio del problema, las materias son la entidad padre. Tanto las evaluaciones como las notas dependen directamente de la existencia de una materia.
5. **T05 — Evaluaciones y Entregas**:  
   *Justificación*: Implementa la lógica de estados (`Pendiente` → `En preparación` → `Listo` → `Rendido/Entregado`) y cálculo de fechas próximas.
6. **T06 — Tareas y To-Do**:  
   *Justificación*: Entidad complementaria pero con lógica de prioridades (`Alta` > `Media` > `Baja`) y estado binario de completitud.
7. **T07 — Dashboard y Métricas**:  
   *Justificación*: El dashboard consolida información de todas las entidades previas (materias, evaluaciones y tareas). Solo podía implementarse cuando las entidades fuente estuvieran operativas.
8. **T08 — Notas por materia**:  
   *Justificación*: Extensión funcional que enriquece el módulo de materias con persistencia de apuntes.
9. **T09 — Integración, Pruebas y Colección de Postman**:  
   *Justificación*: Verificación transversal de integridad de datos y casos borde.
10. **T10 — Preparación para autenticación futura**:  
    *Justificación*: Desacoplada del MVP pero estructurada a nivel middleware.
11. **T11 & T12 — Despliegue en la nube y Documentación Final**:  
    *Justificación*: Puesta en producción una vez validado el funcionamiento local completo.

---

## 3. Registro de Pruebas Realizadas

### 3.1. Pruebas Unitarias Automatizadas (Backend)
Se implementaron suites de pruebas con el ejecutor nativo de Node.js (`node --test`), cubriendo los requisitos y reglas de negocio:

| Archivo de Test | Casos Evaluados | Resultado |
|---|---|---|
| `materias.test.js` | Creación con color, consulta por ID, regla **RN03** (rechazo de nombres duplicados UNIQUE), edición y borrado. | ✅ **PASS** |
| `evaluaciones_tareas.test.js` | Creación de evaluación asociada a materia, transición de estados, cálculo de próximas en ventana temporal, creación de tareas con prioridad y alternancia de completitud (*toggle*). | ✅ **PASS** |

### 3.2. Pruebas de Endpoints (Postman / API REST)
Se diseñó y exportó la colección en `docs/postman_collection.json` probando:
- `GET /health` → Responde `200 OK` con `{ status: 'ok' }`.
- `GET /api/materias` & `POST /api/materias` → Validación de campos requeridos y código `400` ante omisión.
- `GET /api/evaluaciones?proximas=true&dias=14` → Filtrado dinámico por fecha excluyendo las rendidas.
- `PATCH /api/tareas/:id/toggle` → Alternancia de completado.
- `GET /api/dashboard` → Cálculo correcto de métricas consolidadas.

### 3.3. Pruebas de Interfaz (Frontend UX)
- Creación interactiva de materias con selección de paleta predefinida.
- Asignación de evaluaciones vinculadas a materias y cambio de estado directo desde selector.
- Marcado de tareas completadas con efecto visual tachado.
- Dashboard con navegación fluida y tarjetas informativas en tiempo real.
