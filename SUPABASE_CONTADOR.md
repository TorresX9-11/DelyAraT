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

-- Tabla: cada fila = una visita, con el número de visita (como el contador) y fecha/hora
CREATE TABLE IF NOT EXISTS visits_log (
  id BIGSERIAL PRIMARY KEY,
  visita BIGINT NOT NULL,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Función: incrementa el contador, guarda la visita (número + fecha/hora) y devuelve el total
CREATE OR REPLACE FUNCTION log_visit()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE site_stats SET visits = visits + 1 WHERE id = 1 RETURNING visits INTO new_count;
  INSERT INTO visits_log (visita, visited_at) VALUES (new_count, now());
  RETURN new_count;
END;
$$;

-- Permisos para el frontend
GRANT EXECUTE ON FUNCTION public.log_visit() TO anon;
```

**Si ya tenías el contador y la tabla `visits_log`:** ejecuta este bloque para añadir la columna "visita" (número de visita = contador) y actualizar la función. No borra datos.

```sql
-- Añadir columna "visita" (el número que ves en la web: 1, 2, 3, 4...)
ALTER TABLE visits_log ADD COLUMN IF NOT EXISTS visita BIGINT;
UPDATE visits_log SET visita = id WHERE visita IS NULL;

-- Función actualizada: guarda el número de visita + fecha/hora
CREATE OR REPLACE FUNCTION log_visit()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE site_stats SET visits = visits + 1 WHERE id = 1 RETURNING visits INTO new_count;
  INSERT INTO visits_log (visita, visited_at) VALUES (new_count, now());
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_visit() TO anon;
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

**Seguridad:** La clave `anon` es pública (va en el frontend). Está pensada para eso. La función `log_visit()` solo registra una visita y devuelve el total; no se puede borrar ni modificar datos desde la web.

---

## Ver las visitas con fecha y hora

En Supabase ve a **Table Editor** → tabla **visits_log**. Verás algo así:

| id | visita | visited_at           |
|----|--------|----------------------|
| 1  | 1      | 2026-02-10 18:00:00  |
| 2  | 2      | 2026-02-10 19:30:00  |
| 4  | 4      | 2026-02-11 14:15:00  |

- **visita**: el mismo número que el contador en la web (Visita 1, Visita 2, Visita 4…).
- **visited_at**: fecha y hora de esa visita (día, mes, año, hora).

Así puedes relacionar directo: “Visita 4” en la web = la fila con `visita = 4` y su fecha/hora.

Para ver en hora Chile en SQL:

```sql
SELECT visita AS "Visita", visited_at AT TIME ZONE 'America/Santiago' AS "Fecha y hora (Chile)"
FROM visits_log
ORDER BY visita DESC
LIMIT 100;
```

---

## Reiniciar el contador (y vaciar el registro)

En el footer de la web hay un botón **"Reiniciar contador"**. Al pulsarlo se pide una **contraseña de administrador**. Si es correcta, se hace lo siguiente en la base de datos:

- `site_stats.visits` pasa a **0**
- Se vacía la tabla **visits_log** (todas las filas)

Así contador y tabla quedan sincronizados y la siguiente visita será la #1.

### Configurar la contraseña de reinicio

Ejecuta este SQL **una sola vez** en Supabase (SQL Editor):

```sql
-- Tabla para guardar la contraseña de reinicio (solo tú la ves en Supabase)
CREATE TABLE IF NOT EXISTS _config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Contraseña para el botón "Reiniciar contador" (cámbiala por una que solo tú sepas)
INSERT INTO _config (key, value) VALUES ('reset_secret', 'cambiar_esta_clave_123')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Función: solo reinicia si la contraseña coincide
CREATE OR REPLACE FUNCTION reset_visits(p_secret TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  secret_ok BOOLEAN;
BEGIN
  SELECT (SELECT value FROM _config WHERE key = 'reset_secret') = p_secret INTO secret_ok;
  IF NOT secret_ok THEN
    RETURN FALSE;
  END IF;
  TRUNCATE TABLE visits_log;
  UPDATE site_stats SET visits = 0 WHERE id = 1;
  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.reset_visits(TEXT) TO anon;
```

**Cambiar la contraseña más adelante:** en **Table Editor** → tabla **`_config`** → edita la fila con `key = 'reset_secret'` y pon el `value` que quieras (esa será la contraseña para el botón).
