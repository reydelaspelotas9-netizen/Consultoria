/**
 * ============================================================================
 * CONSULTORÍA EN TECNOLOGÍA: IA, AUTOMATIZACIÓN, SMART HOMES & SAAS
 * LOGICA DE APLICACIÓN, APIS DE CONTACTO & COMPONENTES DINÁMICOS
 * ============================================================================
 */

// ==========================================
// CONFIGURACIÓN DE APIS Y CANALES DIRECTOS
// Personaliza aquí tus números y nombres de usuario:
// ==========================================
const SITE_CONFIG = {
  whatsapp: {
    phone: "527223672945", // Formato internacional (código de país + número, sin signos ni espacios)
    defaultMessage: "Hola, me interesa conocer más sobre sus servicios de consultoría tecnológica e ingeniería."
  },
  instagram: {
    username: "consultoria.tech", // Tu usuario de Instagram
    url: "https://instagram.com/"
  },
  email: {
    address: "contacto@consultoriatech.com", // Tu correo corporativo
    billingAddress: "facturacion@consultoriatech.com"
  },
  tiktok: {
    username: "@consultoria.tech", // Tu usuario de TikTok
    url: "https://tiktok.com/@"
  }
};

// ==========================================
// NUESTROS TRABAJOS (PORTAFOLIO MODULAR)
// Edita o agrega fácilmente tus proyectos en esta lista:
// ==========================================
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
    bgImage: "assets/proyecto1.jpg"
  },
  {
    id: 2,
    title: "Automatización y Telemetría SCADA para Planta Química",
    category: "automatizacion",
    categoryLabel: "Automatización Industrial",
    description: "Control distribuido de reactores con PLC Siemens S7-1500, HMI redundante y protocolo OPC UA con almacenamiento en tiempo real.",
    tags: ["PLC Siemens", "SCADA", "OPC UA", "Seguridad Funcional"],
    client: "Industria Química",
    status: "Operativo",
    bgImage: "assets/proyecto2.jpg"
  },
  {
    id: 3,
    title: "Domótica Integral Residencial de Alto Nivel",
    category: "casas-inteligentes",
    categoryLabel: "Casas Inteligentes",
    description: "Sistema unificado bajo estándar KNX y DALI: climatización inteligente, iluminación circadiana, control de accesos biométrico y audio multi-zona.",
    tags: ["Protocolo KNX", "DALI 2", "Control4", "IoT Residencial"],
    client: "Residencia Particular",
    status: "Entregado",
    bgImage: "assets/proyecto3.jpg"
  },
  {
    id: 4,
    title: "Arquitectura SaaS Multi-Tenant para Gestión Logística",
    category: "saas",
    categoryLabel: "Software as a Service",
    description: "Infraestructura cloud serverless con microservicios en AWS, monitoreo GPS en vivo de flotas y optimización algorítmica de rutas.",
    tags: ["Next.js", "Node.js", "AWS Cloud", "PostgreSQL"],
    client: "Operador Logístico Internacional",
    status: "En Escalamiento",
    bgImage: "assets/proyecto4.jpg"
  },
  {
    id: 5,
    title: "Asistente Corporativo RAG con Modelos de Lenguaje",
    category: "ia",
    categoryLabel: "Inteligencia Artificial",
    description: "Motor de búsqueda semántica y copiloto de ingeniería documental para consultas de planos técnicos y normativas industriales.",
    tags: ["LLM", "RAG", "Embeddings", "FastAPI"],
    client: "Firma de Ingeniería",
    status: "Operativo",
    bgImage: "assets/proyecto5.jpg"
  },
  {
    id: 6,
    title: "Célula Robótica de Paletizado y Empaque Continuo",
    category: "automatizacion",
    categoryLabel: "Automatización Industrial",
    description: "Integración de robot industrial articulado de 6 ejes con celdas de carga y sincronización con transportadores de velocidad variable.",
    tags: ["Robótica Industrial", "Seguridad Láser", "PLC Allen Bradley"],
    client: "Alimentos & Bebidas",
    status: "Operativo",
    bgImage: "assets/proyecto6.jpg"
  }
];

// ==========================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initProjects();
  initQuoteCalculator();
  initBillingSystem();
  initCareersModal();
  initContactForm();
  initDirectChannels();
});

// ==========================================
// GESTIÓN DEL ENCABEZADO Y NAVEGACIÓN
// ==========================================
function initHeader() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Efecto de scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Actualizar enlace activo según sección en pantalla
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Toggle Menú Móvil
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

