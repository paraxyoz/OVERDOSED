<?php
require_once __DIR__ . '/db.php';

$allProducts = getAllProducts($pdo);

$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$product = getProductById($pdo, $id);

if (!$product && !empty($allProducts)) {
    $product = $allProducts[0];
}

// Формируем структуру данных для JavaScript (совместимость с переключением языков и валют)
$jsProductsData = [];
foreach ($allProducts as $p) {
    $jsProductsData[$p['id']] = [
        'id' => (int)$p['id'],
        'price' => (float)$p['price_rub'],
        'priceUSD' => (float)$p['price_usd'],
        'image' => $p['image'],
        'name_ru' => $p['name_ru'],
        'name_en' => $p['name_en'],
        'desc_ru' => $p['description_ru'],
        'desc_en' => $p['description_en'],
        'specs_ru' => [
            'material' => $p['material_ru'],
            'density'  => $p['density_ru'],
            'cut'      => $p['cut_ru'],
            'print'    => $p['print_ru'],
            'care'     => $p['care_ru'],
            'origin'   => $p['origin_ru']
        ],
        'specs_en' => [
            'material' => $p['material_en'],
            'density'  => $p['density_en'],
            'cut'      => $p['cut_en'],
            'print'    => $p['print_en'],
            'care'     => $p['care_en'],
            'origin'   => $p['origin_en']
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OVERDOSED – <?= htmlspecialchars(strip_tags($product['name_ru'] ?? 'Товар')) ?></title>
    <link rel="icon" type="image/png" href="images/photo_2025-02-17_22-31-16-Photoroom.png">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="product.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
                <a href="index.php#shop" class="nav-link"><span class="nav-text" data-i18n="shop">МАГАЗИН</span></a>
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
            <div class="product-purchase-container">
                <!-- Product image section -->
                <div class="purchase-image-section">
                    <div class="product-large-image">
                        <img id="productImage" src="<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars(strip_tags($product['name_ru'])) ?>" class="large-product-img">
                        <div class="image-fallback-purchase"><?= $product['name_ru'] ?></div>
                    </div>
                    
                    <!-- Purchase button -->
                    <button class="buy-button">
                        <span data-i18n="buy">КУПИТЬ</span> • <?= number_format($product['price_rub'], 0, '', ' ') ?>₽
                    </button>
                </div>

                <!-- Product details section -->
                <div class="purchase-details-section">
                    <!-- Product title -->
                    <div class="purchase-header">
                        <h1 class="purchase-title" 
                            data-i18n-html="true" 
                            data-i18n-ru="<?= htmlspecialchars($product['name_ru'], ENT_QUOTES) ?>" 
                            data-i18n-en="<?= htmlspecialchars($product['name_en'], ENT_QUOTES) ?>">
                            <?= $product['name_ru'] ?>
                        </h1>
                        <div class="purchase-price" 
                             data-price-rub="<?= htmlspecialchars($product['price_rub']) ?>" 
                             data-price-usd="<?= htmlspecialchars($product['price_usd']) ?>">
                            <?= number_format($product['price_rub'], 0, '', ' ') ?>₽
                        </div>
                    </div>

                    <!-- Product description -->
                    <div class="purchase-description">
                        <p id="productDescText" 
                           data-i18n-ru="<?= htmlspecialchars($product['description_ru'], ENT_QUOTES) ?>" 
                           data-i18n-en="<?= htmlspecialchars($product['description_en'], ENT_QUOTES) ?>">
                           <?= htmlspecialchars($product['description_ru']) ?>
                        </p>
                    </div>

                    <!-- Size selection -->
                    <div class="size-selection">
                        <label class="selection-label" data-i18n="size">РАЗМЕР</label>
                        <div class="size-grid">
                            <button class="size-btn" data-size="1">1</button>
                            <button class="size-btn" data-size="2">2</button>
                            <button class="size-btn" data-size="3">3</button>
                            <button class="size-btn active" data-size="4">4</button>
                            <button class="size-btn" data-size="5">5</button>
                        </div>
                    </div>

                    <!-- Product specifications -->
                    <div class="specifications">
                        <label class="selection-label" data-i18n="specs_heading">МАТЕРИАЛ И ХАРАКТЕРИСТИКИ</label>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="material">Материал</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['material_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['material_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['material_ru']) ?></span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="density">Плотность</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['density_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['density_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['density_ru']) ?></span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="cut">Крой</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['cut_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['cut_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['cut_ru']) ?></span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="print">Печать</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['print_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['print_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['print_ru']) ?></span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="care">Уход</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['care_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['care_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['care_ru']) ?></span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label" data-i18n="origin">Происхождение</span>
                                <span class="spec-value" data-i18n-ru="<?= htmlspecialchars($product['origin_ru'], ENT_QUOTES) ?>" data-i18n-en="<?= htmlspecialchars($product['origin_en'], ENT_QUOTES) ?>"><?= htmlspecialchars($product['origin_ru']) ?></span>
                            </div>
                        </div>
                    </div>

                    <!-- Quantity selector -->
                    <div class="quantity-selector">
                        <label class="selection-label" data-i18n="quantity">КОЛИЧЕСТВО</label>
                        <div class="quantity-controls">
                            <button class="qty-btn" id="decreaseQty">−</button>
                            <input type="number" id="quantity" min="1" max="10" value="1" class="qty-input">
                            <button class="qty-btn" id="increaseQty">+</button>
                        </div>
                    </div>

                    <!-- Additional info -->
                    <div class="purchase-footer-info">
                        <div class="info-item">
                            <i class="fas fa-truck"></i>
                            <span data-i18n="worldwide_shipping">Доставка по РФ</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-undo"></i>
                            <span data-i18n="returns_14days">БЕЗВОЗВРАТНО</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-lock"></i>
                            <span data-i18n="secure_payments">Безопасные платежи</span>
                        </div>
                    </div>
                </div>
            </div>
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

    <!-- Внедрение данных из MySQL в JS -->
    <script>
        window.productsFromDB = <?= json_encode($jsProductsData, JSON_UNESCAPED_UNICODE) ?>;
        window.currentProductId = <?= (int)$product['id'] ?>;
    </script>

    <script src="cookie-consent.js"></script>
    <script src="i18n.js"></script>
    <script src="header.js"></script>
    <script src="particles.js"></script>
    <script src="product.js"></script>
</body>
</html>
