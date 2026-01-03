// Enhanced navbar scroll effect with hide/show
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    }
});

// Enhanced mobile menu with animations
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');

        // Animate hamburger
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            document.body.style.overflow = 'hidden';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target) && isMenuOpen) {
            navLinks.classList.remove('active');
            isMenuOpen = false;
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                navLinks.classList.remove('active');
                isMenuOpen = false;
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
    });
}

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                isMenuOpen = false;
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animate-on-scroll to various elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add active class to current section in nav
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Form submission handler
const quoteForm = document.getElementById('quoteForm');
const successModal = document.getElementById('successModal');
const modalClose = document.querySelector('.modal-close');

// Initialize EmailJS (You'll need to sign up at emailjs.com and get these values)
(function() {
    emailjs.init("e5LaHdwANoDHyRsvs"); // Your EmailJS public key
})();

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.address || !data.serviceType || !data.description) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email to business owner
            await emailjs.send(
                "service_20hi9bm", // Your EmailJS service ID
                "template_vd34szo", // Business notification template
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone,
                    address: data.address,
                    service_type: data.serviceType,
                    description: data.description,
                    preferred_date: data.preferredDate || 'Not specified',
                    additional_info: data.additionalInfo || 'None',
                    to_email: "contact.zeromaintenance@gmail.com", // Your business email
                    subject: `New Quote Request from ${data.name}`
                }
            );
            
            // Send confirmation email to customer
            await emailjs.send(
                "service_20hi9bm", // Your EmailJS service ID
                "template_gssk08o", // Customer confirmation template
                {
                    to_name: data.name,
                    to_email: data.email,
                    service_type: data.serviceType,
                    reply_to: "contact.zeromaintenance@gmail.com" // Your business email
                }
            );
            
            showSuccessModal();
            quoteForm.reset();
            
        } catch (error) {
            console.error('Email sending failed:', error);
            showNotification('There was an error submitting your request. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Contact form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.contactName || !data.contactEmail || !data.contactSubject || !data.contactMessage) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contactEmail)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send email to business owner
            await emailjs.send(
                "service_20hi9bm", // Your EmailJS service ID
                "template_vd34szo", // Business notification template (reuse existing)
                {
                    from_name: data.contactName,
                    from_email: data.contactEmail,
                    phone: data.contactPhone || 'Not provided',
                    address: 'N/A',
                    service_type: 'General Contact',
                    description: data.contactMessage,
                    preferred_date: 'N/A',
                    additional_info: `Subject: ${data.contactSubject}`,
                    to_email: "contact.zeromaintenance@gmail.com", // Your business email
                    subject: `Contact Form: ${data.contactSubject} - ${data.contactName}`
                }
            );
            
            // Send confirmation email to customer
            await emailjs.send(
                "service_20hi9bm", // Your EmailJS service ID
                "template_gssk08o", // Customer confirmation template (reuse existing)
                {
                    to_name: data.contactName,
                    to_email: data.contactEmail,
                    service_type: 'General Contact',
                    reply_to: "contact.zeromaintenance@gmail.com" // Your business email
                }
            );
            
            showSuccessModal();
            contactForm.reset();
            
        } catch (error) {
            console.error('Contact form email sending failed:', error);
            showNotification('There was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show success modal
function showSuccessModal() {
    if (successModal) {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Trigger animation
        setTimeout(() => {
            successModal.style.opacity = '1';
        }, 10);
    }
}

// Close modal
function closeModal() {
    if (successModal) {
        successModal.style.opacity = '0';
        setTimeout(() => {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
}

// Close modal with X button
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && successModal.style.display === 'block') {
        closeModal();
    }
});

// Set minimum date for date input to today
const preferredDateInput = document.getElementById('preferredDate');
if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
}

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate service cards and feature cards
    const animateElements = document.querySelectorAll('.service-card, .feature-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animate quote form
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.style.opacity = '0';
        quoteForm.style.transform = 'translateX(40px)';
        quoteForm.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        observer.observe(quoteForm);
    }
    
    // Animate quote info
    const quoteInfo = document.querySelector('.quote-info');
    if (quoteInfo) {
        const children = quoteInfo.querySelectorAll('h2, p, .quote-benefits');
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateX(-40px)';
            child.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            observer.observe(child);
        });
    }
    
    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notification system (optional enhancement)
function showNotification(message, type = 'info') {
    // Simple alert for now, can be enhanced with a toast notification
    if (type === 'error') {
        alert(message);
    } else {
        console.log(message);
    }
}

// Smooth reveal on scroll for contact items
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactObserver.observe(item);
    });
    
    // Add animation for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateY(30px)';
        contactForm.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
        contactObserver.observe(contactForm);
    }
});

// ZeroCorps Branding Popup Functionality
document.addEventListener('DOMContentLoaded', () => {
    const zerocorpsPopup = document.getElementById('zerocorps-popup');
    
    // Show popup after 2 seconds
    setTimeout(() => {
        if (zerocorpsPopup) {
            zerocorpsPopup.style.display = 'block';
        }
    }, 2000);
    
    // Hide popup when clicked
    if (zerocorpsPopup) {
        zerocorpsPopup.addEventListener('click', () => {
            zerocorpsPopup.style.display = 'none';
        });
    }
    
    // Auto-hide after 8 seconds if not clicked
    setTimeout(() => {
        if (zerocorpsPopup && zerocorpsPopup.style.display !== 'none') {
            zerocorpsPopup.style.display = 'none';
        }
    }, 10000);
});
