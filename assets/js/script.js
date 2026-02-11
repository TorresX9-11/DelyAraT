// =========================
// Datos de productos
// =========================
const productos = [
  {
    id: "flan-casero",
    nombre: "Flan casero",
    descripcion: "Flan tradicional, suave y cremoso, con caramelo casero.",
    precioUnidad: 1200,
    precioMayor: 1000,
    imagenes: [
      "assets/img/flan-1.jpg",
      "assets/img/flan-2.jpg",
      "assets/img/flan-3.jpg",
    ],
  },
  {
    id: "cupcakes-frutilla-chips",
    nombre: "Cupcakes frutilla o chips",
    descripcion: "Cupcakes esponjosos con topping de frutilla o chips de chocolate.",
    precioUnidad: 1200,
    precioMayor: 1000,
    imagenes: [
      "assets/img/cupcakes-1.jpg",
      "assets/img/cupcakes-2.jpg",
      "assets/img/cupcakes-3.jpg",
    ],
  },
  {
    id: "promo-san-valentin",
    nombre: "Promo caja San Valentín",
    descripcion: "Caja especial temática San Valentín, perfecta para regalar.",
    precioUnidad: 3000,
    precioMayor: 3000,
    imagenes: [
      "assets/img/sanvalentin-1.jpg",
      "assets/img/sanvalentin-2.jpg",
      "assets/img/sanvalentin-3.jpg",
    ],
  },
  {
    id: "tiramisu",
    nombre: "Tiramisú",
    descripcion: "Clásico tiramisú con café y crema suave, armado en capas.",
    precioUnidad: 2500,
    precioMayor: 2200,
    imagenes: [
      "assets/img/tiramisu-1.jpg",
      "assets/img/tiramisu-2.jpg",
      "assets/img/tiramisu-3.jpg",
    ],
  },
  {
    id: "promo-6-cupcakes",
    nombre: "Promo 6 cupcakes",
    descripcion: "Caja con 6 cupcakes surtidos, ideal para compartir.",
    precioUnidad: 6500,
    precioMayor: 6500,
    imagenes: [
      "assets/img/promo6-1.jpg",
      "assets/img/promo6-2.jpg",
      "assets/img/promo6-3.jpg",
    ],
  },
  // Estructura preparada para que agregues más postres:
  // {
  //   id: "nuevo-postre-1",
  //   nombre: "Nombre del nuevo postre",
  //   descripcion: "Descripción breve del postre.",
  //   precioUnidad: 0,
  //   precioMayor: 0,
  //   imagenes: [
  //     "assets/img/nuevo-1.jpg",
  //     "assets/img/nuevo-2.jpg",
  //     "assets/img/nuevo-3.jpg",
  //   ],
  // },
];

// =========================
// Utilidades
// =========================
const formatearPrecio = (valor) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);

// Placeholder cuando una imagen de producto no carga (SVG en base64)
const IMAGEN_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%232b1810' width='400' height='300'/%3E%3Ctext x='200' y='150' dominant-baseline='middle' text-anchor='middle' fill='%236b5344' font-family='sans-serif' font-size='16'%3ESin imagen%3C/text%3E%3C/svg%3E";

function aplicarFallbackImagen(img) {
  img.onerror = function () {
    this.onerror = null;
    this.src = IMAGEN_PLACEHOLDER;
  };
}

