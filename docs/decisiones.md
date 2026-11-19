# decisiones.md — Study Organization

## Formato
Cada decisión tiene: pregunta, respuesta y motivo.

---

## Equipo y alcance

**D01 — ¿Quién carga los datos?**
- Respuesta: Solo el estudiante. No existe rol de profesor ni administrador.
- Motivo: simplifica el modelo de datos y la interfaz; sin roles no hay lógica de permisos.

**D02 — ¿Hay inicio de sesión?**
- Respuesta: No en la versión inicial. Se trabaja con datos de ejemplo al levantar la app.
- Motivo: reduce la complejidad del MVP; la arquitectura queda preparada para agregar autenticación.

---

## Materias

**D03 — ¿Se puede eliminar una materia?**
- Respuesta: Sí, con confirmación. Al eliminar una materia se eliminan en cascada sus evaluaciones, tareas y notas asociadas.
- Motivo: mantener consistencia de datos sin dejar registros huérfanos.

**D04 — ¿Qué campos tiene una materia?**
- Respuesta: Nombre (obligatorio) + color identificador (obligatorio, elegido de una paleta predefinida).
- Motivo: el color ayuda a identificar visualmente la materia en el dashboard.

---

## Evaluaciones y entregas

**D05 — ¿Qué campos son obligatorios en una evaluación?**
- Respuesta: Título, fecha, materia y tipo (examen, parcial, trabajo práctico, entrega).
- Motivo: sin estos cuatro campos la evaluación no tiene sentido dentro del sistema.

**D06 — ¿Qué campos son opcionales en una evaluación?**
- Respuesta: Estado (valor por defecto: Pendiente) y notas de texto libre.

**D07 — ¿Qué estados puede tener una evaluación?**
- Respuesta: Pendiente → En preparación → Listo → Rendido/Entregado.
- Motivo: reflejan el ciclo real de preparación de un estudiante.

**D08 — ¿Qué pasa con evaluaciones cuya fecha ya pasó?**
- Respuesta: Dejan de aparecer en el dashboard (en la sección de próximas), pero siguen accesibles en el historial.
- Motivo: no abrumar el dashboard con información vieja sin borrar el historial.

**D09 — ¿Se pueden editar evaluaciones ya finalizadas (Rendido/Entregado)?**
- Respuesta: Sí, siempre se pueden editar.
- Motivo: el estudiante puede necesitar corregir un error o agregar notas.

**D10 — ¿Se pueden eliminar evaluaciones?**
- Respuesta: No. Las evaluaciones no se eliminan; si ya no sirven quedan en el historial.
- Motivo: preservar el registro histórico del estudiante.

---

## Tareas

**D11 — ¿Qué campos son obligatorios en una tarea?**
- Respuesta: Título, prioridad (Alta / Media / Baja) y fecha límite.
- Motivo: sin los tres campos no es posible priorizar ni recordar cuándo vence.

**D12 — ¿Se pueden eliminar tareas?**
- Respuesta: No. Las tareas no se eliminan; se marcan como completadas.
- Motivo: mantener coherencia con la política de historial.

---

## Dashboard y recordatorios

**D13 — ¿Qué muestra el dashboard?**
- Respuesta: próximas evaluaciones, tareas pendientes de la semana y recordatorios de los próximos 14 días.
- Motivo: ventana de 14 días es suficiente para anticiparse sin sobrecargar.

**D14 — ¿Qué criterio usa el recordatorio?**
- Respuesta: aparecen en el panel de recordatorios todas las evaluaciones y tareas cuya fecha cae dentro de los próximos 14 días y aún no están en estado final (Rendido/Entregado o Completada).

---

## Vistas

**D15 — ¿Qué vistas se implementan primero?**
- Respuesta: Dashboard + Lista (vista de todas las evaluaciones y tareas en listado).
- Motivo: son las más útiles para el MVP; el tablero Kanban y el calendario van en una segunda etapa.

---

## Técnicas

**D16 — ¿Qué stack se usa?**
- Respuesta: Frontend React + CSS (mobile-first) | Backend Node.js + Express | Base de datos SQLite.
- Motivo: definido en el prompt maestro del proyecto.

**D17 — ¿Se puede cambiar el stack?**
- Respuesta: No, sin aprobación explícita.

**D18 — ¿Quién ejecuta los comandos de Git?**
- Respuesta: Solo la responsable del proyecto. El asistente propone el mensaje de commit pero no ejecuta git commit ni git push.
