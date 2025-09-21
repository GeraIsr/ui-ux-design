document.addEventListener('DOMContentLoaded', function() {
    initContentPage();
    
    initModalSupport();
    
    initInteractiveDemos();
    
    setupSmoothScrolling();
    
    animatePageLoad();
});

function initContentPage() {
    console.log('Content page initialized');
    
    const backLink = document.querySelector('.back-link a');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.transition = 'all 0.3s ease';
            document.body.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 150);
        });
    }
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 200);
    }
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const allLinks = document.querySelectorAll('a[href^="#"]');
                allLinks.forEach(l => l.classList.remove('active-link'));
                this.classList.add('active-link');
                
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                target.style.opacity = '0';
                target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    target.style.transition = 'all 0.6s ease';
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
}

function initModalSupport() {
    const modal = document.getElementById('modal');
    if (modal) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        modal.addEventListener('transitionend', function(e) {
            if (modal.classList.contains('hidden')) {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'flex';
            }
        });
    }
}

function initInteractiveDemos() {
    const buttonDemos = document.querySelectorAll('.button-demo, .demo-button');
    buttonDemos.forEach(btn => {
        if (!btn.hasAttribute('data-demo-init')) {
            btn.setAttribute('data-demo-init', 'true');
            
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                
                createRippleEffect(e, this);
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                }, 150);
            });
            
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            });
        }
    });
    
    const inputDemos = document.querySelectorAll('.input-demo input, .search-bar');
    inputDemos.forEach(input => {
        if (!input.hasAttribute('data-demo-init')) {
            input.setAttribute('data-demo-init', 'true');
            
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.boxShadow = 'none';
            });
            
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.background = 'white';
                    this.style.color = '#333';
                } else {
                    this.style.background = '#f8f9fa';
                    this.style.color = '#666';
                }
            });
        }
    });
    
    const iconDemos = document.querySelectorAll('.icon-demo');
    iconDemos.forEach(icon => {
        if (!icon.hasAttribute('data-demo-init')) {
            icon.setAttribute('data-demo-init', 'true');
            
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                this.style.filter = 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'none';
            });
            
            icon.addEventListener('click', function() {
                this.style.transform = 'scale(0.9) rotate(180deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotate(360deg)';
                }, 200);
            });
        }
    });
    
    const progressContainers = document.querySelectorAll('.progress-demo, .progress-container');
    progressContainers.forEach(container => {
        const progressBar = container.querySelector('.progress-bar');
        if (progressBar && !progressBar.hasAttribute('data-demo-init')) {
            progressBar.setAttribute('data-demo-init', 'true');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBar(progressBar, 80);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(container);
        }
    });
}

function animateProgressBar(bar, targetPercent) {
    let startPercent = 0;
    const increment = targetPercent / 50;
    let currentPercent = 0;
    
    const timer = setInterval(() => {
        currentPercent += increment;
        if (currentPercent >= targetPercent) {
            currentPercent = targetPercent;
            clearInterval(timer);
        }
        
        bar.style.width = currentPercent + '%';
        bar.style.opacity = '1';
        
        const container = bar.parentElement;
        if (container.querySelector('.progress-text')) {
            container.querySelector('.progress-text').textContent = Math.round(currentPercent) + '%';
        }
    }, 20);
}

