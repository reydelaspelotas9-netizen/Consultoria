# Documentación Técnica del Proyecto Web
## Consultoría en Inteligencia Artificial, Automatización Industrial, Casas Inteligentes & SaaS

Este documento contiene la guía completa de arquitectura, configuración, personalización de contenido, imágenes de fondo, canales de contacto y el **cambio de fuentes tipográficas y redacción**.

---

## 1. Estructura de Archivos del Proyecto

```text
Consultoria/
├── index.html          # Estructura semántica HTML5, metadatos SEO y maquetación de secciones
├── logo.PNG            # Logotipo principal oficial (usado en barra de navegación y footer)
├── logo2.PNG           # Isotipo oficial de la marca (usado en secciones y sellos)
├── README.md           # Documentación técnica del proyecto (este archivo)
├── assets/             # Fotografías fotorrealistas de cada proyecto (proyecto1 a proyecto6)
├── css/
│   └── style.css       # Sistema de diseño claro, variables de color y tipografía estilo AWS
└── js/
    └── app.js          # Configuración de APIs (WhatsApp, Instagram, etc.), portafolio y lógica
```

---

## 2. Tipografía y Estilo AWS

Actualmente el sitio utiliza la tipografía oficial inspirada en **Amazon Web Services (AWS)**:
- **`Amazon Ember`** con fallback principal a **`Open Sans`** de Google Fonts.
- Pesos limpios y estilizados (`font-weight: 400`, `500` y `600` para títulos), evitando tipografías saturadas.

### Paso 1: En [index.html](file:///c:/Users/ebany/Desktop/Consultoria/index.html) (Líneas 10 a 13)

Busca el bloque `<link>` dentro del `<head>`:

