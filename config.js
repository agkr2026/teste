/* ========================================
   GUIA DE PERSONALIZAÇÃO - DOMINANDO O CHATGPT
   ======================================== */

// ========================================
// 1. CONFIGURAÇÕES PRINCIPAIS
// ========================================

const CONFIG = {
    // URLs e Links
    CHECKOUT_URL: 'https://seu-link-de-checkout.com',
    WHATSAPP_NUMBER: '5585999999999', // Formato: 55 + DDD + 9 + 8 dígitos
    WHATSAPP_MESSAGE: 'Olá! Gostaria de conversar com a equipe sobre o curso "Dominando o ChatGPT".',
    
    // Google Analytics
    GA_ID: 'GA_XXXXXXXXXXXX',
    
    // Email para contato
    CONTACT_EMAIL: 'contato@mapadaia.com',
    
    // Informações da Empresa
    COMPANY_NAME: 'Mapa da IA',
    COURSE_NAME: 'Dominando o ChatGPT',
    
    // Cores Personalizadas (CSS)
    COLORS: {
        primary_dark: '#0a0e27',
        secondary_dark: '#0f1535',
        accent_cyan: '#00D9FF',
        accent_purple: '#7C3AED',
        accent_green: '#06FFA5',
        accent_red: '#FF1744'
    },
    
    // Configurações de Performance
    ENABLE_ANALYTICS: true,
    ENABLE_SERVICE_WORKER: false,
    ENABLE_PARALLAX: true,
    ANIMATION_DURATION: 300 // ms
};

// ========================================
// 2. PERSONALIZAR BOTÕES
// ========================================

/*
COMO MUDAR O TEXTO DOS BOTÕES:

1. Abra o arquivo index.html
2. Procure por:
   - "QUERO RESERVAR MINHA VAGA"
   - "QUERO CONVERSAR COM A EQUIPE PELO WHATSAPP"
3. Substitua pelos textos desejados

EXEMPLOS DE ALTERNATIVAS:

Botão Principal (CTA):
- "COMEÇAR AGORA"
- "QUERO INGRESSAR"
- "ACESSAR O CURSO"
- "GARANTIR MINHA VAGA"
- "COMPRAR AGORA"

Botão Secundário (WhatsApp):
- "FALAR COM CONSULTOR"
- "CONVERSAR AGORA"
- "TIRAR DÚVIDAS"
- "ENTRAR EM CONTATO"
*/

// ========================================
// 3. CORES E TEMAS
// ========================================

/*
PALETA DE CORES SUGERIDAS:

TEMA ORIGINAL (Recomendado para IA):
- Primário: #00D9FF (Ciano Neon)
- Secundário: #7C3AED (Roxo)
- Destaque: #06FFA5 (Verde)

TEMA ALTERNATIVO 1 (Tech Moderno):
- Primário: #0066FF (Azul Tech)
- Secundário: #FF00FF (Magenta)
- Destaque: #00FF88 (Verde Tech)

TEMA ALTERNATIVO 2 (Premium):
- Primário: #FFD700 (Ouro)
- Secundário: #FF6B6B (Coral)
- Destaque: #4ECDC4 (Turquesa)

COMO APLICAR:
1. Abra styles.css
2. Localize :root { ... }
3. Altere os valores de --accent-cyan, --accent-purple, --accent-green
4. A página inteira será atualizada automaticamente
*/

// ========================================
// 4. MODIFICAR TEXTOS PRINCIPAIS
// ========================================

const TEXTS = {
    hero: {
        title: "DOMINE O CHATGPT E TRANSFORME SUA REALIDADE",
        subtitle: "Domine a inteligência artificial e se torne o mestre dos prompts, facilitando sua vida e transformando sua realidade em todos os aspectos."
    },
    
    video_placeholder: "Assista ao vídeo e descubra como dominar o ChatGPT pode mudar sua forma de trabalhar, criar e ganhar dinheiro.",
    
    security_text: "✓ Comece mesmo que você ainda não entenda nada de inteligência artificial.",
    
    about: {
        title: "Isso não é apenas um curso sobre tecnologia. É um treinamento para você assumir o controle da nova era.",
        intro: "O Dominando o ChatGPT foi criado para pessoas comuns que querem parar de se sentir perdidas diante da inteligência artificial..."
    },
    
    benefits_title: "O que você vai conseguir fazer depois do curso",
    
    modules_title: "O que você vai aprender",
    
    final_title: "Você pode continuar tentando descobrir sozinho… ou pode aprender o caminho certo agora."
};

// ========================================
// 5. ADICIONAR GOOGLE ANALYTICS
// ========================================