function createRippleEffect(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

function animatePageLoad() {
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        setTimeout(() => {
            step.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        setTimeout(() => {
            card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100 + (index * 150));
    });
    
    const sidebarElements = document.querySelectorAll('.sidebar > div');
    sidebarElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        setTimeout(() => {
            element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 700 + (index * 200));
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 300);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll([
        'section:not(.hero-section)',
        '.method-card',
        '.step',
        '.stat-card',
        '.resource',
        '.myth',
        '.stage',
        '.example-pair',
        '.emotion',
        '.ui-element'
    ].join(', '));
    
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

function initCopyFunctionality() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((code, index) => {
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋 Kopieren';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(76, 175, 80, 0.8);
            color: white;
            border: none;
            border-radius: 20px;
            padding: 6px 12px;
            font-size: 0.8em;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
        `;
        
        const pre = code.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        copyBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.background = 'rgba(76, 175, 80, 1)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '0';
            this.style.background = 'rgba(76, 175, 80, 0.8)';
        });
        
        copyBtn.addEventListener('click', function() {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                this.innerHTML = '✓ Kopiert!';
                this.style.background = 'rgba(76, 175, 80, 1)';
                setTimeout(() => {
                    this.innerHTML = '📋 Kopieren';
                }, 2000);
            }).catch(err => {
                console.error('Copy failed:', err);
                this.innerHTML = '❌ Fehler';
                setTimeout(() => {
                    this.innerHTML = '📋 Kopieren';
                }, 2000);
            });
        });
    });
}

function initAllFeatures() {
    initScrollAnimations();
    initCopyFunctionality();
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.method-card, .step').forEach(el => {
                el.style.transitionDuration = '0.4s';
            });
        }
    });
    
    setupScrollProgress();
}

function setupScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.id = 'scroll-progress';
    progressContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #4caf50, #45a049);
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 1px 5px rgba(76, 175, 80, 0.5);
    `;
    document.body.appendChild(progressContainer);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressContainer.style.width = scrollPercent + '%';
    });
}

function fixSidebarPosition() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const contentGrid = document.querySelector('.content-grid');
    
    if (window.innerWidth >= 1025 && sidebar && mainContent && contentGrid) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const mainRect = mainContent.getBoundingClientRect();
        
        if (sidebarRect.right > mainRect.right) {
            mainContent.classList.add('sidebar-overlap-fix');
        } else {
            mainContent.classList.remove('sidebar-overlap-fix');
        }
    }
}

window.addEventListener('resize', function() {
    fixSidebarPosition();
});

document.addEventListener('DOMContentLoaded', function() {
    fixSidebarPosition();
    
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-overlap-fix {
            padding-right: 60px !important;
            margin-right: -20px !important;
        }
        
        @media (max-width: 1024px) {
            .sidebar-overlap-fix {
                padding-right: 25px !important;
                margin-right: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// ИСПРАВЛЕНИЕ: Принудительное центрирование заголовков
function fixHeaderTitles() {
    const headers = document.querySelectorAll('header h1');
    headers.forEach(h1 => {
        // Убираем inline стили, которые могут мешать
        h1.removeAttribute('style');
        
        // Принудительно устанавливаем стили
        h1.style.textAlign = 'center';
        h1.style.margin = '0 auto 15px auto';
        h1.style.display = 'block';
        h1.style.width = '100%';
        h1.style.position = 'relative';
        h1.style.left = '0';
        h1.style.right = '0';
        h1.style.padding = '0';
        h1.style.transform = 'none';
        
        // Проверяем родительские элементы
        const parent = h1.parentElement;
        if (parent) {
            parent.style.textAlign = 'center';
            parent.style.width = '100%';
        }
        
        // Убираем float и display свойства
        h1.style.float = 'none';
        h1.style.clear = 'both';
    });
}

// Запускаем при загрузке и изменении размера
document.addEventListener('DOMContentLoaded', function() {
    fixHeaderTitles();
});

window.addEventListener('resize', function() {
    fixHeaderTitles();
});

// Также запускаем после небольшой задержки для динамически загружаемого контента
setTimeout(fixHeaderTitles, 100);

// Экспортируем функцию
window.fixHeaderTitles = fixHeaderTitles;

window.initContentPage = initContentPage;
window.setupSmoothScrolling = setupSmoothScrolling;
window.initModalSupport = initModalSupport;
window.initInteractiveDemos = initInteractiveDemos;
window.animateProgressBar = animateProgressBar;
window.createRippleEffect = createRippleEffect;
window.animatePageLoad = animatePageLoad;
window.closeModal = closeModal;
window.initScrollAnimations = initScrollAnimations;
window.initCopyFunctionality = initCopyFunctionality;
window.initAllFeatures = initAllFeatures;
window.setupScrollProgress = setupScrollProgress;

initAllFeatures();