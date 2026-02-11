# Contador de visitas con Supabase

Este contador funciona en **GitHub Pages** (página estática) porque solo se hace una petición `fetch` desde el navegador a la API de Supabase; ellos permiten CORS y no necesitas servidor.

## Pasos para configurarlo

### 1. Crear cuenta y proyecto en Supabase

1. Entra en [supabase.com](https://supabase.com) y crea una cuenta (gratis).
2. Crea un nuevo proyecto: **New project** → elige nombre, contraseña de base de datos y región.
3. Espera a que el proyecto esté listo (unos minutos).

### 2. Ejecutar el SQL

1. En el panel de Supabase, ve a **SQL Editor**.
2. Crea una nueva query y pega el siguiente SQL.
3. Pulsa **Run** (o Ctrl+Enter).

```sql
-- Tabla con una sola fila para el contador
CREATE TABLE IF NOT EXISTS site_stats (
  id INT PRIMARY KEY DEFAULT 1,
  visits BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insertar la fila inicial si no existe
INSERT INTO site_stats (id, visits) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Función que incrementa y devuelve el nuevo total (una sola llamada desde la web)
CREATE OR REPLACE FUNCTION increment_visits()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE site_stats
  SET visits = visits + 1
  WHERE id = 1
  RETURNING visits INTO new_count;
  RETURN new_count;
END;
$$;

-- Permitir que la clave anónima (tu frontend) ejecute la función
GRANT EXECUTE ON FUNCTION public.increment_visits() TO anon;
```

### 3. Copiar URL y clave anónima

1. En Supabase, ve a **Project Settings** (icono de engranaje) → **API**.
2. Copia:
   - **Project URL** (ej: `https://abcdefghijk.supabase.co`)
   - **anon public** (clave larga bajo "Project API keys").

### 4. Pegar en tu proyecto

Abre `assets/js/script.js` y busca las constantes del contador (alrededor de la línea 600). Sustituye:

- `SUPABASE_URL`: pega la **Project URL** (con `https://` y sin barra final).
- `SUPABASE_ANON_KEY`: pega la clave **anon public**.

Ejemplo:

```javascript
const SUPABASE_URL = "https://abcdefghijk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

### 5. Subir a GitHub

Haz commit y push de los cambios. En GitHub Pages el contador se actualizará en cada visita.

---

**Seguridad:** La clave `anon` es pública (va en el frontend). Está pensada para eso. La función `increment_visits()` solo incrementa en 1; no se puede borrar o poner un valor arbitrario porque no exponemos esa opción en la API.
