/* ==========================================================================
   LAVNA Smart Safe Locker - Custom JS Interactivity & Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialize Hero Carousel ---
    initHeroCarousel();

    // --- Hero Carousel Logic ---
    function initHeroCarousel() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.indicator-dot');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const carouselWrapper = document.querySelector('.hero-carousel-wrapper');
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        let slideInterval = null;
        const autoPlayDelay = 7000; // 7 seconds
        
        function showSlide(index) {
            // Remove active classes
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
            
            // Set new index with wrapping
            currentSlide = (index + slides.length) % slides.length;
            
            // Add active classes
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Event Listeners for buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                resetTimer();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                resetTimer();
            });
        }
        
        // Event Listeners for indicator dots
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(idx);
                resetTimer();
            });
        });
        
        // Auto Play Timer
        function startTimer() {
            if (!slideInterval) {
                slideInterval = setInterval(nextSlide, autoPlayDelay);
            }
        }
        
        function stopTimer() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
        
        function resetTimer() {
            stopTimer();
            startTimer();
        }
        
        // Start autoplay
        startTimer();
        
        // Pause on Hover
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopTimer);
            carouselWrapper.addEventListener('mouseleave', startTimer);
        }
    }

    // --- Elements Selector ---
    const enquiryForm = document.getElementById('enquiryForm');
    const floatingBtn = document.getElementById('floatingEnquiryBtn');
    const enquiryModal = document.getElementById('enquiryModal');
    const closeEnquiryModal = document.getElementById('closeEnquiryModal');
    const contactTriggers = document.querySelectorAll('.contact-btn, #floatingEnquiryBtn, .picker-buy-btn, .contact-trigger');
    
    // Form Inputs
    const userNameInput = document.getElementById('userName');
    const userPhoneInput = document.getElementById('userPhone');
    const userMessageInput = document.getElementById('userMessage');
    
    // Success Modal Elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // --- Pop-up Modal Controls ---
    if (enquiryModal) {
        contactTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                enquiryModal.classList.add('active');
            });
        });

        if (closeEnquiryModal) {
            closeEnquiryModal.addEventListener('click', () => {
                enquiryModal.classList.remove('active');
            });
        }

        // Close on overlay click
        enquiryModal.addEventListener('click', (e) => {
            if (e.target === enquiryModal) {
                enquiryModal.classList.remove('active');
            }
        });

        // Close on ESC key press
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && enquiryModal.classList.contains('active')) {
                enquiryModal.classList.remove('active');
            }
        });
    }

    // --- Real-time / On-Input Input Field Validation ---
    const validators = {
        name: (val) => val.trim().length > 0,
        phone: (val) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(val.trim().replace(/[- )(]/g, ''));
        }
    };

    const showInputError = (inputEl, errorId, show) => {
        const formGroup = inputEl.closest('.form-group-popup');
        if (!formGroup) return;
        
        if (show) {
            formGroup.classList.add('invalid');
        } else {
            formGroup.classList.remove('invalid');
        }
    };

    if (userNameInput) {
        userNameInput.addEventListener('input', () => {
            const isValid = validators.name(userNameInput.value);
            showInputError(userNameInput, 'nameError', !isValid);
        });
    }

    if (userPhoneInput) {
        userPhoneInput.addEventListener('input', () => {
            // Prevent typing non-numeric characters
            userPhoneInput.value = userPhoneInput.value.replace(/[^0-9]/g, '');
            const isValid = validators.phone(userPhoneInput.value);
            showInputError(userPhoneInput, 'phoneError', !isValid);
        });
    }

    // --- Form Submission Handling ---
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate required fields
            const isNameValid = validators.name(userNameInput.value);
            const isPhoneValid = validators.phone(userPhoneInput.value);
            
            showInputError(userNameInput, 'nameError', !isNameValid);
            showInputError(userPhoneInput, 'phoneError', !isPhoneValid);
            
            // Submit if name and phone are valid
            if (isNameValid && isPhoneValid) {
                // Hide enquiry modal
                if (enquiryModal) {
                    enquiryModal.classList.remove('active');
                }
                
                // Success actions: Show modal
                if (successModal) {
                    successModal.classList.add('active');
                }
                
                // Clear the form
                enquiryForm.reset();
                
                // Remove validation highlights
                document.querySelectorAll('.form-group-popup').forEach(group => {
                    group.classList.remove('invalid');
                });
            }
        });
    }

    // --- Success Modal Controls ---
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // --- Testimonials Auto-Slide Carousel ---
    const testimonialTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let cardWidth = testimonialCards[0].offsetWidth;
        let gap = 24; // Gap defined in CSS
        let currentIndex = 0;
        let slideInterval;
        
        const updateCardWidth = () => {
            cardWidth = testimonialCards[0].offsetWidth;
        };
        window.addEventListener('resize', updateCardWidth);
        
        const startTestimonialSlide = () => {
            slideInterval = setInterval(() => {
                currentIndex++;
                testimonialTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                testimonialTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
                
                // Loop: Reset back to index 0 when duplicate card is slid to
                if (currentIndex >= testimonialCards.length - 1) {
                    setTimeout(() => {
                        testimonialTrack.style.transition = 'none';
                        testimonialTrack.style.transform = 'translateX(0)';
                        currentIndex = 0;
                    }, 500);
                }
            }, 3500);
        };
        
        const stopTestimonialSlide = () => {
            clearInterval(slideInterval);
        };
        
        startTestimonialSlide();
        
        // Pause on Hover
        const sliderWrapper = document.querySelector('.testimonials-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopTestimonialSlide);
            sliderWrapper.addEventListener('mouseleave', startTestimonialSlide);
        }
    }

    // --- Interactive Product Picker (Locker Showcase) ---
    const pickerOptions = {
        '39': {
            title: 'LAVNA 39L Smart Safe Locker suitable for Jewelry, Cash, Document & other valuables',
            discount: '-75%',
            price: 'Rs. 5,990.00',
            originalPrice: 'Rs. 23,990.00',
            sold: '10000+',
            image: 'public/safe-39l.png'
        },
        '49': {
            title: 'LAVNA 49L Smart Safe Locker suitable for Jewelry, Cash, Document & other valuables',
            discount: '-71%',
            price: 'Rs. 7,990.00',
            originalPrice: 'Rs. 27,990.00',
            sold: '8500+',
            image: 'public/safe-49l.png'
        },
        '58': {
            title: 'LAVNA 58L Smart Safe Locker suitable for Jewelry, Cash, Document & other valuables',
            discount: '-69%',
            price: 'Rs. 9,990.00',
            originalPrice: 'Rs. 32,990.00',
            sold: '6200+',
            image: 'public/safe-58l.png'
        }
    };

    const optionItems = document.querySelectorAll('.safe-option-item');
    const displayTitle = document.getElementById('displayTitle');
    const displayDiscount = document.getElementById('displayDiscount');
    const displayPrice = document.getElementById('displayPrice');
    const displayOriginalPrice = document.getElementById('displayOriginalPrice');
    const displaySold = document.getElementById('displaySold');
    const displayImage = document.getElementById('displayImage');

    if (optionItems.length > 0) {
        optionItems.forEach(item => {
            item.addEventListener('click', () => {
                // If it is already active, do nothing
                if (item.classList.contains('active')) return;

                // Deactivate all option items
                optionItems.forEach(opt => opt.classList.remove('active'));
                // Activate clicked option item
                item.classList.add('active');

                // Get clicked product details
                const volume = item.getAttribute('data-volume');
                const product = pickerOptions[volume];

                if (product) {
                    // Smooth Fade transition
                    const animTargets = [displayTitle, displayDiscount, displayPrice, displayOriginalPrice, displaySold, displayImage];
                    
                    // Fade out
                    animTargets.forEach(el => {
                        if (el) el.style.opacity = '0';
                    });

                    setTimeout(() => {
                        // Swap content
                        if (displayTitle) displayTitle.textContent = product.title;
                        if (displayDiscount) displayDiscount.textContent = product.discount;
                        if (displayPrice) displayPrice.textContent = product.price;
                        if (displayOriginalPrice) displayOriginalPrice.textContent = product.originalPrice;
                        if (displaySold) displaySold.textContent = product.sold;
                        if (displayImage) {
                            displayImage.src = product.image;
                            displayImage.alt = `LAVNA ${volume}L Safe Locker`;
                        }

                        // Fade back in
                        animTargets.forEach(el => {
                            if (el) el.style.opacity = '1';
                        });
                    }, 250); // Match CSS fade transition time
                }
            });
        });
    }
});
