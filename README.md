# Cronoss Comments — Technical Challenge

Este proyecto implementa una página de comentarios con creación y listado en tiempo real, utilizando Next.js (App Router), Supabase, Zod, CSS Modules y UI dark inspirada en el estilo del sistema de Cronoss.

## Stack técnico

- **Next.js 16** – App Router + React 19
- **Supabase** (PostgreSQL + API REST)
- **Zod** para validación de datos del formulario
- **CSS Modules** para un estilo encapsulado y limpio
- **Optimistic UI** al crear comentarios
- **Variables CSS** + tema dark custom

## Scripts

```bash
npm run dev      # Inicia el entorno de desarrollo
npm run build    # Compila el proyecto
npm start        # Ejecuta en producción
```

## Configuración de Supabase

### 1. Crear un proyecto en Supabase

### 2. Crear tabla `comments`

```sql
create table comments (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  content text not null,
  created_at timestamp not null default now()
);
```

### 3. Habilitar Anon key y agregar al archivo `.env`

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_KEY=your-key
```

### 4. Reiniciar el servidor

```bash
npm run dev
```

## Funcionalidades

### Crear comentarios

- Formulario con validación usando Zod
- Interacción instantánea gracias a Optimistic UI

### Listado de comentarios

- Recuperados desde Supabase y ordenados por fecha descendente

### Horario relativo

- Formato relativo: "hace X horas", con tooltip detallado al hacer hover

### Identidad visual

- UI basada en colores y estética del entorno Cronoss

### Tipado fuerte

- Todo el proyecto está tipado con TypeScript

## Estructura del proyecto

```
/app
  /comments
    page.tsx
  /lib
    schema.ts
    comments.ts
    supabase.ts
    timeAgo.ts
  /components
    /CommentForm
    /CommentList
  globals.css
```

## Mejoras posibles (si hubiera más tiempo)

- Edición y borrado de comentarios
- Paginación
- Tests con Jest o Vitest

---

**Autoria:** Mayra Mosqueira
