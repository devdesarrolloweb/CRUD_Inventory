<?php
// products.php
require 'database.php';
require 'utils.php';

// Función para obtener los parámetros de paginación y filtrado
function getPaginationAndFilterParams() {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10; // Número de productos por página
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0; // Número de productos a omitir
    $name = isset($_GET['name']) ? $_GET['name'] : null; // Nombre del producto para filtrar
    return [$limit, $offset, $name];
}

// GET /products
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id'])) {
    list($limit, $offset, $name) = getPaginationAndFilterParams();
    
    // Construir la consulta SQL
    $sql = "SELECT * FROM products";
    $params = [];

    if ($name) {
        $sql .= " WHERE name LIKE :name";
        $params[':name'] = "%$name%";
    }

    $sql .= " LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($sql);

    // Vincular los parámetros nombrados
    if ($name) {
        $stmt->bindValue(':name', $params[':name'], PDO::PARAM_STR);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(200, $products);
}

// GET /products/id
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        sendResponse(200, $product);
    } else {
        sendResponse(404, ['message' => 'Product not found']);
    }
}

// POST /products
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestBody();
    $stmt = $pdo->prepare("INSERT INTO products (name, price, description, provider_id) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['name'], $data['price'], $data['description'], $data['provider_id']]);
    sendResponse(201, ['message' => 'Product created']);
}

// PUT/PATCH /products/id
if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'PATCH') {
    if (!isset($_GET['id'])) {
        sendResponse(400, ['message' => 'Product ID required']);
    }
    $data = getRequestBody();
    $stmt = $pdo->prepare("UPDATE products SET name = ?, price = ?, description = ?, provider_id = ? WHERE id = ?");
    $stmt->execute([$data['name'], $data['price'], $data['description'], $data['provider_id'], $_GET['id']]);
    sendResponse(200, ['message' => 'Product updated']);
}

// DELETE /products/id
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    sendResponse(200, ['message' => 'Product deleted']);
}
?>
