# 🔐 Flujo de Autenticación del CMS

**Proyecto**: Arcodisic Landing Page  
**Fecha**: 26 de Octubre 2025  
**Rama**: dev

---

## 📋 Resumen

El CMS usa **Netlify Identity** en producción y **modo local sin autenticación** en desarrollo.

- ✅ **Sin Supabase**: Eliminado completamente del flujo del CMS
- ✅ **Funciona en local y producción**: Mismo código, diferentes backends
- ✅ **Página dedicada para establecer contraseña**: `/admin/setup-password`

---

## 🎯 Flujos de Uso

### 1. Desarrollo Local (sin autenticación)

```bash
# Terminal 1: Servidor proxy del CMS
npm run cms:local

# Terminal 2: Servidor de desarrollo
npm run dev
```

**Acceso directo**:
- URL: `http://localhost:4321/admin`
- No requiere login
- Edita posts directamente
- Cambios se guardan en archivos locales

**Establecer contraseña (simulado)**:
- URL: `http://localhost:4321/admin/setup-password#recovery_token=test`
- Muestra formulario de prueba
- Simula el flujo de producción
- Redirige a `/admin` después

---

### 2. Producción (Netlify Identity)

**Primera vez / Invitación**:

1. **Admin invita usuario** en Netlify Dashboard:
   ```
   https://app.netlify.com/sites/arcodisic-landing/identity
   → Click "Invite users"
   → Ingresar email
   ```

2. **Usuario recibe email** con enlace tipo:
   ```
   https://arcodisic.com.mx/#invite_token=xxxxx
   ```

3. **Sistema detecta token** y redirige a:
   ```
   https://arcodisic.com.mx/admin/setup-password#invite_token=xxxxx
   ```

4. **Usuario establece contraseña**:
   - Formulario con validación
   - Mínimo 6 caracteres
   - Confirmar contraseña

5. **Redirige automáticamente** a:
   ```
   https://arcodisic.com.mx/admin
   ```

6. **Netlify Identity muestra modal de login**

7. **Usuario accede al CMS** de DecapCMS

**Recuperar contraseña**:

1. Usuario hace click en "Forgot password" en el modal de Netlify Identity

2. Recibe email con enlace:
   ```
   https://arcodisic.com.mx/#recovery_token=xxxxx
   ```

3. Sistema redirige a `/admin/setup-password`

4. Usuario establece nueva contraseña

5. Redirige a `/admin` y hace login

---

## 🗺️ Mapa de Rutas

### Rutas Públicas

| Ruta | Descripción | Funciona en Local | Funciona en Producción |
|------|-------------|-------------------|------------------------|
| `/admin` | Redirige al CMS | ✅ Sí | ✅ Sí |
| `/admin/index.html` | CMS de DecapCMS | ✅ Sí | ✅ Sí |
| `/admin/setup-password` | Establecer contraseña | ✅ Simulado | ✅ Real |

### Rutas Deshabilitadas (redirigen a `/admin`)

| Ruta | Estado | Razón |
|------|--------|-------|
| `/admin/login` | ⚠️ Redirige | Ya no usa Supabase |
| `/admin/callback` | ⚠️ Redirige | Ya no usa Supabase |

---

## 🔧 Configuración Requerida en Netlify

### 1. Habilitar Netlify Identity

```
Dashboard → Sites → arcodisic-landing → Identity
→ Click "Enable Identity"
```

**Configuración**:
- **Registration**: Invite only
- **External providers**: Opcional (Google, GitHub, etc.)
- **Emails**: Usar proveedor de Netlify

### 2. Habilitar Git Gateway

```
Identity → Services → Git Gateway
→ Click "Enable Git Gateway"
```

Esto permite que DecapCMS guarde cambios directamente en GitHub.

### 3. Invitar Usuarios

```
Identity → Invite users
→ Ingresar emails:
  - admin@arcodisic.com.mx
  - editor@arcodisic.com.mx
  - janet.g.arcodisic@gmail.com
```

Cada usuario recibirá un email de invitación.

---

## 📁 Archivos Clave

### Backend del CMS

**`public/admin/config.yml`**:
```yaml
backend:
  name: git-gateway  # Producción: Git Gateway
  branch: main

local_backend: true  # Desarrollo: Servidor local
```

### Páginas de Admin

1. **`src/pages/admin.astro`**:
   - Redirige a `/admin/index.html`
   - Sin lógica de Supabase

2. **`src/pages/admin/setup-password.astro`**:
   - Maneja tokens de invitación/recuperación
   - Funciona en local (simulado) y producción (real)
   - Formulario de establecer contraseña

3. **`src/pages/admin/login.astro`**:
   - Deshabilitado, redirige a `/admin`

4. **`src/pages/admin/callback.astro`**:
   - Deshabilitado, redirige a `/admin`

### Layout Global