/*
PASSO 1: Obter seu Google Analytics ID
- Vá para: https://analytics.google.com
- Crie uma propriedade
- Copie seu ID (GA_XXXXXXXXXXXX)

PASSO 2: Adicionar ao index.html (após </head>):

<script async src="https://www.googletagmanager.com/gtag/js?id=GA_XXXXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_XXXXXXXXXXXX');
</script>

PASSO 3: Verificar no Google Analytics Console
- Aguarde 24-48h para dados aparecerem
*/

// ========================================
// 6. CRIAR EVENTOS PERSONALIZADOS
// ========================================

/*
EXEMPLO: Rastrear quando usuário chega em uma seção específica

// No script.js, adicione:
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_viewed', {
                section: entry.target.id,
                timestamp: new Date()
            });
        }
    });
}, observerOptions);

// Depois, adicione IDs às seções e observar:
// <section id="beneficios" class="benefits">...

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
*/

// ========================================
// 7. CUSTOMIZAR CORES COM JAVASCRIPT
// ========================================

function changeTheme(theme) {
    const root = document.documentElement;
    
    const themes = {
        default: {
            '--accent-cyan': '#00D9FF',
            '--accent-purple': '#7C3AED',
            '--accent-green': '#06FFA5'
        },
        tech: {
            '--accent-cyan': '#0066FF',
            '--accent-purple': '#FF00FF',
            '--accent-green': '#00FF88'
        },
        premium: {
            '--accent-cyan': '#FFD700',
            '--accent-purple': '#FF6B6B',
            '--accent-green': '#4ECDC4'
        }
    };
    
    if (themes[theme]) {
        Object.entries(themes[theme]).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }
}

// Usar: changeTheme('tech') ou changeTheme('premium')

// ========================================
// 8. ADICIONAR VÍDEO REAL
// ========================================

/*
PARA ADICIONAR UM VÍDEO REAL:

OPÇÃO 1: YouTube/Vimeo (Recomendado)
Substitua no index.html o div .video-placeholder por:

<div class="video-container">
    <iframe class="video-iframe"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Dominando o ChatGPT"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>

OPÇÃO 2: Vídeo Hospedado
<video width="100%" height="auto" controls>
    <source src="seu-video.mp4" type="video/mp4">
    Seu navegador não suporta vídeos HTML5
</video>

OPÇÃO 3: Com Miniatura e Play Button
Manter o placeholder com JavaScript para ativar quando clicar
*/

function setupVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (!videoPlaceholder) return;
    
    videoPlaceholder.addEventListener('click', () => {
        // Aqui vai o código para ativar o vídeo real
        console.log('Vídeo clicado');
        // window.location.href = 'https://youtube.com/...';
    });
}

// ========================================
// 9. FORMULÁRIO DE CAPTURA DE LEADS
// ========================================

/*
PARA ADICIONAR UM FORMULÁRIO:

Adicione este HTML no final da seção HERO:

<form class="lead-form" id="leadForm">
    <input type="text" placeholder="Seu Nome" required>
    <input type="email" placeholder="Seu Email" required>
    <button type="submit">ENVIAR</button>
</form>

Adicione este CSS:

.lead-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
    margin: 30px auto;
}

.lead-form input {
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: white;
    font-size: 14px;
}

.lead-form input::placeholder {
    color: var(--text-secondary);
}

.lead-form button {
    padding: 12px;
    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-green));
    border: none;
    border-radius: 8px;
    color: var(--primary-dark);
    font-weight: 700;
    cursor: pointer;
}
*/

// ========================================
// 10. INTEGRAÇÃO COM FERRAMENTAS
// ========================================

/*
MAILCHIMP (Newsletter):
1. Vá para: https://mailchimp.com
2. Crie uma lista
3. Adicione o formulário ao HTML
4. Configure webhook se necessário

ZAPIER (Automação):
1. Crie um Zap
2. Trigger: Form submission
3. Action: Adicionar a banco de dados, enviar email, etc.

STRIPE/HOTMART (Pagamentos):
1. Configure sua conta
2. Adicione o link de checkout
3. Configure webhooks para confirmação

FACEBOOK PIXEL (Retargeting):
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // ... adicionar seu código
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
</script>
*/

// ========================================
// 11. OTIMIZAR PARA CONVERSÃO
// ========================================

const CONVERSION_TIPS = `
1. TESTE A/B:
   - Teste 2 versões de Headlines
   - Teste 2 cores de botões
   - Compare resultados

2. URGÊNCIA E ESCASSEZ:
   - Adicione contador "Apenas 10 vagas restantes"
   - Mostre prazo de oferta
   - Use cores quentes para CTA

3. PROVA SOCIAL:
   - Adicione depoimentos
   - Mostre número de alunos
   - Exiba certificações

4. CLAREZA:
   - Headline deve ser cristalino
   - Benefícios devem ser óbvios
   - CTA deve ser super claro

5. VELOCIDADE:
   - Otimize imagens
   - Use CDN para servir assets
   - Minimize CSS/JS

6. MOBILE-FIRST:
   - Teste em vários phones
   - Botões >= 48px
   - Textos legíveis sem zoom

7. SEGURANÇA:
   - HTTPS é obrigatório
   - Mostre selos de confiança
   - Privacy policy clara
`;

