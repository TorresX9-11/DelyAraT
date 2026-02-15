// =========================
// CONFIGURACIÓN CENTRALIZADA
// Edita aquí todos los precios, textos y datos de la página
// =========================

const CONFIG = {
  // =========================
  // PRODUCTOS
  // =========================
  productos: [
    {
      id: "flan-casero",
      nombre: "Flan casero",
      descripcion: "Flan tradicional, suave y cremoso, con caramelo casero.",
      precioUnidad: 1200,
      precioMayor: 1000,
      imagenes: [
        "assets/img/Productos/imgFlan1SF.jpeg",
        "assets/img/Productos/imgFlan1SF.jpeg",
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
        "assets/img/Productos/imgCupcake1SF.jpeg",
        "assets/img/Productos/imgCupcake2SF.jpeg",
        "assets/img/Productos/imgCupcake3SF.jpeg",
      ],
    },
    {
      id: "promo-san-valentin",
      nombre: "Promo caja San Valentín",
      descripcion: "Caja especial temática San Valentín, perfecta para regalar.",
      precioUnidad: 3000,
      precioMayor: 3000,
      imagenes: [
        "assets/img/Productos/imgCajaSV1SF.jpeg",
        "assets/img/Productos/imgCajaSV2SF.jpeg",
        "assets/img/Productos/imgCajaSV1SF.jpeg",
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
      precioMayor: 6000,
      imagenes: [
        "assets/img/Productos/imgPromoCupcakex6SF.jpeg",
        "assets/img/Productos/imgPromoCupcakex6SF.jpeg",
        "assets/img/Productos/imgPromoCupcakex6SF.jpeg",
      ],
    },
      {
      id: "Trufas-Oreo",
      nombre: "Trufas de Galletas",
      descripcion: "Trufas a base de Galletas Oreo, queso crema o manjar, y chocolate.",
      precioUnidad: 300,
      precioMayor: 250,
      imagenes: [
        "assets/img/Productos/imgTrufas1SF.jpeg",
        "assets/img/Productos/imgTrufas2SF.jpeg",
        "assets/img/Productos/imgTrufas3SF.jpeg",
      ],
    },
      {
      id: "alfajores-artesanales",
      nombre: "Alfajores Artesanales",
      descripcion: "Alfajores artesanales con dulce de leche o manjar, y baño de chocolate.",
      precioUnidad: 600,
      precioMayor: 500,
      imagenes: [
        "assets/img/Productos/imgAlfajor1SF.jpeg",
        "assets/img/Productos/imgAlfajor2SF.jpeg",
        "assets/img/nuevo-3.jpg",
      ],
    },
      {
      id: "pan-de-ajo",
      nombre: "Pan de Ajo Artesanal 100g (Salado)",
      descripcion: "Pan de ajo artesanal 100g, base de harina de trigo, ajo, y perejil.",
      precioUnidad: 800,
      precioMayor: 750,
      imagenes: [
        "assets/img/nuevo-1.jpg",
        "assets/img/nuevo-2.jpg",
        "assets/img/nuevo-3.jpg",
      ],
    },
      {
      id: "Promo4-cupcakes-presentacion",
      nombre: "Promo 4 cupcakes caja presentación",
      descripcion: "4 Deliciosos Cupcakes en caja presentación, ideal para regalar y compartir.",
      precioUnidad: 5000,
      precioMayor: 4500,
      imagenes: [
        "assets/img/Productos/imgPromoCupcakex4SF.jpeg",
        "assets/img/Productos/imgPromoCupcakex4SF.jpeg",
        "assets/img/Productos/imgPromoCupcakex4SF.jpeg",
      ],
    },
      {
      id: "nuevo-postre",
      nombre: "Proximo Postre..",
      descripcion: "Descripción breve.",
      precioUnidad: 0,
      precioMayor: 0,
      imagenes: [
        "assets/img/nuevo-1.jpg",
        "assets/img/nuevo-2.jpg",
        "assets/img/nuevo-3.jpg",
      ],
    },

    // Para agregar más productos, copia este bloque y edita:
    // {
    //   id: "nuevo-postre",
    //   nombre: "Nombre del postre",
    //   descripcion: "Descripción breve.",
    //   precioUnidad: 0,
    //   precioMayor: 0,
    //   imagenes: [
    //     "assets/img/nuevo-1.jpg",
    //     "assets/img/nuevo-2.jpg",
    //     "assets/img/nuevo-3.jpg",
    //   ],
    // },
    
  ],

  // =========================
  // TEXTOS DE LA PÁGINA
  // =========================
  textos: {
    // Hero / Bienvenida
    hero: {
      titulo: "Bienvenidos a T&S Delicias",
      textoPrincipal: "Postres caseros hechos a mano, por encargo. Para tus celebraciones, regalos y antojos del día a día.",
      textoDetalle: "Stock los sábados de productos especiales · Pedidos con 50% de abono. Síguenos en Instagram para novedades.",
      linkInstagram: "Síguenos en Instagram",
      botonCatalogo: "Ver catálogo completo",
      tarjetaDestacado: "Postres frescos, caseros y a tu medida.",
      tarjetaSubtexto: "Cupcakes, flanes, tiramisú, canapes (variedades), promos especiales y más.",
    },

    // Catálogo
    catalogo: {
      titulo: "Catálogo de postres",
      subtitulo: "Explora nuestros productos destacados. Cada postre está pensado para sorprender.",
      botonSimular: "Simular compra",
    },

    // Simulador
    simulador: {
      titulo: "Simulador de compra",
      subtitulo: "Selecciona las cantidades para estimar el valor total de tu pedido. En compras desde 12 unidades de un mismo producto se aplica el valor por mayor.",
      nota: "Este es un valor referencial. Para confirmar stock, personalizar tu pedido o coordinar entrega/retiro, contáctanos directamente.",
      botonWhatsapp: "Contáctenos y agende su pedido",
      botonInstagram: "Conócenos en Instagram",
    },

    // Ubicación
    ubicacion: {
      titulo: "¿Dónde estamos?",
      subtitulo: "Retira tus pedidos en nuestro punto de entrega o coordina opciones de despacho según disponibilidad.",
      puntoRetiro: "Punto de retiro",
      notaRetiro: "Una vez confirmado tu pedido, te enviamos la dirección precisa y coordinamos día y horario de retiro para que todo llegue fresco y en perfectas condiciones.",
    },

    // Footer
    footer: {
      copyright: "T&S Delicias. Todos los derechos reservados.",
      nota: "Hecho con amor y dedicación para acompañar tus momentos más dulces.",
    },
  },

  // =========================
  // CONTACTO
  // =========================
  contacto: {
    whatsapp: {
      numero: "56937348757", // Formato internacional sin + ni espacios
      mensajeInicial: "Hola, me gustaría agendar un pedido con el siguiente detalle:\n\n",
      mensajeFinal: "\n\n¿Podemos coordinar día y horario de retiro/entrega?",
    },
    instagram: {
      url: "https://www.instagram.com/tys_delicias?igsh=b3E2M3c3ODdwYm1r", // Reemplaza cuando tengas el perfil
    },
  },

  // =========================
  // UBICACIÓN
  // =========================
  ubicacion: {
    direccion: "Zona Queillen, Temuco, Araucanía. La dirección exacta se envía al confirmar tu pedido.",
    mapaEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.478061849982!2d-72.5606413243721!3d-38.729790586943764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d2303022fdc5%3A0xb6280a363a8831fb!2sQueillen%2C%20Temuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses-419!2scl!4v1770759433706!5m2!1ses-419!2scl",
  },
};
