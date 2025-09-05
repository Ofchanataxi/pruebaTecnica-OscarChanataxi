# Gestión de Pozos Petroleros

Una aplicación full-stack para gestionar pozos petroleros con funcionalidades CRUD, estadísticas en tiempo real y visualización de datos operativos.

## 📋 Características Principales

- **Gestión de Pozos**: Crear, listar y actualizar estado de pozos petroleros
- **Estadísticas en Tiempo Real**: Porcentajes de pozos activos/inactivos y producción total
- **Conversión de Unidades**: Pipe personalizado para convertir barriles a galones y litros
- **Indicadores Visuales**: Directiva que colorea filas según el estado del pozo
- **API RESTful**: Backend con TypeScript y validación de datos
- **Containerización**: Despliegue completo con Docker Compose

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 20.2.0** - Framework principal
- **TypeScript 5.9.2** - Lenguaje de desarrollo
- **RxJS** - Manejo de observables y programación reactiva
- **SCSS** - Estilos avanzados

### Backend
- **Node.js 22.12.0** - Runtime de JavaScript
- **Express 5.1.0** - Framework web
- **TypeScript 5.9.2** - Tipado estático
- **PostgreSQL** - Base de datos relacional

### DevOps
- **Docker & Docker Compose** - Containerización
- **Nginx** - Servidor web para frontend

## 📁 Estructura del Proyecto

```
pruebaTecnica-OscarChanataxi/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── pozosController.ts
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   └── Pozo.ts
│   │   ├── routes/
│   │   │   └── pozos.ts
│   │   ├── db.ts
│   │   └── index.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   └── pozos/
│   │       ├── directives/
│   │       │   └── estado-pozo.directive.ts
│   │       ├── pipes/
│   │       │   └── unidades.pipe.ts
│   │       └── services/
│   │           └── pozos.service.ts
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── init-db/
│   └── 01-init.sql
├── docker-compose.yml
└── .env.example
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 22.12.0 o superior
- npm o yarn
- Docker y Docker Compose (para containerización)
- PostgreSQL (para desarrollo local)

### Opción 1: Desarrollo Local

#### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd pozos-petroleros
```

#### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pozos_db
DB_USER=pozos_user
DB_PASSWORD=pozos_password

# Backend
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:4200

# Frontend
API_URL=http://localhost:3000
```

#### 3. Configurar base de datos
```bash
# Crear base de datos PostgreSQL
createdb pozos_db
psql pozos_db < init-db/01-init.sql
```

#### 4. Instalar dependencias del backend
```bash
cd backend
npm install
```

#### 5. Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

#### 6. Ejecutar la aplicación
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Opción 2: Docker Compose (Recomendado)

#### 1. Clonar y configurar
```bash
git clone <url-del-repositorio>
cd pozos-petroleros
cp .env.example .env
```

#### 2. Ejecutar con Docker
```bash
docker-compose up --build
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **Base de datos**: localhost:5432

## 📡 API Endpoints

### Pozos Petroleros

| Método | Endpoint | Descripción | Cuerpo |
|--------|----------|-------------|---------|
| `GET` | `/pozos` | Obtener todos los pozos | - |
| `POST` | `/pozos` | Crear un nuevo pozo | `{ nombre, ubicacion, produccion_diaria, estado }` |
| `PATCH` | `/pozos/:id` | Actualizar estado del pozo | `{ estado }` |

#### Ejemplo de respuesta:
```json
{
  "id": 1,
  "nombre": "Pozo Norte 1",
  "ubicacion": "Campo Norte",
  "produccion_diaria": 150.5,
  "estado": "activo"
}
```

## ⚙️ Scripts Disponibles

### Backend
```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
```

### Frontend
```bash
npm start        # Servidor de desarrollo (puerto 4200)
npm run build    # Build de producción
npm run watch    # Build con observador de cambios
npm test         # Ejecutar pruebas
```

## 🧩 Componentes Angular Personalizados

### Pipe: UnidadesPipe
Convierte la producción diaria entre diferentes unidades:
```typescript
// Uso en template
{{ pozo.produccion_diaria | unidades:'barriles' }}
{{ pozo.produccion_diaria | unidades:'galones' }}
{{ pozo.produccion_diaria | unidades:'litros' }}
```

**Conversiones**:
- 1 barril = 42 galones
- 1 barril = 158.987 litros

### Directiva: EstadoPozoDirective
Resalta visualmente las filas de la tabla según el estado:
```html
<tr [appEstadoPozo]="pozo.estado">
```
- **Activo**: Fondo verde claro
- **Inactivo**: Fondo rojo claro

### Servicio: PozosService
Maneja la comunicación con la API usando observables:
```typescript
// Métodos disponibles
getPozos(): Observable<Pozo[]>
createPozo(pozo: Pozo): Observable<Pozo>
updateEstado(id: number, estado: string): Observable<Pozo>
```

## 🗄️ Base de Datos

### Tabla: pozos
```sql
CREATE TABLE pozos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255),
    produccion_diaria DECIMAL(10,2) NOT NULL DEFAULT 0,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('activo', 'inactivo')) DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🐳 Docker

### Servicios incluidos:
- **PostgreSQL**: Base de datos con datos de ejemplo
- **Backend**: API Node.js con TypeScript
- **Frontend**: Aplicación Angular servida con Nginx

### Comandos útiles:
```bash
# Levantar todos los servicios
docker-compose up --build

# Solo base de datos y backend
docker-compose up postgres backend

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Limpiar volúmenes (elimina datos de BD)
docker-compose down -v
```

## 🔧 Solución de Problemas

### Error: Puerto 80 en uso (Windows)
Si obtienes error de puerto 80 ocupado:
```bash
# El docker-compose ya está configurado para usar puerto 8080
# Frontend disponible en: http://localhost:8080
```

### Error: Cannot connect to database
1. Verifica que PostgreSQL esté ejecutándose
2. Confirma las variables de entorno en `.env`
3. Para Docker: `docker-compose logs postgres`

### Error: CORS en desarrollo
Asegúrate de que `CORS_ORIGIN` en `.env` apunte a tu frontend:
```env
CORS_ORIGIN=http://localhost:4200
```

## 📊 Funcionalidades Implementadas

- ✅ **Listado de pozos** con tabla dinámica
- ✅ **Creación de pozos** via formulario
- ✅ **Actualización de estado** con botón toggle
- ✅ **Estadísticas en tiempo real**:
  - Porcentaje de pozos activos/inactivos
  - Producción total de pozos activos
- ✅ **Pipe de conversión** de unidades (barriles/galones/litros)
- ✅ **Directiva visual** para estados de pozos
- ✅ **Manejo de observables** para operaciones asíncronas
- ✅ **API REST** completa con validación
- ✅ **Containerización** con Docker Compose

## 👤 Autor

Desarrollado como prueba técnica para pasantías.

## 📝 Licencia

Este proyecto es de uso educativo y de evaluación técnica.

---

**Nota**: Para cualquier duda sobre la configuración o ejecución, revisa la sección de solución de problemas o consulta los logs de Docker Compose.
