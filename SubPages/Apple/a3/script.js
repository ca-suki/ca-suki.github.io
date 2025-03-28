document.addEventListener('DOMContentLoaded', function() {
  // Check for elements that need to be animated on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image');
  const productImage = document.querySelector('.parallax-image');
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add .visible class when element is in viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Unobserve after animation is triggered
        // This ensures the animation only happens once
        if (!entry.target.classList.contains('parallax-image')) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px'  // Slightly before element enters viewport
  });
  
  // Observe all elements that should animate on scroll
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Parallax scrolling effect
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    
    // Calculate parallax effect for the product image
    if (productImage) {
      const productSection = document.querySelector('.product-showcase');
      const productOffset = productSection.offsetTop;
      const distanceFromTop = scrollTop - productOffset;
      
      if (distanceFromTop > -800 && distanceFromTop < 400) {
        const parallaxValue = distanceFromTop * 0.1;
        productImage.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
      }
    }
  });
  
  // Smooth reveal of hero section on load
  setTimeout(() => {
    document.querySelector('.hero').classList.add('loaded');
  }, 100);
  
  // Button hover effects
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 2s infinite';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
    });
  }
  
  // Play button interaction
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', function() {
      alert('Video would play here in a real implementation');
      // In a real implementation, you would:
      // 1. Replace the placeholder with an embedded video
      // 2. Play the video
      // 3. Possibly expand it to fullscreen
    });
  }
  
  // Add subtle mouse movement parallax to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function(e) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      if (heroImage) {
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
      }
    });
  }
});