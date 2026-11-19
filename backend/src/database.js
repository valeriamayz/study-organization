const Database = require('better-sqlite3')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const dbPath = process.env.DATABASE_URL || './study_organization.db'
const db = new Database(path.resolve(dbPath))

// Mejor rendimiento
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS materias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE COLLATE NOCASE,
    color TEXT NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS evaluaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    fecha DATE NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('Examen', 'Parcial', 'Trabajo Práctico', 'Entrega')),
    estado TEXT NOT NULL DEFAULT 'Pendiente' CHECK(estado IN ('Pendiente', 'En preparación', 'Listo', 'Rendido/Entregado')),
    notas TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    prioridad TEXT NOT NULL CHECK(prioridad IN ('Alta', 'Media', 'Baja')),
    fecha_limite DATE,
    completada INTEGER NOT NULL DEFAULT 0,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    contenido TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
  );
`)

console.log('✅ Base de datos lista')

module.exports = db