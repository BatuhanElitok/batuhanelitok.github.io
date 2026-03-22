document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // --- SPIDER-PUNK NAVIGATION MENU ---
    const navbar = document.querySelector('.navbar');
    const floatingBtn = document.querySelector('.floating-nav-btn');
    const floatingMenu = document.querySelector('.floating-menu');
    const floatingLinks = document.querySelectorAll('.floating-menu a');

    // Toggle menu state (Cleaned up, no web animation)
    const toggleMenu = () => {
        const isOpen = floatingMenu.classList.contains('active');

        if (!isOpen) {
            // Opening the menu safely
            floatingBtn.classList.add('open');
            floatingMenu.style.transition = 'right 0.4s cubic-bezier(0.25, 1, 0.5, 1)'; // Slide in from right
            floatingMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Closing the menu
            floatingBtn.classList.remove('open');
            floatingMenu.style.transition = 'right 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)'; // Slide out
            floatingMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    floatingBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    floatingLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (floatingMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Hide navbar and show floating button when scrolling down past 150px
        if (scrollPosition > 150) {
            navbar.classList.add('hidden');
            floatingBtn.classList.add('visible');
        } else {
            navbar.classList.remove('hidden');
            floatingBtn.classList.remove('visible');

            // Make navbar splash animation hold logo active
            if(scrollPosition > 10) {
                 navbar.classList.add('splattered');
            } else {
                 navbar.classList.remove('splattered');
            }

            // If scrolled back to top, zip the floating menu back up if open
            if (floatingMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // --- Desktop Nav Scroll Triggers ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});