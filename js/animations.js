/**
 * Green Architecture Formula
 * Animation functionality
 */

function initAnimations() {
  // Animate elements when they come into view
  animateOnScroll();
  
  // Initialize micro-interactions
  initMicroInteractions();
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
  // Elements to animate
  const elementsToAnimate = [
    '.evidence-card',
    '.formula-card',
    '.benefits-column',
    '.calculator h2',
    '.tab-content'
  ];
  
  // Create an intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all target elements
  elementsToAnimate.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      // Add animation-ready class for initial state
      element.classList.add('animation-ready');
      observer.observe(element);
    });
  });
}

/**
 * Add micro-interactions to UI elements
 */
function initMicroInteractions() {
  // Cards hover effect
  const cards = document.querySelectorAll('.evidence-card, .formula-card, .result-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
  
  // Add leaf animation to logo
  const logoLeaf = document.querySelector('.logo .leaf-icon');
  
  if (logoLeaf) {
    logoLeaf.addEventListener('mouseenter', () => {
      logoLeaf.style.transform = 'rotate(-10deg)';
    });
    
    logoLeaf.addEventListener('mouseleave', () => {
      logoLeaf.style.transform = '';
    });
  }
  
  // Add subtle animations to section transitions
  const addSectionTransitionStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .animation-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .evidence-card.animated, 
      .formula-card.animated, 
      .result-card.animated {
        transition-delay: calc(var(--animation-index, 0) * 0.1s);
      }
    `;
    document.head.appendChild(style);
    
    // Set animation index for staggered animations
    const setAnimationIndexes = selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.style.setProperty('--animation-index', index);
      });
    };
    
    setAnimationIndexes('.evidence-card');
    setAnimationIndexes('.formula-card');
    setAnimationIndexes('.result-card');
  };
  
  addSectionTransitionStyles();
}

/**
 * Create a ripple effect for buttons
 */
function createRipple(event) {
  const button = event.currentTarget;
  
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

// Add ripple effect to all buttons
const buttons = document.querySelectorAll('button, .cta-button');
buttons.forEach(button => {
  button.addEventListener('click', createRipple);
});