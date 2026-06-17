/* ========================================
   SCRIPT.JS - FUNCIONALIDADES DA PÁGINA
   ======================================== */

// ========================================
// ANIMAÇÕES COM CANVAS
// ========================================

function initCanvasLines() {
    const canvas = document.getElementById('canvas-lines');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    let animationId;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5;
            this.color = this.getRandomColor();
        }
        
        getRandomColor() {
            const colors = ['#00D9FF', '#7C3AED', '#06FFA5'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Inicializar partículas
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Desenhar linhas entre partículas próximas
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(drawLines);
    }
    
    drawLines();
    
    // Redimensionar canvas ao mudar o tamanho da janela
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// SCROLL REVEAL - REVELAR ELEMENTOS
// ========================================

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ========================================
// SMOOTH SCROLL PARA ÂNCORAS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========================================
// NAVBAR STICKY COM EFEITO
// ========================================

function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ========================================
// CONTADOR ANIMADO
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ========================================
// FORMULÁRIO E CONVERSÃO
// ========================================

function scrollToAction() {
    const button = document.querySelector('.btn-primary');
    const finalCta = document.querySelector('.final-cta');
    
    if (finalCta) {
        finalCta.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
}

function openCheckout() {
    // Substituir pela URL real do checkout
    const checkoutUrl = 'https://seu-link-de-checkout.com';
    
    alert('🎯 Você será redirecionado para o checkout!\n\nSubstituir esta URL pela página de pagamento real.');
    // window.location.href = checkoutUrl;
}

function openWhatsapp() {
    // Substituir pelo número real do WhatsApp
    const phoneNumber = '5585999999999'; // Formato: 55 + DDD + número
    const message = encodeURIComponent('Olá! Gostaria de conversar com a equipe sobre o curso "Dominando o ChatGPT".');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// ========================================
// LAZY LOADING PARA IMAGENS
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antigos
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ========================================
// EFEITO PARALLAX (OPCIONAL)
// ========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            const speed = element.dataset.parallax || 0.5;
            
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                element.style.transform = `translateY(${distance * speed}px)`;
            }
        });
    });
}

// ========================================
// RASTREAMENTO DE EVENTOS (ANALYTICS)
// ========================================

function trackEvent(eventName, eventDetails = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventDetails);
    }
    
    console.log(`📊 Evento rastreado: ${eventName}`, eventDetails);
}

// Rastrear cliques nos botões principais
document.addEventListener('DOMContentLoaded', () => {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('cta_principal_clicado', {
                texto: btn.textContent
            });
        });
    });
    
    secondaryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('cta_secundario_clicado', {
                texto: btn.textContent
            });
        });
    });
});

// ========================================
// FORM VALIDATION (OPCIONAL)
// ========================================

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    if (!formData.phone || formData.phone.trim() === '') {
        errors.push('Telefone é obrigatório');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ========================================
// SISTEMA DE NOTIFICAÇÕES
// ========================================

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            background-color: #06FFA5;
            color: #0a0e27;
        }
        
        .notification-error {
            background-color: #FF1744;
            color: #ffffff;
        }
        
        .notification-info {
            background-color: #00D9FF;
            color: #0a0e27;
        }
        
        .notification-warning {
            background-color: #FFB800;
            color: #0a0e27;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ========================================
// DETECTAR MODO ESCURO/CLARO
// ========================================

function detectDarkMode() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    } else if (prefersLightMode) {
        document.body.classList.remove('dark-mode');
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`⏱️ Tempo de carregamento: ${pageLoadTime}ms`);
            
            trackEvent('page_load_time', {
                tempo_ms: pageLoadTime
            });
        });
    }
}

// ========================================
// MOBILE MENU (OPCIONAL)
// ========================================

function initMobileMenu() {
    const navbar = document.querySelector('.navbar-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !navMenu) return;
    
    // Verificar se a tela é menor que 768px
    const checkMobileMenu = () => {
        if (window.innerWidth <= 768) {
            // Adicionar lógica para menu mobile se necessário
        }
    };
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
}

// ========================================
// EASTER EGGS
// ========================================

function addEasterEgg() {
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiPattern.length);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            showNotification('🚀 Você ativou o modo "Mestre da IA"!', 'success', 5000);
            document.body.style.filter = 'hue-rotate(360deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 2000);
        }
    });
}

// ========================================
// INICIALIZAR TUDO AO CARREGAR A PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página carregada - Inicializando componentes...');
    
    // Inicializar componentes
    initCanvasLines();
    initScrollReveal();
    initSmoothScroll();
    initStickyNavbar();
    initLazyLoading();
    initParallax();
    initMobileMenu();
    detectDarkMode();
    monitorPerformance();
    addEasterEgg();
    
    console.log('✅ Todos os componentes foram inicializados com sucesso!');
});

// ========================================
// TRATAMENTO DE ERROS GLOBAL
// ========================================

window.addEventListener('error', (event) => {
    console.error('❌ Erro:', event.error);
    showNotification('Ocorreu um erro. Por favor, recarregue a página.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promessa rejeitada:', event.reason);
    showNotification('Ocorreu um erro inesperado.', 'error');
});

// ========================================
// SERVICE WORKER (PWA - OPCIONAL)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Descomentar para usar Service Worker
        // navigator.serviceWorker.register('sw.js').then(registration => {
        //     console.log('✅ Service Worker registrado:', registration);
        // }).catch(error => {
        //     console.error('❌ Erro ao registrar Service Worker:', error);
        // });
    });
}

// ========================================
// INICIALIZAR ALGUM SCRIPT EXTERNO
// ========================================

function loadExternalScript(src, attributes = {}) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        Object.keys(attributes).forEach(key => {
            script.setAttribute(key, attributes[key]);
        });
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Erro ao carregar: ${src}`));
        
        document.body.appendChild(script);
    });
}

// Exemplos de uso:
// loadExternalScript('https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js');

// ========================================
// CONVERSÃO DE VISITANTE PARA LEAD
// ========================================

function captureLeadData() {
    // Capturar dados do visitante (com consentimento)
    const visitData = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timeOnPage: 0
    };
    
    // Medir tempo na página
    window.addEventListener('beforeunload', () => {
        visitData.timeOnPage = Math.floor((Date.now() - new Date(visitData.timestamp).getTime()) / 1000);
        console.log('📊 Dados do visitante:', visitData);
        
        // Enviar para servidor (substitua pela URL real)
        // fetch('/api/visitors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(visitData)
        // });
    });
}

// Inicializar captura de leads
captureLeadData();

// ========================================
// UTILITÁRIOS GERAIS
// ========================================

const utils = {
    // Formatar moeda
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Debounce
    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },
    
    // Throttle
    throttle: (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Copiar para clipboard
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✓ Copiado para clipboard!', 'success');
        }).catch(() => {
            showNotification('✗ Erro ao copiar', 'error');
        });
    },
    
    // Obter parâmetro de URL
    getURLParameter: (name) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }
};

// Exportar utils para uso global
window.utils = utils;
