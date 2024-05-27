<?php
// Chemin vers le fichier JSON
$file_path = '../../data/data.json'; 

// Fonction pour lire les données du fichier JSON
function readData() {
    global $file_path;
    if (file_exists($file_path)) {
        $data = file_get_contents($file_path);
        return json_decode($data, true);
       
    } else {
        return [];
    }
}

// Fonction pour écrire les données dans le fichier JSON
function writeData($data) {
    global $file_path;
    return file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT));
}

// Définir l'en-tête de la réponse comme JSON
header('Content-Type: application/json');

// Gérer les requêtes GET pour récupérer les données
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readData();
    echo json_encode($data);
    exit;
}

// Gérer les requêtes POST pour sauvegarder les données
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data !== null) {
        if (writeData($data)) {
            echo json_encode(['success' => true, 'message' => 'Données sauvegardées avec succès']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de la sauvegarde des données']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Données invalides']);
    }
    exit;
}

// Si la méthode de requête n'est ni GET ni POST
echo json_encode(['success' => false, 'message' => 'Méthode de requête non autorisée']);
exit;
include_once('../projet_phpts/src/php/cargaison.html.php');
?>


