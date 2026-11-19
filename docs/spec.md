# spec.md — Study Organization

## Objetivo

Proveer a los estudiantes una web centralizada y simple para organizar sus materias, evaluaciones, tareas y notas, eliminando la dispersión de información y ayudándolos a anticiparse a las fechas importantes.

---

## Usuarios y roles

| Rol | Descripción |
|---|---|
| **Estudiante** | Único usuario. Crea, edita y consulta toda la información. No hay rol de profesor ni administrador. |

---

## Alcance — MVP

### Dentro del alcance
- Gestión de materias (crear, editar, eliminar con confirmación).
- Gestión de evaluaciones (crear, editar; sin eliminación).
- Gestión de tareas (crear, editar, marcar como completadas; sin eliminación).
- Dashboard con resumen de lo urgente.
- Vista de lista de evaluaciones y tareas.
- Historial de evaluaciones y tareas pasadas.
- Notas por materia (texto libre).
- Datos de ejemplo al levantar la app por primera vez.

### Fuera del alcance (MVP)
- Autenticación / múltiples usuarios.
- Tablero Kanban y vista calendario.
- Notificaciones push o por correo.
- Integración con calendarios externos.

---

## Reglas de negocio

### Materias
**RN01** — Una materia debe tener nombre (mínimo 1 carácter, máximo 60) y un color identificador elegido de una paleta predefinida de al menos 8 colores.

**RN02** — Al eliminar una materia, el sistema debe pedir confirmación explícita y, si se confirma, eliminar en cascada todas sus evaluaciones, tareas asociadas (ver PA01) y notas.

**RN03** — No pueden existir dos materias con el mismo nombre (comparación sin distinguir mayúsculas/minúsculas).

### Evaluaciones
**RN04** — Una evaluación debe tener: título (mínimo 1 carácter, máximo 100), fecha (formato YYYY-MM-DD), materia y tipo. Todos son obligatorios.

**RN05** — El tipo de una evaluación debe ser uno de los siguientes valores exactos: `examen`, `parcial`, `trabajo_practico`, `entrega`.

**RN06** — El estado de una evaluación debe ser uno de los siguientes valores exactos y seguir el orden lógico: `pendiente` → `en_preparacion` → `listo` → `rendido_entregado`. El estado por defecto al crear es `pendiente`.

**RN07** — Una evaluación en cualquier estado puede ser editada por el estudiante. No se puede eliminar.

**RN08** — Una evaluación se considera "próxima" si su fecha es mayor o igual a hoy. Se considera "histórica" si su fecha es anterior a hoy. Esta clasificación es automática y se recalcula en cada consulta.

**RN09** — Una evaluación "próxima" aparece en el dashboard solo si su estado no es `rendido_entregado`.

**RN10** — Una evaluación aparece en el panel de recordatorios si: su fecha cae dentro de los próximos 14 días (inclusive hoy), su estado no es `rendido_entregado`, y aún no venció.

### Tareas
**RN11** — Una tarea debe tener: título (mínimo 1 carácter, máximo 100), prioridad y fecha límite. Todos son obligatorios.

**RN12** — La prioridad de una tarea debe ser uno de los siguientes valores exactos: `alta`, `media`, `baja`.

**RN13** — El estado de una tarea puede ser: `pendiente` o `completada`. El estado por defecto al crear es `pendiente`.

**RN14** — Una tarea puede editarse en cualquier estado. No se puede eliminar.

**RN15** — Una tarea aparece en el panel de recordatorios si: su fecha límite cae dentro de los próximos 14 días (inclusive hoy), su estado es `pendiente`, y aún no venció.

**RN16** — En el dashboard, las tareas pendientes se muestran ordenadas por: primero prioridad (alta > media > baja), luego por fecha límite más cercana.

### Recordatorios y dashboard
**RN17** — La ventana de recordatorios es de 14 días hacia el futuro desde la fecha actual (inclusive hoy). No es configurable por el usuario en el MVP.

**RN18** — El dashboard muestra: (a) próximas evaluaciones ordenadas por fecha, (b) tareas pendientes de los próximos 7 días ordenadas por prioridad y fecha, (c) panel de recordatorios (evaluaciones y tareas dentro de los próximos 14 días).

### Notas
**RN19** — Una nota está siempre vinculada a una materia. Es texto libre sin límite de caracteres definido.

**RN20** — Al editar una nota, el contenido anterior se reemplaza (no hay historial de versiones).

---

## Historias de usuario

