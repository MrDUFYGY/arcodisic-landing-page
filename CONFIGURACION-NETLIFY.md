# 🚀 Configuración de Netlify para Producción

**Proyecto**: arcodisic-landing  
**URL Principal**: https://arcodisic.com.mx  
**URL Netlify**: https://arcodisic-landing.netlify.app  
**Fecha**: 26 de Octubre 2025

---

## ✅ Configuración Completada

### 1. Variables de Entorno
Las siguientes variables ya están configuradas en Netlify:

- ✅ `PUBLIC_SUPABASE_URL`
- ✅ `PUBLIC_SUPABASE_ANON_KEY`

### 2. Archivos Actualizados
- ✅ `public/admin/config.yml` - Configurado para git-gateway
- ✅ `public/admin/index.html` - Netlify Identity agregado

---

## 🔧 Pasos Pendientes para Completar la Configuración

### Paso 1: Habilitar Netlify Identity

1. Ve al Dashboard de Netlify:
   ```
   https://app.netlify.com/sites/arcodisic-landing/identity
   ```

2. Click en **"Enable Identity"**

3. Configurar opciones:
   - **Registration**: Invite only (solo por invitación)
   - **External providers**: Puedes habilitar Google, GitHub, etc. (opcional)
   - **Emails**: Usar el proveedor de emails de Netlify

### Paso 2: Habilitar Git Gateway

1. En la misma página de Identity, ve a la pestaña **"Services"**

2. Click en **"Enable Git Gateway"**

3. Esto permitirá que DecapCMS guarde los cambios directamente en tu repositorio de GitHub

### Paso 3: Invitar Usuarios

1. Ve a la pestaña **"Identity"** en Netlify

2. Click en **"Invite users"**

3. Agrega los emails de los usuarios que podrán acceder al CMS:
   - `admin@arcodisic.com.mx`
   - `editor@arcodisic.com.mx`
   - `janet.g.arcodisic@gmail.com`

4. Cada usuario recibirá un email de invitación

5. Al hacer click en el link del email, podrán establecer su contraseña

### Paso 4: Configurar Redirect URLs (Opcional)

Si quieres que los usuarios sean redirigidos después del login:

1. Ve a: **Site settings → Identity → Registration**

2. En **"Registration preferences"**:
   - Confirmation template: Personaliza el email de confirmación
   - Success redirect: `/admin/` (redirigir al CMS después del login)

---

## 🎯 Cómo Funciona en Producción

### Flujo de Autenticación

```
1. Usuario visita: https://arcodisic.com.mx/admin/
   ↓
2. Netlify Identity detecta que no está autenticado
   ↓
3. Muestra modal de login de Netlify
   ↓
4. Usuario ingresa email y contraseña
   ↓
5. Netlify valida credenciales
   ↓
6. Usuario es autenticado
   ↓
7. DecapCMS se carga con acceso al repositorio
   ↓
8. Usuario puede crear/editar posts
   ↓
9. Los cambios se guardan como commits en GitHub
   ↓
10. Netlify detecta el nuevo commit
    ↓
11. Netlify hace rebuild automático del sitio
    ↓
12. ✅ Cambios publicados en el sitio
```

### Diferencias entre Desarrollo y Producción

| Aspecto | Desarrollo (Local) | Producción (Netlify) |
|---------|-------------------|----------------------|
| **Backend** | `local_backend` (test-repo) | `git-gateway` |
| **Autenticación** | Supabase (opcional) | Netlify Identity |
| **Servidor Proxy** | `npm run cms:local` | No necesario |
| **Guardado** | Archivos locales | Commits a GitHub |
| **URL** | `http://localhost:4321/admin/` | `https://arcodisic.com.mx/admin/` |

---

## 📝 Comandos para Deploy

### Deploy Manual (desde tu computadora)

```bash
# Asegúrate de que todos los cambios estén commiteados
git add .
git commit -m "Configurar CMS para producción"
git push origin main
```

Netlify detectará el push y hará el deploy automáticamente.

### Deploy desde Netlify Dashboard

1. Ve a: https://app.netlify.com/sites/arcodisic-landing/deploys

2. Click en **"Trigger deploy"** → **"Deploy site"**

---

## 🧪 Probar en Producción

Una vez que hayas completado los pasos anteriores:

1. Ve a: `https://arcodisic.com.mx/admin/`

2. Deberías ver el modal de login de Netlify Identity

3. Ingresa con uno de los usuarios invitados

4. Verás el panel de DecapCMS

5. Crea un post de prueba

6. Click en **"Publish"**

7. Espera unos minutos a que Netlify haga el rebuild

8. Verifica que el post aparezca en tu sitio

---

## 🔐 Gestión de Usuarios

### Agregar Nuevo Usuario

1. Netlify Dashboard → Identity → Invite users
2. Ingresa el email
3. El usuario recibe invitación por email
4. Establece contraseña al aceptar invitación

### Eliminar Usuario

1. Netlify Dashboard → Identity
2. Busca el usuario
3. Click en los 3 puntos → Delete user

### Cambiar Rol de Usuario

Netlify Identity no tiene roles por defecto, pero puedes:
- Usar metadata personalizada
- Configurar roles en el `config.yml` de DecapCMS
- Implementar lógica personalizada con Netlify Functions

---

## 🐛 Troubleshooting

### "Error: Failed to load config.yml"
→ Verifica que el archivo esté en `public/admin/config.yml`

### "Error: Git Gateway is not enabled"
→ Ve a Netlify Dashboard → Identity → Services → Enable Git Gateway

### "Error: Not authorized"
→ Verifica que el usuario esté invitado en Netlify Identity

### Los cambios no se guardan en GitHub
→ Verifica que Git Gateway esté habilitado y que tengas permisos en el repo

### El sitio no se actualiza después de publicar
→ Verifica que Netlify esté configurado para hacer deploy automático en push

---

## 📊 Monitoreo

### Ver Deploys
```
https://app.netlify.com/sites/arcodisic-landing/deploys
```

### Ver Usuarios
```
https://app.netlify.com/sites/arcodisic-landing/identity
```

### Ver Logs
```
https://app.netlify.com/sites/arcodisic-landing/logs
```

---

## 🎉 Resumen de Configuración

### ✅ Completado
- [x] Variables de entorno configuradas
- [x] Config.yml actualizado para git-gateway
- [x] Netlify Identity agregado al HTML
- [x] Documentación creada

### ⏳ Pendiente (Manual en Netlify Dashboard)
- [ ] Habilitar Netlify Identity
- [ ] Habilitar Git Gateway
- [ ] Invitar usuarios
- [ ] Hacer deploy a producción
- [ ] Probar creación de post

---

## 📚 Recursos

- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [DecapCMS Git Gateway](https://decapcms.org/docs/git-gateway-backend/)
- [Netlify Deploy Docs](https://docs.netlify.com/site-deploys/overview/)

---

**Última actualización**: 26 de Octubre 2025  
**Estado**: ⏳ Configuración lista, pendiente habilitar Identity en Netlify
