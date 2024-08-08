<?php
// providers.php
require 'database.php';
require 'utils.php';

// Función para obtener los parámetros de paginación y filtrado
function getPaginationAndFilterParams() {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10; // Número de proveedores por página
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0; // Número de proveedores a omitir
    $name = isset($_GET['name']) ? $_GET['name'] : null; // Nombre del proveedor para filtrar
    return [$limit, $offset, $name];
}

// GET /providers
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id'])) {
    list($limit, $offset, $name) = getPaginationAndFilterParams();
    
    // Construir la consulta SQL
    $sql = "SELECT * FROM providers";
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
    
    $providers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(200, $providers);
}

// GET /providers/id
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM providers WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    $provider = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($provider) {
        sendResponse(200, $provider);
    } else {
        sendResponse(404, ['message' => 'Provider not found']);
    }
}

// POST /providers
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestBody();
    $stmt = $pdo->prepare("INSERT INTO providers (name, address, phone, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['name'], $data['address'], $data['phone'], $data['description']]);
    sendResponse(201, ['message' => 'Provider created']);
}

// PUT/PATCH /providers/id
if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'PATCH') {
    if (!isset($_GET['id'])) {
        sendResponse(400, ['message' => 'Provider ID required']);
    }
    $data = getRequestBody();
    $stmt = $pdo->prepare("UPDATE providers SET name = ?, address = ?, phone = ?, description = ? WHERE id = ?");
    $stmt->execute([$data['name'], $data['address'], $data['phone'], $data['description'], $_GET['id']]);
    sendResponse(200, ['message' => 'Provider updated']);
}

// DELETE /providers/id
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("DELETE FROM providers WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    sendResponse(200, ['message' => 'Provider deleted']);
}
?>
