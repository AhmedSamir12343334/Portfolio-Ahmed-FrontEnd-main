document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------------------
       Mobile Navigation
    ----------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Toggle Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                // Closing: Clear animation and reset opacity
                link.style.animation = '';
                link.style.opacity = '1';
            } else {
                // Opening: Add animation
                // Delay based on index for staggered effect
                link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
                link.style.opacity = '0'; // Start invisible for animation
            }
        });
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            // Generate reset for all links
            links.forEach(l => {
                l.style.animation = '';
                l.style.opacity = '1';
            });
        });
    });

    // Reset on window resize to avoid hidden links on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(l => {
                l.style.animation = '';
                l.style.opacity = '1';
            });
        }
    });

    /* -----------------------------------------------
       Smooth Scrolling
    ----------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -----------------------------------------------
       Scroll Animations (Intersection Observer)
    ----------------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .about-content, .skill-category, .project-card, .timeline-item, .service-card, .contact-item');

    // Initial setup for animated elements
    animatedElements.forEach(el => {
        // We use a class to handle the hidden state to avoid FOIT (Flash of Invisible Text) if JS fails or loads late
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    /* -----------------------------------------------
       Typewriter Effect
    ----------------------------------------------- */
    const textElement = document.querySelector('.hero-intro');
    if (textElement) {
        const textContent = textElement.innerText; // Use innerText to preserve line breaks if any, though standard <p> is block
        textElement.innerHTML = ''; // Clear text

        // Wait for hero animation to be mostly done (1.5s)
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < textContent.length) {
                    textElement.innerHTML += textContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20); // Typing speed
                }
            };
            typeWriter();
        }, 1500);
    }
    /* -----------------------------------------------
       Theme Toggle
    ----------------------------------------------- */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }


});
