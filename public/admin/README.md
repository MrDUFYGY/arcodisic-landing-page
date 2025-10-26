# Panel de Administración de DecapCMS

Este directorio contiene la configuración del CMS para gestionar el blog de Arcodisic.

## 🚀 Acceso al Panel

### En Producción
Accede a: `https://arcodisic.com.mx/admin`

### En Desarrollo Local
1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Accede a: `http://localhost:4321/admin`

## 🔐 Autenticación

### Primera vez (Configuración requerida)

Para que el CMS funcione, necesitas configurar la autenticación:

#### Opción 1: Netlify Identity (Recomendada)

1. Ve a tu proyecto en Netlify
2. Settings → Identity → Enable Identity
3. Settings → Identity → Registration preferences → Invite only
4. Services → Git Gateway → Enable Git Gateway
5. Invita usuarios desde el dashboard de Netlify

#### Opción 2: Desarrollo Local (Sin autenticación)

Para pruebas locales sin autenticación:

1. Edita `config.yml` y añade:
   ```yaml
   local_backend: true
   ```

2. En una terminal separada, ejecuta:
   ```bash
   npx decap-server
   ```

3. Accede a `http://localhost:4321/admin`

## 📝 Crear un Nuevo Post

1. Accede al panel de administración
2. Haz clic en "Blog Posts"
3. Haz clic en "New Post"
4. Completa los campos:
   - **Título**: Título del artículo (requerido)
   - **Extracto**: Resumen breve
   - **Fecha de Publicación**: Fecha y hora
   - **Borrador**: Desmarca para publicar
   - **Imagen Destacada**: Sube una imagen
   - **Categoría**: Selecciona una categoría
   - **Etiquetas**: Añade tags relevantes
   - **Contenido**: Escribe el artículo en Markdown
5. Haz clic en "Publish" para guardar

## 📁 Estructura de Archivos

```
public/admin/
├── config.yml      # Configuración del CMS
├── index.html      # Página de administración
└── README.md       # Esta documentación
```

## 🖼️ Gestión de Imágenes

Las imágenes se guardan en: `src/assets/images/blog/`

Para añadir una imagen:
1. En el editor, haz clic en el campo "Imagen Destacada"
2. Sube la imagen desde tu computadora
3. La imagen se guardará automáticamente en el repositorio

## ⚙️ Campos Disponibles

| Campo | Descripción | Requerido |
|-------|-------------|-----------|
| Título | Título del artículo | ✅ |
| Extracto | Resumen breve | ❌ |
| Fecha de Publicación | Cuándo se publica | ❌ |
| Fecha de Actualización | Última modificación | ❌ |
| Borrador | Estado del post | ✅ (por defecto: true) |
| Imagen Destacada | Imagen principal | ❌ |
| Categoría | Clasificación | ❌ |
| Etiquetas | Tags del post | ❌ |
| Autor | Nombre del autor | ❌ |
| Metadata SEO | Info SEO adicional | ❌ |
| Contenido | Cuerpo del artículo | ✅ |

## 🔧 Troubleshooting

### No puedo acceder al panel
- Verifica que el servidor de desarrollo esté corriendo
- Accede a `http://localhost:4321/admin` (no uses /admin/)

### Error de autenticación
- Verifica que Netlify Identity esté habilitado
- Verifica que Git Gateway esté configurado
- Para desarrollo, usa `local_backend: true`

### Las imágenes no se cargan
- Verifica que el directorio `src/assets/images/blog/` exista
- Verifica los permisos del repositorio

### Los posts no aparecen en el sitio
- Verifica que `draft: false` esté configurado
- Ejecuta `npm run build` para regenerar el sitio
- En producción, espera a que el deploy termine

## 📚 Recursos

- [Documentación de Decap CMS](https://decapcms.org/docs/)
- [Documentación de Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Guía de Markdown](https://www.markdownguide.org/)

## 🆘 Soporte

Para ayuda adicional, contacta al equipo de desarrollo.
