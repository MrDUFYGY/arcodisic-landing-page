# 🚀 Inicio Rápido - Autenticación con Supabase

## ⏱️ Tiempo estimado: 45 minutos

Esta guía te llevará paso a paso para implementar autenticación con Supabase y Google OAuth en tu CMS.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

- ✅ DecapCMS configurado (Fase 1 completa)
- ✅ Cuenta de Gmail/Google
- ✅ 45 minutos de tiempo disponible

---

## 🎯 Paso 1: Crear Cuenta en Supabase (5 min)

### 1. Ve a Supabase
```
https://supabase.com
```

### 2. Regístrate
- Click en "Start your project"
- Usa tu cuenta de GitHub o Google

### 3. Crea tu primer proyecto
- Click en "New Project"
- **Organization**: Crea una nueva o usa existente
- **Project Name**: `arcodisic-cms`
- **Database Password**: Genera una (guárdala en lugar seguro)
- **Region**: South America (Brasil) - más cercano
- **Pricing**: Free

### 4. Espera ~2 minutos
El proyecto se está creando...

### 5. Obtén tus credenciales
Una vez creado el proyecto:
- Ve a: **Settings** → **API**
- Copia y guarda:
  - ✅ **Project URL**: `https://xxxxx.supabase.co`
  - ✅ **anon/public key**: `eyJhbGc...` (larga)

---

## 🔑 Paso 2: Configurar Google OAuth (15 min)

### 1. Ve a Google Cloud Console
```
https://console.cloud.google.com
```

### 2. Crea un proyecto nuevo
- Click en el selector de proyectos (arriba)
- Click en "New Project"
- **Project Name**: `Arcodisic CMS`
- Click en "Create"
- **Espera 1 minuto** y selecciona el proyecto

### 3. Habilita Google+ API
- En el menú lateral: **APIs & Services** → **Library**
- Busca: "Google+ API"
- Click en el resultado
- Click en "**Enable**"

### 4. Configura OAuth Consent Screen
- Ve a: **APIs & Services** → **OAuth consent screen**
- Selecciona: **External**
- Click: "Create"

**Completa el formulario**:

**Paso 1 - OAuth consent screen**:
- **App name**: `Arcodisic CMS`
- **User support email**: Tu email
- **App logo**: (opcional, déjalo en blanco)
- **Application home page**: `https://arcodisic.com.mx`
- **Developer contact information**: Tu email
- Click: "**Save and Continue**"

**Paso 2 - Scopes**:
- Click: "**Save and Continue**" (sin cambios)

**Paso 3 - Test users**:
- Click: "**+ Add Users**"
- Añade tu email y los de las personas que usarán el CMS
- Ejemplo: `janet.g.arcodisic@gmail.com`
- Click: "Add"
- Click: "**Save and Continue**"

**Paso 4 - Summary**:
- Click: "**Back to Dashboard**"

### 5. Crea OAuth Client ID
- Ve a: **APIs & Services** → **Credentials**
- Click: "**+ Create Credentials**" → "OAuth client ID"
- **Application type**: Web application
- **Name**: `Arcodisic CMS Web Client`

**Authorized redirect URIs**:
- Click: "+ Add URI"
- Añade: `https://[TU-PROYECTO-ID].supabase.co/auth/v1/callback`
  - Ejemplo: `https://abcdefgh.supabase.co/auth/v1/callback`
  - (Reemplaza con tu Project URL de Supabase + `/auth/v1/callback`)
- Click: "**Create**"

### 6. Guarda tus credenciales
Aparecerá un modal con:
- ✅ **Client ID**: `123456789-xxxxx.apps.googleusercontent.com`
- ✅ **Client secret**: `GOCSPX-xxxxx`

**¡Guárdalos en un lugar seguro!**

---

## 🔗 Paso 3: Conectar Google con Supabase (5 min)

### 1. Vuelve a Supabase Dashboard
```
https://app.supabase.com
```

### 2. Configura el provider
- Ve a: **Authentication** → **Providers**
- Busca: "Google"
- Click en el toggle para **habilitar**

### 3. Ingresa las credenciales
- **Client ID (for OAuth)**: Pega el Client ID de Google
- **Client Secret (for OAuth)**: Pega el Client Secret de Google
- Click: "**Save**"

### 4. Configura URLs permitidas
- Ve a: **Authentication** → **URL Configuration**
- **Site URL**: `http://localhost:4321` (para desarrollo)
- **Redirect URLs**: Añade (una por línea):
  ```
  http://localhost:4321/admin/callback
  https://arcodisic.com.mx/admin/callback
  ```
