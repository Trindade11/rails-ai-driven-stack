// =============================================================================
// STIMULUS CONTROLLERS - TAILWIND VERSION
// Stack Rails AI-Driven com TailwindCSS
// =============================================================================

import { Application } from "https://unpkg.com/@hotwired/stimulus@3.2.2/dist/stimulus.js"

const application = Application.start()

// =============================================================================
// SIDEBAR CONTROLLER
// =============================================================================
application.register("sidebar", class extends Stimulus.Controller {
  static targets = ["sidebar", "overlay"]
  static classes = ["open", "closed"]

  connect() {
    this.setupResponsive()
  }

  toggle() {
    if (this.sidebarTarget.classList.contains('-translate-x-full')) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    // Remover classe de fechado e adicionar classe de aberto
    this.sidebarTarget.classList.remove('-translate-x-full')
    this.sidebarTarget.classList.add('translate-x-0')
    
    // Mostrar overlay em mobile
    if (window.innerWidth < 1024) {
      this.createOverlay()
    }
  }

  close() {
    // Remover classe de aberto e adicionar classe de fechado
    this.sidebarTarget.classList.remove('translate-x-0')
    this.sidebarTarget.classList.add('-translate-x-full')
    
    // Remover overlay
    this.removeOverlay()
  }

  createOverlay() {
    if (!document.querySelector('.sidebar-overlay')) {
      const overlay = document.createElement('div')
      overlay.className = 'sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
      overlay.addEventListener('click', () => this.close())
      document.body.appendChild(overlay)
    }
  }

  removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay')
    if (overlay) {
      overlay.remove()
    }
  }

  setupResponsive() {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.removeOverlay()
      }
    })
  }
})

// =============================================================================
// THEME CONTROLLER
// =============================================================================
application.register("theme", class extends Stimulus.Controller {
  static targets = ["toggle", "moonIcon", "sunIcon"]

  connect() {
    this.loadTheme()
    this.updateIcons()
  }

  toggle() {
    document.documentElement.classList.toggle('dark')
    this.saveTheme()
    this.updateIcons()
  }

  loadTheme() {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }

  saveTheme() {
    const isDark = document.documentElement.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  updateIcons() {
    const isDark = document.documentElement.classList.contains('dark')
    
    if (this.hasMoonIconTarget && this.hasSunIconTarget) {
      if (isDark) {
        this.moonIconTarget.classList.add('hidden')
        this.sunIconTarget.classList.remove('hidden')
      } else {
        this.moonIconTarget.classList.remove('hidden')
        this.sunIconTarget.classList.add('hidden')
      }
    }
  }
})

// =============================================================================
// STATS CARD CONTROLLER
// =============================================================================
application.register("stats-card", class extends Stimulus.Controller {
  static targets = ["value", "change"]
  static values = { 
    target: Number,
    current: Number,
    change: String,
    duration: { type: Number, default: 2000 }
  }

  connect() {
    this.animateValue()
    this.animateChange()
  }

  animateValue() {
    if (!this.hasValueTarget) return

    const start = this.currentValue || 0
    const end = this.targetValue
    const duration = this.durationValue

    this.countUp(start, end, duration)
  }

  animateChange() {
    if (!this.hasChangeTarget) return

    const change = this.changeValue
    if (change) {
      this.changeTarget.textContent = change
      
      // Adicionar classe de cor baseada no valor
      if (change.includes('+')) {
        this.changeTarget.classList.add('text-green-600', 'dark:text-green-400')
      } else if (change.includes('-')) {
        this.changeTarget.classList.add('text-red-600', 'dark:text-red-400')
      }
    }
  }

  countUp(start, end, duration) {
    const startTime = performance.now()
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * easeOut
      
      this.valueTarget.textContent = Math.floor(current).toLocaleString()
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }
})

// =============================================================================
// NOTIFICATION CONTROLLER
// =============================================================================
application.register("notification", class extends Stimulus.Controller {
  static targets = ["container", "badge"]
  static values = { count: Number }

  connect() {
    this.updateBadge()
  }

  countValueChanged() {
    this.updateBadge()
  }

  updateBadge() {
    if (!this.hasBadgeTarget) return

    const count = this.countValue
    if (count > 0) {
      this.badgeTarget.textContent = count > 99 ? '99+' : count.toString()
      this.badgeTarget.classList.remove('hidden')
    } else {
      this.badgeTarget.classList.add('hidden')
    }
  }

  show() {
    if (this.hasContainerTarget) {
      this.containerTarget.classList.remove('opacity-0', 'translate-y-2')
      this.containerTarget.classList.add('opacity-100', 'translate-y-0')
    }
  }

  hide() {
    if (this.hasContainerTarget) {
      this.containerTarget.classList.remove('opacity-100', 'translate-y-0')
      this.containerTarget.classList.add('opacity-0', 'translate-y-2')
    }
  }
})

// =============================================================================
// MODAL CONTROLLER
// =============================================================================
application.register("modal", class extends Stimulus.Controller {
  static targets = ["container", "backdrop", "panel"]

  connect() {
    this.close()
  }

  open() {
    // Mostrar container
    this.containerTarget.classList.remove('hidden')
    this.containerTarget.classList.add('fixed', 'inset-0', 'z-50')
    
    // Animar backdrop
    requestAnimationFrame(() => {
      this.backdropTarget.classList.remove('opacity-0')
      this.backdropTarget.classList.add('opacity-100')
      
      // Animar panel
      this.panelTarget.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95')
      this.panelTarget.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100')
    })
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden'
  }

  close() {
    // Animar saída
    this.backdropTarget.classList.remove('opacity-100')
    this.backdropTarget.classList.add('opacity-0')
    
    this.panelTarget.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100')
    this.panelTarget.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95')
    
    // Esconder após animação
    setTimeout(() => {
      this.containerTarget.classList.add('hidden')
      this.containerTarget.classList.remove('fixed', 'inset-0', 'z-50')
      
      // Restaurar scroll do body
      document.body.style.overflow = ''
    }, 200)
  }

  clickOutside(event) {
    if (event.target === this.backdropTarget) {
      this.close()
    }
  }
})

// =============================================================================
// CHART CONTROLLER
// =============================================================================
application.register("chart", class extends Stimulus.Controller {
  static targets = ["canvas"]
  static values = { 
    type: String,
    data: Object,
    options: Object
  }

  connect() {
    this.initChart()
  }

  async initChart() {
    // Aguardar Chart.js carregar
    if (typeof Chart === 'undefined') {
      await this.loadChartJS()
    }

    const ctx = this.canvasTarget.getContext('2d')
    
    // Configurar tema baseado no modo escuro
    this.setupTheme()
    
    this.chart = new Chart(ctx, {
      type: this.typeValue,
      data: this.dataValue,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.optionsValue
      }
    })
  }

  setupTheme() {
    const isDark = document.documentElement.classList.contains('dark')
    
    if (isDark) {
      // Aplicar tema escuro
      Chart.defaults.color = '#9CA3AF'
      Chart.defaults.borderColor = '#374151'
    } else {
      // Aplicar tema claro
      Chart.defaults.color = '#6B7280'
      Chart.defaults.borderColor = '#E5E7EB'
    }
  }

  async loadChartJS() {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
      script.onload = resolve
      document.head.appendChild(script)
    })
  }

  disconnect() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
})

