# IA Educativa - ExpoMinera 2026

Aplicación educativa desarrollada en Svelte para docentes de nivel primario y estudiantes de nivel secundario de la provincia de San Juan.

## Objetivo

Descubrir, aprender y aplicar herramientas de Inteligencia Artificial para:

- mejorar el aprendizaje,
- optimizar la planificación de clases,
- crear material educativo.

## Stack técnico

- Svelte 5
- TypeScript
- Vite
- Tailwind CSS v4

## Funcionalidades actuales

- Onboarding por perfil: docente o estudiante.
- Dashboard con bienvenida personalizada.
- Catálogo de herramientas IA con búsqueda y filtros por categoría.
- Vista de detalle de cada herramienta.
- Estructura para tutoriales guiados paso a paso.
- Persistencia local de usuario.

## Estructura principal

- src/components: componentes reutilizables
- src/pages: vistas principales (onboarding y dashboard)
- src/lib/data: datos iniciales de herramientas y tutoriales
- src/lib/stores: estado global de la aplicación
- src/lib/types: tipado del dominio

## Ejecutar en desarrollo

- npm install
- npm run dev

## Validar y build

- npm run check
- npm run build
