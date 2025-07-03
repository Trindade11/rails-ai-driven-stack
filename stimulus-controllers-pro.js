// 🚀 Rails Moderno Pro - Stimulus Controllers Avançados
// Versão robusta com bibliotecas modernas e funcionalidades premium

class StimulusProFramework {
    constructor() {
        this.controllers = {};
        this.initialize();
    }

    register(name, controllerClass) {
        this.controllers[name] = controllerClass;
    }

    initialize() {
        this.setupAdvancedControllers();
        this.bindEvents();
    }

    setupAdvancedControllers() {
        // 🎨 Theme Controller Pro
        this.register('theme', class {
            constructor(element) {
                this.element = element;
                this.iconTarget = element.querySelector('[data-theme-target="icon"]');
                this.currentTheme = 'dark'; // Começamos no escuro
            }

            toggle() {
                const html = document.documentElement;
                const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                
                // Animação suave de transição
                document.body.style.transition = 'all 0.5s ease';
                html.setAttribute('data-bs-theme', newTheme);
                
                // Atualiza ícone com animação
                this.iconTarget.style.transform = 'scale(0)';
                setTimeout(() => {
                    this.iconTarget.className = newTheme === 'dark' ? 'bi bi-moon text-white' : 'bi bi-sun text-warning';
                    this.iconTarget.style.transform = 'scale(1)';
                }, 150);
                
                this.currentTheme = newTheme;
                this.showAdvancedNotification(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`, 'success');
            }

            showAdvancedNotification(message, type) {
                Swal.fire({
                    text: message,
                    icon: type,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#e0e6ed'
                });
            }
        });

        // 📊 Chart Controller Pro
        this.register('chart', class {
            constructor(element) {
                this.element = element;
                this.canvas = element.querySelector('[data-chart-target="canvas"]');
                this.chart = null;
                this.initAdvancedChart();
            }

            initAdvancedChart() {
                const ctx = this.canvas.getContext('2d');
                
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(102, 126, 234, 0.4)');
                gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
                
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                        datasets: [{
                            label: 'Usuários Ativos',
                            data: [65, 89, 80, 81, 95, 78, 92],
                            borderColor: '#667eea',
                            backgroundColor: gradient,
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true,
                            pointBackgroundColor: '#667eea',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(26, 26, 26, 0.9)',
                                titleColor: '#e0e6ed',
                                bodyColor: '#e0e6ed',
                                borderColor: '#667eea',
                                borderWidth: 1
                            }
                        },
                        scales: {
                            x: {
                                grid: { color: 'rgba(102, 126, 234, 0.1)' },
                                ticks: { color: '#8b949e' }
                            },
                            y: {
                                grid: { color: 'rgba(102, 126, 234, 0.1)' },
                                ticks: { color: '#8b949e' },
                                beginAtZero: true
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
            }

            refreshData() {
                // Animação de loading
                this.element.style.filter = 'blur(2px)';
                
                setTimeout(() => {
                    const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 100) + 20);
                    this.chart.data.datasets[0].data = newData;
                    this.chart.update('active');
                    this.element.style.filter = 'none';
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados!',
                        text: 'Gráfico atualizado com dados em tempo real',
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                        background: 'rgba(26, 26, 26, 0.95)',
                        color: '#e0e6ed'
                    });
                }, 1000);
            }

            exportData() {
                const data = this.chart.data.datasets[0].data;
                Swal.fire({
                    title: 'Exportar Dados',
                    text: `Dados: [${data.join(', ')}]`,
                    icon: 'info',
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#e0e6ed',
                    confirmButtonColor: '#667eea'
                });
            }
        });

        // 💬 Modal Controller Pro
        this.register('modal', class {
            constructor(element) {
                this.element = element;
                this.modal = new bootstrap.Modal(document.querySelector('#dynamicModal'));
                this.titleTarget = document.querySelector('[data-modal-target="title"]');
                this.bodyTarget = document.querySelector('[data-modal-target="body"]');
            }

            show(event) {
                const title = event.target.closest('[data-modal-title-param]').getAttribute('data-modal-title-param');
                
                this.titleTarget.textContent = title;
                
                // Loading avançado
                this.bodyTarget.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
                        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
                    </div>
                `;
                
                this.modal.show();
                
                setTimeout(() => {
                    this.bodyTarget.innerHTML = this.getAdvancedModalContent(title);
                    AOS.refresh(); // Reativa animações AOS
                }, 1500);
            }

            getAdvancedModalContent(title) {
                const contents = {
                    'Novo Usuário': `
                        <form data-aos="fade-up">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Nome Completo</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Digite o nome completo">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">E-mail</label>
                                    <input type="email" class="form-control form-control-lg" placeholder="Digite o e-mail">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Perfil</label>
                                    <select class="form-select form-select-lg">
                                        <option>👑 Administrador</option>
                                        <option>👤 Usuário</option>
                                        <option>👥 Convidado</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-semibold">Departamento</label>
                                    <select class="form-select form-select-lg">
                                        <option>💻 Tecnologia</option>
                                        <option>📊 Marketing</option>
                                        <option>💰 Financeiro</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    `,
                    'Gerar Relatório': `
                        <form data-aos="fade-up">
                            <div class="mb-4">
                                <label class="form-label fw-semibold">Tipo de Relatório</label>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <div class="card bg-primary bg-opacity-10 border-primary">
                                            <div class="card-body text-center">
                                                <i class="bi bi-people display-4"></i>
                                                <h6>Usuários</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="card bg-success bg-opacity-10 border-success">
                                            <div class="card-body text-center">
                                                <i class="bi bi-graph-up display-4"></i>
                                                <h6>Vendas</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="alert alert-info border-0" style="background: rgba(79, 172, 254, 0.1);">
                                <i class="bi bi-info-circle me-2"></i>
                                <strong>Tempo estimado:</strong> 2-3 minutos para geração completa
                            </div>
                        </form>
                    `
                };
                
                return contents[title] || '<p>Conteúdo carregado dinamicamente!</p>';
            }
        });

        // 🔢 Counter Controller Pro com CountUp.js
        this.register('counter', class {
            constructor(element) {
                this.element = element;
                this.valueTarget = element.querySelector('[data-counter-target="value"]');
                this.setupIntersectionObserver();
            }

            setupIntersectionObserver() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.startAdvancedAnimation();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(this.element);
            }

            startAdvancedAnimation() {
                const target = this.valueTarget.textContent;
                let finalValue, suffix = '';
                
                if (target.includes('%')) {
                    finalValue = parseInt(target);
                    suffix = '%';
                } else if (target.includes('R$')) {
                    finalValue = parseFloat(target.replace('R$ ', '').replace('K', ''));
                    suffix = 'K';
                } else {
                    finalValue = parseInt(target.replace(',', ''));
                }
                
                // Usar CountUp.js para animação profissional
                const countUp = new CountUp(this.valueTarget, 0, finalValue, 0, 2.5, {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: target.includes('R$') ? 'R$ ' : '',
                    suffix: suffix
                });
                
                if (!countUp.error) {
                    countUp.start();
                    // Adiciona efeito de brilho
                    this.element.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
                }
            }
        });

        // 📡 Live Updates Pro
        this.register('live-updates', class {
            constructor(element) {
                this.element = element;
                this.updateCount = 0;
                this.startLiveUpdates();
            }

            startLiveUpdates() {
                setInterval(() => {
                    this.addAdvancedUpdate();
                }, 4000);
            }

            addAdvancedUpdate() {
                const updates = [
                    { type: 'success', icon: 'bi-check-circle', text: 'Novo usuário registrado com sucesso' },
                    { type: 'info', icon: 'bi-graph-up', text: 'Relatório de vendas gerado automaticamente' },
                    { type: 'warning', icon: 'bi-shield-check', text: 'Backup de segurança concluído' },
                    { type: 'success', icon: 'bi-speedometer2', text: 'Performance do sistema: 99.9%' },
                    { type: 'info', icon: 'bi-bell', text: '12 novos pedidos processados' }
                ];
                
                const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
                const timestamp = new Date().toLocaleTimeString('pt-BR');
                
                const updateElement = document.createElement('div');
                updateElement.className = `alert alert-${randomUpdate.type} border-0 mb-2 fade show`;
                updateElement.style.background = `rgba(${this.getColorRgb(randomUpdate.type)}, 0.1)`;
                updateElement.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <small class="text-muted d-block">${timestamp}</small>
                            <i class="${randomUpdate.icon} me-2"></i>${randomUpdate.text}
                        </div>
                        <button class="btn btn-sm btn-outline-secondary opacity-50" onclick="this.parentElement.parentElement.remove()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                `;
                
                // Animação de entrada
                updateElement.style.transform = 'translateX(100%)';
                updateElement.style.transition = 'all 0.5s ease';
                
                this.element.appendChild(updateElement);
                
                setTimeout(() => {
                    updateElement.style.transform = 'translateX(0)';
                }, 100);
                
                // Remove updates antigos
                const updates_list = this.element.querySelectorAll('.alert');
                if (updates_list.length > 4) {
                    const oldUpdate = updates_list[0];
                    oldUpdate.style.transform = 'translateX(-100%)';
                    setTimeout(() => oldUpdate.remove(), 500);
                }
            }

            getColorRgb(type) {
                const colors = {
                    'success': '25, 135, 84',
                    'info': '79, 172, 254',
                    'warning': '255, 193, 7'
                };
                return colors[type] || '79, 172, 254';
            }
        });

        // 🚀 Hero Controller Pro
        this.register('hero', class {
            constructor(element) {
                this.element = element;
            }

            showDemo() {
                const button = this.element;
                const originalText = button.innerHTML;
                
                // Animação de loading avançada
                button.innerHTML = '<div class="spinner-border spinner-border-sm me-2"></div>Iniciando Demo...';
                button.disabled = true;
                button.classList.add('loading-shimmer');
                
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Demo Ativo!';
                    button.className = 'btn btn-success btn-lg px-4 py-3 glow';
                    
                    this.triggerAdvancedDemo();
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.className = 'btn btn-light btn-lg px-4 py-3 glow';
                        button.classList.remove('loading-shimmer');
                        button.disabled = false;
                    }, 4000);
                }, 2000);
            }

            showFeatures() {
                Swal.fire({
                    title: '🚀 Features da Stack Rails Pro',
                    html: `
                        <div class="text-start">
                            <ul style="list-style: none; padding: 0;">
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Tema escuro moderno</li>
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Animações com AOS e Particles.js</li>
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Charts avançados com Chart.js</li>
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Modais premium com SweetAlert2</li>
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Contadores animados com CountUp.js</li>
                                <li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i> Live updates em tempo real</li>
                            </ul>
                        </div>
                    `,
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#e0e6ed',
                    confirmButtonColor: '#667eea',
                    width: '600px'
                });
            }

            triggerAdvancedDemo() {
                // Dispara múltiplas ações em sequência
                setTimeout(() => {
                    document.querySelector('[data-controller="chart"]').querySelector('[data-action*="refreshData"]').click();
                }, 500);
                
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Demo Ativado!',
                        text: 'Todas as funcionalidades estão sendo demonstradas',
                        position: 'center',
                        showConfirmButton: false,
                        timer: 3000,
                        background: 'rgba(26, 26, 26, 0.95)',
                        color: '#e0e6ed'
                    });
                }, 1000);
            }
        });

        // 🔔 Notification Controller Pro
        this.register('notification', class {
            constructor(element) {
                this.element = element;
            }

            show() {
                const messages = [
                    { type: 'success', title: 'Sistema Atualizado', text: '3 novas funcionalidades disponíveis' },
                    { type: 'info', title: 'Backup Automático', text: 'Próximo backup em 2 horas' },
                    { type: 'warning', title: 'Manutenção', text: 'Manutenção programada para amanhã às 2h' }
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                
                Swal.fire({
                    icon: randomMessage.type,
                    title: randomMessage.title,
                    text: randomMessage.text,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    toast: true,
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#e0e6ed'
                });
            }
        });

        // ⚡ Turbo Demo Pro
        this.register('turbo-demo', class {
            constructor(element) {
                this.element = element;
            }

            loadContent() {
                const button = this.element;
                const originalText = button.innerHTML;
                
                button.innerHTML = '<div class="spinner-border spinner-border-sm me-2"></div>Carregando via Turbo...';
                button.disabled = true;
                
                setTimeout(() => {
                    const container = document.querySelector('.container').parentElement;
                    const newSection = document.createElement('section');
                    newSection.className = 'py-4';
                    newSection.innerHTML = `
                        <div class="container">
                            <div class="alert alert-warning border-0 fade show" data-aos="fade-up" style="background: rgba(255, 193, 7, 0.1);">
                                <h4><i class="bi bi-lightning me-2"></i>Conteúdo Turbo Carregado!</h4>
                                <p class="mb-2">Este conteúdo foi carregado dinamicamente, simulando Turbo Frames do Rails.</p>
                                <small class="text-muted">Em produção: dados viriam do servidor automaticamente via AJAX.</small>
                                <button class="btn btn-sm btn-outline-warning mt-2" onclick="this.closest('section').remove()">
                                    <i class="bi bi-x"></i> Remover
                                </button>
                            </div>
                        </div>
                    `;
                    
                    container.appendChild(newSection);
                    AOS.refresh();
                    
                    button.innerHTML = '<i class="bi bi-check me-2"></i>Carregado!';
                    button.className = 'btn btn-success d-flex align-items-center justify-content-between';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.className = 'btn btn-warning d-flex align-items-center justify-content-between';
                        button.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });

        // 📊 Advanced Demo Controller
        this.register('advanced-demo', class {
            constructor(element) {
                this.element = element;
            }

            showAnalytics() {
                Swal.fire({
                    title: '📊 Analytics Avançado',
                    html: `
                        <div class="row text-center">
                            <div class="col-4">
                                <h3 class="text-primary">1.2M</h3>
                                <small>Page Views</small>
                            </div>
                            <div class="col-4">
                                <h3 class="text-success">89%</h3>
                                <small>Conversion</small>
                            </div>
                            <div class="col-4">
                                <h3 class="text-warning">2.4s</h3>
                                <small>Load Time</small>
                            </div>
                        </div>
                    `,
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#e0e6ed',
                    confirmButtonColor: '#667eea',
                    showCancelButton: true,
                    confirmButtonText: 'Ver Detalhes',
                    cancelButtonText: 'Fechar'
                });
            }
        });
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            Object.keys(this.controllers).forEach(controllerName => {
                const elements = document.querySelectorAll(`[data-controller*="${controllerName}"]`);
                elements.forEach(element => {
                    const controller = new this.controllers[controllerName](element);
                    
                    const actions = element.querySelectorAll(`[data-action*="${controllerName}#"]`);
                    actions.forEach(actionElement => {
                        const actionAttr = actionElement.getAttribute('data-action');
                        const matches = actionAttr.match(new RegExp(`(\\w+)->${controllerName}#(\\w+)`));
                        
                        if (matches) {
                            const [, event, method] = matches;
                            actionElement.addEventListener(event, (e) => {
                                if (controller[method]) {
                                    controller[method](e);
                                }
                            });
                        }
                    });
                });
            });
        });
    }
}

// Inicializa o framework
const stimulusProFramework = new StimulusProFramework();

// Log para debug
console.log('🚀 Rails Moderno Pro - Stimulus Controllers carregados com sucesso!'); 