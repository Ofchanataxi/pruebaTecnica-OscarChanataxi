-- Crear tabla de pozos
CREATE TABLE IF NOT EXISTS pozos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    produccion_diaria DECIMAL(10,2) NOT NULL DEFAULT 0,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('activo', 'inactivo')) DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES
('Pozo Norte 1', 'Campo Norte', 150.5, 'activo'),
('Pozo Sur 2', 'Campo Sur', 200.0, 'activo'),
('Pozo Este 3', 'Campo Este', 175.25, 'inactivo'),
('Pozo Oeste 4', 'Campo Oeste', 300.75, 'activo'),
('Pozo Central 5', 'Campo Central', 125.0, 'inactivo');

-- Crear índices para mejor performance
CREATE INDEX idx_pozos_estado ON pozos(estado);
CREATE INDEX idx_pozos_nombre ON pozos(nombre);

-- Función para actualizar timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_pozos_updated_at
    BEFORE UPDATE ON pozos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();