function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach((card, index) => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 300);
        }
    });
}


function subscribeNewsletter() {
    const email = document.getElementById('emailInput').value.trim();
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    
    if (!email) {
        showModalError('Bitte geben Sie eine E-Mail-Adresse ein.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showModalError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
    }
    
    showModalLoading('Registrierung wird verarbeitet...');
    
    setTimeout(() => {
        showModalSuccess(`Vielen Dank, ${email.split('@')[0]}! Sie sind jetzt für alle UI/UX-Updates angemeldet.`);
        document.getElementById('emailInput').value = '';
    }, 1500);
}

function showModalError(message) {
    const modal = document.getElementById('modal');
    const messageDiv = document.getElementById('modal-message');
    
    messageDiv.innerHTML = `
        <div class="modal-error">
            <h3>⚠️ Fehler</h3>
            <p>${message}</p>
            <button onclick="closeModal()" class="modal-btn error-btn">Versuchen Sie es erneut</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function showModalSuccess(message) {
    const modal = document.getElementById('modal');
    const messageDiv = document.getElementById('modal-message');
    
    messageDiv.innerHTML = `
        <div class="modal-success">
            <h3>🎉 Erfolg!</h3>
            <p>${message}</p>
            <p style="font-size: 0.9em; opacity: 0.8; margin-top: 10px;">Sie erhalten in Kürze eine Bestätigungs-E-Mail.</p>
            <button onclick="closeModal()" class="modal-btn success-btn">Schließen</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function showModalLoading(message) {
    const modal = document.getElementById('modal');
    const messageDiv = document.getElementById('modal-message');
    
    messageDiv.innerHTML = `
        <div class="modal-loading">
            <div class="spinner"></div>
            <h3>${message}</h3>
            <p>Das dauert nur einen Moment...</p>
        </div>
    `;
    modal.classList.remove('hidden');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

function toggleTheme() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    const themeBtn = document.querySelector('.theme-toggle');
    if (isLight) {
        themeBtn.innerHTML = '☀️';
    } else {
        themeBtn.innerHTML = '🌙';
    }
}

function showStatModal() {
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    
    message.innerHTML = `
        <div class="modal-info">
            <h3>📊 Wichtige Design-Statistiken</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>53% der Nutzer verlassen Seiten nach 3s Ladezeit</li>
                <li>94% der ersten Eindrücke sind designbedingt</li>
                <li>70% der Nutzerverluste durch schlechte UX</li>
                <li>400% mehr Zeit bei gutem Design</li>
                <li>1s Verzögerung = 7% Umsatzverlust</li>
            </ul>
            <button onclick="closeModal()" class="modal-btn">Verstanden</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function showMobileStats() {
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    
    message.innerHTML = `
        <div class="modal-info">
            <h3>📱 Mobile-UX-Statistiken</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>60% aller Internet-Nutzung ist mobil</li>
                <li>53% verlasen Apps nach schlechter Erfahrung</li>
                <li>94% der Smartphone-Nutzer multitasken</li>
                <li>3x höhere Verlassenrate auf Mobile</li>
                <li>70% erwarten Ladezeit unter 2 Sekunden</li>
            </ul>
            <button onclick="closeModal()" class="modal-btn">Schließen</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function showProjectIdeas() {
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    
    message.innerHTML = `
        <div class="modal-info">
            <h3>💡 Projekt-Ideen für Anfänger</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li><strong>App-Redesign:</strong> Verbessern Sie eine bestehende App</li>
                <li><strong>Fiktive App:</strong> Designen Sie eine Todo-List App</li>
                <li><strong>E-Commerce:</strong> Erstellen Sie einen Online-Shop</li>
                <li><strong>Landing Page:</strong> Designen Sie eine Produktseite</li>
                <li><strong>Dashboard:</strong> Erstellen Sie ein Admin-Panel</li>
            </ul>
            <p style="font-size: 0.9em; opacity: 0.8; margin-top: 15px;">
                Tipp: Dokumentieren Sie Ihren Design-Prozess!
            </p>
            <button onclick="closeModal()" class="modal-btn">Ideen speichern</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function showChecklist() {
    const modal = document.getElementById('modal');
    const message = document.getElementById('modal-message');
    
    message.innerHTML = `
        <div class="modal-info">
            <h3>📋 10-Punkte Design-Checkliste</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto; line-height: 1.6;">
                <li>☐ Ziel in 5 Sekunden erkennbar?</li>
                <li>☐ Maximal 3 Klicks zum Ziel?</li>
                <li>☐ Konsistente Farbgebung?</li>
                <li>☐ Lesbare Schriftgröße (16px+)?</li>
                <li>☐ Große Touch-Targets (44px)?</li>
                <li>☐ Klare visuelle Hierarchie?</li>
                <li>☐ Sofortiges Feedback bei Klicks?</li>
                <li>☐ Mobile-optimiert?</li>
                <li>☐ Barrierefrei (Kontrast 4.5:1)?</li>
                <li>☐ Logische Navigation?</li>
            </ul>
            <button onclick="closeModal()" class="modal-btn">Checkliste speichern</button>
        </div>
    `;
    modal.classList.remove('hidden');
}

function initPageAnimations() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll('section, .method-card, .step, .stat-card, .resource, .myth, .stage, .example-pair');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    const buttons = document.querySelectorAll('.method-card, .step, .card-link, .download-btn, .modal-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    initUIDemos();
}

function initUIDemos() {
    const buttonDemos = document.querySelectorAll('.button-demo');
    buttonDemos.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#45a049';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#4caf50';
            }, 150);
        });

        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    const progressDemos = document.querySelectorAll('.progress-bar');
    progressDemos.forEach(bar => {
        let progress = 0;
        const interval = setInterval(() => {
            if (progress <= 80) {
                progress += 2;
                bar.style.width = progress + '%';
                bar.style.backgroundColor = '#4caf50';
            } else {
                clearInterval(interval);
            }
        }, 50);
    });

    const menuDemos = document.querySelectorAll('.menu-demo');
    menuDemos.forEach(menu => {
        menu.addEventListener('click', function() {
            this.style.transform = 'rotate(90deg) scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 200);
        });
    });

    const cardDemos = document.querySelectorAll('.card-demo');
    cardDemos.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(5deg) translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0) translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
    
    const header = document.querySelector('header');
    if (header && !document.querySelector('.theme-toggle')) {
        const themeBtn = document.createElement('button');
        themeBtn.innerHTML = document.body.classList.contains('light') ? '☀️' : '🌙';
        themeBtn.className = 'theme-toggle';
        themeBtn.onclick = toggleTheme;
        themeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            color: white;
            font-size: 1.2em;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 100;
        `;
        
        themeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.3)';
            this.style.transform = 'scale(1.1)';
        });
        
        themeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'scale(1)';
        });
        
        header.appendChild(themeBtn);
    }
    
    initPageAnimations();
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        emailInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
    
    const mainCards = document.querySelectorAll('.cards-container .card');
    mainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn, index) => {
        btn.style.transitionDelay = `${index * 0.05}s`;
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const subscribeBtn = document.querySelector('.subscribe-container button');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        subscribeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4caf50;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        .modal-error h3,
        .modal-success h3 {
            margin-bottom: 15px;
        }
        
        .modal-loading {
            text-align: center;
        }
        
        .modal-info {
            text-align: center;
            max-width: 500px;
        }
        
        .modal-info ul {
            text-align: left;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #4caf50;
        }
        
        .modal-info li {
            margin-bottom: 8px;
            padding-left: 15px;
            position: relative;
        }
        
        .modal-info li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4caf50;
            font-weight: bold;
        }
        
        .modal-btn {
            padding: 12px 24px;
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
            transition: all 0.3s ease;
        }
        
        .modal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        
        .error-btn {
            background: linear-gradient(135deg, #f44336, #d32f2f);
        }
        
        .error-btn:hover {
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
        }
        
        .success-btn {
            background: linear-gradient(135deg, #4caf50, #45a049);
        }
        
        .card.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .method-card.animated,
        .step.animated {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        .ui-element {
            text-align: center;
            margin: 20px 0;
        }
        
        .element-demo {
            margin: 15px auto;
            display: inline-block;
        }
        
        .button-demo {
            background: #4caf50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .input-demo input {
            padding: 12px 16px;
            border: 2px solid #ddd;
            border-radius: 25px;
            width: 200px;
            text-align: center;
            font-size: 14px;
        }
        
        .input-demo input:focus {
            outline: none;
            border-color: #4caf50;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        .icon-demo {
            font-size: 3em;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            margin: 10px;
            transition: all 0.3s ease;
        }
        
        .icon-demo:hover {
            transform: scale(1.1);
            background: #4caf50;
            color: white;
        }
        
        .progress-demo {
            width: 200px;
            height: 20px;
            background: #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px auto;
        }
        
        .progress-bar {
            height: 100%;
            background: #4caf50;
            width: 0%;
            transition: width 0.3s ease;
        }
        
        /* Responsive animations */
        @media (max-width: 768px) {
            .card {
                animation-duration: 0.4s;
            }
            
            .method-card,
            .step {
                animation-duration: 0.3s;
            }
        }
    `;
    document.head.appendChild(style);
});

window.filterCards = filterCards;
window.subscribeNewsletter = subscribeNewsletter;
window.closeModal = closeModal;
window.toggleTheme = toggleTheme;
window.initPageAnimations = initPageAnimations;
window.showStatModal = showStatModal;
window.showMobileStats = showMobileStats;
window.showProjectIdeas = showProjectIdeas;
window.showChecklist = showChecklist;