// =============================================================================
// ACTIVITY FEED CONTROLLER
// =============================================================================
application.register("activity-feed", class extends Stimulus.Controller {
  static targets = ["container", "item"]
  static values = { autoRefresh: Boolean, interval: Number }

  connect() {
    if (this.autoRefreshValue) {
      this.startAutoRefresh()
    }
  }

  disconnect() {
    this.stopAutoRefresh()
  }

  startAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      this.refresh()
    }, this.intervalValue || 30000)
  }

  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  }

  refresh() {
    // Simular nova atividade
    this.addActivity({
      icon: 'fas fa-info-circle',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/20',
      title: 'Sistema atualizado',
      description: 'Nova versão da aplicação foi deployada',
      time: 'Agora'
    })
  }

  addActivity(activity) {
    const activityHtml = `
      <div class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse">
        <div class="w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center">
          <i class="${activity.icon} ${activity.iconColor}"></i>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800 dark:text-white">${activity.title}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">${activity.description}</p>
        </div>
        <span class="text-xs text-gray-400">${activity.time}</span>
      </div>
    `
    
    // Adicionar no início do container
    this.containerTarget.insertAdjacentHTML('afterbegin', activityHtml)
    
    // Remover animação após um tempo
    setTimeout(() => {
      const firstItem = this.containerTarget.firstElementChild
      if (firstItem) {
        firstItem.classList.remove('animate-pulse')
      }
    }, 1000)
    
    // Limitar número de itens
    const items = this.containerTarget.children
    if (items.length > 10) {
      items[items.length - 1].remove()
    }
  }
})

// =============================================================================
// SEARCH CONTROLLER
// =============================================================================
application.register("search", class extends Stimulus.Controller {
  static targets = ["input", "results", "item"]
  static values = { 
    url: String,
    minLength: { type: Number, default: 2 },
    delay: { type: Number, default: 300 }
  }

  connect() {
    this.timeout = null
  }

  search() {
    const query = this.inputTarget.value.trim()
    
    if (query.length < this.minLengthValue) {
      this.hideResults()
      return
    }

    // Debounce
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.performSearch(query)
    }, this.delayValue)
  }

  performSearch(query) {
    // Simular busca
    const results = this.mockSearch(query)
    this.showResults(results)
  }

  mockSearch(query) {
    const mockData = [
      { title: 'Dashboard Principal', url: '/dashboard', type: 'page' },
      { title: 'Usuários', url: '/users', type: 'page' },
      { title: 'Relatórios', url: '/reports', type: 'page' },
      { title: 'Configurações', url: '/settings', type: 'page' }
    ]
    
    return mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  showResults(results) {
    if (!this.hasResultsTarget) return

    this.resultsTarget.innerHTML = results.map(result => `
      <a href="${result.url}" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        <div class="flex items-center space-x-2">
          <i class="fas fa-${result.type === 'page' ? 'file' : 'search'} text-gray-400"></i>
          <span>${result.title}</span>
        </div>
      </a>
    `).join('')

    this.resultsTarget.classList.remove('hidden')
  }

  hideResults() {
    if (this.hasResultsTarget) {
      this.resultsTarget.classList.add('hidden')
    }
  }
})

// =============================================================================
// UTILS E HELPERS
// =============================================================================

// Função para aplicar classes baseadas no tema
function applyThemeClasses(element, lightClasses, darkClasses) {
  const isDark = document.documentElement.classList.contains('dark')
  
  if (isDark) {
    element.classList.remove(...lightClasses.split(' '))
    element.classList.add(...darkClasses.split(' '))
  } else {
    element.classList.remove(...darkClasses.split(' '))
    element.classList.add(...lightClasses.split(' '))
  }
}

// Observer para mudanças de tema
const themeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      // Disparar evento customizado para componentes reagirem
      document.dispatchEvent(new CustomEvent('theme-changed', {
        detail: { 
          isDark: document.documentElement.classList.contains('dark') 
        }
      }))
    }
  })
})

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
})

// Exportar para uso global
window.StimulusApp = application 