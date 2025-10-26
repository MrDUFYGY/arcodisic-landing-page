# Documentación del Blog de Arcodisic - Estado Actual

## 📋 Resumen Ejecutivo

El blog de Arcodisic es un blog estático construido con **Astro.js 4.1.1** que utiliza el sistema de **Content Collections** para gestionar artículos sobre arcotechos, estructuras metálicas y servicios relacionados.

---

## 🏗️ Arquitectura Actual

### Tecnología Base
- **Framework**: Astro.js v4.1.1
- **Sistema de Contenido**: Astro Content Collections
- **Formato de Posts**: Markdown (.md)
- **Styling**: TailwindCSS v3.4.1
- **Tipado**: TypeScript v5.3.3

### Estructura de Directorios

```
arcodisic-landing-page/
├── src/
│   ├── content/
│   │   ├── config.ts          # Definición de schemas
│   │   └── post/              # Archivos .md de blog posts
│   │       ├── 0-por-que-arcotechos.md
│   │       ├── 1-arcotechos-beneficios-aplicaciones.md
│   │       └── ... (20 posts totales)
│   ├── pages/
│   │   └── [...blog]/         # Rutas dinámicas del blog
│   │       ├── index.astro    # Lista de posts
│   │       ├── [...page].astro # Paginación
│   │       ├── [category]/    # Posts por categoría
│   │       └── [tag]/         # Posts por tag
│   ├── components/
│   │   └── blog/              # Componentes específicos del blog
│   ├── utils/
│   │   └── blog.ts            # Lógica de negocio del blog
│   └── config.yaml            # Configuración global
└── public/                    # Assets estáticos
```

---

## 📄 Schema del Blog

### Definición en `src/content/config.ts`

```typescript
const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    
    metadata: metadataDefinition(),
  }),
});
```

### Campos del Frontmatter

Cada post incluye:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `publishDate` | Date | ❌ | Fecha de publicación |
| `updateDate` | Date | ❌ | Fecha de actualización |
| `draft` | Boolean | ❌ | Estado de borrador |
| `title` | String | ✅ | Título del post |
| `excerpt` | String | ❌ | Resumen/extracto |
| `image` | String | ❌ | URL de imagen destacada |
| `category` | String | ❌ | Categoría del post |
| `tags` | Array<String> | ❌ | Etiquetas/tags |
| `author` | String | ❌ | Autor del post |
| `metadata` | Object | ❌ | Metadata SEO adicional |

### Ejemplo de Post Actual

```markdown
---
publishDate: 2024-11-05T00:00:00Z
title: "¿Por Qué Elegir Arcotechos? Ventajas y Beneficios 2024"
excerpt: "Descubre por qué los arcotechos son la mejor solución..."
image: https://images.unsplash.com/photo-1686857080823-eb9129750d97
tags:
  - "arcotechos"
  - "construcción industrial"
  - "Estado de México"
category: "arcotechos"
author: "Arcodisic Team"
metadata:
  title: "Arcotechos en México 2024 | Ventajas y Beneficios"
  description: "✓ Máxima eficiencia ✓ Mejor relación costo-beneficio"
  canonical: https://arcodisic.com.mx/por-que-arcotechos
---

# Contenido del post...
```

---

## 🔄 Flujo de Datos

### Proceso de Renderizado

1. **Lectura de Contenido** (`src/utils/blog.ts`)
   - `getCollection('post')` obtiene todos los posts
   - Filtra posts en borrador (`draft: false`)
   - Ordena por fecha de publicación (más reciente primero)

2. **Normalización** (`getNormalizedPost`)
   - Procesa frontmatter
   - Genera permalink según patrón configurado
   - Calcula tiempo de lectura
   - Limpia slugs de categorías y tags

3. **Generación de Rutas**
   - Posts individuales: `/%slug%`
   - Lista de blog: `/blog`
   - Por categoría: `/category/:category`
   - Por tag: `/tag/:tag`

### Configuración en `config.yaml`

```yaml
apps:
  blog:
    isEnabled: true
    postsPerPage: 6
    
    post:
      isEnabled: true
      permalink: '/%slug%'
      robots:
        index: true
    
    list:
      isEnabled: true
      pathname: 'blog'
      robots:
        index: true
    
    category:
      isEnabled: true
      pathname: 'category'
      robots:
        index: true
    
    tag:
      isEnabled: true
      pathname: 'tag'
      robots:
        index: false
```

---

## 📊 Estadísticas Actuales

- **Total de Posts**: 20
- **Categorías Principales**: 
  - Arcotechos
  - Estructuras Metálicas
  - Grúas y Equipos
  - Construcción Industrial
- **Formato**: 100% Markdown estático
- **Build Time**: Generación estática completa

---

## ⚙️ Funcionalidades Implementadas

### ✅ Características Actuales

1. **Sistema de Posts**
   - Markdown con frontmatter
   - Soporte para imágenes (URLs externas)
   - Metadata SEO completa
   - Reading time automático

2. **Organización**
   - Categorías
   - Tags múltiples
   - Ordenamiento por fecha
   - Sistema de borradores

3. **SEO**
   - Canonical URLs
   - OpenGraph metadata
   - Twitter Cards
   - Robots.txt configuration

4. **Paginación**
   - 6 posts por página
   - Navegación entre páginas
   - Filtrado por categoría/tag

### ❌ Limitaciones Actuales

1. **Editor**: No hay interfaz visual para crear/editar posts
2. **Workflow**: Requiere conocimiento técnico (Git, Markdown)
3. **Colaboración**: Sin sistema de roles o permisos
4. **Medios**: Gestión manual de imágenes
5. **Previsualizaciones**: No hay preview antes de publicar
6. **Programación**: No se pueden programar publicaciones

---

## 🎯 Necesidades Identificadas

Para hacer el blog más dinámico, se necesita:

1. **CMS con Interfaz Visual**
   - Editor WYSIWYG o Markdown visual
   - Panel de administración web

2. **Gestión de Contenido Simplificada**
   - Crear posts sin conocimiento técnico
   - Editar posts existentes fácilmente

3. **Gestión de Medios**
   - Upload de imágenes directo
   - Biblioteca de medios

4. **Flujo de Trabajo Mejorado**
   - Estados de publicación (borrador, revisión, publicado)
   - Programación de posts
   - Múltiples usuarios

5. **Compatibilidad**
   - Mantener estructura actual de Content Collections
   - No romper el sistema existente
   - Deploy automático

---

## 🔍 Puntos Clave para la Integración

### Datos Importantes

- **Ruta de Posts**: `src/content/post/`
- **Formato**: Archivos `.md` con frontmatter YAML
- **Imágenes**: Actualmente URLs externas (Unsplash)
- **Deploy**: Netlify/Vercel (SSG)
- **Repository**: Git-based (GitHub)

### Compatibilidad Requerida

Cualquier CMS integrado debe:
- ✅ Generar archivos Markdown compatibles
- ✅ Respetar el schema de Zod definido
- ✅ Mantener la estructura de directorios
- ✅ Permitir workflow Git-based
- ✅ Soportar frontmatter YAML

---

## 📝 Conclusión

El blog actual es **funcional y bien estructurado**, pero está limitado a usuarios técnicos. La integración de **DecapCMS** permitirá mantener todas las ventajas del sistema actual mientras se agrega una interfaz amigable para gestión de contenido.

**Siguiente paso**: Implementación de DecapCMS (ver documento 02-plan-implementacion-decapcms.md)