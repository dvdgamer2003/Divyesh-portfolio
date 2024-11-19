// Force dark theme immediately
document.documentElement.style.setProperty('color-scheme', 'dark');

function initThemeSwitcher() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    
    // Theme configurations
    const themes = {
        light: {
            'bg-color': '#ffffff',
            'second-bg-color': '#f8f9fa',
            'text-color': '#2c3e50',
            'main-color': '#3498db',
            'accent-color': '#2980b9',
            'header-bg': 'rgba(255, 255, 255, 0.95)',
            'footer-bg': '#ffffff',
            'card-bg': '#ffffff',
            'shadow-color': 'rgba(52, 152, 219, 0.2)',
            'border-color': '#e0e0e0',
            'hover-color': '#2980b9'
        },
        dark: {
            'bg-color': '#0a1930',
            'second-bg-color': '#112240',
            'text-color': '#e2e8f0',
            'main-color': '#00e5ff',
            'accent-color': '#00bcd4',
            'header-bg': 'rgba(10, 25, 48, 0.95)',
            'footer-bg': '#112240',
            'card-bg': '#1a2942',
            'shadow-color': 'rgba(0, 229, 255, 0.3)',
            'border-color': '#1e3a5f',
            'hover-color': '#4df2ff'
        },
        normal: {
            'bg-color': '#1a1a1a',
            'second-bg-color': '#2d2d2d',
            'text-color': '#ffffff',
            'main-color': '#ff6b6b',
            'accent-color': '#ff5252',
            'header-bg': 'rgba(26, 26, 26, 0.95)',
            'footer-bg': '#2d2d2d',
            'card-bg': '#333333',
            'shadow-color': 'rgba(255, 107, 107, 0.2)',
            'border-color': '#404040',
            'hover-color': '#ff5252'
        }
    };

    function updateTheme(theme) {
        // Always default to dark theme if no theme or invalid theme
        if (!theme || !themes[theme]) {
            theme = 'dark';
        }
        
        const themeConfig = themes[theme];
        
        // Update CSS variables
        Object.entries(themeConfig).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        // Force dark theme styles for specific elements
        document.body.style.background = themeConfig['bg-color'];
        document.body.style.color = themeConfig['text-color'];

        // Update specific elements
        const header = document.querySelector('.header');
        const footer = document.querySelector('footer');
        const sections = document.querySelectorAll('section');
        
        if (header) {
            header.style.background = themeConfig['header-bg'];
        }
        if (footer) {
            footer.style.background = themeConfig['footer-bg'];
        }

        // Update sections background
        sections.forEach(section => {
            if (section.classList.contains('home')) {
                section.style.background = themeConfig['bg-color'];
            }
        });

        // Save theme preference
        localStorage.setItem('preferred-theme', theme);
        
        // Update active button
        themeBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-theme="${theme}"]`)?.classList.add('active');

        // Update typing text color if it exists
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            typingText.style.color = themeConfig['text-color'];
        }
    }

    // Event listeners for theme buttons
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateTheme(btn.dataset.theme);
        });
    });

    // Always start with dark theme
    updateTheme('dark');
}

// Initialize theme switcher immediately
initThemeSwitcher();

// Also initialize when DOM is loaded (as backup)
document.addEventListener('DOMContentLoaded', () => {
    // Force dark theme again as safety
    const darkTheme = themes.dark;
    Object.entries(darkTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
    
    // Initialize theme switcher
    initThemeSwitcher();
});

// Update the typing animation function
function typeWriter() {
    if (!typingText) {
        console.log('Typing text element not found');
        return;
    }
    
    // Make sure text is visible
    typingText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    
    if (typingIndex < text.length) {
        typingText.textContent += text.charAt(typingIndex);
        typingIndex++;
        const delay = Math.random() * 30 + 20;
        setTimeout(typeWriter, delay);
    } else {
        typingText.classList.add('typing-complete');
    }
}

// Update the check typing start function
function checkTypingStart() {
    if (!typingText) {
        console.log('Typing text element not found in checkTypingStart');
        return;
    }

    if (!hasStartedTyping && isElementInViewport(typingText)) {
        console.log('Starting typing animation');
        hasStartedTyping = true;
        typingText.textContent = ''; // Clear existing text
        typingText.style.opacity = '1'; // Ensure visibility
        typingIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// DOM Elements and Constants (at the beginning of the file)
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const typingText = document.querySelector('.typing-text');
const professionText = document.querySelector('.profession-text');

// Constants
const professions = [
    "Software Designer",
    "Full Stack Developer",
    "Web Developer",
    "Python Developer",
    "Java Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer"
];

const text = "I am a dedicated Computer Science Engineering student at Pimpri Chinchwad College of Engineering and Research, Pune. With a strong foundation in Java, Python, and web development, I combine technical expertise with creative problem-solving skills. My recent work includes developing Vedas Vision, an innovative chatbot for the Smart India Hackathon. I'm passionate about creating efficient solutions and eager to contribute to meaningful projects in software development.";

// State variables
let typingIndex = 0;
let hasStartedTyping = false;
let professionIndex = 0;

// Typing Animation Functions
function typeWriter() {
    if (!typingText) return;
    
    if (typingIndex < text.length) {
        typingText.textContent += text.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeWriter, 30); // Fixed delay for smoother typing
    }
}

function startTyping() {
    if (!typingText || hasStartedTyping) return;
    
    hasStartedTyping = true;
    typingText.textContent = '';
    typingIndex = 0;
    typeWriter();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initThemeSwitcher();
    
    // Start typing animation immediately
    if (typingText) {
        typingText.style.opacity = '1';
        typingText.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        startTyping();
    }

    // Start profession updates
    if (professionText) {
        updateProfession();
        setInterval(updateProfession, 3000);
    }
});

// Update profession text
function updateProfession() {
    if (!professionText) return;
    
    professionText.style.opacity = '0';
    setTimeout(() => {
        professionText.textContent = professions[professionIndex];
        professionText.style.opacity = '1';
        professionIndex = (professionIndex + 1) % professions.length;
    }, 500);
}

// Update the default theme variables in CSS
document.documentElement.style.setProperty('--main-color', '#00e5ff');
document.documentElement.style.setProperty('--accent-color', '#00bcd4');
document.documentElement.style.setProperty('--hover-color', '#4df2ff');
document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 229, 255, 0.3)');

// Add glowing effect to main elements
function addGlowEffects() {
    const root = document.documentElement;
    const style = document.createElement('style');
    style.textContent = `
        .btn:hover, .social-icon:hover {
            box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);
        }
        
        .timeline-station {
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }
        
        .project-card:hover {
            box-shadow: 0 8px 25px rgba(0, 229, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
}

// Call this function when initializing dark theme
document.addEventListener('DOMContentLoaded', addGlowEffects);

// Add Razorpay script to head
const razorpayScript = document.createElement('script');
razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
document.head.appendChild(razorpayScript);

// Coffee button functionality
document.getElementById('coffee-btn').addEventListener('click', function() {
    const amountInput = document.getElementById('payment-amount');
    const amount = Math.floor(parseFloat(amountInput.value) * 100); // Convert to paise
    
    // Validate amount
    if (isNaN(amount) || amount < 100) { // Minimum ₹1
        alert('Please enter a valid amount (minimum ₹1)');
        return;
    }

    const options = {
        key: "rzp_live_eZsRaIzVHmdrAa",
        amount: amount, // Amount from input in paise
        currency: 'INR',
        name: 'Buy Me a Coffee',
        description: 'Support my work',
        handler: function(response) {
            setLoadingState(false);
            alert('Payment successful! Thank you for your support!');
            console.log(response);
            // Reset amount to default after successful payment
            amountInput.value = '100';
        },
        prefill: {
            name: '',
            email: ''
        },
        theme: {
            color: '#00e5ff'
        },
        modal: {
            ondismiss: function() {
                setLoadingState(false);
            }
        }
    };

    setLoadingState(true);
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
});

// Add input validation
document.getElementById('payment-amount').addEventListener('input', function(e) {
    let value = e.target.value;
    // Remove any non-numeric characters except decimal point
    value = value.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    // Limit to 2 decimal places
    if (parts[1]) parts[1] = parts[1].slice(0, 2);
    value = parts.join('.');
    e.target.value = value;
});

// Add loading state to button
function setLoadingState(isLoading) {
    const button = document.getElementById('coffee-btn');
    if (isLoading) {
        button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Processing...';
        button.disabled = true;
    } else {
        button.innerHTML = '<i class="bx bx-coffee-togo"></i> Buy Me a Coffee';
        button.disabled = false;
    }
}
