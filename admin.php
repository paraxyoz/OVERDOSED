<?php
require_once __DIR__ . '/db.php';

$message = '';
$error = '';

// Обработка действий (Добавление, Редактирование, Удаление, Сброс)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'add') {
        $name_ru = trim($_POST['name_ru'] ?? '');
        $name_en = trim($_POST['name_en'] ?? '');
        $price_rub = (int)($_POST['price_rub'] ?? 0);
        $price_usd = (int)($_POST['price_usd'] ?? 0);
        $image = trim($_POST['image'] ?? 'images/ti_gotov.png');
        $desc_ru = trim($_POST['description_ru'] ?? '');
        $desc_en = trim($_POST['description_en'] ?? '');
        $mat_ru = trim($_POST['material_ru'] ?? '100% Хлопок');
        $mat_en = trim($_POST['material_en'] ?? '100% Cotton');
        $den_ru = trim($_POST['density_ru'] ?? '250 г/м²');
        $den_en = trim($_POST['density_en'] ?? '250 g/m²');
        $cut_ru = trim($_POST['cut_ru'] ?? 'Оверсайз');
        $cut_en = trim($_POST['cut_en'] ?? 'Oversize');

        if ($name_ru && $price_rub > 0) {
            $stmt = $pdo->prepare("
                INSERT INTO `products` 
                (`name_ru`, `name_en`, `price_rub`, `price_usd`, `image`, `description_ru`, `description_en`, `material_ru`, `material_en`, `density_ru`, `density_en`, `cut_ru`, `cut_en`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$name_ru, $name_en ?: $name_ru, $price_rub, $price_usd ?: round($price_rub/70), $image, $desc_ru, $desc_en, $mat_ru, $mat_en, $den_ru, $den_en, $cut_ru, $cut_en]);
            $message = "Товар успешно добавлен в базу данных!";
        } else {
            $error = "Пожалуйста, укажите название и корректную цену товара.";
        }
    }

    if ($action === 'edit') {
        $id = (int)$_POST['id'];
        $name_ru = trim($_POST['name_ru'] ?? '');
        $name_en = trim($_POST['name_en'] ?? '');
        $price_rub = (int)$_POST['price_rub'];
        $price_usd = (int)$_POST['price_usd'];
        $desc_ru = trim($_POST['description_ru'] ?? '');

        if ($id > 0 && $price_rub > 0) {
            $stmt = $pdo->prepare("
                UPDATE `products` 
                SET `name_ru` = ?, `name_en` = ?, `price_rub` = ?, `price_usd` = ?, `description_ru` = ? 
                WHERE `id` = ?
            ");
            $stmt->execute([$name_ru, $name_en, $price_rub, $price_usd, $desc_ru, $id]);
            $message = "Товар #{$id} успешно обновлен в базе!";
        }
    }

    if ($action === 'delete') {
        $id = (int)$_POST['id'];
        if ($id > 0) {
            $stmt = $pdo->prepare("DELETE FROM `products` WHERE `id` = ?");
            $stmt->execute([$id]);
            $message = "Товар #{$id} удален из базы данных.";
        }
    }

    if ($action === 'reset') {
        $pdo->exec("TRUNCATE TABLE `products`");
        $insert = $pdo->prepare("
            INSERT INTO `products` 
            (`id`, `name_ru`, `name_en`, `price_rub`, `price_usd`, `image`, `description_ru`, `description_en`, `material_ru`, `material_en`, `density_ru`, `density_en`, `cut_ru`, `cut_en`, `print_ru`, `print_en`, `care_ru`, `care_en`, `origin_ru`, `origin_en`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $insert->execute([
            1, '<span class="red-text">ФУТБОЛКА</span> ИЗДЕЛИЕ №1', '<span class="red-text">T-SHIRT</span> PRODUCT №1',
            2500, 50, 'images/ti_gotov.png', 'Футболка ТЫ ГОТОВ? Фирменный оверсайз крой.', 'T-Shirt OVERDOSED.',
            '100% Хлопок', '100% Cotton', '250 г/м²', '250 g/m²', 'Оверсайз', 'Oversize', 'Шелкография', 'Silkscreen', 'Машинная стирка', 'Machine wash', 'Изготовлено в РФ', 'Made in RU'
        ]);
        $insert->execute([
            2, '<span class="red-text">РУБАШКА</span> ИЗДЕЛИЕ №2', '<span class="red-text">SHIRT</span> PRODUCT №2',
            3500, 65, 'images/rubashka.png', 'Рубашка OVERDOSED. Плотная премиум ткань.', 'Shirt OVERDOSED.',
            '100% Хлопок', '100% Cotton', '320 г/м²', '320 g/m²', 'Свободный крой', 'Loose fit', 'Вышивка', 'Embroidery', 'Машинная стирка', 'Machine wash', 'Изготовлено в РФ', 'Made in RU'
        ]);
        $insert->execute([
            3, '<span class="red-text">ХУДИ</span> ENEMY HOODIE', '<span class="red-text">HOODIE</span> ENEMY HOODIE',
            5500, 85, 'images/ti_gotov.png', 'ENEMY SYSTEM HOODIE.', 'ENEMY SYSTEM HOODIE.',
            '100% Хлопок', '100% Cotton', '380 г/м²', '380 g/m²', 'Глубокий оверсайз', 'Deep oversize', 'Шелкография', 'Silkscreen', 'Машинная стирка', 'Machine wash', 'Изготовлено в РФ', 'Made in RU'
        ]);
        $message = "База данных успешно сброшена до исходных 3 товаров!";
    }
}

$products = getAllProducts($pdo);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OVERDOSED – Управление Базой Данных</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background-color: #0d0d0d;
            color: #eee;
            font-family: 'Inter', sans-serif;
            padding: 30px 20px;
        }
        .admin-container {
            max-width: 1100px;
            margin: 0 auto;
        }
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #222;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .admin-title {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .admin-nav-links a {
            color: #aaa;
            text-decoration: none;
            margin-left: 20px;
            font-size: 14px;
            transition: color 0.2s;
        }
        .admin-nav-links a:hover {
            color: #ff3333;
        }
        .db-status-bar {
            background: #141414;
            border: 1px solid #252525;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        .status-tag {
            color: #1eff78;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            background: #1eff78;
            border-radius: 50%;
            box-shadow: 0 0 10px #1eff78;
        }
        .alert-box {
            padding: 12px 18px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .alert-success {
            background: rgba(30, 255, 120, 0.1);
            border: 1px solid rgba(30, 255, 120, 0.3);
            color: #1eff78;
        }
        .alert-error {
            background: rgba(255, 51, 51, 0.1);
            border: 1px solid rgba(255, 51, 51, 0.3);
            color: #ff3333;
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            background: #141414;
            border: 1px solid #222;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 40px;
        }
        .admin-table th, .admin-table td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid #222;
            font-size: 13px;
        }
        .admin-table th {
            background: #1a1a1a;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 11px;
        }
        .admin-table tr:hover {
            background: #181818;
        }
        .prod-thumb {
            width: 45px;
            height: 45px;
            object-fit: cover;
            border-radius: 4px;
            background: #222;
        }
        .btn-action {
            padding: 6px 12px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: 0.2s;
        }
        .btn-save {
            background: #2b7fff;
            color: #fff;
        }
        .btn-save:hover { background: #1a6de6; }
        .btn-delete {
            background: #331515;
            color: #ff4d4d;
            border: 1px solid #551c1c;
        }
        .btn-delete:hover { background: #ff4d4d; color: #fff; }
        .btn-reset {
            background: #222;
            color: #bbb;
            border: 1px solid #333;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
        }
        .btn-reset:hover { background: #333; color: #fff; }
        .card-box {
            background: #141414;
            border: 1px solid #252525;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .card-box h3 {
            font-size: 16px;
            margin-bottom: 20px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-size: 12px;
            color: #888;
            margin-bottom: 6px;
            text-transform: uppercase;
        }
        .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 10px 12px;
            background: #0d0d0d;
            border: 1px solid #2c2c2c;
            color: #fff;
            border-radius: 5px;
            font-size: 13px;
            box-sizing: border-box;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #ff3333;
        }
        .btn-submit {
            background: #ff3333;
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-submit:hover { background: #e02424; }
        .table-input {
            background: #0d0d0d;
            border: 1px solid #333;
            color: #fff;
            padding: 6px 8px;
            border-radius: 4px;
            font-size: 13px;
        }
    </style>
</head>
<body>

<div class="admin-container">
    <div class="admin-header">
        <div class="admin-title">
            <span style="color: #ff3333;">OVERDOSED</span> // ПАНЕЛЬ УПРАВЛЕНИЯ БАЗОЙ ДАННЫХ
        </div>
        <div class="admin-nav-links">
            <a href="index.php" target="_blank"><i class="fas fa-external-link-alt"></i> Открыть сайт</a>
            <a href="api/products.php" target="_blank"><i class="fas fa-code"></i> API JSON</a>
            <a href="http://localhost/phpmyadmin" target="_blank"><i class="fas fa-table"></i> phpMyAdmin</a>
        </div>
    </div>

    <?php if ($message): ?>
        <div class="alert-box alert-success"><i class="fas fa-check-circle"></i> <?= htmlspecialchars($message) ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div class="alert-box alert-error"><i class="fas fa-exclamation-triangle"></i> <?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <div class="db-status-bar">
        <div class="status-tag">
            <span class="status-dot"></span>
            MySQL ПОДКЛЮЧЕНА: База <b>overdosed</b> | Таблица <b>products</b> (<?= count($products) ?> записей)
        </div>
        <div>
            <form method="POST" style="display: inline;" onsubmit="return confirm('Вы уверены, что хотите сбросить базу к исходным товарам?');">
                <input type="hidden" name="action" value="reset">
                <button type="submit" class="btn-reset"><i class="fas fa-undo"></i> Сбросить базу к начальным товарам</button>
            </form>
        </div>
    </div>

    <!-- Список товаров в базе данных -->
    <div class="card-box">
        <h3><i class="fas fa-boxes"></i> ТОВАРЫ В БАЗЕ ДАННЫХ (ТАБЛИЦА `products`)</h3>
        <p style="font-size: 13px; color: #888; margin-bottom: 15px;">
            Вы можете изменить цену или название прямо здесь и нажать <b>«Сохранить»</b>, либо сделать это через <b>phpMyAdmin</b> — изменения мгновенно отобразятся на главной странице и на странице товара!
        </p>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Фото</th>
                    <th>Название (RU)</th>
                    <th>Цена (₽)</th>
                    <th>Цена ($)</th>
                    <th>Описание</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($products as $p): ?>
                    <tr>
                        <form method="POST">
                            <input type="hidden" name="action" value="edit">
                            <input type="hidden" name="id" value="<?= $p['id'] ?>">
                            <input type="hidden" name="name_en" value="<?= htmlspecialchars($p['name_en'], ENT_QUOTES) ?>">
                            <td><b>#<?= $p['id'] ?></b></td>
                            <td><img src="<?= htmlspecialchars($p['image']) ?>" class="prod-thumb" alt="Product"></td>
                            <td>
                                <input type="text" name="name_ru" class="table-input" style="width: 220px;" value="<?= htmlspecialchars($p['name_ru'], ENT_QUOTES) ?>" required>
                            </td>
                            <td>
                                <input type="number" name="price_rub" class="table-input" style="width: 85px;" value="<?= $p['price_rub'] ?>" required>
                            </td>
                            <td>
                                <input type="number" name="price_usd" class="table-input" style="width: 65px;" value="<?= $p['price_usd'] ?>" required>
                            </td>
                            <td>
                                <input type="text" name="description_ru" class="table-input" style="width: 200px;" value="<?= htmlspecialchars($p['description_ru'], ENT_QUOTES) ?>">
                            </td>
                            <td>
                                <div style="display: flex; gap: 6px;">
                                    <button type="submit" class="btn-action btn-save" title="Сохранить изменения"><i class="fas fa-check"></i></button>
                                    <button type="submit" formaction="admin.php" name="action" value="delete" class="btn-action btn-delete" onclick="return confirm('Удалить этот товар из базы?');" title="Удалить"><i class="fas fa-trash"></i></button>
                                    <a href="product.php?id=<?= $p['id'] ?>" target="_blank" class="btn-action" style="background:#222;color:#aaa;text-decoration:none;display:inline-flex;align-items:center;" title="Посмотреть на сайте"><i class="fas fa-eye"></i></a>
                                </div>
                            </td>
                        </form>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Форма добавления нового товара -->
    <div class="card-box">
        <h3><i class="fas fa-plus-circle"></i> ДОБАВИТЬ НОВЫЙ ТОВАР В БАЗУ ДАННЫХ</h3>
        <form method="POST">
            <input type="hidden" name="action" value="add">
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Название (RU)</label>
                    <input type="text" name="name_ru" placeholder='например: <span class="red-text">ЗИПКА</span> OVERDOSED' required>
                </div>
                <div class="form-group">
                    <label>Название (EN)</label>
                    <input type="text" name="name_en" placeholder='например: <span class="red-text">ZIP HOODIE</span> OVERDOSED'>
                </div>
                <div class="form-group">
                    <label>Цена в рублях (₽)</label>
                    <input type="number" name="price_rub" placeholder="4900" required>
                </div>
                <div class="form-group">
                    <label>Цена в долларах ($)</label>
                    <input type="number" name="price_usd" placeholder="60">
                </div>
                <div class="form-group">
                    <label>Изображение (путь)</label>
                    <input type="text" name="image" value="images/ti_gotov.png" required>
                </div>
                <div class="form-group">
                    <label>Крой</label>
                    <input type="text" name="cut_ru" value="Оверсайз">
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
                <label>Описание товара</label>
                <textarea name="description_ru" rows="3" placeholder="Краткое описание товара..."></textarea>
            </div>

            <button type="submit" class="btn-submit"><i class="fas fa-plus"></i> Добавить товар в базу данных</button>
        </form>
    </div>
</div>

</body>
</html>