// ==========================================
// RENDERIZADO Y FILTRO DE NUESTROS TRABAJOS
// ==========================================
function initProjects() {
  const grid = document.getElementById('portfolioGrid');
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');

  if (!grid) return;

  function render(items) {
    grid.innerHTML = items.map(proj => {
      const bgStyle = proj.bgImage
        ? `background-image: url('${proj.bgImage}'); background-size: cover; background-position: center;`
        : `background: radial-gradient(circle at 30% 30%, rgba(255, 77, 69, 0.15) 0%, #1a1a1a 100%);`;

      const tagsHtml = proj.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('');

      return `
        <article class="portfolio-card" data-category="${proj.category}">
          <div class="portfolio-media-container" style="${bgStyle}">
            <div class="portfolio-category-badge">${proj.categoryLabel}</div>
          </div>
          <div class="portfolio-body">
            <h3 class="portfolio-title">${proj.title}</h3>
            <p class="portfolio-desc">${proj.description}</p>
            <div class="portfolio-tags">${tagsHtml}</div>
            <div class="portfolio-footer">
              <span style="color: var(--color-gris); font-size: 0.82rem;">Cliente: ${proj.client}</span>
              <div class="portfolio-status"><span></span>${proj.status}</div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render inicial con todos los proyectos
  render(projectsData);

  // Filtros de categoría
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        render(projectsData);
      } else {
        const filtered = projectsData.filter(item => item.category === filter);
        render(filtered);
      }
    });
  });
}

// ==========================================
// CALCULADORA INTERACTIVA DE COTIZACIONES
// ==========================================
function initQuoteCalculator() {
  const form = document.getElementById('quoteForm');
  const estimateDisplay = document.getElementById('quoteEstimateDisplay');
  const deliveryDisplay = document.getElementById('quoteDeliveryDisplay');
  const sendWhatsAppBtn = document.getElementById('sendQuoteWhatsApp');
  const sendEmailBtn = document.getElementById('sendQuoteEmail');

  if (!form) return;

  function calculateQuote() {
    let basePrice = 0;
    let weeks = 2;

    // Tipo de Servicio
    const serviceRadio = form.querySelector('input[name="quoteService"]:checked');
    if (serviceRadio) {
      basePrice += parseInt(serviceRadio.value, 10);
      weeks += parseInt(serviceRadio.dataset.weeks || 3, 10);
    }

    // Escala del Proyecto
    const scaleRadio = form.querySelector('input[name="quoteScale"]:checked');
    if (scaleRadio) {
      const multiplier = parseFloat(scaleRadio.value);
      basePrice = Math.round(basePrice * multiplier);
      weeks += parseInt(scaleRadio.dataset.extraWeeks || 2, 10);
    }

    // Adicionales
    const addons = form.querySelectorAll('input[name="quoteAddon"]:checked');
    addons.forEach(ad => {
      basePrice += parseInt(ad.value, 10);
      weeks += parseInt(ad.dataset.weeks || 1, 10);
    });

    if (estimateDisplay) {
      estimateDisplay.textContent = `$${basePrice.toLocaleString('en-US')} USD`;
    }
    if (deliveryDisplay) {
      deliveryDisplay.textContent = `${weeks} - ${weeks + 2} semanas aprox.`;
    }

    return { basePrice, weeks };
  }

  // Recalcular al cambiar cualquier opción
  form.addEventListener('change', calculateQuote);
  calculateQuote(); // Inicial

  // Enviar cotización por WhatsApp
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const serviceRadio = form.querySelector('input[name="quoteService"]:checked');
      const scaleRadio = form.querySelector('input[name="quoteScale"]:checked');
      const addons = Array.from(form.querySelectorAll('input[name="quoteAddon"]:checked')).map(cb => cb.dataset.name).join(', ');

      const { basePrice, weeks } = calculateQuote();

      const serviceName = serviceRadio ? serviceRadio.dataset.name : 'Consultoría Especializada';
      const scaleName = scaleRadio ? scaleRadio.dataset.name : 'Estándar';

      const message = `*SOLICITUD DE COTIZACIÓN TÉCNICA*\n\n` +
        `• *Solución Principal:* ${serviceName}\n` +
        `• *Nivel de Escala:* ${scaleName}\n` +
        `• *Módulos Adicionales:* ${addons || 'Ninguno'}\n` +
        `• *Inversión Estimada:* $${basePrice.toLocaleString('en-US')} USD\n` +
        `• *Plazo Estimado:* ${weeks} a ${weeks + 2} semanas\n\n` +
        `Deseo agendar una sesión de análisis técnico para revisar requerimientos específicos.`;

      const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Redirigiendo a WhatsApp con tu cotización estructurada...', 'success');
    });
  }

  // Enviar cotización por Correo
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const serviceRadio = form.querySelector('input[name="quoteService"]:checked');
      const { basePrice, weeks } = calculateQuote();
      const serviceName = serviceRadio ? serviceRadio.dataset.name : 'Consultoría Especializada';

      const subject = `Cotización Técnica: ${serviceName}`;
      const body = `Hola equipo de Consultoría,\n\nHe configurado una propuesta técnica preliminar en su portal:\n- Servicio: ${serviceName}\n- Estimado aproximado: $${basePrice.toLocaleString('en-US')} USD\n- Plazo estimado: ${weeks} semanas\n\nFavor de comunicarse para coordinar especificaciones técnicas y cotización formal.`;

      const mailtoUrl = `mailto:${SITE_CONFIG.email.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast('Abriendo gestor de correo corporativo...', 'success');
    });
  }
}

// ==========================================
// PORTAL DE FACTURACIÓN FISCAL
// ==========================================
function initBillingSystem() {
  const form = document.getElementById('billingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rfc = document.getElementById('billRFC').value.trim().toUpperCase();
    const razonSocial = document.getElementById('billRazon').value.trim();
    const folio = document.getElementById('billTicket').value.trim();
    const email = document.getElementById('billEmail').value.trim();
    const regimen = document.getElementById('billRegimen').value;
    const cfdi = document.getElementById('billCFDI').value;

    if (!rfc || !razonSocial || !folio || !email) {
      showToast('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    // Validación básica de formato de RFC (Persona Física o Moral)
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z\d]{2}$/;
    if (!rfcRegex.test(rfc)) {
      showToast('El formato del RFC no parece válido. Verifica homoclave.', 'error');
      return;
    }

    const folioGenerado = 'FAC-' + Math.floor(100000 + Math.random() * 900000);

    // Modal o aviso de confirmación exitosa
    const confirmMessage = `Solicitud ${folioGenerado} recibida. Los archivos XML y PDF serán emitidos y enviados a ${email} en menos de 24 horas hábiles.`;

    showToast(confirmMessage, 'success');
    form.reset();
  });
}

// ==========================================
// BOLSA DE EMPLEO (CAREERS & TALENTO)
// ==========================================
function initCareersModal() {
  const modal = document.getElementById('careerModal');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalClose = document.getElementById('modalCloseBtn');
  const applyButtons = document.querySelectorAll('.btn-apply-job');
  const careerForm = document.getElementById('careerApplyForm');

  if (!modal) return;

  applyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const jobTitle = btn.getAttribute('data-job') || 'Posición Técnica';
      if (modalJobTitle) modalJobTitle.textContent = jobTitle;
      modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Cerrar al hacer click fuera del contenedor
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Postulación registrada exitosamente. El equipo de Recursos Humanos te contactará.', 'success');
      modal.classList.remove('active');
      careerForm.reset();
    });
  }
}

