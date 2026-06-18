document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const leadForm = document.getElementById('lead-form');
    const formStatus = document.getElementById('form-status-msg');
    
    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
            
            // Toggle body scroll to prevent background scrolling when menu is open
            if (mainNav.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 2. Header Scroll Effects & Back to Top Button
    // ==========================================
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        
        // Header styling on scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPosition > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // ScrollSpy: Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // offset header
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger scroll check on load to ensure state matches initial reload position
    handleScroll();

    // ==========================================
    // 3. Contact Form Submission (Mailto Redirection)
    // ==========================================
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            const email = document.getElementById('form-email').value;
            const serviceSelect = document.getElementById('form-service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            const message = document.getElementById('form-message').value;

            // Construct email details
            const recipient = 'edilson@tecnofriosul.com';
            const subject = `Solicitação de Orçamento - ${name}`;
            
            const body = `Olá Edilson,\n\n` +
                         `Gostaria de solicitar um orçamento com os seguintes dados:\n\n` +
                         `- Nome: ${name}\n` +
                         `- Telefone/WhatsApp: ${phone}\n` +
                         `- E-mail: ${email}\n` +
                         `- Serviço: ${serviceText}\n\n` +
                         `Mensagem adicional:\n${message || 'Sem mensagem adicional.'}\n\n` +
                         `Vim através do site da TECNOFRIO.`;

            // Create mailto url and redirect
            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Redirect to open email client
            window.location.href = mailtoUrl;

            // Provide feedback to the user on the screen
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Seu cliente de e-mail foi aberto! Envie a mensagem gerada para ${recipient}.`;
            
            // Reset form fields
            leadForm.reset();
            
            // Clear message after 8 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
                formStatus.className = 'form-status';
            }, 8000);
        });
    }

    // ==========================================
    // Hero Slider Carousel
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 2500; // 4 seconds

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };

    if (slides.length > 0 && dots.length > 0) {
        let slideTimer = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideTimer);
                showSlide(index);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // ==========================================
    // Portfolio Slider Carousel
    // ==========================================
    const portfolioSlides = document.querySelectorAll('.portfolio-slide');
    const portfolioDots = document.querySelectorAll('.p-dot');
    const portfolioPrevBtn = document.getElementById('portfolio-prev');
    const portfolioNextBtn = document.getElementById('portfolio-next');
    let currentPortfolioSlide = 0;
    const portfolioInterval = 4000; // 4 seconds

    const showPortfolioSlide = (index) => {
        if (portfolioSlides.length === 0) return;
        
        portfolioSlides.forEach(slide => slide.classList.remove('active'));
        portfolioDots.forEach(dot => dot.classList.remove('active'));
        
        portfolioSlides[index].classList.add('active');
        if (portfolioDots[index]) {
            portfolioDots[index].classList.add('active');
        }
        currentPortfolioSlide = index;
    };

    const nextPortfolioSlide = () => {
        if (portfolioSlides.length === 0) return;
        let next = (currentPortfolioSlide + 1) % portfolioSlides.length;
        showPortfolioSlide(next);
    };

    const prevPortfolioSlide = () => {
        if (portfolioSlides.length === 0) return;
        let prev = (currentPortfolioSlide - 1 + portfolioSlides.length) % portfolioSlides.length;
        showPortfolioSlide(prev);
    };

    if (portfolioSlides.length > 0) {
        let portfolioTimer = setInterval(nextPortfolioSlide, portfolioInterval);

        const resetPortfolioTimer = () => {
            clearInterval(portfolioTimer);
            portfolioTimer = setInterval(nextPortfolioSlide, portfolioInterval);
        };

        if (portfolioPrevBtn) {
            portfolioPrevBtn.addEventListener('click', () => {
                prevPortfolioSlide();
                resetPortfolioTimer();
            });
        }

        if (portfolioNextBtn) {
            portfolioNextBtn.addEventListener('click', () => {
                nextPortfolioSlide();
                resetPortfolioTimer();
            });
        }

        if (portfolioDots.length > 0) {
            portfolioDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showPortfolioSlide(index);
                    resetPortfolioTimer();
                });
            });
        }
    }

    // ==========================================
    // 4. Smooth scroll for all anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - (header.offsetHeight - 10);
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
