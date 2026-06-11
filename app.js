document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const siteHeader = document.getElementById('site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');

    // ==========================================
    // 1. Mobile Menu Toggling
    // ==========================================
    function toggleMobileMenu() {
        const isOpen = navLinks.classList.contains('active');
        
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        hamburgerBtn.setAttribute('aria-expanded', !isOpen);
        
        // Disable body scroll when menu is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    // ==========================================
    // 2. Header Scroll Effect
    // ==========================================
    function handleHeaderScroll() {
        if (window.scrollY > 30) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    // Initial check on page load
    handleHeaderScroll();

    // ==========================================
    // 3. Scroll Spy (Active link indicator)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust threshold for sticky header height
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // ==========================================
    // 4. Form Submission Interaction
    // ==========================================
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            
            if (emailValue) {
                // Style and show a premium custom toast or simple alert
                alert(`✨ Sweet! Thank you for subscribing. We have sent a 10% discount code to: ${emailValue}`);
                newsletterForm.reset();
            }
        });
    }
});
