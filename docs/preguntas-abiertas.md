# preguntas-abiertas.md — Study Organization

Dudas sin responder aún, con la regla que afectan y su impacto.
Ordenadas de mayor a menor impacto.

---

| # | Pregunta | Regla afectada | Impacto si no se resuelve |
|---|---|---|---|
| PA01 | ¿Se puede vincular una tarea a una materia específica? | Modelo de datos de Tarea | Alto — cambia la estructura de la base de datos y la vista de lista |
| PA02 | ¿Las notas de materia tienen formato enriquecido (negrita, listas) o solo texto plano? | Notas de materia | Medio — define si se necesita un editor de texto o un simple textarea |
| PA03 | ¿Cómo se implementará la autenticación en el futuro (JWT, sesiones, OAuth)? | Arquitectura general | Medio — afecta cómo se diseñan las tablas y los endpoints desde ahora |
| PA04 | ¿El historial tiene filtros (por materia, por tipo, por rango de fechas)? | Vista de historial | Medio — complejiza la pantalla de historial |
| PA05 | ¿Cuántas notas puede tener una materia? ¿Hay un límite? | Notas de materia | Bajo — solo relevante si se agrega paginación |
| PA06 | ¿El formato del informe final del proyecto (PDF, Markdown, etc.) está definido? | Entrega del bootcamp | Bajo — no afecta el código, solo la documentación de entrega |

---

> **Nota**: estas preguntas no bloquean el desarrollo del MVP. Cuando se resuelvan, se actualizan `decisiones.md` y `spec.md` y se crea la tarea correspondiente.
