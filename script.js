// Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
    /* --- Mobile Navigation Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (hamburger && mobileMenu) {
        const icon = hamburger.querySelector('i');

        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Scroll Reveal Animation --- */
    // Setup Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with fade-in-up class
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    /* --- Image Lightbox Modal --- */
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const closeBtn = document.querySelector('.modal-close');
        
        // Find all clickable documentation images
        const docsImages = document.querySelectorAll('.docs-img');
        
        docsImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal handlers
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
        
        closeBtn.addEventListener('click', closeModal);
        
        // Close when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target !== modalImg) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });
    }

});
