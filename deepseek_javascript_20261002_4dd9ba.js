// ============ HEADER SCROLL ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// ============ SCROLL SUAVE PARA ÂNCORAS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ============ STATUS DA REDE (SIMULAÇÃO) ============
// Este código atualiza o texto "última atualização" a cada 30 segundos
const statusFooter = document.querySelector('.status-footer');
if (statusFooter) {
  const messages = [
    'Última atualização: agora há poucos segundos',
    'Última atualização: agora há 30 segundos',
    'Última atualização: agora há 1 minuto'
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % messages.length;
    const span = statusFooter.querySelector('span:last-child');
    // Atualiza apenas o texto, preservando o dot verde
    statusFooter.childNodes[statusFooter.childNodes.length - 1].textContent = messages[idx];
  }, 30000);
}

// ============ ANIMAÇÃO SCROLL REVEAL (opcional) ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplica animação aos painéis
document.querySelectorAll('.panel, .business-feature, .about-value, .coverage-image-wrapper').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});