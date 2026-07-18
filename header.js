document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header Scroll Logic
    const headerElement = document.querySelector('.header');
    if (headerElement) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerElement.classList.add('header-scrolled');
            } else {
                headerElement.classList.remove('header-scrolled');
            }
        });
    }

    // Плавный скролл для якорных ссылок и защита от бага браузера с хешем
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Учитываем высоту свернутой шапки при скролле (70px)
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Удаляем хэш из URL, чтобы при обновлении страницы она не прыгала
                history.replaceState(null, null, window.location.pathname);
            }
        });
    });

    // Если кто-то уже сохранил хэш в ссылке, удаляем его и скроллим наверх
    if (window.location.hash === '#shop') {
        history.replaceState(null, null, window.location.pathname);
        window.scrollTo(0, 0);
    }
    
    // Жестко фиксируем позицию на самом верху, если пользователь обновляет страницу в начале
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    setTimeout(() => {
        if (window.scrollY < 150) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, 10);
});
