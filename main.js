// 1. Gooey Nav Logic
const navItems = document.querySelectorAll('.nav-item');
const navBlob = document.getElementById('nav-blob');

function updateNavBlob(activeItem) {
    if (!activeItem) return;
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = activeItem.parentElement.getBoundingClientRect();
    
    const leftOffset = itemRect.left - containerRect.left;
    const width = itemRect.width;
    
    navBlob.style.transform = `translateX(${leftOffset}px)`;
    navBlob.style.width = `${width}px`;
}

// Initial set
const initialActive = document.querySelector('.nav-item.active');
if (initialActive) updateNavBlob(initialActive);

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        updateNavBlob(item);
    });
});

// Update active nav based on scroll position using Intersection Observer
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeNav = document.querySelector(`.nav-item[href="#${id}"]`);
            if (activeNav) {
                navItems.forEach(nav => nav.classList.remove('active'));
                activeNav.classList.add('active');
                updateNavBlob(activeNav);
            }
        }
    });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

// 2. Projects Deck Drag/Wheel Scroll
const deckWrapper = document.querySelector('.projects-deck-wrapper');
let isDown = false;
let startX;
let scrollLeft;

deckWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - deckWrapper.offsetLeft;
    scrollLeft = deckWrapper.scrollLeft;
});
deckWrapper.addEventListener('mouseleave', () => {
    isDown = false;
});
deckWrapper.addEventListener('mouseup', () => {
    isDown = false;
});
deckWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - deckWrapper.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    deckWrapper.scrollLeft = scrollLeft - walk;
});

// Support vertical mouse wheel to scroll horizontally in the deck area
deckWrapper.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        deckWrapper.scrollLeft += e.deltaY;
    }
}, { passive: false });


// 3. Magic Rings Cursor Effect
const ringsContainer = document.getElementById('magic-rings-container');
const rings = [];
const numRings = 10;
const ringColors = ['#ff2020', '#1e90ff']; // Red and DodgerBlue

for (let i = 0; i < numRings; i++) {
    const ring = document.createElement('div');
    ring.classList.add('magic-ring');
    ringsContainer.appendChild(ring);
    rings.push({
        el: ring,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size: 10 + i * 8,
        color: ringColors[i % 2]
    });
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateRings() {
    let currentX = mouseX;
    let currentY = mouseY;

    rings.forEach((ring, index) => {
        // Linear interpolation for smooth trailing effect
        ring.x += (currentX - ring.x) * (0.2 + (index * 0.02));
        ring.y += (currentY - ring.y) * (0.2 + (index * 0.02));
        
        ring.el.style.left = `${ring.x}px`;
        ring.el.style.top = `${ring.y}px`;
        ring.el.style.width = `${ring.size}px`;
        ring.el.style.height = `${ring.size}px`;
        ring.el.style.borderColor = ring.color;
        
        // Pass current position to next ring in loop
        currentX = ring.x;
        currentY = ring.y;
    });
    
    requestAnimationFrame(animateRings);
}
animateRings();

// 4. Balatro Effect Background Canvas (WebGl/Canvas abstraction)
const canvas = document.getElementById('balatro-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Simple noise/grain combined with a flowing gradient field
let time = 0;
function drawBalatro() {
    time += 0.01;
    
    // Abstract fluid shapes
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#0a0510');
    gradient.addColorStop(0.5, '#1a0830');
    gradient.addColorStop(1, '#0a0510');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    // Create soft orbs moving slowly
    ctx.globalCompositeOperation = 'screen';
    
    const drawOrb = (cx, cy, r, color) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
    };
    
    const x1 = w/2 + Math.sin(time) * w/3;
    const y1 = h/2 + Math.cos(time * 0.8) * h/3;
    drawOrb(x1, y1, w/2, 'rgba(255, 32, 32, 0.03)'); // Signal Red
    
    const x2 = w/2 + Math.cos(time * 1.2) * w/3;
    const y2 = h/2 + Math.sin(time * 0.9) * h/3;
    drawOrb(x2, y2, w/2, 'rgba(30, 144, 255, 0.03)'); // Dodger Blue
    
    ctx.globalCompositeOperation = 'source-over';
    
    requestAnimationFrame(drawBalatro);
}
drawBalatro();
