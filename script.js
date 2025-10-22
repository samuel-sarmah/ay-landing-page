// Ayenyo AI Landing Page JavaScript
// Minimal interactions and smooth user experience enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollEffects();
    initButtonInteractions();
    initNavigationEffects();
    initAnimations();
    initAIInterface();
});

// Smooth scroll effects and navigation highlighting
function initScrollEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight active navigation item based on scroll position
    function highlightActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navigation background opacity on scroll
    function updateNavBackground() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        highlightActiveNav();
        updateNavBackground();
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button interactions and CTA handling
function initButtonInteractions() {
    // Demo request buttons
    const demoButtons = document.querySelectorAll('[data-action="demo"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleDemoRequest();
        });
    });

    // Learn more buttons
    const learnButtons = document.querySelectorAll('[data-action="learn"]');
    learnButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleLearnMore();
        });
    });

    // Contact sales buttons
    const contactButtons = document.querySelectorAll('[data-action="contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleContactSales();
        });
    });

    // Add ripple effect to buttons
    addRippleEffect();
}

// Demo request handler
function handleDemoRequest() {
    // Create a simple modal or redirect - for now, show alert
    const email = prompt('Enter your email address to schedule a demo:');
    if (email && validateEmail(email)) {
        showNotification('Demo request submitted! Our Ayenyo team will contact you within 24 hours.', 'success');
        // In a real implementation, this would send data to your backend
        console.log('Ayenyo demo requested for:', email);
    } else if (email) {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Learn more handler
function handleLearnMore() {
    // Smooth scroll to features section
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        const offsetTop = featuresSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Contact sales handler
function handleContactSales() {
    const email = prompt('Enter your email address to contact our sales team:');
    if (email && validateEmail(email)) {
        showNotification('Sales contact request submitted! Our Ayenyo sales team will call within 2 hours.', 'success');
        console.log('Ayenyo sales contact requested for:', email);
    } else if (email) {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Email validation utility
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        backgroundColor: type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'
    });

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Navigation effects
function initNavigationEffects() {
    // Add active state styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-blue) !important;
            position: relative;
        }
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--primary-blue);
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
}

// Animation enhancements
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards and benefit items
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .metric');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .benefit-item, .metric {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .feature-card.animate-in, .benefit-item.animate-in, .metric.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .feature-card {
            transition-delay: 0.1s;
        }
        .feature-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        .feature-card:nth-child(3) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(animationStyle);
}

// Ripple effect for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for older browsers
function addSmoothScrollPolyfill() {
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Initialize smooth scroll polyfill
addSmoothScrollPolyfill();

// Performance optimization: Debounce scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll-based optimizations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Console welcome message for developers
console.log('%c✨ Ayenyo AI', 'color: #3b82f6; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);');
console.log('%cTransforming healthcare through intelligent AI assistance', 'color: #8b5cf6; font-size: 14px;');
console.log('Interested in our technology? Contact us at hello@ayenyo.com');

// AI Interface Interactive Demo
function initAIInterface() {
    const queryInput = document.getElementById('aiQueryInput');
    const submitBtn = document.getElementById('submitQuery');
    const exampleQueries = document.querySelectorAll('.example-query');
    const responseSection = document.getElementById('responseSection');
    const analyzingState = document.getElementById('analyzingState');
    const responseResult = document.getElementById('responseResult');
    const resultSummary = document.getElementById('resultSummary');
    const researchInsights = document.getElementById('researchInsights');
    
    // Sample responses for different query types
    const sampleResponses = {
        'diabetes': {
            summary: 'Analyzing 1,247 recent studies on diabetes management and cardiovascular health...',
            insights: [
                'SGLT-2 inhibitors show 23% reduction in cardiovascular events',
                'GLP-1 agonists demonstrate superior weight management outcomes',
                'Recent meta-analysis supports combination therapy approach',
                'Continuous glucose monitoring improves HbA1c by 0.5-0.7%'
            ]
        },
        'cardiac': {
            summary: 'Analyzing 892 recent studies on post-operative cardiac care protocols...',
            insights: [
                'Early mobilization reduces complications by 34%',
                'Enhanced recovery protocols shorten hospital stays',
                'Multimodal pain management improves patient outcomes',
                'Remote monitoring systems reduce readmission rates'
            ]
        },
        'cancer': {
            summary: 'Analyzing 1,563 recent studies on melanoma immunotherapy advances...',
            insights: [
                'Combination checkpoint inhibitors show 58% response rates',
                'Personalized neoantigen vaccines improve outcomes',
                'Biomarker-driven treatment selection enhances efficacy',
                'Novel CAR-T approaches demonstrate promising results'
            ]
        },
        'default': {
            summary: 'Analyzing relevant medical research papers across multiple databases...',
            insights: [
                'Evidence-based treatment protocols identified',
                'Latest clinical trial results incorporated',
                'Expert consensus guidelines reviewed',
                'Peer-reviewed meta-analyses analyzed'
            ]
        }
    };
    
    // Handle example query clicks
    exampleQueries.forEach(btn => {
        btn.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            queryInput.value = query;
            queryInput.focus();
        });
    });
    
    // Handle query submission
    function handleQuerySubmit() {
        const query = queryInput.value.trim();
        
        if (!query) {
            queryInput.focus();
            return;
        }
        
        // Hide placeholder and show analyzing state
        const placeholder = responseSection.querySelector('.response-placeholder');
        const responseContent = responseSection.querySelector('.response-content');
        
        placeholder.style.display = 'none';
        responseContent.style.display = 'block';
        analyzingState.style.display = 'block';
        responseResult.style.display = 'none';
        
        // Simulate API call with delay
        setTimeout(() => {
            // Determine response type based on query
            let responseType = 'default';
            if (query.toLowerCase().includes('diabetes')) responseType = 'diabetes';
            else if (query.toLowerCase().includes('cardiac') || query.toLowerCase().includes('surgery')) responseType = 'cardiac';
            else if (query.toLowerCase().includes('cancer') || query.toLowerCase().includes('melanoma') || query.toLowerCase().includes('immunotherapy')) responseType = 'cancer';
            
            const response = sampleResponses[responseType];
            
            // Update response content
            resultSummary.textContent = response.summary;
            researchInsights.innerHTML = response.insights
                .map(insight => `<div class="insight">✓ ${insight}</div>`)
                .join('');
            
            // Show result
            analyzingState.style.display = 'none';
            responseResult.style.display = 'block';
            
            // Add ripple effect to submit button
            submitBtn.classList.add('success-pulse');
            setTimeout(() => submitBtn.classList.remove('success-pulse'), 600);
            
        }, 1500); // 1.5 second delay for realism
    }
    
    // Submit button click
    submitBtn.addEventListener('click', handleQuerySubmit);
    
    // Enter key submission
    queryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleQuerySubmit();
        }
    });
}