// ==========================================
// FORMULARIO DE CONTACTO GENERAL
// ==========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor completa todos los campos obligatorios.', 'error');
      return;
    }

    // Generar envío por correo y confirmación visual
    const mailSubject = `Contacto Web: ${service} - ${name}`;
    const mailBody = `Nombre: ${name}\nCorreo: ${email}\nServicio de Interés: ${service}\n\nMensaje:\n${message}`;

    // Confirmación inmediata en interfaz
    showToast(`Gracias ${name}, tu mensaje ha sido enviado. Te responderemos a la brevedad.`, 'success');
    form.reset();
  });
}

// ==========================================
// CANALES DIRECTOS (WHATSAPP, INSTAGRAM, TIKTOK, CORREO)
// ==========================================
function initDirectChannels() {
  // Enlaces de WhatsApp directo
  const directWhatsAppElements = document.querySelectorAll('[data-api="whatsapp"]');
  directWhatsAppElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const customMsg = el.getAttribute('data-message') || SITE_CONFIG.whatsapp.defaultMessage;
      const url = `https://wa.me/${SITE_CONFIG.whatsapp.phone}?text=${encodeURIComponent(customMsg)}`;
      window.open(url, '_blank');
    });
  });

  // Enlaces de Instagram directo
  const directInstagramElements = document.querySelectorAll('[data-api="instagram"]');
  directInstagramElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `${SITE_CONFIG.instagram.url}${SITE_CONFIG.instagram.username}`;
      window.open(url, '_blank');
    });
  });

  // Enlaces de TikTok directo
  const directTikTokElements = document.querySelectorAll('[data-api="tiktok"]');
  directTikTokElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `${SITE_CONFIG.tiktok.url}${SITE_CONFIG.tiktok.username.replace('@', '')}`;
      window.open(url, '_blank');
    });
  });

  // Enlaces de Correo directo
  const directEmailElements = document.querySelectorAll('[data-api="correo"]');
  directEmailElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const mailtoUrl = `mailto:${SITE_CONFIG.email.address}?subject=Consulta%20General%20de%20Servicios`;
      window.location.href = mailtoUrl;
    });
  });
}

// ==========================================
// SISTEMA DE NOTIFICACIONES TOAST
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success'
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D45" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div style="font-size: 0.9rem; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
