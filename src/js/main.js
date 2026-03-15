/**
 * SC Engineering - Consolidated Interactivity Script
 * Handles global components and page-specific features across the entire site.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GLOBAL: Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. GLOBAL: Dynamic Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. GLOBAL: Mobile Navigation Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // --- 4. HOMEPAGE: Hero Slideshow (index.html) ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideshow-dots');
    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;

        // Initialize dots based on number of slides
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `h-1.5 rounded-full transition-all ${i === 0 ? 'w-10 bg-white' : 'w-2 bg-white/40'}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(n) {
            slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
            dotsContainer.children[currentSlide].className = 'h-1.5 w-2 bg-white/40 rounded-full';
            currentSlide = n;
            slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
            dotsContainer.children[currentSlide].className = 'h-1.5 w-10 bg-white rounded-full';
        }

        // Auto-cycle slides every 6 seconds
        setInterval(() => goToSlide((currentSlide + 1) % slides.length), 6000);
    }

    // --- 5. GLOBAL: Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { 
                if(e.isIntersecting) e.target.classList.add('active'); 
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
    }

    // --- 6. SERVICES: Interactive Tab System (services.html) ---
    const serviceContent = document.getElementById('service-content');
    const tabCnc = document.getElementById('tab-cnc');
    const tabDev = document.getElementById('tab-dev');

    if (serviceContent && (tabCnc || tabDev)) {
        const details = {
            cnc: {
                title: "CNC Manufacturing",
                desc: "Our workshop is optimized for 4-axis precision machining. We specialize in complex components that require tight tolerances and superior finishes.",
                items: ["Aluminum, Stainless Steel & Brass", "Engineering Plastics (PEEK, Delrin, Nylon)", "Micron-level accuracy and repeatability", "Small to medium batch production"],
                image: "/assets/Slide_Show/SS_workshop.jpg"
            },
            dev: {
                title: "Product Development",
                desc: "We assist clients from the napkin sketch stage through to functional production prototypes.",
                items: ["CAD/CAM System Integration", "Iterative mechanical prototyping", "Control system & Mechatronics design", "Full technical documentation"],
                image: "/assets/Product_Development.jpg"
            }
        };

        function updateTab(key) {
            const data = details[key];
            serviceContent.style.opacity = 0;
            
            setTimeout(() => {
                serviceContent.innerHTML = `
                    <div class="space-y-8 animate-fade-in">
                        <h2 class="text-4xl font-bold text-slate-900">${data.title}</h2>
                        <p class="text-xl text-slate-500 leading-relaxed">${data.desc}</p>
                        <ul class="space-y-4">
                            ${data.items.map(item => `
                                <li class="flex items-center gap-4 font-bold text-slate-700">
                                    <div class="w-2 h-2 rounded-full bg-blue-900"></div> ${item}
                                </li>
                            `).join('')}
                        </ul>
                        <a href="contact.html" class="inline-block bg-[#0b1f3f] text-white px-8 py-4 rounded-lg font-bold hover:scale-105 transition-all">Start Project</a>
                    </div>
                    <div class="relative rounded-3xl overflow-hidden shadow-2xl h-[550px] border border-slate-100">
                        <img src="${data.image}" class="w-full h-full object-cover" alt="${data.title}">
                    </div>
                `;
                serviceContent.style.opacity = 1;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 300);
        }

        if (tabCnc) {
            tabCnc.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                tabCnc.classList.add('active');
                updateTab('cnc');
            });
        }

        if (tabDev) {
            tabDev.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                tabDev.classList.add('active');
                updateTab('dev');
            });
        }

        // Initialize with CNC data
        updateTab('cnc');
    }

    // --- 7. PROJECTS: Card Expansion (projects.html) ---
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const inner = btn.closest('.card-inner');
            const overlay = inner.querySelector('.card-overlay');
            const video = inner.querySelector('.video-bg');
            
            if (inner.classList.contains('h-[500px]')) {
                inner.classList.replace('h-[500px]', 'h-[700px]');
                if (overlay) overlay.classList.add('opacity-0');
                if (video) video.classList.replace('brightness-[0.4]', 'brightness-100');
                btn.innerHTML = '<i data-lucide="minimize-2"></i>';
            } else {
                inner.classList.replace('h-[700px]', 'h-[500px]');
                if (overlay) overlay.classList.remove('opacity-0');
                if (video) video.classList.replace('brightness-100', 'brightness-[0.4]');
                btn.innerHTML = '<i data-lucide="maximize-2"></i>';
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    });

    // --- 8. CONTACT: Form Submission Handling (contact.html) ---
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    if (contactForm && formContainer) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-center p-8">
                    <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100">
                        <i data-lucide="check" class="w-12 h-12"></i>
                    </div>
                    <h3 class="text-4xl font-bold mb-4">Request Sent</h3>
                    <p class="text-slate-500 text-lg mb-10">An engineer will review your request and get back to you within 24 hours.</p>
                    <button id="reset-form" class="bg-[#0b1f3f] text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">Send Another Message</button>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            const resetBtn = document.getElementById('reset-form');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    location.reload();
                });
            }
        });
    }
});