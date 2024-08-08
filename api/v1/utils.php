<?php
// utils.php

function sendResponse($statusCode, $data) {
    // Añade encabezados CORS
    header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Encabezados permitidos

    // Ajusta el tipo de contenido y el código de estado
    header('Content-Type: application/json', true, $statusCode);
    echo json_encode($data);
    exit;
}

function getRequestBody() {
    $data = json_decode(file_get_contents('php://input'), true);
    return $data;
}

// Manejo de solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Añade encabezados CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}
?>