**`src/layouts/Layout.astro`**:
- Carga widget de Netlify Identity
- Detecta tokens en URL (`#recovery_token`, `#invite_token`, etc.)
- Redirige a `/admin/setup-password` cuando hay token
- Configura eventos de login en producción

---

## 🧪 Cómo Probar

### En Local

1. **Iniciar servidores**:
   ```bash
   npm run cms:local  # Terminal 1
   npm run dev        # Terminal 2
   ```

2. **Probar acceso directo**:
   ```
   http://localhost:4321/admin
   ```
   → Debería cargar el CMS sin login

3. **Probar setup de contraseña**:
   ```
   http://localhost:4321/admin/setup-password#recovery_token=test
   ```
   → Debería mostrar formulario simulado

### En Producción

1. **Invitar usuario** desde Netlify Dashboard

2. **Abrir enlace del email** (con `#invite_token`)

3. **Verificar redirección** a `/admin/setup-password`

4. **Establecer contraseña**

5. **Verificar redirección** a `/admin`

6. **Hacer login** con Netlify Identity

7. **Acceder al CMS** de DecapCMS

---

## 🐛 Troubleshooting

### "No se encontró un token válido"

**Causa**: El enlace del email no tiene el hash con el token.

**Solución**:
- Verificar que el email de Netlify incluye el token en el hash
- Copiar y pegar la URL completa incluyendo el `#`

### "Netlify Identity no está disponible"

**Causa**: Widget no cargó en producción.

**Solución**:
- Verificar que `Layout.astro` carga el script de Identity
- Verificar que Netlify Identity está habilitado en el Dashboard

### "El modal no se abre en localhost"

**Causa**: Netlify Identity solo funciona en dominios de Netlify.

**Solución**:
- En local, usa `/admin` directamente sin autenticación
- Para probar el flujo completo, usa la URL de producción

### "Los cambios no se guardan en GitHub"

**Causa**: Git Gateway no está habilitado.

**Solución**:
- Verificar en Netlify Dashboard → Identity → Services
- Habilitar Git Gateway

---

## 📊 Comparación: Antes vs Ahora

| Aspecto | Antes (Supabase) | Ahora (Netlify Identity) |
|---------|------------------|--------------------------|
| **Auth en Local** | Supabase (complejo) | Sin auth (simple) |
| **Auth en Producción** | Supabase | Netlify Identity |
| **Setup de contraseña** | No disponible | `/admin/setup-password` |
| **Páginas de login** | `/admin/login` con Supabase | Redirige a `/admin` |
| **Callback OAuth** | `/admin/callback` con Supabase | Redirige a `/admin` |
| **Backend del CMS** | Local proxy | Local proxy |
| **Guardado en producción** | Git Gateway | Git Gateway |
| **Complejidad** | Alta | Baja |

---

## ✅ Checklist de Configuración

### Desarrollo Local
- [x] `npm run cms:local` corriendo
- [x] `npm run dev` corriendo
- [x] Acceso a `http://localhost:4321/admin` sin login
- [x] Puede editar posts
- [x] Cambios se guardan localmente

### Producción
- [ ] Netlify Identity habilitado
- [ ] Git Gateway habilitado
- [ ] Usuarios invitados
- [ ] Usuarios establecieron contraseña
- [ ] Usuarios pueden hacer login
- [ ] Usuarios pueden editar posts
- [ ] Cambios se guardan en GitHub
- [ ] Netlify hace rebuild automático

---

## 🎓 Notas Técnicas

### ¿Por qué no funciona el widget en localhost?

Netlify Identity está diseñado para funcionar solo en dominios de Netlify o dominios personalizados configurados. En `localhost`, el widget se carga pero no puede autenticar porque no tiene acceso a la API de Netlify Identity.

**Solución**: En desarrollo, usamos el servidor proxy local (`decap-server`) que no requiere autenticación.

### ¿Cómo funciona el flujo de tokens?

1. Netlify envía email con URL que incluye token en el hash: `#recovery_token=xxxxx`
2. `Layout.astro` detecta el token con regex
3. Redirige a `/admin/setup-password` preservando el hash
4. La página `setup-password` lee el token y muestra el formulario
5. En producción, usa Netlify Identity API para establecer contraseña
6. En local, simula el proceso para testing

### ¿Por qué mantener archivos de Supabase?

Los archivos de Supabase (`src/lib/supabase.ts`, etc.) se mantienen por si otras partes del sitio los necesitan en el futuro. Solo se eliminó su uso en el flujo del CMS.

---

## 📚 Referencias

- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [DecapCMS Git Gateway](https://decapcms.org/docs/git-gateway-backend/)
- [DecapCMS Local Backend](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository)

---

**Última actualización**: 26 de Octubre 2025  
**Estado**: ✅ Configurado y funcionando en dev  
**Pendiente**: Habilitar Netlify Identity en producción
