// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A comprehensive full-stack e-commerce solution featuring secure payment processing, real-time inventory management, and an intuitive admin dashboard for seamless business operations.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
    category: "Full Stack",
    rating: 5,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management Hub",
    description:
      "A collaborative project management tool with real-time updates, team collaboration features, advanced filtering, and progress tracking for enhanced productivity.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Vuex", "Socket.io"],
    category: "Frontend",
    rating: 4,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Weather Analytics Dashboard",
    description:
      "An intelligent weather application providing detailed forecasts, interactive maps, historical data analysis, and personalized weather alerts for multiple locations.",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API", "Leaflet", "PWA"],
    category: "Frontend",
    rating: 4,
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Blog CMS Pro",
    description:
      "A powerful content management system with markdown support, SEO optimization, multi-author capabilities, and advanced analytics for professional bloggers and content creators.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Vercel"],
    category: "Full Stack",
    rating: 5,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Mobile Banking Suite",
    description:
      "A secure and intuitive mobile banking application featuring biometric authentication, transaction history, budget tracking, and real-time notifications for modern financial management.",
    technologies: ["React Native", "Redux", "Node.js", "JWT", "Plaid API"],
    category: "Mobile",
    rating: 5,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Data Visualization Studio",
    description:
      "An interactive dashboard for complex data analysis featuring multiple chart types, real-time data processing, custom filters, and exportable reports for business intelligence.",
    technologies: ["D3.js", "Python", "Flask", "Pandas", "PostgreSQL"],
    category: "Data Science",
    rating: 4,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "AI Chat Assistant",
    description:
      "An intelligent conversational AI platform with natural language processing, context awareness, and multi-language support for enhanced user interactions.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "WebSocket"],
    category: "Full Stack",
    rating: 5,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "Fitness Tracker App",
    description:
      "A comprehensive fitness tracking application with workout planning, progress monitoring, social features, and integration with wearable devices for health enthusiasts.",
    technologies: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
    category: "Mobile",
    rating: 4,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center",
    demoUrl: "#",
    githubUrl: "#",
  },
]

// State management
let filteredProjects = [...projects]
let currentFilter = "all"
let currentSort = "rating"
let isLoading = false

// DOM elements
const projectsGrid = document.getElementById("projectsGrid")
const sortBy = document.getElementById("sortBy")
const contactForm = document.getElementById("contactForm")
const successMessage = document.getElementById("successMessage")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const cursorDot = document.getElementById("cursor-dot")
const cursorOutline = document.getElementById("cursor-outline")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  renderProjects()
  loadContactFormData()
  setupEventListeners()
  initializeTheme()
  createParticles()
  initializeCursor()
  animateCounters()
  setupScrollAnimations()
  animateSkillBars()
}

// Event listeners setup
function setupEventListeners() {
  // Filter tabs
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", handleFilterTabClick)
  })

  // Sort control
  sortBy.addEventListener("change", handleSortChange)

  // Contact form
  contactForm.addEventListener("submit", handleContactSubmit)

  // Form inputs for localStorage
  const formInputs = contactForm.querySelectorAll("input, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("input", saveContactFormData)
  })

  // Mobile navigation
  hamburger.addEventListener("click", toggleMobileMenu)

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", handleNavClick)
  })

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll)

  // Window resize
  window.addEventListener("resize", handleResize)
}

// Enhanced filter handling with tabs
function handleFilterTabClick(e) {
  // Remove active class from all tabs
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Add active class to clicked tab
  e.target.classList.add("active")

  // Update filter
  currentFilter = e.target.dataset.filter
  filterAndSortProjects()
}

// Sort handling
function handleSortChange(e) {
  currentSort = e.target.value
  filterAndSortProjects()
}

