# 📚 Documentación del Sistema de Login - Arcodisic CMS

## 🗺️ Mapa de Rutas

| Ruta | Archivo | Descripción | Usa Identity |
|------|---------|-------------|--------------|
| `/admin` | `src/pages/admin.astro` | Página de bienvenida | ❌ No |
| `/admin/cms` | `src/pages/admin/cms.astro` | Editor CMS (DecapCMS) | ✅ Sí (prod) |
| `/admin/setup-password` | `src/pages/admin/setup-password.astro` | Establecer contraseña | ✅ Sí (prod) |
| `/admin/login` | `src/pages/admin/login.astro` | Redirige a `/admin/cms` | ❌ No |
| `/admin/callback` | `src/pages/admin/callback.astro` | Redirige a `/admin/cms` | ❌ No |

## 🔄 Flujo de Autenticación

### En Desarrollo Local

```
Usuario → http://localhost:4321/admin
         ↓
    Página de bienvenida
         ↓ [Click "Acceder al CMS"]
    http://localhost:4321/admin/cms
         ↓
    DecapCMS carga sin autenticación
         ↓
    Servidor proxy local (cms:local) maneja el backend
```

**Requisitos**:
- Terminal 1: `npm run cms:local` (puerto 8081)
- Terminal 2: `npm run dev` (puerto 4321)

### En Producción (Netlify)

```
Usuario → https://arcodisic.com.mx/admin
         ↓
    Página de bienvenida
         ↓ [Click "Acceder al CMS"]
    https://arcodisic.com.mx/admin/cms
         ↓
    Netlify Identity se carga
         ↓
    ¿Usuario autenticado?
         ├─ ✅ Sí → DecapCMS carga
         └─ ❌ No → Modal de login se abre
                   ↓ [Login exitoso]
                   DecapCMS carga
```

**Requisitos**:
- Netlify Identity habilitado
- Git Gateway habilitado
- Usuario invitado y contraseña establecida

## 🔐 Configuración de Netlify Identity

### Paso 1: Habilitar Identity

1. Ve a: https://app.netlify.com/sites/arcodisic-landing/identity
2. Click en **"Enable Identity"**
3. Configuración:
   - **Registration**: Invite only
   - **External providers**: Opcional

### Paso 2: Habilitar Git Gateway

1. En la misma página, pestaña **"Services"**
2. Click en **"Enable Git Gateway"**
3. Esto conecta el CMS con GitHub

### Paso 3: Invitar Usuarios

1. Pestaña **"Identity"**
2. Click en **"Invite users"**
3. Agregar emails:
   ```
   admin@arcodisic.com.mx
   editor@arcodisic.com.mx
   janet.g.arcodisic@gmail.com
   ```

### Paso 4: Usuario Establece Contraseña

1. Usuario recibe email con enlace:
   ```
   https://arcodisic.com.mx/#invite_token=xxxxx
   ```

2. Sistema detecta token y redirige a:
   ```
   https://arcodisic.com.mx/admin/setup-password#invite_token=xxxxx
   ```

3. Usuario establece contraseña

4. Redirige a `/admin/cms` para hacer login

## 📋 Endpoints de Netlify Identity

### API Endpoint
```
https://arcodisic.com.mx/.netlify/identity
```

### Templates de Email

| Template | Descripción | URL |
|----------|-------------|-----|
| **Confirmation** | Email de confirmación de cuenta | `https://arcodisic.com.mx/#confirmation_token=xxx` |
| **Recovery** | Recuperación de contraseña | `https://arcodisic.com.mx/#recovery_token=xxx` |
| **Invite** | Invitación de nuevo usuario | `https://arcodisic.com.mx/#invite_token=xxx` |
| **Email Change** | Cambio de email | `https://arcodisic.com.mx/#email_change_token=xxx` |

Todos estos tokens son detectados por `src/layouts/Layout.astro` y redirigen automáticamente a `/admin/setup-password`.

## 🔧 Configuración de Git Gateway

### Estado Actual
- ✅ **Habilitado**
- ✅ **Repositorio**: https://github.com/MrDUFYGY/arcodisic-landing-page
- ✅ **Branch**: main (pero deploys desde dev)
- ✅ **Token de GitHub**: Configurado

### Roles
- No configurados (todos los usuarios tienen acceso completo)

## 🐛 Troubleshooting

### Problema: Se queda cargando en `/admin/cms`

**Causa**: Netlify Identity no está habilitado o no se carga correctamente.

**Solución**:
1. Abrir consola del navegador (F12)
2. Buscar mensajes de log:
   - `🌐 Modo PRODUCCIÓN: Cargando Netlify Identity...`
   - `✅ Netlify Identity cargado`
   - `🔄 Identity init: ✅ Usuario autenticado` o `❌ Sin usuario`

3. Si no ves estos mensajes:
   - Verificar que Identity esté habilitado en Netlify
   - Verificar que no haya errores en la consola
   - Limpiar caché del navegador

### Problema: Modal de login no aparece

**Causa**: Script de Netlify Identity no se cargó.

