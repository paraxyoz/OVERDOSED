<?php
/**
 * db.php — Подключение к базе данных MySQL (Laragon / XAMPP / OpenServer)
 * Сайт: OVERDOSED
 */

// Стандартные параметры подключения для Laragon
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'overdosed';

try {
    // 1. Подключаемся к серверу MySQL
    $pdo = new PDO("mysql:host={$db_host};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // 2. Авто-создание базы данных, если она еще не создана
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `{$db_name}`");

    // 3. Авто-создание таблицы products, если ее еще нет
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `products` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name_ru` VARCHAR(255) NOT NULL,
            `name_en` VARCHAR(255) NOT NULL,
            `price_rub` INT NOT NULL,
            `price_usd` INT NOT NULL,
            `image` VARCHAR(255) NOT NULL,
            `description_ru` TEXT NOT NULL,
            `description_en` TEXT NOT NULL,
            `material_ru` VARCHAR(255) DEFAULT '100% Хлопок',
            `material_en` VARCHAR(255) DEFAULT '100% Cotton',
            `density_ru` VARCHAR(255) DEFAULT '250 г/м²',
            `density_en` VARCHAR(255) DEFAULT '250 g/m²',
            `cut_ru` VARCHAR(255) DEFAULT 'Оверсайз',
            `cut_en` VARCHAR(255) DEFAULT 'Oversize',
            `print_ru` VARCHAR(255) DEFAULT 'Шелкография (ручная работа)',
            `print_en` VARCHAR(255) DEFAULT 'Silkscreen printing',
            `care_ru` VARCHAR(255) DEFAULT 'Машинная стирка 30°C',
            `care_en` VARCHAR(255) DEFAULT 'Machine wash 30°C',
            `origin_ru` VARCHAR(255) DEFAULT 'Изготовлено в РФ',
            `origin_en` VARCHAR(255) DEFAULT 'Made in RU',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 4. Если таблица пуста, автоматически наполняем начальными товарами
    $checkCount = $pdo->query("SELECT COUNT(*) FROM `products`")->fetchColumn();
    if ($checkCount == 0) {
        $insert = $pdo->prepare("
            INSERT INTO `products` 
            (`id`, `name_ru`, `name_en`, `price_rub`, `price_usd`, `image`, `description_ru`, `description_en`, `material_ru`, `material_en`, `density_ru`, `density_en`, `cut_ru`, `cut_en`, `print_ru`, `print_en`, `care_ru`, `care_en`, `origin_ru`, `origin_en`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $insert->execute([
            1,
            '<span class="red-text">ФУТБОЛКА</span> ИЗДЕЛИЕ №1',
            '<span class="red-text">T-SHIRT</span> PRODUCT №1',
            2500,
            50,
            'images/ti_gotov.png',
            'Футболка ТЫ ГОТОВ? Фирменный оверсайз крой с шелкографией ручной работы.',
            'T-Shirt OVERDOSED. Oversized fit with handmade silkscreen printing.',
            '100% Хлопок', '100% Cotton',
            '250 г/м²', '250 g/m²',
            'Оверсайз', 'Oversize',
            'Шелкография (ручная работа)', 'Silkscreen printing (handmade)',
            'Машинная стирка 30°C', 'Machine wash 30°C',
            'Изготовлено в РФ', 'Made in RU'
        ]);

        $insert->execute([
            2,
            '<span class="red-text">РУБАШКА</span> ИЗДЕЛИЕ №2',
            '<span class="red-text">SHIRT</span> PRODUCT №2',
            3500,
            65,
            'images/rubashka.png',
            'Рубашка OVERDOSED. Плотная премиум ткань, тактический стиль.',
            'Shirt OVERDOSED. Premium heavyweight fabric, tactical aesthetic.',
            '100% Хлопок', '100% Cotton',
            '320 г/м²', '320 g/m²',
            'Свободный крой', 'Loose fit',
            'Вышивка и шелкография', 'Embroidery & silkscreen',
            'Машинная стирка 40°C', 'Machine wash 40°C',
            'Изготовлено в РФ', 'Made in RU'
        ]);

        $insert->execute([
            3,
            '<span class="red-text">ХУДИ</span> ENEMY HOODIE',
            '<span class="red-text">HOODIE</span> ENEMY HOODIE',
            5500,
            85,
            'images/ti_gotov.png',
            'ENEMY SYSTEM HOODIE. Премиальное худи плотной вязки с глубоким капюшоном.',
            'ENEMY SYSTEM HOODIE. Premium heavy knit hoodie with deep hood.',
            '100% Хлопок', '100% Cotton',
            '380 г/м²', '380 g/m²',
            'Глубокий оверсайз', 'Deep oversize',
            'Шелкография (ручная работа)', 'Silkscreen printing',
            'Машинная стирка 30°C', 'Machine wash 30°C',
            'Изготовлено в РФ', 'Made in RU'
        ]);
    }

} catch (PDOException $e) {
    die("<div style='background:#111;color:#ff4d4d;padding:20px;font-family:sans-serif;margin:20px;border:1px solid #ff4d4d;border-radius:6px;'>
        <h3>Ошибка подключения к базе данных MySQL!</h3>
        <p>" . htmlspecialchars($e->getMessage()) . "</p>
        <p>Убедитесь, что в <b>Laragon</b> запущен MySQL (кнопка <i>Start All</i>).</p>
    </div>");
}

/**
 * Получить все товары из БД
 */
function getAllProducts($pdo) {
    $stmt = $pdo->query("SELECT * FROM `products` ORDER BY `id` ASC");
    return $stmt->fetchAll();
}

/**
 * Получить один товар по ID
 */
function getProductById($pdo, $id) {
    $stmt = $pdo->prepare("SELECT * FROM `products` WHERE `id` = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}