**HU01** — *Crear materia*
> Como estudiante, quiero crear una materia con nombre y color para identificarla visualmente en toda la app.
- Dado que estoy en la pantalla de materias, cuando completo nombre y color y guardo, entonces aparece la nueva materia en la lista. *(cubre RN01, RN03)*
- Dado que intento guardar sin nombre, cuando hago clic en guardar, entonces veo un mensaje de error y la materia no se crea. *(cubre RN01)*

**HU02** — *Editar materia*
> Como estudiante, quiero editar el nombre o el color de una materia existente.
- Dado que edito una materia y guardo, entonces los cambios se reflejan en toda la app. *(cubre RN01)*

**HU03** — *Eliminar materia*
> Como estudiante, quiero eliminar una materia que ya no curso.
- Dado que selecciono "eliminar" en una materia, cuando confirmo, entonces la materia y todo su contenido desaparece. *(cubre RN02)*
- Dado que selecciono "eliminar", cuando cancelo la confirmación, entonces no se borra nada. *(cubre RN02)*

**HU04** — *Registrar evaluación*
> Como estudiante, quiero registrar una evaluación con título, fecha, materia y tipo para no olvidarme de ella.
- Dado que completo todos los campos obligatorios y guardo, entonces la evaluación aparece en mi lista con estado "Pendiente". *(cubre RN04, RN05, RN06)*
- Dado que falta algún campo obligatorio, cuando guardo, entonces veo un error indicando qué falta. *(cubre RN04)*

**HU05** — *Cambiar estado de evaluación*
> Como estudiante, quiero actualizar el estado de una evaluación para reflejar en qué etapa estoy.
- Dado que edito el estado a "Rendido/Entregado", entonces esa evaluación desaparece del dashboard pero sigue en el historial. *(cubre RN06, RN09)*

**HU06** — *Ver historial de evaluaciones*
> Como estudiante, quiero ver mis evaluaciones pasadas aunque ya hayan vencido.
- Dado que una evaluación tiene fecha anterior a hoy, entonces aparece en la sección "Historial" y no en "Próximas". *(cubre RN08)*

**HU07** — *Crear tarea*
> Como estudiante, quiero crear una tarea con título, prioridad y fecha límite.
- Dado que completo los tres campos y guardo, entonces la tarea aparece en mi lista ordenada por prioridad. *(cubre RN11, RN12, RN16)*
- Dado que falta algún campo, entonces veo un mensaje de error. *(cubre RN11)*

**HU08** — *Completar tarea*
> Como estudiante, quiero marcar una tarea como completada.
- Dado que marco una tarea como completada, entonces desaparece del panel de pendientes y queda en el historial. *(cubre RN13)*

**HU09** — *Ver recordatorios*
> Como estudiante, quiero ver en el dashboard un panel con todo lo que vence en los próximos 14 días.
- Dado que hoy es 1 de enero, entonces el panel muestra evaluaciones y tareas con fecha entre el 1 y el 14 de enero que no estén finalizadas. *(cubre RN10, RN15, RN17)*
- Dado que una evaluación está en estado "Rendido/Entregado", entonces no aparece en recordatorios aunque su fecha sea futura. *(cubre RN10)*

**HU10** — *Escribir notas de materia*
> Como estudiante, quiero escribir notas relacionadas con una materia para tener mis apuntes en un solo lugar.
- Dado que selecciono una materia y escribo una nota y guardo, entonces la nota queda guardada y la veo al volver a esa materia. *(cubre RN19)*
- Dado que edito una nota existente y guardo, entonces el contenido anterior se reemplaza. *(cubre RN20)*

---

## Casos borde

| # | Situación | Comportamiento esperado |
|---|---|---|
| CB01 | El estudiante no tiene materias creadas | El dashboard muestra un estado vacío con mensaje de bienvenida y botón para crear la primera materia. |
| CB02 | No hay evaluaciones ni tareas en los próximos 14 días | El panel de recordatorios muestra "Sin recordatorios para los próximos 14 días". |
| CB03 | Evaluación con fecha igual a hoy | Se considera "próxima" (aparece en dashboard) y también en recordatorios. |
| CB04 | Dos materias con el mismo nombre | El sistema rechaza la segunda y muestra error (RN03). |
| CB05 | El estudiante intenta guardar una evaluación con fecha en el pasado | Se permite (puede querer registrar algo que olvidó cargar antes), pero aparece directamente en historial. |

---

## Pendientes de spec

> Ver `preguntas-abiertas.md` para las dudas que pueden ampliar esta spec una vez resueltas.
> Principalmente PA01 (vincular tareas a materias) podría agregar RN21 y modificar HU07.
