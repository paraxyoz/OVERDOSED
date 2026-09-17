-- =======================================================
-- БАЗА ДАННЫХ ДЛЯ САЙТА OVERDOSED
-- СУБД: MySQL / MariaDB (Laragon, XAMPP, OpenServer)
-- =======================================================

-- 1. Создание базы данных (если еще не создана)
CREATE DATABASE IF NOT EXISTS `overdosed` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. Переключение на созданную базу данных
USE `overdosed`;

-- 3. Создание таблицы товаров (products)
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name_ru` VARCHAR(255) NOT NULL COMMENT 'Название товара (RU)',
    `name_en` VARCHAR(255) NOT NULL COMMENT 'Название товара (EN)',
    `price_rub` INT NOT NULL COMMENT 'Цена в рублях',
    `price_usd` INT NOT NULL COMMENT 'Цена в долларах',
    `image` VARCHAR(255) NOT NULL COMMENT 'Путь к изображению товара',
    `description_ru` TEXT NOT NULL COMMENT 'Описание (RU)',
    `description_en` TEXT NOT NULL COMMENT 'Описание (EN)',
    `material_ru` VARCHAR(255) DEFAULT '100% Хлопок' COMMENT 'Материал (RU)',
    `material_en` VARCHAR(255) DEFAULT '100% Cotton' COMMENT 'Материал (EN)',
    `density_ru` VARCHAR(255) DEFAULT '250 г/м²' COMMENT 'Плотность (RU)',
    `density_en` VARCHAR(255) DEFAULT '250 g/m²' COMMENT 'Плотность (EN)',
    `cut_ru` VARCHAR(255) DEFAULT 'Оверсайз' COMMENT 'Крой (RU)',
    `cut_en` VARCHAR(255) DEFAULT 'Oversize' COMMENT 'Крой (EN)',
    `print_ru` VARCHAR(255) DEFAULT 'Шелкография (ручная работа)' COMMENT 'Печать (RU)',
    `print_en` VARCHAR(255) DEFAULT 'Silkscreen printing' COMMENT 'Печать (EN)',
    `care_ru` VARCHAR(255) DEFAULT 'Машинная стирка 30°C' COMMENT 'Уход (RU)',
    `care_en` VARCHAR(255) DEFAULT 'Machine wash 30°C' COMMENT 'Уход (EN)',
    `origin_ru` VARCHAR(255) DEFAULT 'Изготовлено в РФ' COMMENT 'Происхождение (RU)',
    `origin_en` VARCHAR(255) DEFAULT 'Made in RU' COMMENT 'Происхождение (EN)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата добавления'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Очистка старых данных (если таблица уже была)
TRUNCATE TABLE `products`;

-- 5. Добавление начальных товаров в базу данных
INSERT INTO `products` 
(`id`, `name_ru`, `name_en`, `price_rub`, `price_usd`, `image`, `description_ru`, `description_en`, `material_ru`, `material_en`, `density_ru`, `density_en`, `cut_ru`, `cut_en`, `print_ru`, `print_en`, `care_ru`, `care_en`, `origin_ru`, `origin_en`) 
VALUES
(
    1,
    '<span class="red-text">ФУТБОЛКА</span> ИЗДЕЛИЕ №1',
    '<span class="red-text">T-SHIRT</span> PRODUCT №1',
    2500,
    50,
    'images/ti_gotov.png',
    'Футболка ТЫ ГОТОВ? Фирменный оверсайз крой с шелкографией ручной работы.',
    'T-Shirt OVERDOSED. Oversized fit with handmade silkscreen printing.',
    '100% Хлопок',
    '100% Cotton',
    '250 г/м²',
    '250 g/m²',
    'Оверсайз',
    'Oversize',
    'Шелкография (ручная работа)',
    'Silkscreen printing (handmade)',
    'Машинная стирка 30°C',
    'Machine wash 30°C',
    'Изготовлено в РФ',
    'Made in RU'
),
(
    2,
    '<span class="red-text">РУБАШКА</span> ИЗДЕЛИЕ №2',
    '<span class="red-text">SHIRT</span> PRODUCT №2',
    3500,
    65,
    'images/rubashka.png',
    'Рубашка OVERDOSED. Плотная премиум ткань, тактический стиль.',
    'Shirt OVERDOSED. Premium heavyweight fabric, tactical aesthetic.',
    '100% Хлопок',
    '100% Cotton',
    '320 г/м²',
    '320 g/m²',
    'Свободный крой',
    'Loose fit',
    'Вышивка и шелкография',
    'Embroidery & silkscreen',
    'Машинная стирка 40°C',
    'Machine wash 40°C',
    'Изготовлено в РФ',
    'Made in RU'
),
(
    3,
    '<span class="red-text">ХУДИ</span> ENEMY HOODIE',
    '<span class="red-text">HOODIE</span> ENEMY HOODIE',
    5500,
    85,
    'images/ti_gotov.png',
    'ENEMY SYSTEM HOODIE. Премиальное худи плотной вязки с глубоким капюшоном.',
    'ENEMY SYSTEM HOODIE. Premium heavy knit hoodie with deep hood.',
    '100% Хлопок',
    '100% Cotton',
    '380 г/м²',
    '380 g/m²',
    'Глубокий оверсайз',
    'Deep oversize',
    'Шелкография (ручная работа)',
    'Silkscreen printing',
    'Машинная стирка 30°C',
    'Machine wash 30°C',
    'Изготовлено в РФ',
    'Made in RU'
);