// =========================
// Render del catálogo
// =========================
function crearTarjetaProducto(producto) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productId = producto.id;

  // Carrusel
  const carousel = document.createElement("div");
  carousel.className = "product-carousel";
  carousel.dataset.index = "0";

  const img = document.createElement("img");
  img.className = "product-image";
  img.alt = producto.nombre;
  img.src = producto.imagenes[0] || IMAGEN_PLACEHOLDER;
  aplicarFallbackImagen(img);
  carousel.appendChild(img);

  const nav = document.createElement("div");
  nav.className = "carousel-nav";

  const btnPrev = document.createElement("button");
  btnPrev.type = "button";
  btnPrev.className = "carousel-btn";
  btnPrev.setAttribute("aria-label", "Imagen anterior");
  btnPrev.textContent = "‹";

  const btnNext = document.createElement("button");
  btnNext.type = "button";
  btnNext.className = "carousel-btn";
  btnNext.setAttribute("aria-label", "Imagen siguiente");
  btnNext.textContent = "›";

  nav.appendChild(btnPrev);
  nav.appendChild(btnNext);
  carousel.appendChild(nav);

  // Cuerpo
  const body = document.createElement("div");
  body.className = "product-body";

  const nameEl = document.createElement("h3");
  nameEl.className = "product-name";
  nameEl.textContent = producto.nombre;

  const descEl = document.createElement("p");
  descEl.className = "product-description";
  descEl.textContent = producto.descripcion;

  const pricesEl = document.createElement("div");
  pricesEl.className = "product-prices";

  const priceMain = document.createElement("span");
  priceMain.className = "product-price-main";
  priceMain.textContent = `Desde ${formatearPrecio(producto.precioUnidad)} unidad`;

  const priceBulk = document.createElement("span");
  priceBulk.className = "product-price-bulk";
  if (producto.precioMayor && producto.precioMayor !== producto.precioUnidad) {
    priceBulk.textContent = `${formatearPrecio(
      producto.precioMayor
    )} por mayor (≥4 uds)`;
  } else {
    priceBulk.textContent = "Aplican valores especiales según promo.";
  }

  pricesEl.appendChild(priceMain);
  pricesEl.appendChild(priceBulk);

  body.appendChild(nameEl);
  body.appendChild(descEl);
  body.appendChild(pricesEl);

  // Footer
  const footer = document.createElement("div");
  footer.className = "product-footer";

  const tag = document.createElement("span");
  tag.className = "product-tag";
  tag.textContent = "Vista previa";

  const moreBtn = document.createElement("button");
  moreBtn.type = "button";
  moreBtn.className = "btn btn-outline product-more-btn";
  moreBtn.textContent = "Ver más";

  moreBtn.addEventListener("click", () => {
    const imgSrc = carousel.querySelector(".product-image")?.src || producto.imagenes[0] || "";
    abrirModalProducto(producto, imgSrc);
  });

  footer.appendChild(tag);
  footer.appendChild(moreBtn);

  card.appendChild(carousel);
  card.appendChild(body);
  card.appendChild(footer);

  // Eventos carrusel
  btnPrev.addEventListener("click", () =>
    cambiarImagen(producto, carousel, -1)
  );
  btnNext.addEventListener("click", () =>
    cambiarImagen(producto, carousel, 1)
  );

  return card;
}

function renderizarCatalogo() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;
  grid.innerHTML = "";
  productos.forEach((producto) => {
    const card = crearTarjetaProducto(producto);
    grid.appendChild(card);
  });
}

// =========================
// Carrusel por producto
// =========================
function cambiarImagen(producto, carouselEl, paso) {
  const total = producto.imagenes.length || 1;
  let indexActual = Number(carouselEl.dataset.index || "0");
  indexActual = (indexActual + paso + total) % total;
  carouselEl.dataset.index = String(indexActual);

  const imgEl = carouselEl.querySelector(".product-image");
  if (imgEl) {
    imgEl.src = producto.imagenes[indexActual] || producto.imagenes[0] || IMAGEN_PLACEHOLDER;
  }
}

function iniciarCarruselesAutomaticos() {
  const intervalMs = 5000;

  setInterval(() => {
    productos.forEach((producto) => {
      const card = document.querySelector(
        `.product-card[data-product-id="${producto.id}"]`
      );
      if (!card) return;
      const carousel = card.querySelector(".product-carousel");
      if (!carousel) return;
      cambiarImagen(producto, carousel, 1);
    });
  }, intervalMs);
}