- Click: "**Save**"

---

## 💻 Paso 4: Instalar y Configurar (10 min)

### 1. Instala la dependencia
```bash
npm install @supabase/supabase-js
```

### 2. Crea archivo .env.local
En la raíz del proyecto, crea `.env.local`:

```env
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...tu-anon-key-completa
```

**Reemplaza con tus valores reales de Supabase!**

### 3. Verifica .gitignore
Asegúrate que `.env.local` NO se suba a Git.

Abre `.gitignore` y verifica que contenga:
```
.env
.env*.local
```

### 4. Crea el cliente de Supabase
Ya está preparado el archivo, solo verifica que exista:
- `src/lib/supabase.ts` ✅ (lo crearemos en el siguiente paso)

---

## 📝 Paso 5: Crear Archivos de Código (10 min)

Ejecuta estos comandos para crear los archivos necesarios:

### 1. Crea el directorio lib
```bash
mkdir src/lib
```

### 2. Crea las páginas de autenticación
Las páginas ya están documentadas en [03-autenticacion-supabase.md](./03-autenticacion-supabase.md).

Crea estos archivos copiando el código de la documentación:
- ✅ `src/lib/supabase.ts`
- ✅ `src/pages/admin/login.astro`
- ✅ `src/pages/admin/callback.astro`
- ✅ Actualiza `src/pages/admin.astro`

---

## 🧪 Paso 6: Probar la Autenticación (5 min)

### 1. Reinicia el servidor
```bash
# Detén el servidor con Ctrl+C
npm run dev
```

### 2. Accede al login
Abre tu navegador en:
```
http://localhost:4321/admin/login
```

### 3. Prueba el login
- Click en "Continuar con Google"
- Selecciona tu cuenta de Google
- Acepta los permisos
- Deberías ser redirigido al admin panel

### 4. Verifica que funciona
- Deberías ver el panel de DecapCMS
- Deberías poder ver los posts
- Deberías poder crear un nuevo post

---

## ✅ Checklist Final

Verifica que todo funcione:

- [ ] Proyecto de Supabase creado
- [ ] Credenciales de Supabase obtenidas
- [ ] Proyecto de Google Cloud creado
- [ ] OAuth Client ID creado
- [ ] Google OAuth conectado en Supabase
- [ ] Dependencia `@supabase/supabase-js` instalada
- [ ] Archivo `.env.local` creado con variables
- [ ] Archivos de código creados
- [ ] Login con Google funciona
- [ ] Redirige correctamente al admin
- [ ] Panel de DecapCMS carga correctamente

---

## 🐛 Problemas Comunes

### "Missing environment variables"
**Solución**:
- Verifica que `.env.local` existe
- Verifica que las variables empiezan con `PUBLIC_`
- Reinicia el servidor: `npm run dev`

### "OAuth error: redirect_uri_mismatch"
**Solución**:
- Verifica la Redirect URI en Google Cloud Console
- Debe ser exactamente: `https://[tu-id].supabase.co/auth/v1/callback`
- Verifica que no haya espacios o caracteres extra

### "Sign in failed"
**Solución**:
- Verifica que el usuario está en "Test users" en Google Cloud
- Verifica que Google+ API está habilitada
- Verifica Client ID y Secret en Supabase

### No redirige después del login
**Solución**:
- Verifica las Redirect URLs en Supabase
- Debe incluir: `http://localhost:4321/admin/callback`
- Limpia cache del navegador (Ctrl+Shift+Del)

---

## 🎉 ¡Listo!

Si todo funciona correctamente:
- ✅ Tienes autenticación con Google
- ✅ Los usuarios pueden acceder de forma segura
- ✅ El CMS está protegido

---

## 📚 Siguiente Paso

Ahora que la autenticación funciona:

1. **Agrega más usuarios**: Ve a Google Cloud Console → Test users
2. **Configura el backend de Git**: Para que los posts se guarden en GitHub
3. **Deploy a producción**: Configura variables de entorno en Netlify/Vercel

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa el [documento completo de autenticación](./03-autenticacion-supabase.md)
2. Verifica cada paso del checklist
3. Consulta la sección de troubleshooting

---

**Tiempo total**: ~45 minutos  
**Dificultad**: Media  
**Resultado**: Autenticación funcionando con Google OAuth 🚀
