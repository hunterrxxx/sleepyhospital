// ============================================
// SLEEP SCIENCE WEBSITE - JAVASCRIPT
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animateElements = document.querySelectorAll(
    '.cycle-card, .food-item, .exercise-card, .hygiene-card, ' +
    '.routine-phase, .meal-phase, .factor-card, .timing-card, ' +
    '.type-card, .condition-card, .symptom-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// BACK TO TOP BUTTON (Optional Enhancement)
// ============================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Add styles for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-color, #6b5ce7);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--accent-light, #a29bfe);
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(backToTopStyle);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// PROGRESSIVE DISCLOSURE FOR LONG CONTENT
// ============================================
const longSections = document.querySelectorAll('.factor-card, .condition-card');

longSections.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

// ============================================
// LAZY LOADING FOR IMAGES (If Added Later)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to go to top
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Press 'M' to toggle mobile menu
    if (e.key === 'm' && e.ctrlKey && window.innerWidth <= 768) {
        e.preventDefault();
        navMenu.classList.toggle('active');
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const throttledScrollHandler = throttle(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// ============================================
// ZOOM FUNCTIONALITY
// ============================================
const zoomControls = document.getElementById('zoomControls');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomInBtn = document.getElementById('zoomIn');
const zoomResetBtn = document.getElementById('zoomReset');
const zoomLevelDisplay = document.getElementById('zoomLevel');

let currentZoom = 100;
const minZoom = 50;  // Minimum 50%
const maxZoom = 150; // Maximum 150%
const zoomStep = 10; // 10% increments

// Create zoom wrapper if it doesn't exist
let zoomWrapper = document.getElementById('zoomWrapper');
if (!zoomWrapper) {
    zoomWrapper = document.createElement('div');
    zoomWrapper.id = 'zoomWrapper';
    zoomWrapper.style.cssText = 'transition: transform 0.3s ease; transform-origin: top center;';
    
    // Wrap all body content except navbar
    const navbar = document.getElementById('navbar');
    const bodyChildren = Array.from(document.body.children);
    
    bodyChildren.forEach(child => {
        if (child !== navbar && child.tagName !== 'SCRIPT') {
            zoomWrapper.appendChild(child);
        }
    });
    
    // Insert wrapper after navbar
    if (navbar && navbar.parentNode) {
        navbar.parentNode.insertBefore(zoomWrapper, navbar.nextSibling);
    }
}

// Add zoom styles
const zoomStyles = document.createElement('style');
zoomStyles.textContent = `
    #zoomWrapper {
        transition: transform 0.3s ease;
        transform-origin: top center;
    }
    
    .zoom-controls {
        order: -1;
    }
    
    @media (max-width: 768px) {
        .nav-container {
            flex-wrap: wrap;
        }
        
        .zoom-controls {
            order: 0;
            margin-top: 0.5rem;
            width: 100%;
            justify-content: center;
        }
    }
`;
document.head.appendChild(zoomStyles);

// Update zoom function
function updateZoom(newZoom) {
    // Clamp zoom value
    newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    currentZoom = newZoom;
    
    // Apply zoom transform
    const scale = currentZoom / 100;
    zoomWrapper.style.transform = `scale(${scale})`;
    
    // Update display
    zoomLevelDisplay.textContent = `${currentZoom}%`;
    
    // Save to localStorage
    localStorage.setItem('websiteZoom', currentZoom);
    
    // Add visual feedback
    zoomLevelDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        zoomLevelDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Zoom in
zoomInBtn.addEventListener('click', () => {
    updateZoom(currentZoom + zoomStep);
});

// Zoom out
zoomOutBtn.addEventListener('click', () => {
    updateZoom(currentZoom - zoomStep);
});

// Reset zoom
zoomResetBtn.addEventListener('click', () => {
    updateZoom(100);
});

// Load saved zoom level
const savedZoom = localStorage.getItem('websiteZoom');
if (savedZoom) {
    updateZoom(parseInt(savedZoom));
}

// Keyboard shortcuts for zoom
document.addEventListener('keydown', (e) => {
    // Ctrl + Plus key to zoom in
    if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        updateZoom(currentZoom + zoomStep);
    }
    
    // Ctrl + Minus key to zoom out
    if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        updateZoom(currentZoom - zoomStep);
    }
    
    // Ctrl + 0 to reset zoom
    if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        updateZoom(100);
    }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Highlight first nav link on load
    if (window.pageYOffset < 100) {
        const firstLink = document.querySelector('.nav-link');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
    
    console.log('🌙 Sleep Science Website Initialized');
    console.log('💡 Tips: Press Ctrl+T to go to top, Ctrl+M to toggle menu (mobile)');
    console.log('🔍 Zoom: Use A+/A- buttons or Ctrl+Plus/Ctrl+Minus to zoom in/out');
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyles = document.createElement('style');
focusStyles.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--accent-color, #6b5ce7);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyles);

// ============================================
// SERVICE WORKER REGISTRATION (For PWA - Optional)
// ============================================
if ('serviceWorker' in navigator) {
    // Uncomment below to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================
// Track section views
const sectionTracker = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('id');
            // Uncomment to enable analytics
            // gtag('event', 'section_view', { section_name: sectionName });
            console.log(`Viewing section: ${sectionName}`);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionTracker.observe(section);
});

// ============================================
// BREATHING EXERCISES
// ============================================
class BreathingExercise {
    constructor(element) {
        this.element = element;
        this.technique = element.dataset.technique;
        this.circle = element.querySelector('.breathing-circle');
        this.circleInner = element.querySelector('.circle-inner');
        this.breathingText = element.querySelector('.breathing-text');
        this.breathingTimer = element.querySelector('.breathing-timer');
        this.startBtn = element.querySelector('.btn-start');
        this.resetBtn = element.querySelector('.btn-reset');
        this.steps = element.querySelectorAll('.step');
        
        this.isRunning = false;
        this.currentPhase = 0;
        this.timeRemaining = 0;
        this.timerInterval = null;
        this.totalTime = 0;
        this.audioContext = null;
        this.lastSecond = 0;
        
        this.techniques = {
            '478': {
                phases: [
                    { name: 'inhale', duration: 4 },
                    { name: 'hold', duration: 7 },
                    { name: 'exhale', duration: 8 }
                ],
                repeat: 4
            },
            'bhramari': {
                phases: [
                    { name: 'inhale', duration: 4 },
                    { name: 'hum', duration: 6 }
                ],
                repeat: 5
            },
            'threepart': {
                phases: [
                    { name: 'inhale', duration: 4 },
                    { name: 'exhale', duration: 8 }
                ],
                repeat: 10
            },
            'diaphragmatic': {
                phases: [
                    { name: 'inhale', duration: 5 },
                    { name: 'exhale', duration: 7 }
                ],
                repeat: 10
            },
            'alternate-nostril': {
                phases: [
                    { name: 'left', duration: 4 },
                    { name: 'hold', duration: 4 },
                    { name: 'right', duration: 4 }
                ],
                repeat: 10
            },
            'buteyko': {
                phases: [
                    { name: 'normal', duration: 30 },
                    { name: 'hold', duration: 0 } // Variable hold
                ],
                repeat: 5
            },
            'papworth': {
                phases: [
                    { name: 'inhale', duration: 4 },
                    { name: 'exhale', duration: 4 }
                ],
                repeat: 10
            },
            'box': {
                phases: [
                    { name: 'inhale', duration: 4 },
                    { name: 'hold', duration: 4 },
                    { name: 'exhale', duration: 4 },
                    { name: 'hold-empty', duration: 4 }
                ],
                repeat: 10
            }
        };
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.toggle());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        if (this.currentPhase === 0 && this.timeRemaining === 0) {
            this.totalTime = 0;
        }
        
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        this.startBtn.classList.add('running');
        this.circle.classList.add('active');
        
        // Initialize audio context on first user interaction
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        this.runPhase();
    }
    
    pause() {
        this.isRunning = false;
        this.startBtn.textContent = 'Resume';
        this.startBtn.classList.remove('running');
        this.circle.classList.remove('active');
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    reset() {
        this.pause();
        this.currentPhase = 0;
        this.timeRemaining = 0;
        this.totalTime = 0;
        this.startBtn.textContent = 'Start Exercise';
        
        this.breathingText.textContent = 'Ready';
        this.breathingTimer.textContent = '0:00';
        
        this.circle.className = 'breathing-circle';
        this.steps.forEach(step => step.classList.remove('active'));
    }
    
    runPhase() {
        if (!this.isRunning) return;
        
        const technique = this.techniques[this.technique];
        const phase = technique.phases[this.currentPhase];
        
        // Update UI
        this.updatePhaseUI(phase);
        
        // Set time for this phase
        this.timeRemaining = phase.duration;
        
        // For Buteyko breathing, use a default hold time if not set
        if (this.technique === 'buteyko' && this.currentPhase === 1 && phase.duration === 0) {
            this.timeRemaining = 10; // Default 10 seconds for hold
        }
        
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.totalTime++;
            
            // Play tempo sound every second
            this.playTempoSound();
            
            // Update timer display
            this.breathingTimer.textContent = this.formatTime(this.totalTime);
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.nextPhase();
            }
        }, 1000);
    }
    
    nextPhase() {
        const technique = this.techniques[this.technique];
        
        this.currentPhase++;
        
        // Check if we've completed all phases in one cycle
        if (this.currentPhase >= technique.phases.length) {
            this.currentPhase = 0;
            
            // Check if we've completed all repetitions
            if (!this.repeatCount) {
                this.repeatCount = 0;
            }
            this.repeatCount++;
            
            if (this.repeatCount >= technique.repeat) {
                this.complete();
                return;
            }
        }
        
        this.runPhase();
    }
    
    complete() {
        this.pause();
        this.breathingText.textContent = 'Complete!';
        this.startBtn.textContent = 'Start Again';
        this.currentPhase = 0;
        this.timeRemaining = 0;
        this.repeatCount = 0;
        this.circle.className = 'breathing-circle';
        this.steps.forEach(step => step.classList.remove('active'));
    }
    
    updatePhaseUI(phase) {
        // Update breathing text
        const phaseNames = {
            'inhale': 'Inhale',
            'exhale': 'Exhale',
            'hold': 'Hold',
            'hum': 'Hum',
            'left': 'Left Nostril',
            'right': 'Right Nostril',
            'normal': 'Breathe',
            'hold-empty': 'Hold Empty'
        };
        
        const phaseDisplayName = phaseNames[phase.name] || phase.name;
        this.breathingText.textContent = phaseDisplayName;
        
        // Speak the phase name
        this.speakPhase(phaseDisplayName);
        
        // Update circle appearance
        this.circle.className = 'breathing-circle ' + phase.name;
        
        // Update active step
        this.steps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.phase === phase.name) {
                step.classList.add('active');
            }
        });
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    playTempoSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    speakPhase(phaseName) {
        if (!('speechSynthesis' in window)) return;
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(phaseName);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        // Try to use a clear, pleasant voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Google') || 
            voice.name.includes('Microsoft') ||
            voice.lang.startsWith('en')
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    }
}