// =========================
// Simulador de compra
// =========================
function renderizarSimulador() {
  const tbody = document.getElementById("simulator-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  productos.forEach((producto) => {
    const tr = document.createElement("tr");
    tr.dataset.productId = producto.id;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;

    const tdUnidad = document.createElement("td");
    tdUnidad.textContent = formatearPrecio(producto.precioUnidad);

    const tdMayor = document.createElement("td");
    tdMayor.textContent = formatearPrecio(producto.precioMayor);

    const tdCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "0";
    inputCantidad.step = "1";
    inputCantidad.value = "0";
    inputCantidad.inputMode = "numeric";
    tdCantidad.appendChild(inputCantidad);

    const tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = "$0";

    tr.appendChild(tdNombre);
    tr.appendChild(tdUnidad);
    tr.appendChild(tdMayor);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdSubtotal);

    tbody.appendChild(tr);

    inputCantidad.addEventListener("input", () =>
      actualizarSubtotalProducto(producto, tr)
    );
  });
}

function obtenerCantidadDesdeFila(tr) {
  const input = tr.querySelector('input[type="number"]');
  if (!input) return 0;
  const valor = Number(input.value.replace(",", "."));
  return Number.isFinite(valor) && valor > 0 ? Math.floor(valor) : 0;
}

function actualizarSubtotalProducto(producto, filaEl) {
  const cantidad = obtenerCantidadDesdeFila(filaEl);
  let precioUsado = producto.precioUnidad;

  if (cantidad >= 4) {
    precioUsado = producto.precioMayor;
  }

  const subtotal = cantidad * precioUsado;
  const tdSubtotal = filaEl.querySelector("td:last-child");
  if (tdSubtotal) {
    tdSubtotal.textContent = formatearPrecio(subtotal);
  }

  actualizarTotalGeneral();
}

function actualizarTotalGeneral() {
  const tbody = document.getElementById("simulator-body");
  const totalEl = document.getElementById("simulator-total");
  if (!tbody || !totalEl) return;

  let total = 0;

  Array.from(tbody.querySelectorAll("tr")).forEach((tr) => {
    const id = tr.dataset.productId;
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    const cantidad = obtenerCantidadDesdeFila(tr);
    if (!cantidad) return;

    const precio = cantidad >= 4 ? producto.precioMayor : producto.precioUnidad;
    total += cantidad * precio;
  });

  totalEl.textContent = formatearPrecio(total);
}

// =========================
// WhatsApp e Instagram
// =========================
function construirMensajeWhatsApp() {
  const tbody = document.getElementById("simulator-body");
  if (!tbody) return "Hola, me gustaría hacer un pedido.";

  const lineas = [];
  let total = 0;

  Array.from(tbody.querySelectorAll("tr")).forEach((tr) => {
    const id = tr.dataset.productId;
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    const cantidad = obtenerCantidadDesdeFila(tr);
    if (!cantidad) return;

    const precio = cantidad >= 4 ? producto.precioMayor : producto.precioUnidad;
    const subtotal = cantidad * precio;
    total += subtotal;

    lineas.push(
      `- ${producto.nombre}: ${cantidad} uds x ${formatearPrecio(
        precio
      )} = ${formatearPrecio(subtotal)}`
    );
  });

  if (!lineas.length) {
    return "Hola, me gustaría consultar por sus postres y promos disponibles.";
  }

  const encabezado = "Hola, me gustaría agendar un pedido con el siguiente detalle:\n\n";
  const cuerpo = lineas.join("\n");
  const pie = `\n\nTotal estimado: ${formatearPrecio(
    total
  )}\n\n¿Podemos coordinar día y horario de retiro/entrega?`;

  return encabezado + cuerpo + pie;
}

function configurarBotonesContacto() {
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnInstagram = document.getElementById("btn-instagram");

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => {
      const mensaje = encodeURIComponent(construirMensajeWhatsApp());

      // Reemplaza el número por el de T&S Delicias en formato internacional, por ejemplo:
      // 569XXXXXXXX para Chile.
      const numero = "56937348757";
      const url = `https://wa.me/${numero}?text=${mensaje}`;
      window.open(url, "_blank");
    });
  }

  if (btnInstagram) {
    btnInstagram.addEventListener("click", () => {
      // Reemplaza la URL por el perfil real de Instagram de T&S Delicias
      const url = "https://www.instagram.com/tu_usuario_delyarit/";
      window.open(url, "_blank");
    });
  }
}

