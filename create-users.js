// Script para crear usuarios en Supabase usando la Admin API
// Este script debe ejecutarse con Node.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Necesitamos la service role key

if (!supabaseUrl) {
  console.error('❌ Error: PUBLIC_SUPABASE_URL no está definida en .env.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está definida en .env.local');
  console.log('ℹ️  Necesitas agregar la Service Role Key de Supabase a .env.local');
  console.log('ℹ️  La puedes encontrar en: Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

// Crear cliente de Supabase con permisos de admin
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Usuarios a crear
const users = [
  {
    email: 'admin@arcodisic.com.mx',
    password: 'Arcodisic2025!',
    user_metadata: {
      name: 'Administrador',
      role: 'admin'
    }
  },
  {
    email: 'editor@arcodisic.com.mx',
    password: 'Editor2025!',
    user_metadata: {
      name: 'Editor',
      role: 'editor'
    }
  },
  {
    email: 'janet.g.arcodisic@gmail.com',
    password: 'Janet2025!',
    user_metadata: {
      name: 'Janet',
      role: 'editor'
    }
  }
];

async function createUsers() {
  console.log('🚀 Creando usuarios en Supabase...\n');

  for (const userData of users) {
    try {
      console.log(`📝 Creando usuario: ${userData.email}`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true, // Confirmar email automáticamente
        user_metadata: userData.user_metadata
      });

      if (error) {
        console.error(`❌ Error creando ${userData.email}:`, error.message);
      } else {
        console.log(`✅ Usuario creado exitosamente: ${userData.email}`);
        console.log(`   ID: ${data.user.id}`);
        console.log(`   Nombre: ${userData.user_metadata.name}`);
        console.log(`   Rol: ${userData.user_metadata.role}\n`);
      }
    } catch (error) {
      console.error(`❌ Error inesperado con ${userData.email}:`, error);
    }
  }

  console.log('✅ Proceso completado!');
  console.log('\n📋 Credenciales de acceso:');
  console.log('─────────────────────────────────────────');
  users.forEach(user => {
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log('─────────────────────────────────────────');
  });
}

// Ejecutar
createUsers().catch(console.error);
