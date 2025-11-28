let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

function showCarouselItem(index) {
    carouselItems.forEach(item => {
        item.classList.remove('active');
    });
    
    carouselIndicators.forEach(indicator => {
        indicator.classList.remove('bg-primary');
        indicator.classList.add('bg-primary/30');
    });
    
    carouselItems[index].classList.add('active');
    
    carouselIndicators[index].classList.remove('bg-primary/30');
    carouselIndicators[index].classList.add('bg-primary');
    
    currentCarouselIndex = index;
}

showCarouselItem(0);

carouselPrev.addEventListener('click', function() {
    let newIndex = currentCarouselIndex - 1;
    if (newIndex < 0) newIndex = carouselItems.length - 1;
    showCarouselItem(newIndex);
});

carouselNext.addEventListener('click', function() {
    let newIndex = currentCarouselIndex + 1;
    if (newIndex >= carouselItems.length) newIndex = 0;
    showCarouselItem(newIndex);
});

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
        showCarouselItem(index);
    });
});

setInterval(() => {
    let newIndex = currentCarouselIndex + 1;
    if (newIndex >= carouselItems.length) newIndex = 0;
    showCarouselItem(newIndex);
}, 5000);

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    if (window.Alpine && window.Alpine.evaluate) {
        window.Alpine.evaluate(document.body, 'activeSection', current);
    }
}

function initMap() {
    const sukarameCoords = [-7.12694167, 107.70324813,969.09062824];
    
    const map = L.map('map').setView(sukarameCoords, 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker(sukarameCoords)
        .addTo(map)
        .bindPopup('<b>Desa Sukarame</b><br>Lokasi implementasi Sok!Anak')
        .openPopup();
}

function initChart() {
    const ctx = document.getElementById('stuntingChart').getContext('2d');
    
    const data = {
        labels: ['Stunting', 'Risiko Stunting', 'Normal'],
        datasets: [{
            data: [80, 120, 360],
            backgroundColor: [
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(34, 197, 94, 0.8)'
            ],
            borderColor: [
                'rgb(239, 68, 68)',
                'rgb(245, 158, 11)',
                'rgb(34, 197, 94)'
            ],
            borderWidth: 1
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} anak (${percentage}%)`;
                        }
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    updateActiveSection();
    
    initMap();
    initChart();
});

window.addEventListener('scroll', updateActiveSection);

document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});