**Solución**:
1. Verificar en consola: `📦 Script de Netlify Identity cargado`
2. Si no aparece, revisar:
   - Conexión a internet
   - Bloqueadores de scripts (AdBlock, etc.)
   - Configuración de CORS

### Problema: "Error loading config.yml"

**Causa**: Configuración del CMS incorrecta o servidor proxy no corriendo.

**Solución Local**:
```bash
# Verificar que el servidor proxy esté corriendo
npm run cms:local
# Debe mostrar: "Decap CMS Proxy Server listening on port 8081"
```

**Solución Producción**:
- Verificar que Git Gateway esté habilitado
- Verificar que el archivo `public/admin/config.yml` exista

### Problema: No puede guardar cambios en GitHub

**Causa**: Git Gateway no habilitado o permisos incorrectos.

**Solución**:
1. Verificar Git Gateway en Netlify Dashboard
2. Verificar que el usuario tenga permisos en el repositorio
3. Revisar logs de Netlify para ver errores

## 📊 Comparación: Local vs Producción

| Aspecto | Local | Producción |
|---------|-------|------------|
| **URL** | `http://localhost:4321/admin/cms` | `https://arcodisic.com.mx/admin/cms` |
| **Autenticación** | ❌ Sin autenticación | ✅ Netlify Identity |
| **Backend** | Servidor proxy local (puerto 8081) | Git Gateway |
| **Guardado** | Archivos locales | Commits a GitHub → Deploy automático |
| **Netlify Identity** | ❌ No carga | ✅ Carga dinámicamente |
| **Consola logs** | `🔧 Modo LOCAL` | `🌐 Modo PRODUCCIÓN` |

## 🧪 Comandos de Testing

### Local
```bash
# Terminal 1: Servidor proxy del CMS
npm run cms:local

# Terminal 2: Servidor de desarrollo
npm run dev

# Abrir navegador
open http://localhost:4321/admin
```

### Producción
```bash
# Commit y push a dev
git add .
git commit -m "Actualizar CMS"
git push origin dev

# Netlify hace deploy automático (2-3 minutos)
# Verificar en: https://app.netlify.com/sites/arcodisic-landing/deploys
```

## 📝 Logs de Consola (Referencia)

### Local
```
🔧 Modo LOCAL: Netlify Identity deshabilitado
📝 Asegúrate de ejecutar: npm run cms:local
📝 DecapCMS cargado
📂 Configuración: /admin/config.yml
```

### Producción (Sin usuario)
```
🌐 Modo PRODUCCIÓN: Cargando Netlify Identity...
📦 Script de Netlify Identity cargado
✅ Netlify Identity cargado
🔄 Identity init: ❌ Sin usuario
🔓 Abriendo modal de login...
📝 DecapCMS cargado
📂 Configuración: /admin/config.yml
```

### Producción (Con usuario)
```
🌐 Modo PRODUCCIÓN: Cargando Netlify Identity...
📦 Script de Netlify Identity cargado
✅ Netlify Identity cargado
🔄 Identity init: ✅ Usuario autenticado
👤 Usuario: admin@arcodisic.com.mx
📝 DecapCMS cargado
📂 Configuración: /admin/config.yml
```

## 🎯 Checklist de Implementación

### Setup Inicial (Una vez)
- [ ] Netlify Identity habilitado
- [ ] Git Gateway habilitado
- [ ] Usuarios invitados
- [ ] Usuarios establecieron contraseña

### Desarrollo Local (Cada sesión)
- [ ] `npm run cms:local` corriendo
- [ ] `npm run dev` corriendo
- [ ] Acceso a `http://localhost:4321/admin/cms`
- [ ] Puede editar posts

### Deploy a Producción
- [ ] Cambios commiteados en dev
- [ ] Push a GitHub
- [ ] Deploy completado en Netlify (verificar en Dashboard)
- [ ] Probar acceso a `https://arcodisic.com.mx/admin/cms`
- [ ] Verificar que login funciona
- [ ] Verificar que se pueden editar posts
- [ ] Verificar que cambios se guardan en GitHub

## 📚 Archivos Importantes

### Configuración del CMS
- `public/admin/config.yml` - Configuración de DecapCMS
- `public/admin/index.html` - Archivo antiguo (puede eliminarse)

### Páginas de Admin
- `src/pages/admin.astro` - Página de bienvenida
- `src/pages/admin/cms.astro` - **Editor principal del CMS**
- `src/pages/admin/setup-password.astro` - Establecer contraseña
- `src/pages/admin/login.astro` - Redirige a `/admin/cms`
- `src/pages/admin/callback.astro` - Redirige a `/admin/cms`

### Layout Global
- `src/layouts/Layout.astro` - Detecta tokens y redirige

## 🔗 Enlaces Útiles

- **Netlify Identity Dashboard**: https://app.netlify.com/sites/arcodisic-landing/identity
- **Deploys**: https://app.netlify.com/sites/arcodisic-landing/deploys
- **Repositorio**: https://github.com/MrDUFYGY/arcodisic-landing-page
- **Sitio**: https://arcodisic.com.mx

---

**Última actualización**: 26 de Octubre 2025  
**Estado**: ✅ Configurado y documentado  
**Rama de producción**: dev
