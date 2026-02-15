# 📝 Guía rápida: Cómo editar precios y textos

Todo lo editable está en **`assets/js/config.js`**. Abre ese archivo y edita directamente.

---

## 🍰 Cambiar precios de productos

Busca el array `productos` en `config.js`. Cada producto tiene:

```javascript
{
  id: "flan-casero",
  nombre: "Flan casero",
  descripcion: "Flan tradicional...",
  precioUnidad: 1200,    // ← Cambia este número
  precioMayor: 1000,     // ← Cambia este número
  imagenes: [...]
}
```

**Ejemplo:** Para cambiar el precio del flan a $1.500 unidad y $1.300 por mayor:
- Cambia `precioUnidad: 1200` → `precioUnidad: 1500`
- Cambia `precioMayor: 1000` → `precioMayor: 1300`

---

## ➕ Agregar un nuevo producto

En `config.js`, dentro del array `productos`, agrega un nuevo objeto al final (antes del `]`):

```javascript
{
  id: "nuevo-postre",
  nombre: "Nombre del postre",
  descripcion: "Descripción breve del postre.",
  precioUnidad: 2000,
  precioMayor: 1800,
  imagenes: [
    "assets/img/nuevo-1.jpg",
    "assets/img/nuevo-2.jpg",
    "assets/img/nuevo-3.jpg",
  ],
},
```

**Importante:** 
- El `id` debe ser único (sin espacios, usa guiones).
- Las rutas de `imagenes` deben apuntar a tus fotos en `assets/img/`.
- Si no tienes 3 fotos, puedes poner menos (mínimo 1).

---

## ✏️ Cambiar textos de la página

En `config.js`, busca `textos` y edita lo que necesites:

### Hero (bienvenida)
```javascript
hero: {
  titulo: "Bienvenidos a T&S Delicias",           // ← Título principal
  textoPrincipal: "Postres caseros...",            // ← Párrafo principal
  textoDetalle: "Stock los sábados...",            // ← Línea secundaria
  botonCatalogo: "Ver catálogo completo",          // ← Texto del botón
  tarjetaDestacado: "Postres frescos...",         // ← Texto de la tarjeta
  tarjetaSubtexto: "Cupcakes, flanes...",         // ← Subtexto de la tarjeta
}
```

### Catálogo
```javascript
catalogo: {
  titulo: "Catálogo de postres",                   // ← Título de la sección
  subtitulo: "Explora nuestros...",                // ← Subtítulo
  botonSimular: "Simular compra",                   // ← Texto del botón
}
```

### Simulador
```javascript
simulador: {
  titulo: "Simulador de compra",
  subtitulo: "Selecciona las cantidades...",
  nota: "Este es un valor referencial...",
  botonWhatsapp: "Contáctenos y agende su pedido",
  botonInstagram: "Conócenos en Instagram",
}
```

### Ubicación
```javascript
ubicacion: {
  titulo: "¿Dónde estamos?",
  subtitulo: "Retira tus pedidos...",
  puntoRetiro: "Punto de retiro",
  notaRetiro: "Una vez confirmado...",
}
```

### Footer
```javascript
footer: {
  copyright: "T&S Delicias. Todos los derechos reservados.",
  nota: "Hecho con amor...",
}
```

---

## 📞 Cambiar WhatsApp e Instagram

En `config.js`, busca `contacto`:

```javascript
contacto: {
  whatsapp: {
    numero: "56937348757",                         // ← Tu número (sin + ni espacios)
    mensajeInicial: "Hola, me gustaría...",        // ← Inicio del mensaje
    mensajeFinal: "\n\n¿Podemos coordinar...",     // ← Final del mensaje
  },
  instagram: {
    url: "https://www.instagram.com/tu_usuario/",  // ← URL de tu Instagram
  },
}
```

---

## 📍 Cambiar dirección y mapa

En `config.js`, busca `ubicacion` (fuera de `textos`):

```javascript
ubicacion: {
  direccion: "Zona Queillen, Temuco...",           // ← Tu dirección aproximada
  mapaEmbedUrl: "https://www.google.com/maps/...", // ← URL del iframe de Google Maps
}
```

**Para obtener el URL del mapa:**
1. Ve a Google Maps y busca tu ubicación.
2. Haz clic en **Compartir** → pestaña **"Insertar un mapa"**.
3. Copia el código del `<iframe>` y extrae solo el `src="..."` (esa URL va en `mapaEmbedUrl`).

---

## 💾 Guardar cambios

1. Guarda `config.js`.
2. Recarga la página en el navegador (F5 o Ctrl+R).
3. Los cambios deberían verse inmediatamente.

**Si subes a GitHub Pages:** haz commit y push. Los cambios se reflejarán en tu sitio en unos minutos.

---

---

## 🔍 SEO y visibilidad en buscadores

La página incluye meta etiquetas y archivos para mejorar el alcance cuando busquen "postres Temuco", "cupcakes Queillen", etc.

**Archivos creados:**
- `robots.txt` – Indica a buscadores que pueden indexar la página.
- `sitemap.xml` – Lista las URLs de tu sitio para que Google las encuentre más rápido.

**Cuando tengas tu dominio (ej: https://www.tysdelicias.cl):**

1. **En `config.js`**, busca `seo` y pon tu URL:
```javascript
seo: {
  siteUrl: "https://www.tysdelicias.cl",  // ← Tu URL real
  imagenRedes: "assets/img/Logos/LogoFinal.png",
},
```

2. **En `sitemap.xml`** – Reemplaza `https://TU-DOMINIO.com` con tu URL real en la etiqueta `<loc>`.

3. **En `robots.txt`** – Descomenta y edita la línea del Sitemap:
```
Sitemap: https://www.tysdelicias.cl/sitemap.xml
```

4. **Registra tu sitio en Google Search Console** – https://search.google.com/search-console  
   Sube el sitemap para que Google indexe tu página más rápido.

---

## 📋 Resumen rápido

| Qué cambiar | Dónde en `config.js` |
|-------------|----------------------|
| Precios de productos | `productos[].precioUnidad` y `precioMayor` |
| Agregar producto | Añadir objeto en `productos[]` |
| Textos de la página | `textos.hero`, `textos.catalogo`, etc. |
| Número WhatsApp | `contacto.whatsapp.numero` |
| URL Instagram | `contacto.instagram.url` |
| URL del sitio (SEO) | `seo.siteUrl` |
| Dirección | `ubicacion.direccion` |
| Mapa | `ubicacion.mapaEmbedUrl` |
