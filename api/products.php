<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
    $product = getProductById($pdo, $id);
    if ($product) {
        echo json_encode($product, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found'], JSON_UNESCAPED_UNICODE);
    }
} else {
    $products = getAllProducts($pdo);
    echo json_encode($products, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
