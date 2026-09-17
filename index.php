<?php
require_once __DIR__ . '/db.php';
$products = getAllProducts($pdo);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OVERDOSED – Not a Drugs</title>
    <link rel="icon" type="image/png" href="images/photo_2025-02-17_22-31-16-Photoroom.png">
    <link rel="stylesheet" href="style.css?v=1.12.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .availability {
            visibility: hidden; /* Hide before typing starts */
        }
        .tw-cursor {
            animation: tw-blink 1s step-start infinite;
            font-weight: inherit;
            color: inherit;
        }
        @keyframes tw-blink {
            50% { opacity: 0; }
        }
        .db-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            padding: 3px 8px;
            background: rgba(30, 255, 120, 0.1);
            border: 1px solid rgba(30, 255, 120, 0.3);
            color: #1eff78;
            border-radius: 4px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .db-badge-dot {
            width: 6px;
            height: 6px;
            background: #1eff78;
            border-radius: 50%;
            box-shadow: 0 0 8px #1eff78;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
        }
    </style>
</head>
<body>
    <!-- Header section (Fixed to viewport) -->
    <header class="header">
        <div class="header-content">
            <div class="header-top">
                <a href="#" class="header-link" id="langToggle" data-i18n="languages">ЯЗЫКИ</a>
                <div class="marquee" id="headerMarquee"></div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <a href="admin.php" title="Управление базой данных" class="header-link" style="opacity: 0.7; font-size: 12px;"><i class="fas fa-database"></i> БД / АДМИНКА</a>
                    <a href="#" class="search-icon">
                        <i class="fas fa-search"></i>
                    </a>
                </div>
            </div>
            
            <!-- Логотип OVERDOSED с ссылкой на главную -->
            <div class="logo-section">
                <a href="index.php" class="logo-link">
                    <h1 class="logo">ОВЕРДОЗ</h1>
                </a>
            </div>
            
            <!-- Навигационная строка -->
            <nav class="main-nav">
                <a href="#shop" class="nav-link"><span class="nav-text" data-i18n="shop">МАГАЗИН</span></a>
                <a href="lookbook.html" class="nav-link"><span class="nav-text" data-i18n="lookbook">ЛУКБУК</span></a>
                <a href="about.html" class="nav-link"><span class="nav-text" data-i18n="about">О НАС</span></a>
                <div class="header-socials">
                    <a href="https://t.me/overdosedstore" target="_blank" class="h-social-link"><i class="fab fa-telegram"></i></a>
                    <a href="https://vk.ru/overdosedstore" target="_blank" class="h-social-link"><i class="fab fa-vk"></i></a>
                    <a href="https://www.tiktok.com/@overdosed.shop" target="_blank" class="h-social-link"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.youtube.com/@%D0%BE%D0%B2%D0%B5%D1%80%D0%B4%D0%BE%D0%B7" target="_blank" class="h-social-link"><i class="fab fa-youtube"></i></a>
                </div>
            </nav>
        </div>
    </header>

    <div class="container">

        <!-- Main content -->
        <main class="main-content">
            <div class="product-hero">
                <!-- Premium Aesthetic Layers -->
                <div class="hero-bg-text">OVERDOSED</div>
                <div class="hero-glow"></div>

                <div class="product-title-section">
                    <p class="availability" data-i18n="availability" data-i18n-html="true"><span class="av-line-1">Рано или поздно он —</span> <span class="red-text av-line-2">до вас доберётся...</span></p>
                </div>

                <!-- Tactical UI Divider -->
                <div class="tech-divider">
                    <div class="tech-line"></div>
                    <div class="tech-data">
                        <span class="tech-blink"></span>
                        <span class="tech-text">SYS.TRACKING // MYSQL_CONNECTED</span>
                        <span class="db-badge"><span class="db-badge-dot"></span> БАЗА ДАННЫХ: OVERDOSED (<?= count($products) ?> ТОВАРА)</span>
                    </div>
                    <div class="tech-line"></div>
                </div>
                
                <!-- Главное изображение продукта с ссылкой -->
                <div class="product-image-wrapper">
                    <a href="product.php?id=<?= !empty($products) ? $products[0]['id'] : 1 ?>" class="product-image-link">
                        <div class="product-image">
                            <img src="<?= !empty($products) ? htmlspecialchars($products[0]['image']) : 'images/ti_gotov.png' ?>" alt="ENEMY HOODIE" class="main-product-img">
                            <div class="image-fallback">OVERDOSED</div>
                        </div>
                    </a>
                </div>
            </div>
            
            <!-- Products section -->
            <section class="products-section" id="shop">
                <div class="section-header">
                    <div class="section-line"></div>
                    <h3 class="section-title" data-i18n="products">ТОВАРЫ</h3>
                    <div class="section-line"></div>
                </div>
                
                <div class="products-grid">
                    <?php if (empty($products)): ?>
                        <p style="text-align: center; width: 100%; color: #888;">В базе данных пока нет товаров.</p>
                    <?php else: ?>
                        <?php foreach ($products as $index => $prod): ?>
                            <a href="product.php?id=<?= htmlspecialchars($prod['id']) ?>" class="product-link product-card-animate" style="animation-delay: <?= 0.1 * ($index + 1) ?>s;">
                                <div class="product-card">
                                    <div class="product-image-container">
                                        <img src="<?= htmlspecialchars($prod['image']) ?>" alt="<?= htmlspecialchars(strip_tags($prod['name_ru'])) ?>" class="product-img">
                                        <div class="image-fallback-small"><?= $prod['name_ru'] ?></div>
                                        <div class="product-overlay">
                                            <span class="product-overlay-text" data-i18n="view_product">СМОТРЕТЬ</span>
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <h4 class="product-name" 
                                            data-i18n-html="true" 
                                            data-i18n-ru="<?= htmlspecialchars($prod['name_ru'], ENT_QUOTES) ?>" 
                                            data-i18n-en="<?= htmlspecialchars($prod['name_en'], ENT_QUOTES) ?>">
                                            <?= $prod['name_ru'] ?>
                                        </h4>
                                        <div class="product-price" 
                                             data-price-rub="<?= htmlspecialchars($prod['price_rub']) ?>" 
                                             data-price-usd="<?= htmlspecialchars($prod['price_usd']) ?>">
                                            <?= number_format($prod['price_rub'], 0, '', ' ') ?>₽
                                        </div>
                                    </div>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="about.html" class="footer-link" data-i18n="about">О НАС</a>
                    <a href="#" class="footer-link contact-link" data-i18n="contact">КОНТАКТЫ</a>
                    <a href="terms.html" class="footer-link" data-i18n="terms_of_service">УСЛОВИЯ</a>
                    <a href="admin.php" class="footer-link" style="color: #1eff78;"><i class="fas fa-database"></i> УПРАВЛЕНИЕ БД</a>
                </div>
                
                <div class="social-links">
                    <a href="https://t.me/overdosedstore" target="_blank" class="social-link">TELEGRAM</a>
                    <a href="https://vk.ru/overdosedstore" target="_blank" class="social-link">VK</a>
                    <a href="https://t.me/paraxyozik" target="_blank" class="social-link social-link-faded">РАЗРАБОТЧИК САЙТА</a>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="copyright">
                <p data-i18n="copyright">&copy; 2026 OVERDOSED. Все права защищены.</p>
            </div>
        </footer>
    </div>

    <script src="cookie-consent.js?v=1.14.0"></script>
    <script src="i18n.js?v=1.12.0"></script>
    <script src="header.js"></script>
    <script src="particles.js"></script>
    <script>
        // Mouse follow effect for main product image
        const productImage = document.querySelector('.product-image-link');
        const mainProductImg = document.querySelector('.main-product-img');

        function updateIndexPrices() {
          document.querySelectorAll('[data-price-rub]').forEach(el => {
            const rub = parseFloat(el.dataset.priceRub);
            const usd = parseFloat(el.dataset.priceUsd);
            const c = t('currency');
            el.textContent = c === '₽' ? formatPrice(rub) : formatPrice(usd);
          });
        }

        updateIndexPrices();
        document.addEventListener('languageChanged', updateIndexPrices);

        if (productImage && mainProductImg) {
            document.addEventListener('mousemove', (e) => {
                const rect = productImage.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = (mouseY / rect.height) * 8;
                const rotateY = (mouseX / rect.width) * 8;
                
                mainProductImg.style.transform = 'scale(1.05) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });

            // Reset on mouse leave
            productImage.addEventListener('mouseleave', () => {
                mainProductImg.style.transform = 'scale(1.05) rotateX(0deg) rotateY(0deg)';
            });
        }

        // Typewriter Effect
        document.addEventListener('DOMContentLoaded', () => {
            function startTyping() {
                const subtitle = document.querySelector('.availability');
                if (!subtitle) return;
                
                const rawHTML = subtitle.innerHTML;
                subtitle.innerHTML = '';
                subtitle.style.visibility = 'visible';
                
                const frames = [];
                const delays = [];
                
                const targetText = 'Рано или поздно';
                const indexOfText = rawHTML.indexOf(targetText);
                
                if (indexOfText !== -1) {
                    const tagPrefix = rawHTML.substring(0, indexOfText);
                    const typo = 'Рвано или позорно -';
                    const correctRestHTML = rawHTML.substring(indexOfText + 1);
                    
                    for (let i = 1; i <= typo.length; i++) {
                        frames.push(tagPrefix + typo.substring(0, i));
                        delays.push(i === typo.length ? 700 : 40 + Math.random() * 40);
                    }
                    
                    for (let i = typo.length - 1; i >= 1; i--) {
                        frames.push(tagPrefix + typo.substring(0, i));
                        delays.push(25 + Math.random() * 15);
                    }
                    
                    let currentHTML = tagPrefix + 'Р';
                    let j = 0;
                    let isTag = false;
                    while (j < correctRestHTML.length) {
                        let char = correctRestHTML.charAt(j);
                        if (char === '<') isTag = true;
                        if (char === '>') isTag = false;
                        
                        currentHTML += char;
                        j++;
                        
                        if (isTag || (j < correctRestHTML.length && correctRestHTML.charAt(j) === '<')) {
                            // skip
                        } else {
                            frames.push(currentHTML);
                            if (char === '.') {
                                delays.push(500 + Math.random() * 300);
                            } else {
                                delays.push(35 + Math.random() * 30);
                            }
                        }
                    }
                } else {
                    let currentHTML = '';
                    let j = 0;
                    let isTag = false;
                    while (j < rawHTML.length) {
                        let char = rawHTML.charAt(j);
                        if (char === '<') isTag = true;
                        if (char === '>') isTag = false;
                        
                        currentHTML += char;
                        j++;
                        
                        if (isTag || (j < rawHTML.length && rawHTML.charAt(j) === '<')) {
                            // skip
                        } else {
                            frames.push(currentHTML);
                            delays.push(35 + Math.random() * 30);
                        }
                    }
                }
                
                let frameIndex = 0;
                function playFrame() {
                    if (frameIndex < frames.length) {
                        subtitle.innerHTML = frames[frameIndex] + '<span class="tw-cursor">|</span>';
                        let delay = delays[frameIndex];
                        frameIndex++;
                        setTimeout(playFrame, delay);
                    } else {
                        subtitle.innerHTML = rawHTML;
                    }
                }
                playFrame();
            }
            setTimeout(startTyping, 250);
        });
    </script>
</body>
</html>
