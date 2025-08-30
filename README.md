# mini-market

## Resumen

Monorepo de un mini marketplace con backend TypeScript (`api/`), frontend Next.js (`web/`) y tipos compartidos (`shared/`). Se prioriza claridad, DX y velocidad de iteración local con modos mock en ambos lados.

## Estructura del repositorio

```
/api                 # Express + Mongoose + Zod (ESM, Node 20)
/web                 # Next.js 14 (App Router, TypeScript)
/shared              # Fuente de verdad de los tipos TypeScript compartidos
```

## Decisiones clave

- **Backend**
  - Express (simple y predecible) + Zod (validación robusta de queries).
  - Mongoose para MongoDB. El `id` lógico (p. ej. "p1") es distinto de `_id` de Mongo. Por lo que este id funcionaria como un slug.
  - CORS abierto en desarrollo; parametrizable para producción.
  - ESM con `module: NodeNext` y `moduleResolution: nodenext`.
  - Endpoints devuelven solo `Product[]`.
  - Modo mock opcional con `USE_MOCK_DATA=true` (lee `src/data/products.json`).
  - Script de seed (`npm run seed`) para cargar datos de ejemplo.
- **Frontend**
  - Next.js 14 (App Router). UI mínima sin framework de estilos para rapidez.
  - Fake API con `NEXT_PUBLIC_USE_FAKE_API=true` (usa `_fake-api/`).
  - Imágenes deterministas con `picsum.photos` (sin dependencias adicionales).
- **Tipos compartidos**
  - Carpeta `shared/` con `Product`, `SortField`, `SortOrder` consumidos por `api/` y `web/`.
  - `api/tsconfig.json` define `rootDir: ".."` y `paths` para resolver `shared/*`.
  - `shared/package.json` con `{ "type": "module" }` para ESM.
- **Calidad**
  - Prettier en ambos proyectos (scripts `format` y `format:check`).
  - ESLint v9 (flat config) en `api/`.

## API

### Endpoints

- GET `/api/products?search=&sort=price|name&order=asc|desc&page=1&limit=10&available=true|false`
  - Búsqueda en `name` y `category` (insensible a mayúsculas, contains).
  - Orden por `price` o `name` en `asc|desc`.
  - Paginación por `page` y `limit` en base de datos (o en memoria si mock activado).
  - Respuesta: `Product[]`.
- GET `/api/products/:id`
  - Busca por `id` lógico (p. ej. `p1`). Devuelve `404` si no existe.

### Tipos (shared)

`shared/types.ts`

```ts
export type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image?: string;
};
export type SortField = 'price' | 'name';
export type SortOrder = 'asc' | 'desc';
```

## Frontend

- `/products`: listado con buscador, orden, filtro por disponibilidad y paginación (Prev/Next). Grid responsive (mín. 250px, gap 16px).
- `/products/[id]`: detalle con imagen grande, título 20px, precio 18px, badge de stock y botón “Agregar a favoritos” (sin lógica). Manejo de `404` con `notFound()`.

## Puesta en marcha rápida

Requisitos: Node 20+, npm

### Backend (`api/`)

1. Variables de entorno (crear `.env` desde el ejemplo):

```bash
cd api
cp .env.example .env
# Edita MONGODB_URI y (opcional) USE_MOCK_DATA=true para usar `src/data/products.json`
```

2. Instalar dependencias y compilar (si aplica):

```bash
npm i
npm run build
```

3. Seed opcional (si la colección está vacía):

```bash
npm run seed
```

4. Ejecutar en desarrollo:

```bash
npm run dev
# http://localhost:3001
```

### Frontend (`web`)

1. Variables de entorno (crear `.env.local` desde el ejemplo):

```bash
cd web
cp .env.local.example .env.local
# NEXT_PUBLIC_API_BASE=http://localhost:3001/api
# Para usar la fake API del front: NEXT_PUBLIC_USE_FAKE_API=true
```

2. Instalar dependencias y ejecutar:

```bash
npm i
npm run dev
# http://localhost:3000/products
```

## Modo mock

- Backend: `USE_MOCK_DATA=true` devuelve datos desde `api/src/data/products.json`.
- Frontend: `NEXT_PUBLIC_USE_FAKE_API=true` usa `_fake-api/` (imágenes `picsum.photos`).

## Scripts útiles

### API

- `npm run dev` · `npm run build` · `npm run start` · `npm run seed`
- `npm run lint` · `npm run lint:fix` · `npm run format` · `npm run format:check`

### WEB

- `npm run dev` · `npm run build` · `npm run start`
- `npm run format` · `npm run format:check`

## Pruebas

- API: Vitest (entorno Node). Ejecutar: `cd api && npm run test`.
- WEB: Vitest + React Testing Library + jest-dom (entorno jsdom). Ejecutar: `cd web && npm run test`.

## Pendientes / Próximos pasos

- Docker Compose: `api` + MongoDB + `web` con redes y `.env` productivas.
- CI/CD: lint, type-check, tests y build en PR (GitHub Actions).
- Seguridad: CORS por lista en producción, rate limiting.
- Implementar turborepo para optimizar el build de ambos proyectos.
- Manejar las peticiones al backend con axios.
- Implementar un sistema de autenticación con JWT.

# mini-market
