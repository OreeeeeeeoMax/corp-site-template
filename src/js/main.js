/**
 * 公共 JS — 导航栏滚动效果 + 滚动动画 + 数字递增 + 视差
 * 每个页面通过 <script src="../../src/js/main.js"></script> 引入
 */

// ============================
// 导航栏：滚动变色 + 移动端全屏菜单
// ============================
function initNavbar() {
  const nav = document.getElementById('navbar')
  const menuBtn = document.getElementById('menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')

  if (!nav) return

  // 滚动时添加背景
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled')
    } else {
      nav.classList.remove('nav-scrolled')
    }
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  // 移动端菜单切换（全屏暗色菜单，用 .show 类控制）
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('show')
      if (isOpen) {
        mobileMenu.classList.remove('show')
        document.body.style.overflow = ''
        menuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
      } else {
        mobileMenu.classList.remove('hidden')
        mobileMenu.classList.add('show')
        document.body.style.overflow = 'hidden'
        menuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
      }
    })

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('show')
        document.body.style.overflow = ''
        menuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
      })
    })
  }
}

// ============================
// IntersectionObserver 滚动动画
// ============================
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  )

  document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right, .scale-in, .blur-reveal, .line-draw'
  ).forEach(el => observer.observe(el))
}

// ============================
// 数字递增动画
// ============================
function animateCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const target = parseInt(el.dataset.count, 10)
          const suffix = el.dataset.suffix || ''
          const prefix = el.dataset.prefix || ''
          const duration = 2000
          const start = performance.now()

          function update(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            el.textContent = prefix + Math.floor(target * ease).toLocaleString() + suffix
            if (progress < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el))
}

// ============================
// 平滑滚动到锚点
// ============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}

// ============================
// Hero 视差滚动效果
// ============================
function initParallax() {
  const heroes = document.querySelectorAll('.hero')
  if (!heroes.length) return

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    heroes.forEach(hero => {
      // 背景图缓慢上移
      hero.style.backgroundPositionY = `${scrollY * 0.3}px`
    })
  }, { passive: true })
}

// ============================
// 初始化
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initScrollAnimations()
  animateCounters()
  initSmoothScroll()
  initParallax()
})
