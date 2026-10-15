# Documentación Exhaustiva de la Lógica JavaScript (`js/app.js`)

Esta guía explica detalladamente la lógica de programación, funciones, eventos, integración de APIs y algoritmos de validación contenidos en el archivo [js/app.js](file:///c:/Users/ebany/Desktop/Consultoria/js/app.js).

---

## Índice de Contenidos

1. [Objeto de Configuración Central (`SITE_CONFIG`)](#1-objeto-de-configuración-central-site_config)
2. [Gestión Modular del Portafolio (`projectsData`)](#2-gestión-modular-del-portafolio-projectsdata)
3. [Ciclo de Inicialización (`DOMContentLoaded`)](#3-ciclo-de-inicialización-domcontentloaded)
4. [Control del Encabezado y Navegación Activa (`initHeader`)](#4-control-del-encabezado-y-navegación-activa-initheader)
5. [Motor de Renderizado y Filtrado de Proyectos (`initProjects`)](#5-motor-de-renderizado-y-filtrado-de-proyectos-initprojects)
6. [Sistema y Validación de Facturación Fiscal (`initBillingSystem`)](#6-sistema-y-validación-de-facturación-fiscal-initbillingsystem)
7. [Manejador del Formulario de Contacto (`initContactForm`)](#7-manejador-del-formulario-de-contacto-initcontactform)
8. [Integración de Canales y APIs Directas (`initDirectChannels`)](#8-integración-de-canales-y-apis-directas-initdirectchannels)
9. [Sistema Dinámico de Notificaciones Toast (`showToast`)](#9-sistema-dinámico-de-notificaciones-toast-showtoast)
10. [Guía para Agregar Nuevas Funcionalidades](#10-guía-para-agregar-nuevas-funcionalidades)

---

## 1. Objeto de Configuración Central (`SITE_CONFIG`)

Ubicado al inicio de [js/app.js](file:///c:/Users/ebany/Desktop/Consultoria/js/app.js) (Líneas 12–29), este objeto almacena todas las variables de contacto del negocio:

```javascript
const SITE_CONFIG = {
  whatsapp: {
    phone: "527223672945",
    defaultMessage: "Hola, me interesa conocer más sobre sus servicios de consultoría tecnológica e ingeniería."
  },
  instagram: {
    username: "consultoria.tech",
    url: "https://instagram.com/"
  },
  email: {
    address: "contacto@consultoriatech.com",
    billingAddress: "facturacion@consultoriatech.com"
  },
  tiktok: {
    username: "@consultoria.tech",
    url: "https://tiktok.com/@"
  }
};
```

### Reglas de Configuración:
* **`whatsapp.phone`:** Debe contener el código de país seguido del número, sin espacios, guiones ni el signo `+`. Por ejemplo, para México (+52) y número de 10 dígitos: `527223672945`.
* **`instagram.username`:** Nombre de usuario sin arroba (`@`).
* **`email.address`:** Correo al que se dirigen las consultas generales.
* **`tiktok.username`:** Nombre de tu cuenta de TikTok.

---

## 2. Gestión Modular del Portafolio (`projectsData`)

El portafolio de "Nuestros trabajos" funciona mediante un catálogo de datos estructurado en formato JSON (Líneas 35–102). Cada proyecto es un objeto con propiedades definidas:

```javascript
const projectsData = [
  {
    id: 1,
    title: "Plataforma Predictiva de Visión Artificial",
    category: "ia",
    categoryLabel: "Inteligencia Artificial",
    description: "Inspección automatizada de calidad en línea de ensamblaje con modelos de visión por computadora YOLOv8 y Edge Computing.",
    tags: ["Computer Vision", "Python", "TensorFlow", "Edge AI"],
    client: "Sector Automotriz",
    status: "Operativo",
    bgImage: "" 
  },
  // ... más proyectos
];
```

### Cómo agregar un proyecto nuevo:
Para añadir un proyecto adicional, solo copia y pega un bloque dentro del arreglo `projectsData`:

```javascript
{
  id: 7,
  title: "Nuevo Sistema de Automatización",
  category: "automatizacion", // Opciones: 'ia', 'automatizacion', 'casas-inteligentes', 'saas'
  categoryLabel: "Automatización Industrial",
  description: "Descripción detallada del desarrollo realizado...",
  tags: ["PLC", "Robótica", "IoT"],
  client: "Empresa Manufacturera",
  status: "Entregado",
  bgImage: "assets/mi-proyecto.jpg" // Ruta de imagen o vacío para fondo generado por CSS
}
```

---

## 3. Ciclo de Inicialización (`DOMContentLoaded`)

Garantiza que el código JavaScript se ejecute únicamente cuando todos los elementos HTML han sido completamente construidos en memoria:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initProjects();
  initBillingSystem();
  initContactForm();
  initDirectChannels();
});
```

Este orden modular asegura que si una sección no está presente, las demás continúen funcionando con total normalidad.

---

## 4. Control del Encabezado y Navegación Activa (`initHeader`)

Controla tres comportamientos esenciales de la experiencia de usuario:

### A. Detección de Scroll para Sombra del Encabezado
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
```
Si el usuario baja más de 40 píxeles, añade la clase `.scrolled` al `<header>`, la cual aumenta la opacidad del fondo y proyecta una sombra sutil para separar el menú del contenido que pasa por debajo.

### B. Marcado Automático del Enlace Activo
Calcula en tiempo real la posición vertical del usuario (`window.scrollY`) contra el `offsetTop` y `offsetHeight` de cada sección con un `id`. Si el usuario está leyendo "Quiénes somos", la clase `.active` se transfiere automáticamente a ese enlace en el menú.

### C. Menú Hamburguesa Móvil
Alterna la clase `.open` sobre la lista `.nav-menu` al pulsar el botón de tres líneas, y la cierra de inmediato cuando el usuario selecciona cualquier enlace.

---

## 5. Motor de Renderizado y Filtrado de Proyectos (`initProjects`)

Esta función elimina la necesidad de escribir HTML repetitivo:

```javascript
function render(items) {
  grid.innerHTML = items.map(proj => {
    // Generación dinámica de la tarjeta HTML...
  }).join('');
}
```

### Lógica de Filtrado:
Al pulsar un botón de categoría (por ejemplo, "Inteligencia Artificial"), la función lee su atributo `data-filter`:
* Si el filtro es `'all'`, invoca `render(projectsData)` mostrando todos los elementos.
* Si el filtro es específico (ej. `'ia'`), aplica `projectsData.filter(item => item.category === filter)` y redibuja la cuadrícula instantáneamente sin parpadeos ni recargas de página.

---

## 6. Sistema y Validación de Facturación Fiscal (`initBillingSystem`)

Intercepta el evento `submit` del formulario de facturación para evitar la recarga de página (`e.preventDefault()`) y ejecuta una validación técnica del RFC:

### Expresión Regular para Validación de RFC:
```javascript
const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z\d]{2}$/;
```

### Desglose de la regla:
* `^[A-Z&Ñ]{3,4}`: 3 letras para Persona Moral (empresas) o 4 letras para Persona Física.
* `\d{6}`: 6 dígitos que representan año, mes y día de nacimiento o constitución (AAMMDD).
* `[A-V1-9][A-Z\d]{2}$`: 3 caracteres alfanuméricos correspondientes a la homoclave oficial del SAT.

Si el RFC es válido, genera un número de folio aleatorio único con prefijo (`FAC-XXXXXX`) y muestra una alerta Toast de confirmación con el correo destino del cliente.

---

## 7. Manejador del Formulario de Contacto (`initContactForm`)

Gestiona el envío de requerimientos técnicos del cliente:
1. Extrae los valores de nombre, correo, área de servicio seleccionada y mensaje.
2. Comprueba que los campos obligatorios contengan texto válido.
3. Prepara la estructura del asunto y cuerpo de consulta.
4. Muestra un aviso de éxito visual y limpia los campos del formulario (`form.reset()`).

---

## 8. Integración de Canales y APIs Directas (`initDirectChannels`)

Automatiza la interacción con redes sociales y plataformas de mensajería mediante atributos de datos HTML (`data-api`):

### A. WhatsApp Click-to-Chat API:
```javascript
const customMsg = el.getAttribute('data-message') || SITE_CONFIG.whatsapp.defaultMessage;
const url = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(customMsg)}`;
window.open(url, '_blank');
```
* **`encodeURIComponent()`**: Convierte espacios, tildes y saltos de línea en códigos seguros para URLs (ejemplo: convierte espacios en `%20`), garantizando que el mensaje predefinido se abra sin errores en la aplicación de WhatsApp Web o móvil.

### B. Instagram, TikTok y Correo Electrónico:
* Instagram y TikTok concatenan la URL base con el nombre de usuario registrado en `SITE_CONFIG`.
* Correo genera un hipervínculo estándar `mailto:` que abre el cliente de correo predeterminado del usuario (Outlook, Gmail, Apple Mail).

---

## 9. Sistema Dinámico de Notificaciones Toast (`showToast`)

Genera mensajes flotantes de retroalimentación en la esquina inferior derecha:

```javascript
showToast(mensaje, tipo); // tipo puede ser 'success', 'error' o 'info'
```

### Funcionamiento Interno:
1. Verifica si ya existe el contenedor `#toastContainer` en el `<body>`; si no existe, lo crea dinámicamente.
2. Inyecta el elemento `.toast` con su icono SVG correspondiente.
3. Tras 4.5 segundos (`setTimeout`), aplica una animación CSS de salida (`opacity: 0; transform: translateX(30px)`).
4. Transcurridos 400 milisegundos adicionales, elimina el elemento del DOM (`toast.remove()`), liberando memoria en el navegador.

---

## 10. Guía para Agregar Nuevas Funcionalidades

* **Para añadir una nueva red social:**
  1. Agrega los datos correspondientes en `SITE_CONFIG`.
  2. En el HTML, añade un enlace con `data-api="nombre-red"`.
  3. En `initDirectChannels()`, agrega un selector similar al de Instagram o TikTok.
* **Para conectar el formulario con un backend real (PHP, Node.js, Python o servicio como Formspree/EmailJS):**
  * Reemplaza el bloque dentro de `initContactForm` con una llamada asíncrona `fetch('/api/contacto', { method: 'POST', body: ... })`.
