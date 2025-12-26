document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.lightgallery');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const src = this.getAttribute('data-src');
            const imgElement = this.querySelector('img');
            const actualSrc = imgElement ? imgElement.src : src;
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <img src="${actualSrc}" alt="Preview" class="max-w-full max-h-screen object-contain">
                    <button class="absolute top-4 right-4 text-white text-3xl hover:text-secondary transition">×</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const closeBtn = modal.querySelector('button');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = 'gallery';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'gallery.html') {
                link.classList.add('active');
            }
        });
        
        if (window.Alpine && window.Alpine.evaluate) {
            window.Alpine.evaluate(document.body, 'activeSection', current);
        }
    }
    
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
});