// Initialize all breathing exercises
document.addEventListener('DOMContentLoaded', () => {
    const exercises = document.querySelectorAll('.breathing-exercise');
    exercises.forEach(exercise => {
        new BreathingExercise(exercise);
    });
});

// ============================================
// ORDER MODAL FUNCTIONALITY
// ============================================
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const selectedProductSpan = document.getElementById('selectedProduct');
const buyNowButtons = document.querySelectorAll('.buy-now-btn');
const closeModalBtn = document.querySelector('.close-modal');

// WhatsApp number to send orders to
const WHATSAPP_NUMBER = '6203843687';

// UPI payment details
const UPI_ID = '6203843687';

// Open modal when Buy Now button is clicked
buyNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Check if it's a medication or product button
        const medication = button.getAttribute('data-medication');
        const product = button.getAttribute('data-product');
        
        // Use whichever attribute exists
        const itemName = medication || product;
        selectedProductSpan.textContent = itemName;
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal when clicking the X button
closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// ============================================
// TWO-STEP ORDER FLOW
// ============================================
const copyUpiIdBtn = document.getElementById('copyUpiId');
const upiPayBtn = document.getElementById('upiPayBtn');
const proceedToFormBtn = document.getElementById('proceedToFormBtn');
const backToPaymentBtn = document.getElementById('backToPaymentBtn');

