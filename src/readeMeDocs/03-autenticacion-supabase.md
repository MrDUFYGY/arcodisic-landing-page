# Autenticación DecapCMS con Supabase + Google OAuth

## 📋 Índice
1. [Introducción](#introducción)
2. [¿Por qué Supabase?](#por-qué-supabase)
3. [Arquitectura de la Solución](#arquitectura-de-la-solución)
4. [Requisitos Previos](#requisitos-previos)
5. [Configuración Paso a Paso](#configuración-paso-a-paso)
6. [Implementación del Código](#implementación-del-código)
7. [Testing y Verificación](#testing-y-verificación)

---

## 🎯 Introducción

DecapCMS normalmente utiliza Git Gateway (Netlify Identity) para autenticación. Sin embargo, podemos usar **Supabase** como proveedor de autenticación para tener más control y flexibilidad.

### Ventajas de usar Supabase:
- ✅ **Gratuito**: Hasta 50,000 usuarios activos mensuales
- ✅ **OAuth Social**: Google, GitHub, Facebook, etc.
- ✅ **Base de datos PostgreSQL**: Para futuros features
- ✅ **Serverless Functions**: Edge Functions disponibles
- ✅ **Real-time**: Capacidades real-time incluidas
- ✅ **Storage**: Almacenamiento de archivos incluido

---

## 🏗️ Arquitectura de la Solución

### Flujo de Autenticación

```
┌─────────────────────────────────────────────┐
│          Usuario en /admin                   │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│     Verifica autenticación Supabase          │
│     (Token JWT en localStorage)              │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
   ✅ Autenticado   ❌ No autenticado
       │                │
       │                ▼
       │    ┌─────────────────────────────┐
       │    │  Redirige a Login con       │
       │    │  Google OAuth (Supabase)    │
       │    └──────────┬──────────────────┘
       │               │
       │               ▼
       │    ┌─────────────────────────────┐
       │    │  Google Auth Screen         │
       │    └──────────┬──────────────────┘
       │               │
       │               ▼
       │    ┌─────────────────────────────┐
       │    │  Callback a Supabase        │
       │    │  Genera JWT Token           │
       │    └──────────┬──────────────────┘
       │               │
       └───────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│     Acceso al Panel DecapCMS                 │
│     Con permisos de Git                      │
└─────────────────────────────────────────────┘
```

---

## 📦 Requisitos Previos

### Cuentas Necesarias
- ✅ Cuenta de GitHub (ya la tienes)
- ✅ Cuenta de Supabase (gratuita) - https://supabase.com
- ✅ Cuenta de Google Cloud Console (gratuita) - https://console.cloud.google.com
- ✅ Repositorio Git del proyecto

### Dependencias NPM
```bash
npm install @supabase/supabase-js
```

---

## 🚀 Configuración Paso a Paso

### FASE 1: Configurar Proyecto en Supabase (15 minutos)

#### Paso 1.1: Crear Proyecto

1. **Ve a**: https://app.supabase.com
2. **Click en**: "New Project"
3. **Completa**:
   - **Name**: Arcodisic CMS
   - **Database Password**: Genera una segura (guárdala)
   - **Region**: South America (más cercana)
   - **Pricing Plan**: Free
4. **Click**: "Create new project"
5. **Espera**: ~2 minutos para que se cree

#### Paso 1.2: Obtener Credenciales

1. **Ve a**: Settings → API
2. **Copia y guarda**:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (API Key pública)
   - **service_role key**: `eyJhbGc...` (⚠️ Mantener secreta)

---

### FASE 2: Configurar Google OAuth (20 minutos)

#### Paso 2.1: Crear Proyecto en Google Cloud

1. **Ve a**: https://console.cloud.google.com
2. **Click**: "Select a project" → "New Project"
3. **Nombre**: "Arcodisic CMS"
4. **Click**: "Create"

#### Paso 2.2: Habilitar Google+ API

1. **Ve a**: APIs & Services → Library
2. **Busca**: "Google+ API"
3. **Click**: "Enable"

#### Paso 2.3: Configurar OAuth Consent Screen

1. **Ve a**: APIs & Services → OAuth consent screen
2. **Selecciona**: "External"
3. **Click**: "Create"
4. **Completa**:
   - **App name**: Arcodisic CMS
   - **User support email**: Tu email
   - **Developer contact**: Tu email
5. **Click**: "Save and Continue"
6. **En Scopes**: Click "Save and Continue" (sin cambios)
7. **En Test users**: 
   - Click "Add Users"
   - Añade los emails que usarán el CMS
   - Click "Save and Continue"
8. **Click**: "Back to Dashboard"

#### Paso 2.4: Crear OAuth Client

1. **Ve a**: APIs & Services → Credentials
2. **Click**: "Create Credentials" → "OAuth Client ID"
3. **Application type**: "Web application"
4. **Name**: "Arcodisic CMS"
5. **Authorized redirect URIs**: 
   - Click "+ Add URI"
   - Añade: `https://[TU-PROYECTO-ID].supabase.co/auth/v1/callback`
   - Ejemplo: `https://abcdefgh.supabase.co/auth/v1/callback`
6. **Click**: "Create"
7. **Copia y guarda**:
   - **Client ID**: `123456789-xxxxx.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-xxxxx`

---

### FASE 3: Integrar Google OAuth con Supabase (10 minutos)

#### Paso 3.1: Configurar Provider en Supabase

1. **Ve a**: Supabase Dashboard → Authentication → Providers
2. **Busca**: "Google"
3. **Habilita**: Toggle ON
4. **Completa**:
   - **Client ID**: Pega el Client ID de Google
   - **Client Secret**: Pega el Client Secret de Google
5. **Click**: "Save"

#### Paso 3.2: Configurar Redirect URLs

1. **Ve a**: Authentication → URL Configuration
2. **Site URL**: `https://arcodisic.com.mx` (tu dominio en producción)
3. **Redirect URLs**: Añade:
   - `http://localhost:4321/admin/callback` (desarrollo)
   - `https://arcodisic.com.mx/admin/callback` (producción)
4. **Click**: "Save"

---

### FASE 4: Crear Variables de Entorno (5 minutos)

#### Paso 4.1: Crear archivo .env.local

Crea el archivo en la raíz del proyecto:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...tu-anon-key

# Solo para desarrollo/deploy (NO compartir)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...tu-service-role-key

# GitHub Token para DecapCMS (opcional)
GITHUB_TOKEN=ghp_xxxxx
```

#### Paso 4.2: Actualizar .gitignore

Asegúrate que `.env.local` esté en `.gitignore`:

```gitignore
# Local env files
.env
.env*.local
.env.local
```

---

## 💻 Implementación del Código

### FASE 5: Instalar Dependencias (2 minutos)

```bash
npm install @supabase/supabase-js
```

### FASE 6: Crear Cliente de Supabase (10 minutos)

#### Archivo: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar autenticación
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session;
}

// Helper para login con Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/admin/callback`,
    },
  });
  if (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
  return data;
}

// Helper para logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
}
```

---

### FASE 7: Crear Páginas de Autenticación (15 minutos)

#### Archivo: `src/pages/admin/login.astro`

```astro
---
// Página de login para el CMS
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Login - Arcodisic CMS</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .login-container {
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        padding: 60px 40px;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }
      
      .logo {
        width: 80px;
        height: 80px;
        margin: 0 auto 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
      }
      
      h1 {
        font-size: 28px;
        color: #333;
        margin-bottom: 10px;
      }
      
      p {
        color: #666;
        margin-bottom: 40px;
        font-size: 14px;
      }
      
      .google-btn {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: all 0.3s ease;
        color: #333;
      }
      
      .google-btn:hover {
        background: #f8f9fa;
        border-color: #667eea;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      .google-btn:active {
        transform: translateY(0);
      }
      
      .google-icon {
        width: 24px;
        height: 24px;
      }
      
      .error {
        background: #fee;
        border: 1px solid #fcc;
        color: #c33;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
        display: none;
      }
      
      .error.show {
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="login-container">
      <div class="logo">🏗️</div>
      <h1>Arcodisic CMS</h1>
      <p>Ingresa con tu cuenta de Google para gestionar el contenido del blog</p>
      
      <div id="error" class="error"></div>
      
      <button id="google-login" class="google-btn">
        <svg class="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar con Google
      </button>
    </div>

    <script>
      import { signInWithGoogle } from '../../lib/supabase';

      const loginBtn = document.getElementById('google-login');
      const errorDiv = document.getElementById('error');

      if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
          try {
            loginBtn.textContent = 'Redirigiendo...';
            loginBtn.disabled = true;
            
            const result = await signInWithGoogle();
            
            if (!result) {
              throw new Error('Error al iniciar sesión con Google');
            }
            
            // La redirección ocurre automáticamente
          } catch (error) {
            console.error('Error:', error);
            errorDiv.textContent = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
            errorDiv.classList.add('show');
            loginBtn.textContent = 'Continuar con Google';
            loginBtn.disabled = false;
          }
        });
      }
    </script>
  </body>
</html>
```

---

#### Archivo: `src/pages/admin/callback.astro`

```astro
---
// Callback después del login con Google
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Autenticando...</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin: 0;
      }
      
      .container {
        text-align: center;
        color: white;
      }
      
      .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      h1 {
        font-size: 24px;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="spinner"></div>
      <h1>Autenticando...</h1>
    </div>

    <script>
      import { supabase } from '../../lib/supabase';

      // Manejar el callback de OAuth
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Redirigir al panel de admin
          window.location.href = '/admin/';
        } else if (event === 'SIGNED_OUT') {
          window.location.href = '/admin/login';
        }
      });

      // Timeout para redirigir si algo falla
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          // Si hay token, redirigir al admin
          window.location.href = '/admin/';
        } else {
          // Si no hay token, volver al login
          window.location.href = '/admin/login';
        }
      }, 3000);
    </script>
  </body>