```html
<!-- Tipografía Google Fonts actual -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Para cambiarla por otra fuente (por ejemplo, **Inter** o **Montserrat**), reemplaza esa URL por la que obtengas en [Google Fonts](https://fonts.google.com/), o si usarás fuentes del sistema (Arial, Helvetica), puedes simplemente eliminar esas líneas.

---

### Paso 2: En [css/style.css](file:///c:/Users/ebany/Desktop/Consultoria/css/style.css) (Líneas 35 a 40)

Busca las variables de tipografía dentro de `:root`:

```css
:root {
  /* Tipografía actual */
  --font-primary: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

#### Ejemplos de cambio rápido:

* **Para una fuente corporativa clásica y neutral (Inter):**
  ```css
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
  ```

* **Para fuentes estándar del sistema (sin depender de internet):**
  ```css
  --font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  ```

* **Para una fuente geométrica elegante (Montserrat):**
  ```css
  --font-primary: 'Montserrat', sans-serif;
  ```

---

## 3. Dónde Cambiar los Textos y Redacción ("Copywriting")

Si deseas cambiar las descripciones, títulos o eslóganes por tu propia redacción humana personalizada:

1. **Textos generales, eslóganes y tarjetas de servicios:**
   * Abre [index.html](file:///c:/Users/ebany/Desktop/Consultoria/index.html).
   * **Hero / Encabezado principal:** Líneas 75 - 95 (`<h1 class="hero-title">` y `<p class="hero-description">`).
   * **Servicios (IA, Automatización, Casas Inteligentes, SaaS):** Líneas 175 - 325 (`<h3 class="service-title">` y `<p class="service-description">`).
   * **Quiénes somos:** Líneas 330 - 380 (`<div class="about-text">`).

2. **Proyectos de "Nuestros trabajos":**
   * Abre [js/app.js](file:///c:/Users/ebany/Desktop/Consultoria/js/app.js) en las líneas 35 a 102.
   * Todos los proyectos se configuran en el arreglo `projectsData`. Puedes modificar títulos, clientes, descripciones y etiquetas técnicas fácilmente.

---

## 4. Configuración de Canales de Contacto y APIs

En [js/app.js](file:///c:/Users/ebany/Desktop/Consultoria/js/app.js) (Líneas 12 a 29), edita los valores del objeto `SITE_CONFIG`:

```javascript
const SITE_CONFIG = {
  whatsapp: {
    phone: "527223672945", // Tu número con código de país (sin signos + ni espacios)
    defaultMessage: "Hola, me interesa conocer más sobre sus servicios de consultoría tecnológica e ingeniería."
  },
  instagram: {
    username: "consultoria.tech", // Tu usuario sin @
    url: "https://instagram.com/"
  },
  email: {
    address: "contacto@consultoriatech.com", // Tu correo para recepción de clientes
    billingAddress: "facturacion@consultoriatech.com"
  },
  tiktok: {
    username: "@consultoria.tech", // Tu usuario de TikTok
    url: "https://tiktok.com/@"
  }
};
```

---

## 5. Dónde y Cómo Agregar Imágenes de Fondo

El sistema está preparado para que puedas añadir tus propias fotografías de alta resolución (por ejemplo, tableros de control industrial, data centers, interiores de casas domóticas o servidores) sin que se pierda el contraste del texto:

En [css/style.css](file:///c:/Users/ebany/Desktop/Consultoria/css/style.css) (Líneas 29 a 34):

```css
:root {
  /* Coloca la ruta a tu imagen aquí */
  --bg-hero-image: url('../assets/mi-fondo-hero.jpg');
}
```

> **Nota:** La capa `.hero-bg-overlay` aplica automáticamente un degradado semitransparente sobre cualquier imagen que agregues para que los textos siempre se lean perfectamente en cualquier pantalla.

---

## 6. Paleta Oficial de Colores

Los colores corporativos están centralizados en las variables CSS de [css/style.css](file:///c:/Users/ebany/Desktop/Consultoria/css/style.css):

| Nombre del Color | Código Hex | Uso en la Web |
| :--- | :--- | :--- |
| **Rojo coral** | `#FF4D45` | Color principal, botones de acción, iconos activos y bordes de realce. |
| **Carbón / Oscuro** | `#171717` | Fondo general de la web, tarjetas y pie de página. |
| **Marfil / Claro** | `#F7F4EE` | Texto general de lectura y fondo de la sección *"Quiénes somos"*. |
| **Gris neutro** | `#A2A2A2` | Textos secundarios, descripciones y bordes sutiles. |
| **Naranja** | `#FF8A00` | Acento secundario, degradados y badges destacados. |

---

## 7. Apartados y Módulos Activos

1. **Inicio (Hero):** Presentación ejecutiva con métricas y llamada a la acción hacia WhatsApp y Contacto.
2. **Quiénes somos:** Manifiesto de ingeniería con fondo claro Marfil y exhibición de ambos logotipos (`logo.PNG` y `logo2.PNG`).
3. **Servicios:** 4 tarjetas técnicas con especificaciones para IA, Automatización Industrial, Domótica KNX y plataformas SaaS.
4. **Nuestros trabajos:** Módulo dinámico con filtros de categoría (IA, Automatización, Casas Inteligentes, SaaS) que se actualiza desde `projectsData` en JavaScript.
5. **Facturación:** Portal fiscal con validación de RFC, razón social, régimen fiscal SAT y emisión virtual de folio para entrega de XML y PDF.
6. **Contáctanos:** Enlaces con integración a WhatsApp, Instagram, TikTok y correo corporativo, más formulario de consulta formal.

---

## 8. Cómo Ejecutar el Proyecto Localmente

Para abrir y probar la página web en tu computadora:

1. **Opción Directa:**
   * Haz doble clic sobre el archivo [index.html](file:///c:/Users/ebany/Desktop/Consultoria/index.html) para abrirlo en cualquier navegador (Google Chrome, Edge, Safari, Firefox).

2. **Opción con Servidor Local (Recomendado para APIs y rutas relativas):**
   * Abre PowerShell o la Terminal en la carpeta `Consultoria` y ejecuta:
     ```powershell
     python -m http.server 8000
     ```
   * Ingresa en tu navegador a: `http://localhost:8000`
