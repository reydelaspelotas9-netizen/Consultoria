# Documentación Exhaustiva de la Estructura HTML (`index.html`)

Esta guía desglosa detalladamente cada bloque, etiqueta, clase y sección del archivo [index.html](file:///c:/Users/ebany/Desktop/Consultoria/index.html). Su objetivo es permitir a cualquier desarrollador o editor comprender cómo está construido el sitio y cómo modificarlo con total seguridad.

---

## Índice de Contenidos

1. [Configuración Inicial y Encabezado `<head>`](#1-configuración-inicial-y-encabezado-head)
2. [Barra de Navegación y Encabezado `<header>`](#2-barra-de-navegación-y-encabezado-header)
3. [Sección Principal: Hero (`#inicio`)](#3-sección-principal-hero-inicio)
4. [Sección: Servicios y Capacidades (`#servicios`)](#4-sección-servicios-y-capacidades-servicios)
5. [Sección: Quiénes Somos (`#quienes-somos`)](#5-sección-quiénes-somos-quienes-somos)
6. [Sección: Portafolio de Trabajos (`#nuestros-trabajos`)](#6-sección-portafolio-de-trabajos-nuestros-trabajos)
7. [Sección: Facturación Fiscal (`#facturacion`)](#7-sección-facturación-fiscal-facturacion)
8. [Sección: Canales y Contacto (`#contactanos`)](#8-sección-canales-y-contacto-contactanos)
9. [Pie de Página (`<footer>`)](#9-pie-de-página-footer)
10. [Buenas Prácticas para Edición Futura](#10-buenas-prácticas-para-edición-futura)

---

## 1. Configuración Inicial y Encabezado `<head>`

El encabezado define las directivas técnicas del documento, codificación, responsividad, SEO y la vinculación tipográfica y de estilos:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultoría Tecnológica | Inteligencia Artificial, Automatización Industrial, Domótica & SaaS</title>
  <meta name="description" content="Consultoría de alta ingeniería en Inteligencia Artificial, automatizaciones industriales, casas inteligentes y plataformas SaaS a la medida. Soluciones de alto impacto.">
  <meta name="theme-color" content="#171717">
```

### Explicación de Elementos:
* **`<!DOCTYPE html>`**: Declara que el documento sigue la especificación HTML5 estándar moderna.
* **`<html lang="es">`**: Indica a motores de búsqueda y lectores de pantalla que el idioma principal del contenido es español.
* **`<meta charset="UTF-8">`**: Habilita caracteres especiales, tildes y signos del español sin errores de visualización.
* **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Obligatorio para responsividad móvil; adapta la escala de visualización al ancho real del dispositivo (smartphones, tablets, pantallas 4K).
* **`<meta name="description">`**: Resumen descriptivo que aparece en los resultados de Google (SEO).
* **`<meta name="theme-color" content="#171717">`**: Pinta la barra superior del navegador en móviles con el color oscuro carbón de la marca.

### Conexión de Fuentes y Hojas de Estilo:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
```
* **`preconnect`**: Acelera la carga estableciendo la conexión con los servidores de Google Fonts antes de solicitar los archivos.
* **`css/style.css`**: Hoja de estilos central donde residen los colores, la diagramación y los efectos visuales.

---

## 2. Barra de Navegación y Encabezado `<header>`

Ubicado dentro de `<header class="site-header" id="siteHeader">`:

```html
<header class="site-header" id="siteHeader">
  <div class="container header-container">
    <a href="#inicio" class="brand-wrapper" aria-label="Ir al inicio">
      <img src="logo.PNG" alt="Logotipo Consultoría" class="brand-logo" id="headerLogo">
    </a>

    <nav aria-label="Navegación principal">
      <ul class="nav-menu" id="navMenu">
        <li><a href="#inicio" class="nav-link active">Inicio</a></li>
        <li><a href="#quienes-somos" class="nav-link">Quiénes somos</a></li>
        <li><a href="#servicios" class="nav-link">Servicios</a></li>
        <li><a href="#nuestros-trabajos" class="nav-link">Nuestros trabajos</a></li>
        <li><a href="#facturacion" class="nav-link">Facturación</a></li>
        <li><a href="#contactanos" class="nav-link">Contáctanos</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button class="mobile-toggle" id="mobileToggle" aria-label="Abrir menú de navegación">
        <!-- Icono vectorial SVG de 3 líneas (hamburguesa) -->
      </button>
    </div>
  </div>
</header>
```

### Detalle Operativo:
* **Fijación en pantalla (Sticky):** El CSS mantiene esta barra fija en la parte superior con un efecto de desenfoque de fondo (*backdrop-filter: blur*).
* **Navegación fluida por anclas (`#id`):** Al hacer clic en un enlace, el navegador se desliza suavemente hasta la sección correspondiente gracias a `html { scroll-behavior: smooth; }`.
* **Botón Hamburguesa (`#mobileToggle`):** En pantallas menores a 992px, el menú de escritorio se oculta y este botón activa el panel lateral mediante la clase `.open` controlada en `js/app.js`.

---

## 3. Sección Principal: Hero (`#inicio`)

La sección Hero es el primer impacto visual de la página y presenta un diseño balanceado y centrado:

```html
<section class="hero" id="inicio">
  <div class="hero-bg-wrapper" id="heroBgImage"></div>
  <div class="hero-bg-overlay"></div>
  <div class="tech-grid-overlay"></div>

  <div class="container hero-content">
    <div class="hero-text-col">
      <h1 class="hero-title">
        Soluciones en <span class="text-gradient">Inteligencia Artificial</span> y automatizaciones
      </h1>
      <p class="hero-description">...</p>
      <div class="hero-cta-group">
        <a href="#contactanos" class="btn btn-primary btn-lg">Contactar Especialista</a>
        <a href="#" class="btn btn-whatsapp btn-lg" data-api="whatsapp">Hablar por WhatsApp</a>
      </div>
      <div class="hero-stats">...</div>
    </div>
  </div>
</section>
```

### Capas de Fondo y Gráficos:
1. **`.hero-bg-wrapper`**: Capa receptora de tu imagen de fondo personalizada.
2. **`.hero-bg-overlay`**: Capa degradada semitransparente con tonos carbón y resplandores coral/naranja para que el texto siempre sea legible.
3. **`.tech-grid-overlay`**: Cuadrícula geométrica sutil generada por CSS que evoca un ambiente de laboratorio o plano de ingeniería.
4. **`.hero-stats`**: Bloque con 3 métricas de rendimiento (99.9% confiabilidad, +50 arquitecturas, 24/7 telemetría) distribuidas de forma centrada y balanceada.

---

## 4. Sección: Servicios y Capacidades (`#servicios`)

Contenedor con cuadrícula automática (`.services-grid`) que presenta los 4 pilares tecnológicos:

1. **Inteligencia Artificial:** Visión artificial, modelos YOLO, RAG y analítica predictiva.
2. **Automatizaciones Industriales:** Controladores lógicos PLC (Siemens, Rockwell), SCADA, OPC UA y células robóticas.
3. **Casas Inteligentes:** Domótica integral bajo protocolo KNX, iluminación circadiana DALI, climatización y audio distribuido.
4. **Software as a Service (SaaS):** Arquitecturas serverless en la nube, microservicios, paneles de telemetría IoT y pasarelas de pago.

### Anatomía de cada Tarjeta de Servicio:
```html
<article class="service-card">
  <div class="service-icon-box">
    <!-- SVG Vectorial temático -->
  </div>
  <h3 class="service-title">Título del Servicio</h3>
  <p class="service-description">Descripción del alcance operativo...</p>
  <ul class="service-features">
    <li><svg>...</svg><span>Punto clave 1</span></li>
    <li><svg>...</svg><span>Punto clave 2</span></li>
    <li><svg>...</svg><span>Punto clave 3</span></li>
  </ul>
  <div class="service-footer-action">
    <a href="#contactanos" class="service-link">Consultar Solución</a>
  </div>
</article>
```
* **Etiqueta semántica `<article>`**: Le comunica a los motores de búsqueda que cada tarjeta es una unidad de contenido independiente y relevante.

---

## 5. Sección: Quiénes Somos (`#quienes-somos`)

Esta sección utiliza la clase `.section-light`, aplicando el color **Marfil (`#F7F4EE`)** de la paleta oficial como fondo de alto contraste visual frente al resto de la página oscura.

* **Columna Izquierda:** Manifiesto de ingeniería, estándares de ciberseguridad, robustez industrial militar y filosofía de diagnóstico previo.
* **Columna Derecha:** Vitrina de identidad visual que despliega armónicamente el logotipo principal [logo.PNG](file:///c:/Users/ebany/Desktop/Consultoria/logo.PNG) y el isotipo [logo2.PNG](file:///c:/Users/ebany/Desktop/Consultoria/logo2.PNG), acompañados de una tarjeta de compromiso de calidad técnica.

---

## 6. Sección: Portafolio de Trabajos (`#nuestros-trabajos`)

Diseñado con un enfoque completamente modular para que actualizar los proyectos no requiera reescribir código complejo:

```html
<div class="portfolio-controls" id="portfolioFilters">
  <button class="portfolio-filter-btn active" data-filter="all">Todos los Proyectos</button>
  <button class="portfolio-filter-btn" data-filter="ia">Inteligencia Artificial</button>
  <button class="portfolio-filter-btn" data-filter="automatizacion">Automatización</button>
  <button class="portfolio-filter-btn" data-filter="casas-inteligentes">Casas Inteligentes</button>
  <button class="portfolio-filter-btn" data-filter="saas">SaaS</button>
</div>

<div class="portfolio-grid" id="portfolioGrid">
  <!-- Aquí JavaScript inyecta automáticamente las tarjetas de proyectos -->
</div>
```

* Los botones contienen el atributo `data-filter`. Al hacer clic, JavaScript lee este valor y filtra en tiempo real los proyectos sin recargar la página.

---

## 7. Sección: Facturación Fiscal (`#facturacion`)

Un portal administrativo para la solicitud de comprobantes fiscales digitales por internet (CFDI):

* **Aviso Legal Fiscal:** Bloque informativo con recomendaciones sobre RFC y Código Postal del SAT.
* **Campos del Formulario (`#billingForm`):**
  * `billRFC`: Identificador fiscal con validación de patrón regex en mayúsculas.
  * `billRazon`: Nombre de la empresa o persona física titular.
  * `billRegimen`: Menú desplegable con los regímenes fiscales más comunes (General de Ley, RESICO, Actividades Empresariales, etc.).
  * `billCFDI`: Menú de Uso del CFDI (Gastos en general, equipo de cómputo, otra maquinaria).
  * `billTicket`: Folio de servicio, orden de compra o contrato.
  * `billEmail`: Correo electrónico destino para el envío automatizado de los archivos `.xml` y `.pdf`.

---

## 8. Sección: Canales y Contacto (`#contactanos`)

Divide la atención en dos columnas:
1. **Columna Izquierda (Accesos directos por API):**
   * **WhatsApp:** Elemento con atributo `data-api="whatsapp"`.
   * **Correo:** Elemento con atributo `data-api="correo"`.
   * **Instagram:** Elemento con atributo `data-api="instagram"`.
   * **TikTok:** Elemento con atributo `data-api="tiktok"`.
2. **Columna Derecha (Formulario de Consulta Formal `#contactForm`):**
   * Captura nombre, correo, área técnica requerida y detalles del proyecto para asignación con un ingeniero asesor.

---

## 9. Pie de Página (`<footer>`)

Ubicado al final de la página con fondo carbón profundo (`#111111`):
* **Columna 1:** Resumen de la firma, logo y accesos directos a redes sociales.
* **Columna 2:** Enlaces de navegación rápida.
* **Columna 3:** Enlaces a gestión (Facturación y Contacto).
* **Columna 4:** Isotipo [logo2.PNG](file:///c:/Users/ebany/Desktop/Consultoria/logo2.PNG) y garantía de ingeniería.
* **Barra inferior:** Copyright dinámico con el año en curso y enlaces a políticas de privacidad.

---

## 10. Buenas Prácticas para Edición Futura

* **Para modificar textos:** Edita únicamente el contenido dentro de las etiquetas (por ejemplo, el texto entre `<p>` y `</p>`). Evita alterar las clases CSS a menos que vayas a cambiar los estilos.
* **Para mantener la estética profesional:** No insertes emojis en los textos; utiliza iconos SVG como los incluidos en el archivo para preservar la seriedad industrial.
* **Enlaces internos:** Si añades una nueva sección, asegúrate de asignarle un `id="mi-seccion"` único y crear su enlace correspondiente en el menú con `href="#mi-seccion"`.
