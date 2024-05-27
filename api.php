<?php
header('Content-Type: application/json');

// Ajuster le chemin du fichier JSON
$dataFile = 'cargaisons.json'; 

$method = $_SERVER['REQUEST_METHOD'];

function getCargaisons() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $data;
        }
    }
    return [];
}

function saveCargaisons($cargaisons) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($cargaisons, JSON_PRETTY_PRINT));
}

if ($method == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['action'])) {
        $action = $input['action'];

        if ($action == 'addCargaison') {
            $cargaisons = $input['cargaisons'] ?? [];

            $existingData = getCargaisons();
            $existingData = array_merge($existingData, $cargaisons);

            saveCargaisons($existingData);

            echo json_encode(['status' => 'success', 'message' => 'Cargaisons ajoutées avec succès.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Action non reconnue.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Aucune action spécifiée.']);
    }
} elseif ($method == 'GET') {
    $data = getCargaisons();
    echo json_encode($data);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Méthode non supportée.']);
}