// ========================================
// 12. MONITORAR PERFORMANCE
// ========================================

function checkPerformance() {
    // Registrar métrica de carregamento
    if (window.performance) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const contentLoadTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log(`
                ⏱️ PERFORMANCE METRICS:
                - Page Load Time: ${pageLoadTime}ms
                - DOM Content Loaded: ${contentLoadTime}ms
                - Target: < 3000ms
                - Status: ${pageLoadTime < 3000 ? '✅' : '❌'}
            `);
        });
    }
}

checkPerformance();

// ========================================
// 13. CHECKLIST DE LANÇAMENTO
// ========================================

const LAUNCH_CHECKLIST = `
PRÉ-LANÇAMENTO:
☐ Personalizar todos os textos
☐ Adicionar logos reais
☐ Configurar links de checkout e WhatsApp
☐ Testar em mobile (iPhone, Android)
☐ Testar em desktop (Chrome, Firefox, Safari, Edge)
☐ Verificar velocidade de carregamento
☐ Configurar Google Analytics
☐ Configurar Google Search Console
☐ Configurar SSL/HTTPS
☐ Fazer backup
☐ Testar formulário (se houver)
☐ Testar links externos
☐ Revisar ortografia e gramática
☐ Revisar hierarquia visual
☐ Verificar acessibilidade (Tab navigation)

APÓS LANÇAMENTO:
☐ Monitorar conversões por hora
☐ Verificar erros no console
☐ Monitorar Google Analytics
☐ Responder mensagens WhatsApp
☐ Coletar feedback
☐ Fazer otimizações baseado em dados
☐ Preparar versão 2.0 melhorada
`;

// ========================================
// 14. FÓRMULAS PARA COPYWRITING
// ========================================

/*
HEADLINES EFICAZES:

1. CURIOSIDADE:
   "Descubra como [BENEFÍCIO] sem [OBJEÇÃO]"
   Ex: "Descubra como dominar ChatGPT sem ser programador"

2. PROMESSA:
   "[Número] Formas de [BENEFÍCIO]"
   Ex: "5 Formas de Triplicar sua Produtividade com IA"

3. PROBLEMA/SOLUÇÃO:
   "Você quer [DESEJO] mas [OBSTÁCULO]? Aqui está como"
   Ex: "Você quer usar IA mas não sabe começar? Aqui está como"

4. COMANDO:
   "[VERBO] [RESULTADO] em [TEMPO]"
   Ex: "Domine ChatGPT em 30 dias"

5. QUESTIONAMENTO:
   "O que [RESULTADO] poderia fazer pela sua [ÁREA]?"
   Ex: "O que ganhar 10 horas por semana poderia fazer pelo seu negócio?"
*/

// ========================================
// 15. SCRIPTS DE TESTE
// ========================================

// Teste: Verificar se todos os links funcionam
function testAllLinks() {
    const links = document.querySelectorAll('a');
    console.log('🔗 Testando links...');
    
    links.forEach(link => {
        const href = link.href;
        if (href && !href.includes('javascript:')) {
            console.log(`✓ ${link.textContent.trim()}: ${href}`);
        }
    });
}

// Teste: Verificar performance de animações
function testAnimationPerformance() {
    console.log('⏱️ Testando performance de animações...');
    let frameCount = 0;
    
    const countFrames = () => {
        frameCount++;
        requestAnimationFrame(countFrames);
    };
    
    countFrames();
    
    setTimeout(() => {
        const fps = frameCount / 10;
        console.log(`Frame rate: ${fps.toFixed(1)} FPS`);
        console.log(`Status: ${fps > 50 ? '✅ Excelente' : fps > 30 ? '⚠️ Bom' : '❌ Ruim'}`);
    }, 10000);
}

// Teste: Verificar acessibilidade
function testAccessibility() {
    console.log('♿ Verificando acessibilidade...');
    
    // Verificar alt text em imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.alt) {
            console.warn(`⚠️ Imagem sem alt text: ${img.src}`);
        }
    });
    
    // Verificar labels em inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
            console.warn(`⚠️ Input sem label: ${input.name}`);
        }
    });
}

// Executar testes (descomentar quando necessário)
// testAllLinks();
// testAnimationPerformance();
// testAccessibility();

// ========================================
// FIM DO GUIA DE PERSONALIZAÇÃO
// ========================================

console.log('✅ Guia de Personalização Carregado com Sucesso!');
