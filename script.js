// Configuration
const defaultConfig = {
    hero_title: 'Smart Document Automation',
    hero_subtitle: 'Find and replace words across multiple files instantly. Catch typos, maintain consistency, and automate your document workflow with precision.',
    cta_button_text: 'Start Free Trial',
    features_title: 'Powerful Features',
    background_color: '#1a1a1a',
    primary_color: '#d60000',
    text_color: '#ffffff',
    accent_color: '#ff1a1a',
    secondary_color: '#0d0d0d',
    font_family: 'Plus Jakarta Sans',
    font_size: 16
};

// Handle Configuration Changes
async function onConfigChange(config) {
    const heroTitle = document.querySelector('h1');
    const heroSubtitle = document.querySelector('.max-w-3xl.mx-auto');
    const ctaButton = document.querySelector('.btn-primary');
    const featuresTitle = document.getElementById('features-title') || document.querySelectorAll('h2')[1];

    if (heroTitle) {
        heroTitle.innerHTML = `
            <span class="text-white">Smart Document</span><br>
            <span class="text-red-600">${config.hero_title || defaultConfig.hero_title}</span>
        `;
    }

    if (heroSubtitle) {
        heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    }

    if (ctaButton) {
        ctaButton.innerHTML = `
            <span>${config.cta_button_text || defaultConfig.cta_button_text}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        `;
    }

    // Apply Colors
    document.body.style.setProperty('--bg-color', config.background_color || defaultConfig.background_color);
    document.body.style.setProperty('--primary-color', config.primary_color || defaultConfig.primary_color);
    document.body.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);

    // Apply Font
    const customFont = config.font_family || defaultConfig.font_family;
    document.body.style.fontFamily = `${customFont}, sans-serif`;

    // Apply Font Size
    const baseSize = config.font_size || defaultConfig.font_size;
    document.documentElement.style.fontSize = `${baseSize}px`;
}

// Map Configuration to Capabilities
function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    updateGradientBg(value);
                }
            },
            {
                get: () => config.secondary_color || defaultConfig.secondary_color,
                set: (value) => {
                    config.secondary_color = value;
                    updateSecondaryColor(value);
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    document.body.style.color = value;
                }
            },
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    config.primary_color = value;
                    updatePrimaryColor(value);
                }
            },
            {
                get: () => config.accent_color || defaultConfig.accent_color,
                set: (value) => {
                    config.accent_color = value;
                    updateAccentColor(value);
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                document.body.style.fontFamily = `${value}, sans-serif`;
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                document.documentElement.style.fontSize = `${value}px`;
            }
        }
    };
}

// Helper function to update gradient background
function updateGradientBg(color) {
    const style = document.createElement('style');
    style.innerHTML = `.gradient-bg { background: linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 50%, ${color} 100%); }`;
    document.head.appendChild(style);
}

// Helper function to update primary color
function updatePrimaryColor(color) {
    const style = document.createElement('style');
    style.innerHTML = `
        .btn-primary { background: linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, 20)} 100%); }
        .btn-primary:hover { box-shadow: 0 10px 40px ${adjustAlpha(color, 0.4)}; }
    `;
    document.head.appendChild(style);
}

// Helper function to update secondary color
function updateSecondaryColor(color) {
    const style = document.createElement('style');
    style.innerHTML = `.btn-secondary { border-color: ${adjustAlpha(color, 0.2)}; }`;
    document.head.appendChild(style);
}

// Helper function to update accent color
function updateAccentColor(color) {
    const style = document.createElement('style');
    style.innerHTML = `.text-gradient { background: linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, 20)} 100%); }`;
    document.head.appendChild(style);
}

// Utility: Adjust brightness
function adjustBrightness(color, percent) {
    const rgb = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (rgb >> 16) + percent));
    const g = Math.max(0, Math.min(255, ((rgb >> 8) & 0x00FF) + percent));
    const b = Math.max(0, Math.min(255, (rgb & 0x0000FF) + percent));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Utility: Adjust alpha
function adjustAlpha(color, alpha) {
    const rgb = parseInt(color.replace('#', ''), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Map Configuration to Edit Panel Values
function mapToEditPanelValues(config) {
    return new Map([
        ['hero_title', config.hero_title || defaultConfig.hero_title],
        ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
        ['cta_button_text', config.cta_button_text || defaultConfig.cta_button_text],
        ['features_title', config.features_title || defaultConfig.features_title]
    ]);
}

// Initialize SDK if available
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Smooth scroll on page load if hash exists
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }
});

// Add active nav link highlighting on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-red-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-red-400');
        }
    });
});

// Smooth scroll and active link highlighting are handled above.
// Placeholders removed to prevent interference with actual button functionality.

