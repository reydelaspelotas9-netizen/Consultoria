# Documentación Exhaustiva del Sistema de Diseño CSS (`css/style.css`)

Esta guía técnica explica la arquitectura, variables, capas visuales, efectos *glassmorphism*, responsividad y técnicas de diagramación utilizadas en el archivo [css/style.css](file:///c:/Users/ebany/Desktop/Consultoria/css/style.css).

---

## Índice de Contenidos

1. [Variables de Diseño y Tokens Globales (`:root`)](#1-variables-de-diseño-y-tokens-globales-root)
2. [Paleta Cromática Oficial](#2-paleta-cromática-oficial)
3. [Tipografía y Cómo Reemplazarla](#3-tipografía-y-cómo-reemplazarla)
4. [Sistema de Imágenes de Fondo y Capas Superpuestas](#4-sistema-de-imágenes-de-fondo-y-capas-superpuestas)
5. [Efectos Glassmorphism y Elevaciones](#5-efectos-glassmorphism-y-elevaciones)
6. [Sistema de Botones y Componentes Interactivos](#6-sistema-de-botones-y-componentes-interactivos)
7. [Diagramación y Distribución (Grid y Flexbox)](#7-diagramación-y-distribución-grid-y-flexbox)
8. [Efectos de Micro-Animación y Transiciones](#8-efectos-de-micro-animación-y-transiciones)
9. [Diseño Adaptable a Dispositivos Móviles (Media Queries)](#9-diseño-adaptable-a-dispositivos-móviles-media-queries)
10. [Guía Rápida de Modificación de Estilos](#10-guía-rápida-de-modificación-de-estilos)

---

## 1. Variables de Diseño y Tokens Globales (`:root`)

En la cabecera del archivo CSS se encuentra el selector `:root`. Aquí se definen todas las constantes globales del sistema. Al cambiar un valor aquí, **todo el sitio web se actualiza de manera uniforme**.

```css
:root {
  /* Paleta Oficial */
  --color-coral: #FF4D45;
  --color-coral-rgb: 255, 77, 69;
  --color-coral-hover: #e83f37;

  --color-carbon: #111827;       /* Texto oscuro nítido y legible */
  --color-carbon-light: #1F2937;
  --color-carbon-card: #FFFFFF;  /* Tarjetas fondo blanco puro */
  --color-carbon-border: #E5E7EB; /* Bordes suaves */

  --color-bg-base: #FFFFFF;      /* Fondo general blanco */
  --color-bg-alt: #F8FAFC;       /* Superficies secundarias */

  --color-gris: #4B5563;         /* Gris neutral corporativo */
  --color-naranja: #FF8A00;      /* Acento secundario */

  /* Tipografía Estilo AWS (Amazon Ember / Open Sans) */
  --font-primary: "Amazon Ember", "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Elevaciones */
  --card-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
}
```

---

## 2. Paleta Cromática Oficial

El sitio sigue una jerarquía estricta de 5 colores para garantizar alta legibilidad y prestigio corporativo:

| Variable CSS | Valor Hex | Función en la Interfaz |
| :--- | :--- | :--- |
| `--color-coral` | `#FF4D45` | **Color primario corporativo:** Botones principales, enlaces al pasar el ratón, bordes activos y detalles de acento. |
| `--color-carbon` | `#171717` | **Fondo base oscuro:** Brinda una atmósfera sobria, tecnológica y reduce el cansancio visual. |
| `--color-marfil` | `#F7F4EE` | **Color claro de lectura:** Utilizado para títulos, textos principales y como fondo de contraste en la sección *"Quiénes somos"*. |
| `--color-gris` | `#A2A2A2` | **Gris de apoyo neutro:** Utilizado en subtítulos, textos secundarios, especificaciones de tarjetas e iconos inactivos. |
| `--color-naranja` | `#FF8A00` | **Acento secundario:** Utilizado en degradados lineales (`linear-gradient`), badges de advertencia o estados destacados. |

---

## 3. Tipografía y Cómo Reemplazarla

El sistema define dos familias tipográficas:
1. `--font-primary`: Diseñada para la lectura humana de títulos, botones, menús y párrafos.
2. `--font-mono`: Fuente técnica tipo terminal empleada para estados del sistema y números de folio.

### ¿Cómo cambiar la fuente a una tradicional?

En las líneas 35–40 de [css/style.css](file:///c:/Users/ebany/Desktop/Consultoria/css/style.css):

```css
/* Para una fuente neutral corporativa (Inter) */
--font-primary: 'Inter', sans-serif;

/* Para una fuente estándar instalada en cualquier computadora (sin internet) */
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

/* Para una fuente editorial elegante (Montserrat) */
--font-primary: 'Montserrat', sans-serif;
```

---

## 4. Sistema de Imágenes de Fondo y Capas Superpuestas

El diseño permite incorporar fotografías de alta resolución en la cabecera (Hero) o en secciones específicas sin alterar el código HTML:

### Configuración de la imagen:
```css
:root {
  --bg-hero-image: url('../assets/mi-imagen.jpg');
}
```

### Capa de Fusión y Contraste Automático:
Para evitar que una imagen con zonas brillantes opaque el texto, se estructuraron tres capas superpuestas en el Hero:

1. **`.hero-bg-wrapper`:** Contenedor absoluto que recibe la imagen mediante `background-size: cover; background-position: center;`.
2. **`.hero-bg-overlay`:** Aplica un doble degradado radial y vertical que oscurece suavemente el centro y los bordes:
   ```css
   background: 
     radial-gradient(circle at 80% 20%, rgba(255, 77, 69, 0.15) 0%, transparent 45%),
     radial-gradient(circle at 10% 80%, rgba(255, 138, 0, 0.1) 0%, transparent 40%),
     linear-gradient(180deg, rgba(23, 23, 23, 0.85) 0%, #171717 100%);
   ```
3. **`.tech-grid-overlay`:** Agrega una cuadrícula de líneas sutiles transparentes de 48px con máscara de degradado circular (*mask-image*), generando una estética de plano arquitectónico.

---

## 5. Efectos Glassmorphism y Elevaciones

El estilo cristal translúcido (*glassmorphism*) se define mediante tres propiedades combinadas:

```css
.hero-card, .channel-card, .billing-card {
  background: var(--glass-bg); /* rgba(28, 28, 28, 0.65) */
  border: var(--glass-border); /* 1px solid rgba(255, 255, 255, 0.08) */
  backdrop-filter: var(--glass-blur); /* blur(16px) */
  box-shadow: var(--glass-shadow);
}
```

* **`backdrop-filter: blur(16px)`:** Desenfoca el fondo que queda por detrás de la tarjeta, creando una sensación de profundidad de capas 3D.
* **`border: 1px solid rgba(255, 255, 255, 0.08)`:** Borde translúcido que simula el filo iluminado de una placa de vidrio.

---

## 6. Sistema de Botones y Componentes Interactivos

Los botones comparten la clase base `.btn` y modificadores de intención visual:

* **`.btn-primary`:** Fondo en gradiente Rojo Coral con sombra iluminada (`box-shadow: 0 4px 18px rgba(255, 77, 69, 0.35)`). Al pasar el cursor (*hover*), se eleva 2 píxeles (`transform: translateY(-2px)`).
* **`.btn-secondary`:** Fondo oscuro sutil (`rgba(255, 255, 255, 0.05)`) con borde fino, ideal para acciones secundarias o de exploración.
* **`.btn-whatsapp`:** Verde oficial (`#25D366`) optimizado para reconocimiento inmediato por parte de los clientes.

---

## 7. Diagramación y Distribución (Grid y Flexbox)

El diseño evita cálculos rígidos en píxeles y emplea **CSS Grid** moderno y auto-adaptable:

### Cuadrícula Inteligente de Servicios y Trabajos:
```css
.services-grid, .portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
```
* **`auto-fit` y `minmax(280px, 1fr)`**: La cuadrícula calcula automáticamente cuántas columnas caben en la pantalla. Si la pantalla es ancha, muestra 4 columnas; si es una tablet, muestra 2; y si es un teléfono móvil, se convierte en 1 columna sin necesidad de media queries complejas.

---

## 8. Efectos de Micro-Animación y Transiciones

* **Transición fluida:**
  `--transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);`
  Utiliza una curva de aceleración natural tipo resorte en lugar de transiciones mecánicas lineales.
* **Indicador de Pulso:**
  La animación `@keyframes pulseEffect` produce un halo expansivo alrededor del indicador activo sin consumir ciclos pesados de CPU.
* **Elevación de Tarjetas:**
  Al pasar el ratón sobre cualquier tarjeta de servicio o proyecto, esta se eleva 6 píxeles con una suave sombra proyectada (`transform: translateY(-6px);`).

---

## 9. Diseño Adaptable a Dispositivos Móviles (Media Queries)

El archivo incorpora puntos de ruptura optimizados:

### Breakpoint Tablet y Móviles Grandes (`@media (max-width: 992px)`)
* La cabecera Hero se reorganiza de dos columnas a una sola columna centrada.
* El menú de navegación se oculta de la barra superior y se transforma en un menú lateral deslizable (`.nav-menu.open`), activado por el botón hamburguesa.
* Las cuadrículas de "Quiénes somos" y "Contacto" se apilan verticalmente.

### Breakpoint Móviles Pequeños (`@media (max-width: 640px)`)
* Los formularios de facturación y contacto colapsan sus campos en una sola columna para facilitar la escritura con el pulgar.
* Las estadísticas del Hero reducen su tamaño y se distribuyen verticalmente.

---

## 10. Guía Rápida de Modificación de Estilos

* **Para cambiar los radios de redondeo:** Modifica `--border-radius-md` (actualmente `14px`) y `--border-radius-lg` (`22px`).
* **Para cambiar la intensidad del color Coral:** Cambia el valor `#FF4D45` en `--color-coral`.
* **Para ajustar el espaciado vertical de las secciones:** Modifica `.section { padding: 6.5rem 0; }`.
