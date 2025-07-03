// Simulação dos Controllers Stimulus para demonstrar a stack Rails moderna
// Em uma aplicação Rails real, isso seria gerado automaticamente pelo Stimulus

class StimulusLikeFramework {
    constructor() {
        this.controllers = {};
        this.initialize();
    }

    // Registra um controller
    register(name, controllerClass) {
        this.controllers[name] = controllerClass;
    }

    // Inicializa todos os controllers na página
    initialize() {
        this.setupControllers();
        this.bindEvents();
    }

    setupControllers() {
        // Theme Controller - Simula troca de tema como Stimulus
        this.register('theme', class {
            constructor(element) {
                this.element = element;
                this.iconTarget = element.querySelector('[data-theme-target="icon"]');
            }

            toggle() {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-bs-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                html.setAttribute('data-bs-theme', newTheme);
                
                // Atualiza o ícone
                this.iconTarget.className = newTheme === 'light' ? 'bi bi-sun' : 'bi bi-moon';
                
                // Simulando notificação Rails
                this.showNotification(`Tema alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}`);
            }

            showNotification(message) {
                const toast = document.querySelector('#notification-toast .toast-body');
                toast.textContent = message;
                const toastElement = new bootstrap.Toast(document.querySelector('#notification-toast'));
                toastElement.show();
            }
        });

        // Chart Controller - Simula gráficos dinâmicos
        this.register('chart', class {
            constructor(element) {
                this.element = element;
                this.canvas = element.querySelector('[data-chart-target="canvas"]');
                this.chart = null;
                this.initChart();
            }

            initChart() {
                const ctx = this.canvas.getContext('2d');
                
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                        datasets: [{
                            label: 'Usuários Ativos',
                            data: [65, 89, 80, 81, 95, 78, 92],
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            refreshData() {
                // Simula atualização de dados via Turbo Streams
                const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 100) + 20);
                this.chart.data.datasets[0].data = newData;
                this.chart.update('active');
                
                // Simulando flash message do Rails
                this.showNotification('Gráfico atualizado com sucesso!');
            }

            showNotification(message) {
                const toast = document.querySelector('#notification-toast .toast-body');
                toast.textContent = message;
                const toastElement = new bootstrap.Toast(document.querySelector('#notification-toast'));
                toastElement.show();
            }
        });

        // Modal Controller - Simula modais dinâmicos do Rails
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
                
                // Simula carregamento de conteúdo via Turbo Frame
                this.bodyTarget.innerHTML = `
                    <div class="text-center mb-3">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                `;
                
                this.modal.show();
                
                // Simula carregamento assíncrono
                setTimeout(() => {
                    this.bodyTarget.innerHTML = this.getModalContent(title);
                }, 1000);
            }

            getModalContent(title) {
                const contents = {
                    'Novo Usuário': `
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Nome</label>
                                <input type="text" class="form-control" placeholder="Digite o nome">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">E-mail</label>
                                <input type="email" class="form-control" placeholder="Digite o e-mail">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Perfil</label>
                                <select class="form-select">
                                    <option>Administrador</option>
                                    <option>Usuário</option>
                                    <option>Convidado</option>
                                </select>
                            </div>
                        </form>
                    `,
                    'Gerar Relatório': `
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Tipo de Relatório</label>
                                <select class="form-select">
                                    <option>Relatório de Usuários</option>
                                    <option>Relatório de Vendas</option>
                                    <option>Relatório de Performance</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Período</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control">
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="alert alert-info">
                                <i class="bi bi-info-circle"></i> O relatório será enviado para seu e-mail em até 5 minutos.
                            </div>
                        </form>
                    `
                };
                
                return contents[title] || '<p>Conteúdo carregado dinamicamente!</p>';
            }
        });

        // Counter Controller - Simula contadores animados
        this.register('counter', class {
            constructor(element) {
                this.element = element;
                this.valueTarget = element.querySelector('[data-counter-target="value"]');
                this.animateOnScroll();
            }

            animateOnScroll() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.startAnimation();
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(this.element);
            }

            startAnimation() {
                const target = this.valueTarget.textContent;
                const isPercent = target.includes('%');
                const isCurrency = target.includes('R$');
                const isTime = target.includes('s');
                
                let finalValue;
                if (isPercent) {
                    finalValue = parseInt(target);
                } else if (isCurrency) {
                    finalValue = parseFloat(target.replace('R$ ', '').replace('K', '')) * 1000;
                } else if (isTime) {
                    finalValue = parseFloat(target);
                } else {
                    finalValue = parseInt(target.replace(',', ''));
                }
                
                let current = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue;
                    if (isPercent) {
                        displayValue = Math.floor(current) + '%';
                    } else if (isCurrency) {
                        displayValue = 'R$ ' + (current / 1000).toFixed(1) + 'K';
                    } else if (isTime) {
                        displayValue = current.toFixed(1) + 's';
                    } else {
                        displayValue = Math.floor(current).toLocaleString('pt-BR');
                    }
                    
                    this.valueTarget.textContent = displayValue;
                }, 50);
            }
        });

        // Live Updates Controller - Simula Turbo Streams
        this.register('live-updates', class {
            constructor(element) {
                this.element = element;
                this.startLiveUpdates();
            }

            startLiveUpdates() {
                setInterval(() => {
                    this.addUpdate();
                }, 3000);
            }

            addUpdate() {
                const updates = [
                    'Novo usuário registrado',
                    'Relatório gerado com sucesso',
                    'Backup realizado automaticamente',
                    'Performance do sistema: 98%',
                    '5 novos pedidos recebidos',
                    'Cache limpo automaticamente'
                ];
                
                const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
                const timestamp = new Date().toLocaleTimeString('pt-BR');
                
                const updateElement = document.createElement('div');
                updateElement.className = 'alert alert-success alert-sm fade show';
                updateElement.innerHTML = `
                    <small class="text-muted">${timestamp}</small><br>
                    <i class="bi bi-check-circle"></i> ${randomUpdate}
                `;
                
                this.element.appendChild(updateElement);
                
                // Remove updates antigos
                const updates_list = this.element.querySelectorAll('.alert');
                if (updates_list.length > 3) {
                    updates_list[0].remove();
                }
                
                // Fade out after 2 seconds
                setTimeout(() => {
                    updateElement.classList.add('opacity-50');
                }, 2000);
            }
        });

        // Hero Controller - Demonstração interativa
        this.register('hero', class {
            constructor(element) {
                this.element = element;
            }

            showDemo() {
                // Simula uma ação do Turbo/Hotwire
                const button = this.element;
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="bi bi-hourglass-split"></i> Carregando...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-check-circle"></i> Demo Ativo!';
                    button.className = 'btn btn-success btn-lg';
                    
                    // Trigger algumas ações
                    this.triggerDemoActions();
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.className = 'btn btn-light btn-lg';
                        button.disabled = false;
                    }, 3000);
                }, 1500);
            }

            triggerDemoActions() {
                // Simula atualizações automáticas via Turbo Streams
                const chart = document.querySelector('[data-controller="chart"]');
                if (chart) {
                    chart.dispatchEvent(new Event('click'));
                }
                
                // Mostra notificação
                setTimeout(() => {
                    const toast = document.querySelector('#notification-toast .toast-body');
                    toast.textContent = 'Demo interativo ativado! Veja as atualizações automáticas.';
                    const toastElement = new bootstrap.Toast(document.querySelector('#notification-toast'));
                    toastElement.show();
                }, 500);
            }
        });

        // Notification Controller
        this.register('notification', class {
            constructor(element) {
                this.element = element;
            }

            show() {
                const messages = [
                    'Sistema funcionando perfeitamente!',
                    '3 novas notificações não lidas',
                    'Backup agendado para hoje às 22h',
                    'Atualização de segurança disponível',
                    'Performance do servidor: Excelente'
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                
                const toast = document.querySelector('#notification-toast .toast-body');
                toast.textContent = randomMessage;
                const toastElement = new bootstrap.Toast(document.querySelector('#notification-toast'));
                toastElement.show();
            }
        });

        // Turbo Demo Controller - Simula Turbo Frames
        this.register('turbo-demo', class {
            constructor(element) {
                this.element = element;
            }

            loadContent() {
                const button = this.element;
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="bi bi-arrow-clockwise spin"></i> Carregando via Turbo...';
                button.disabled = true;
                
                // Simula carregamento de conteúdo via Turbo Frame
                setTimeout(() => {
                    // Cria um novo card temporário para demonstrar Turbo
                    const container = document.querySelector('.container');
                    const newCard = document.createElement('div');
                    newCard.className = 'alert alert-warning mt-3 fade show';
                    newCard.innerHTML = `
                        <h5><i class="bi bi-lightning"></i> Conteúdo carregado via Turbo!</h5>
                        <p>Este conteúdo foi carregado dinamicamente, simulando o comportamento do Turbo Frames do Rails.</p>
                        <small class="text-muted">Em uma aplicação Rails real, isso viria do servidor automaticamente.</small>
                    `;
                    
                    container.appendChild(newCard);
                    
                    button.innerHTML = '<i class="bi bi-check"></i> Carregado!';
                    button.className = 'btn btn-success';
                    
                    // Remove o card após alguns segundos
                    setTimeout(() => {
                        newCard.remove();
                        button.innerHTML = originalText;
                        button.className = 'btn btn-warning';
                        button.disabled = false;
                    }, 4000);
                }, 1000);
            }
        });
    }

    // Conecta controllers aos elementos
    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            // Para cada elemento com data-controller, instancia o controller
            Object.keys(this.controllers).forEach(controllerName => {
                const elements = document.querySelectorAll(`[data-controller*="${controllerName}"]`);
                elements.forEach(element => {
                    const controller = new this.controllers[controllerName](element);
                    
                    // Bind actions
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

// CSS para animações
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .fade {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Inicializa o framework
const stimulusLike = new StimulusLikeFramework(); 