// =========================
// Modal detalle producto
// =========================
function abrirModalProducto(producto, imgSrc) {
  const overlay = document.getElementById("product-modal");
  const imgEl = document.getElementById("modal-image");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-description");
  const pricesEl = document.getElementById("modal-prices");
  if (!overlay || !titleEl || !descEl || !pricesEl) return;

  titleEl.textContent = producto.nombre;
  descEl.textContent = producto.descripcion;
  if (imgEl) {
    imgEl.src = imgSrc || producto.imagenes[0] || IMAGEN_PLACEHOLDER;
    imgEl.alt = producto.nombre;
    aplicarFallbackImagen(imgEl);
  }
  const precioMayorTexto =
    producto.precioMayor !== producto.precioUnidad
      ? `Por mayor (≥4 uds): ${formatearPrecio(producto.precioMayor)}`
      : "Precio único";
  pricesEl.innerHTML = `<p><strong>Precio unidad:</strong> ${formatearPrecio(producto.precioUnidad)}</p><p>${precioMayorTexto}</p>`;

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarModalProducto() {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function configurarModal() {
  const overlay = document.getElementById("product-modal");
  const btnCerrar = document.getElementById("modal-close");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModalProducto);
  }
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cerrarModalProducto();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlay = document.getElementById("product-modal");
      if (overlay?.classList.contains("is-open")) cerrarModalProducto();
    }
  });
}

// =========================
// Navegación interna
// =========================
function configurarNavegacion() {
  const btnVerCatalogo = document.getElementById("btn-ver-catalogo");
  if (btnVerCatalogo) {
    btnVerCatalogo.addEventListener("click", () => {
      const catalogo = document.getElementById("catalogo");
      if (!catalogo) return;
      catalogo.scrollIntoView({ behavior: "smooth" });
    });
  }

  const btnSimularCompra = document.getElementById("btn-simular-compra");
  if (btnSimularCompra) {
    btnSimularCompra.addEventListener("click", () => {
      const simulador = document.getElementById("simulador");
      if (!simulador) return;
      simulador.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// =========================
// Menú hamburguesa (móvil)
// =========================
const CLASE_MENU_ABIERTO = "menu-mobile-open";

function cerrarMenuMovil() {
  const toggle = document.getElementById("nav-toggle");
  document.body.classList.remove(CLASE_MENU_ABIERTO);
  document.body.style.overflow = "";
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }
}

function abrirMenuMovil() {
  const toggle = document.getElementById("nav-toggle");
  document.body.classList.add(CLASE_MENU_ABIERTO);
  document.body.style.overflow = "hidden";
  if (toggle) {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
  }
}

function configurarMenuMovil() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains(CLASE_MENU_ABIERTO)) {
      cerrarMenuMovil();
    } else {
      abrirMenuMovil();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      const target = document.getElementById(hash.slice(1));
      cerrarMenuMovil();
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains(CLASE_MENU_ABIERTO)) {
      cerrarMenuMovil();
    }
  });
}

// =========================
// Contador de visitas (CountAPI - gratuito, sin backend)
// =========================
const CONTADOR_NAMESPACE = "tsdelicias";
const CONTADOR_KEY = "landing";

function actualizarContadorVisitas() {
  const el = document.getElementById("visit-count");
  if (!el) return;
  fetch(`https://api.countapi.xyz/hit/${CONTADOR_NAMESPACE}/${CONTADOR_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      if (typeof data.value === "number") {
        el.textContent = data.value.toLocaleString("es-CL");
      }
    })
    .catch(() => {
      el.textContent = "—";
    });
}

// =========================
// Inicialización
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo();
  renderizarSimulador();
  iniciarCarruselesAutomaticos();
  configurarBotonesContacto();
  configurarModal();
  configurarNavegacion();
  configurarMenuMovil();

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  actualizarContadorVisitas();
});