// Enhanced project filtering and sorting with loading states
function filterAndSortProjects() {
  if (isLoading) return

  isLoading = true
  projectsGrid.classList.add("loading")

  setTimeout(() => {
    // Filter projects
    if (currentFilter === "all") {
      filteredProjects = [...projects]
    } else {
      filteredProjects = projects.filter((project) => project.category === currentFilter)
    }

    // Sort projects
    filteredProjects.sort((a, b) => {
      switch (currentSort) {
        case "rating":
          return b.rating - a.rating
        case "title":
          return a.title.localeCompare(b.title)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    renderProjects()
    projectsGrid.classList.remove("loading")
    isLoading = false
  }, 500)
}

// Enhanced project rendering with better animations
function renderProjects() {
  projectsGrid.innerHTML = ""

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">No projects found</h3>
        <p style="color: var(--text-muted);">Try adjusting your filters</p>
      </div>
    `
    return
  }

  filteredProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project)
    projectCard.style.animationDelay = `${index * 0.1}s`
    projectsGrid.appendChild(projectCard)
  })
}

// Enhanced project card creation
function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card animate-on-scroll"

  const stars = Array.from(
    { length: 5 },
    (_, i) => `<span class="star ${i < project.rating ? "" : "empty"}">★</span>`,
  ).join("")

  const techTags = project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")

  card.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-category">${project.category}</div>
      <div class="project-overlay">
        <a href="${project.demoUrl}" class="overlay-btn" title="View Demo">
          <i class="fas fa-external-link-alt"></i>
        </a>
        <a href="${project.githubUrl}" class="overlay-btn" title="View Code">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
    <div class="project-content">
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-rating">${stars}</div>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-technologies">${techTags}</div>
      <div class="project-links">
        <a href="${project.demoUrl}" class="project-link">
          <i class="fas fa-external-link-alt"></i>
          <span>Live Demo</span>
        </a>
        <a href="${project.githubUrl}" class="project-link">
          <i class="fab fa-github"></i>
          <span>Source Code</span>
        </a>
      </div>
    </div>
  `

  return card
}

// Enhanced contact form handling
function handleContactSubmit(e) {
  e.preventDefault()

  // Add loading state to button
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  // Simulate form submission delay
  setTimeout(() => {
    // Show success message
    contactForm.style.display = "none"
    successMessage.style.display = "block"

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Clear form and localStorage after 3 seconds
    setTimeout(() => {
      contactForm.reset()
      localStorage.removeItem("portfolioContactForm")
      contactForm.style.display = "block"
      successMessage.style.display = "none"
    }, 4000)
  }, 2000)
}

// localStorage for contact form
function saveContactFormData() {
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }

  localStorage.setItem("portfolioContactForm", JSON.stringify(formData))
}

function loadContactFormData() {
  const savedData = localStorage.getItem("portfolioContactForm")
  if (savedData) {
    const formData = JSON.parse(savedData)
    document.getElementById("name").value = formData.name || ""
    document.getElementById("email").value = formData.email || ""
    document.getElementById("subject").value = formData.subject || ""
    document.getElementById("message").value = formData.message || ""
  }
}

// Enhanced mobile navigation
function toggleMobileMenu() {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")

  // Animate hamburger bars
  const bars = hamburger.querySelectorAll(".bar")
  if (hamburger.classList.contains("active")) {
    bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
    bars[1].style.opacity = "0"
    bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
  } else {
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  }
}

// Navigation link handling
function handleNavClick(e) {
  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to clicked link
  e.target.classList.add("active")

  // Close mobile menu if open
  navMenu.classList.remove("active")
  hamburger.classList.remove("active")

  // Reset hamburger bars
  const bars = hamburger.querySelectorAll(".bar")
  bars[0].style.transform = "none"
  bars[1].style.opacity = "1"
  bars[2].style.transform = "none"
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update theme toggle icon
  const icon = themeToggle.querySelector("i")
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  const icon = themeToggle.querySelector("i")
  icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Custom cursor functionality
function initializeCursor() {
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursorDot.style.left = e.clientX + "px"
      cursorDot.style.top = e.clientY + "px"

      cursorOutline.style.left = e.clientX - 20 + "px"
      cursorOutline.style.top = e.clientY - 20 + "px"
    })

    // Cursor interactions
    document.querySelectorAll("a, button, .project-card, .skill-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(2)"
        cursorOutline.style.transform = "scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)"
        cursorOutline.style.transform = "scale(1)"
      })
    })
  }
}

// Background particles
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        counter.textContent = target
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Trigger animation when counters come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  counters.forEach((counter) => observer.observe(counter))
}

// Skill bars animation
function animateSkillBars() {
  const skillLevels = document.querySelectorAll(".skill-level")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute("data-level")
        entry.target.style.setProperty("--skill-width", level + "%")
        entry.target.querySelector("::after") || entry.target.style.setProperty("width", level + "%")

        // Animate the skill bar
        setTimeout(() => {
          entry.target.style.setProperty("--skill-width", level + "%")
          const afterElement = window.getComputedStyle(entry.target, "::after")
          entry.target.style.setProperty("width", level + "%")
        }, 100)

        observer.unobserve(entry.target)
      }
    })
  })

  skillLevels.forEach((skill) => {
    observer.observe(skill)
    // Set CSS custom property for animation
    const level = skill.getAttribute("data-level")
    skill.style.setProperty("--level", level + "%")

    // Create the animated bar
    setTimeout(() => {
      skill.style.background = `linear-gradient(to right, var(--gradient-primary) ${level}%, var(--border-light) ${level}%)`
    }, 500)
  })
}

// Scroll animations
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animateElements.forEach((el) => observer.observe(el))
}

// Enhanced navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar")
  const scrolled = window.scrollY > 50

  if (scrolled) {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "var(--shadow-lg)"
  } else {
    navbar.style.background =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.8)"
        : "rgba(255, 255, 255, 0.8)"
    navbar.style.boxShadow = "none"
  }

  // Update active nav link based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Handle window resize
function handleResize() {
  // Reinitialize cursor on desktop
  if (window.innerWidth > 768) {
    initializeCursor()
  }

  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  }
}

// Utility functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Enhanced error handling
window.addEventListener("error", (e) => {
  console.error("Application error:", e.error)
})

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(handleNavbarScroll, 10)
window.addEventListener("scroll", debouncedScrollHandler)

// Add loading states and transitions
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to body
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
