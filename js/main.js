/**
 * Main JavaScript - ProfileCraft Dark Knight Template
 * Controls all interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // DOM Elements
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.skill-progress');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const contactForm = document.getElementById('contactForm');
    const scrollTop = document.querySelector('.scroll-top');
    
    // Spotlight effect
    const spotlight = document.querySelector('.spotlight');
    
    if (spotlight) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth * 100;
            const y = e.clientY / window.innerHeight * 100;
            
            spotlight.style.setProperty('--x', `${x}%`);
            spotlight.style.setProperty('--y', `${y}%`);
        });
    }
    
    // Mobile navigation toggle
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileToggle.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typewriter effect for changing text
    function typewriterEffect() {
        const changingText = document.querySelector('.changing-text');
        
        if (!changingText) return;
        
        const phrases = [
            'Web Developer',
            'UI/UX Designer',
            'Mobile Developer',
            'Problem Solver'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const phrase = phrases[currentPhrase];
            
            if (isDeleting) {
                changingText.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                changingText.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === phrase.length) {
                // Pause at end of typing
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }
    
    typewriterEffect();
    
    // Animate skill bars on scroll
    function animateSkillBars() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.style.getPropertyValue('width');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    animateSkillBars();
    
    // Project filtering
    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Reset active class
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Set active class on current button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Tabs functionality
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Reset active classes
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Set active class
                this.classList.add('active');
                
                // Show active content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Testimonial slider
    if (testimonialItems.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Dots navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Next/previous buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = testimonialItems.length - 1;
                showSlide(newIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                let newIndex = currentSlide + 1;
                if (newIndex >= testimonialItems.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialItems.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formStatus = document.getElementById('formStatus');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                formStatus.textContent = 'Please fill in all required fields';
                formStatus.style.color = 'var(--danger)';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                formStatus.textContent = 'Please enter a valid email address';
                formStatus.style.color = 'var(--danger)';
                return;
            }
            
            // Show sending message
            formStatus.textContent = 'Sending your message...';
            formStatus.style.color = 'var(--accent)';
            
            // Simulate form submission
            setTimeout(() => {
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.style.color = 'var(--success)';
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
    
    // Animate elements on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .info-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Navigation active state based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize the page
    updateActiveNavLink();
});