</html>
```

---

### FASE 8: Proteger el Admin Panel (15 minutos)

#### Actualizar: `src/pages/admin.astro`

```astro
---
// Proteger la ruta /admin y verificar autenticación
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Arcodisic CMS - Verificando...</title>
  </head>
  <body>
    <div id="loading">
      <p>Verificando autenticación...</p>
    </div>

    <script>
      import { getSession } from '../lib/supabase';

      async function checkAuth() {
        const session = await getSession();
        
        if (session && session.user) {
          // Usuario autenticado, redirigir al admin
          window.location.href = '/admin/';
        } else {
          // No autenticado, redirigir al login
          window.location.href = '/admin/login';
        }
      }

      checkAuth();
    </script>
  </body>
</html>
```

---

## 🧪 Testing y Verificación

### Checklist de Testing

- [ ] Variables de entorno configuradas
- [ ] Proyecto Supabase creado
- [ ] Google OAuth configurado
- [ ] Provider Google habilitado en Supabase
- [ ] Dependencias instaladas (`@supabase/supabase-js`)
- [ ] Archivos creados (supabase.ts, login.astro, callback.astro)
- [ ] Servidor de desarrollo corriendo
- [ ] Acceso a `/admin/login` funciona
- [ ] Click en "Continuar con Google" redirige a Google
- [ ] Después del login, redirige a `/admin/callback`
- [ ] Callback redirige a `/admin/`
- [ ] Panel de DecapCMS carga correctamente

---

## 📊 Próximos Pasos

Una vez completada la autenticación:

1. **Configurar permisos de usuarios** en Supabase
2. **Integrar token de Supabase con Git** para commits
3. **Agregar botón de logout** en el panel
4. **Configurar políticas RLS** (Row Level Security) si usas base de datos
5. **Deploy a producción** con variables de entorno

---

## 🆘 Troubleshooting

### Error: "Missing environment variables"
- Verifica que `.env.local` existe
- Verifica que las variables empiezan con `PUBLIC_`
- Reinicia el servidor de desarrollo

### Error: "Invalid OAuth configuration"
- Verifica las Redirect URIs en Google Cloud Console
- Verifica que coincidan con las de Supabase

### Error: "Sign in with Google failed"
- Verifica que Google+ API está habilitada
- Verifica que el usuario está en "Test users"
- Verifica Client ID y Secret en Supabase

---

**Siguiente paso**: Implementar este plan fase por fase.

¿Comenzamos con la Fase 1: Configurar Supabase?
