/**
 * 公共 JS — 导航栏滚动效果 + 滚动动画 + 数字递增
 * 每个页面通过 <script src="../../src/js/main.js"></script> 引入
 */

// ============================
// 导航栏：滚动变色 + 移动端菜单
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

  // 移动端菜单切换
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
      // 切换图标
      const icon = menuBtn.querySelector('svg')
      if (mobileMenu.classList.contains('hidden')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
      }
    })
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden')
        const icon = menuBtn.querySelector('svg')
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
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
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // 添加延迟实现错落效果
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, i * 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in').forEach(el => {
    observer.observe(el)
  })
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
// 初始化
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  initScrollAnimations()
  animateCounters()
  initSmoothScroll()
})
