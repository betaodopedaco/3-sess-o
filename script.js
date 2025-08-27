// Slider Interativo
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('comparison-slider');
    const handle = document.querySelector('.comparison-handle');
    const after = document.querySelector('.comparison-after');
    let isDragging = false;
    
    function initSlider() {
        // Posição inicial
        after.style.width = '50%';
        
        // Event listeners
        handle.addEventListener('mousedown', startDragging);
        handle.addEventListener('touchstart', startDragging);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
    }
    
    function startDragging(e) {
        e.preventDefault();
        isDragging = true;
        handle.style.transition = 'none';
        after.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let clientX;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        const sliderRect = slider.getBoundingClientRect();
        let position = ((clientX - sliderRect.left) / sliderRect.width) * 100;
        
        // Limitar entre 0 e 100
        position = Math.max(0, Math.min(position, 100));
        
        after.style.width = `${position}%`;
        handle.style.left = `${position}%`;
    }
    
    function stopDragging() {
        isDragging = false;
        handle.style.transition = 'left 0.3s ease';
        after.style.transition = 'width 0.3s ease';
    }
    
    // Iniciar slider
    initSlider();
    
    // Animação ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.hero-title, .hero-subtitle, .divider, .section-title, .narrative-title, .narrative-text, .pillar-card, .cta-title, .cta-subtitle, .cta-button').forEach(el => {
        observer.observe(el);
    });
});
