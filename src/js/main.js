/**
 * SC Engineering - Consolidated Interactivity Script
 * Handles global components and page-specific features.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Global Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // 4. Homepage Slideshow Logic (index.html)
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideshow-dots');
    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;

        // Initialize dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `h-1.5 rounded-full transition-all ${i === 0 ? 'w-10 bg-white' : 'w-2 bg-white/40'}`;
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

        setInterval(() => goToSlide((currentSlide + 1) % slides.length), 6000);
    }

    // 5. Scroll Reveal Logic (index.html)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { 
                if(e.isIntersecting) e.target.classList.add('active'); 
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
    }

    // 6. Services Tab Logic (services.html)
    const serviceContent = document.getElementById('service-content');
    const tabCnc = document.getElementById('tab-cnc');
    const tabDev = document.getElementById('tab-dev');

    if (serviceContent && tabCnc && tabDev) {
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
                    <div class="space-y-8">
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
                // Re-initialize icons in injected content
                lucide.createIcons();
            }, 300);
        }

        tabCnc.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabCnc.classList.add('active');
            updateTab('cnc');
        });

        tabDev.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            tabDev.classList.add('active');
            updateTab('dev');
        });

        // Initial Load
        updateTab('cnc');
    }

    // 7. Project Expansion Logic (projects.html)
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const inner = btn.closest('.card-inner');
            const overlay = inner.querySelector('.card-overlay');
            const video = inner.querySelector('.video-bg');
            
            if (inner.classList.contains('h-[500px]')) {
                inner.classList.replace('h-[500px]', 'h-[700px]');
                overlay.classList.add('opacity-0');
                video.classList.replace('brightness-[0.4]', 'brightness-100');
                btn.innerHTML = '<i data-lucide="minimize-2"></i>';
            } else {
                inner.classList.replace('h-[700px]', 'h-[500px]');
                overlay.classList.remove('opacity-0');
                video.classList.replace('brightness-100', 'brightness-[0.4]');
                btn.innerHTML = '<i data-lucide="maximize-2"></i>';
            }
            lucide.createIcons();
        });
    });

    // 8. Contact Form Submission (contact.html)
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    if (contactForm && formContainer) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formContainer.innerHTML = `
                <div class="h-full flex flex-col items-center justify-center text-center">
                    <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100">
                        <i data-lucide="check" class="w-12 h-12"></i>
                    </div>
                    <h3 class="text-4xl font-bold mb-4">Request Sent</h3>
                    <p class="text-slate-500 text-lg mb-10">An engineer will review your request and get back to you within 24 hours.</p>
                    <button id="reset-form" class="bg-[#0b1f3f] text-white px-8 py-3 rounded-lg font-bold">Send Another Message</button>
                </div>
            `;
            lucide.createIcons();
            
            document.getElementById('reset-form').addEventListener('click', () => {
                location.reload();
            });
        });
    }
});