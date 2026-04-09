document.addEventListener('DOMContentLoaded', () => {
    /* ======= Mobile Menu Toggle ======= */
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Toggle icon shape
            const icon = menuIcon.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            if (menuIcon) {
                menuIcon.querySelector('i').classList.replace('bx-x', 'bx-menu');
            }
        });
    });

    /* ======= Active Navigation Link on Scroll ======= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
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

    /* ======= Theme Toggler (Dark/Light Mode) ======= */
    const themeBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if(themeBtn) themeBtn.querySelector('i').classList.replace('bx-moon', 'bx-sun');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');
            
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('bx-moon', 'bx-sun');
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                icon.classList.replace('bx-sun', 'bx-moon');
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    /* ======= Professional Text Rotator ======= */
    const professionText = document.querySelector('.profession-text');
    const professions = [
        "Computer Science Engineer",
        "Full Stack Developer Intern"
    ];
    let profIndex = 0;

    if (professionText) {
        setInterval(() => {
            professionText.style.opacity = '0';
            setTimeout(() => {
                profIndex = (profIndex + 1) % professions.length;
                professionText.textContent = professions[profIndex];
                professionText.style.opacity = '1';
                professionText.style.transition = 'opacity 0.5s ease';
            }, 500);
        }, 4000);
    }
});