const paymentStep = document.getElementById('paymentStep');
const formStep = document.getElementById('formStep');

// Copy UPI ID to clipboard
copyUpiIdBtn.addEventListener('click', () => {
    const upiId = UPI_ID;
    
    // Use Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyToClipboard(upiId);
        });
    } else {
        fallbackCopyToClipboard(upiId);
    }
});

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        alert('Failed to copy. Please manually copy the UPI ID: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess() {
    const originalText = copyUpiIdBtn.textContent;
    copyUpiIdBtn.textContent = '✓';
    copyUpiIdBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        copyUpiIdBtn.textContent = originalText;
        copyUpiIdBtn.style.background = '';
    }, 2000);
}

// UPI Pay Button - Opens UPI payment apps
upiPayBtn.addEventListener('click', () => {
    const product = selectedProductSpan.textContent;
    
    // Create UPI payment URL
    // Format: upi://pay?pa=UPI_ID&pn=Payee_Name&am=Amount&cu=CURRENCY&tn=Transaction_Note
    const transactionNote = encodeURIComponent(`Payment for ${product}`);
    const upiURL = `upi://pay?pa=${UPI_ID}&pn=SleepStore&tn=${transactionNote}&cu=INR`;
    
    // Try to open UPI app
    window.location.href = upiURL;
    
    // Show instructions
    setTimeout(() => {
        alert('If your UPI app did not open, please:\n\n1. Open any UPI app (Google Pay, PhonePe, Paytm, etc.)\n2. Send payment to UPI ID: ' + UPI_ID + '\n3. Amount: As per product price\n4. Take a screenshot of the payment confirmation\n5. Click "I\'ve Paid" below to fill your order details');
    }, 500);
});

