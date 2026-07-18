(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; 
    canvas.style.zIndex = '10000'; // Поверх всего сайта, чтобы летали над шапкой
    
    document.body.appendChild(canvas);
    
    let width, height;
    let maxRadius;
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        // Максимальный радиус равен диагонали экрана, чтобы при мышке в углу покрывало противоположный угол
        maxRadius = Math.sqrt(width * width + height * height) + 100;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    const particles = [];
    const NUM_PARTICLES = 60; // Уменьшено количество частиц по просьбе
    
    let targetX = -1000;
    let targetY = -1000;
    let mouseX = -1000;
    let mouseY = -1000;
    let isActive = false;
    
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        // Добавляем scrollY * 0.5, чтобы физический центр роя смещался вместе со скроллом
        // Это компенсирует визуальный сдвиг параллакса при отрисовке, чтобы они все еще летели за мышкой
        targetY = e.clientY + window.scrollY * 0.5;
        if (!isActive) {
            mouseX = targetX;
            mouseY = targetY;
            isActive = true;
        }
    });

    window.addEventListener('mouseout', () => {
        isActive = false;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = 0;
            this.vy = 0;
            
            this.baseSize = Math.random() * 2.0 + 0.5; // От 0.5 до 2.5
            this.size = this.baseSize;
            
            this.angle = Math.random() * Math.PI * 2;
            
            // Используем Math.sqrt для равномерного распределения по площади огромного круга
            this.radius = Math.sqrt(Math.random()) * maxRadius; 
            
            // Угловая скорость зависит от радиуса, чтобы линейная скорость была приятной
            const linearSpeed = (Math.random() * 1.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
            this.speed = linearSpeed / (this.radius + 1); 
            
            // Оптимальный баланс: ощутимо тянутся за мышкой, но плавно и без дикой раскачки
            this.spring = Math.random() * 0.002 + 0.0015; 
            this.friction = Math.random() * 0.03 + 0.90; 
        }
        
        update() {
            this.angle += this.speed;
            
            let currentTargetX = isActive && mouseX !== -1000 ? mouseX : width / 2;
            let currentTargetY = isActive && mouseY !== -1000 ? mouseY : height / 2;
            
            const tx = currentTargetX + Math.cos(this.angle) * this.radius;
            const ty = currentTargetY + Math.sin(this.angle) * this.radius;
            
            let dx = tx - this.x;
            let dy = ty - this.y;
            
            // Защита от резких рывков (лимит тяги)
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxPull = 40; 
            if (dist > maxPull) {
                dx = (dx / dist) * maxPull;
                dy = (dy / dist) * maxPull;
            }
            
            this.vx += dx * this.spring;
            this.vy += dy * this.spring;
            
            this.vx *= this.friction;
            this.vy *= this.friction;
            
            this.x += this.vx;
            this.y += this.vy;
        }
        
        draw() {
            ctx.beginPath();
            
            // Параллакс эффект: визуально смещаем частицы вверх при скролле вниз (скорость 0.5 от скорости скролла)
            const wrapHeight = height + 200;
            let drawY = this.y - window.scrollY * 0.5;
            // Зацикливаем координаты по вертикали, чтобы частицы не кончались при долгом скролле
            drawY = ((drawY % wrapHeight) + wrapHeight) % wrapHeight - 100;

            ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
            
            const alpha = 0.5 + Math.sin(this.angle * 5) * 0.3;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
            
            ctx.fill();
            
            ctx.shadowBlur = 0; 
        }
    }
    
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        if (isActive) {
            // Возвращаем легкий, но заметный эффект следования (было 0.002, стало 0.015)
            mouseX += (targetX - mouseX) * 0.015;
            mouseY += (targetY - mouseY) * 0.015;
        } else {
            mouseX += (width / 2 - mouseX) * 0.01;
            mouseY += (height / 2 - mouseY) * 0.01;
        }
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