// Proceed to form after payment
proceedToFormBtn.addEventListener('click', () => {
    // Hide payment step, show form step
    paymentStep.classList.add('hidden');
    formStep.classList.remove('hidden');
    
    // Scroll to top of modal content
    document.querySelector('.modal-content').scrollTop = 0;
});

// ============================================
// SCREENSHOT UPLOAD FUNCTIONALITY
// ============================================
const paymentScreenshotInput = document.getElementById('paymentScreenshot');
const filePreview = document.getElementById('filePreview');

// Handle file selection
paymentScreenshotInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, GIF, WebP) or PDF');
            paymentScreenshotInput.value = '';
            return;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            paymentScreenshotInput.value = '';
            return;
        }
        
        // Show preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                filePreview.innerHTML = `
                    <img src="${e.target.result}" alt="Payment Screenshot Preview">
                    <p class="file-name">${file.name}</p>
                    <button type="button" class="remove-file" id="removeFileBtn">Remove File</button>
                `;
                filePreview.classList.add('active');
                
                // Add remove file functionality
                document.getElementById('removeFileBtn').addEventListener('click', removeFile);
            };
            
            reader.readAsDataURL(file);
        } else {
            // For PDF or other files
            filePreview.innerHTML = `
                <p class="file-name">📄 ${file.name}</p>
                <button type="button" class="remove-file" id="removeFileBtn">Remove File</button>
            `;
            filePreview.classList.add('active');
            
            // Add remove file functionality
            document.getElementById('removeFileBtn').addEventListener('click', removeFile);
        }
    }
});

// Remove file function
function removeFile() {
    paymentScreenshotInput.value = '';
    filePreview.innerHTML = '';
    filePreview.classList.remove('active');
}

// Back to payment step
backToPaymentBtn.addEventListener('click', () => {
    // Hide form step, show payment step
    formStep.classList.add('hidden');
    paymentStep.classList.remove('hidden');
    
    // Scroll to top of modal content
    document.querySelector('.modal-content').scrollTop = 0;
});

// Handle form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const product = selectedProductSpan.textContent;
    
    // Validate form fields
    if (!name || !phone || !address) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create WhatsApp message with order details
    const message = `*New Order Confirmation*%0A%0A` +
                    `*Product:* ${product}%0A` +
                    `*Name:* ${name}%0A` +
                    `*Phone Number:* ${phone}%0A` +
                    `*Shipping Address:* ${address}%0A%0A` +
                    `I have completed the payment via UPI. Please confirm my order. Thank you!`;
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form and close modal
    orderForm.reset();
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Show success message
    alert('Thank you for your order! You will be redirected to WhatsApp to confirm your order.');
});

// ============================================
// EXPORT FOR TESTING
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        highlightNavLink
    };
}
