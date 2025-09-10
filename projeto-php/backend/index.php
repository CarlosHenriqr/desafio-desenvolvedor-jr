<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     exit(0);
// }

$dataFile = 'tasks.json';

// if (!file_exists($dataFile)) {
//     file_put_contents($dataFile, json_encode([]));
// }

function getTasks() {
    global $dataFile;
    $data = file_get_contents($dataFile);
    return json_decode($data, true) ?: [];
}

function saveTasks($tasks) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($tasks, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Roteamento simples
if ($path === '/api/tasks') {
    switch ($method) {
        case 'GET':
            echo json_encode(getTasks());
            break;
            
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['title'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Título é obrigatório']);
                exit;
            }
            
            $tasks = getTasks();
            $newTask = [
                'id' => time(),
                'title' => $input['title'],
                'completed' => false
            ];
            
            $tasks[] = $newTask;
            saveTasks($tasks);
            
            http_response_code(201);
            echo json_encode($newTask);
            break;
    }
} elseif (preg_match('/\/api\/tasks\/(\d+)/', $path, $matches)) {
    $taskId = (int)$matches[1];
    
    switch ($method) {
        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            $tasks = getTasks();
            
            $taskIndex = array_search($taskId, array_column($tasks, 'id'));
            
            if ($taskIndex === false) {
                http_response_code(404);
                echo json_encode(['error' => 'Tarefa não encontrada']);
                exit;
            }
            
            $tasks[$taskIndex]['completed'] = $input['completed'];
            saveTasks($tasks);
            
            echo json_encode($tasks[$taskIndex]);
            break;
            
        case 'DELETE':
            $tasks = getTasks();
            
            $taskIndex = array_search($taskId, array_column($tasks, 'id'));
            
            if ($taskIndex === false) {
                http_response_code(404);
                echo json_encode(['error' => 'Tarefa não encontrada']);
                exit;
            }
            
            array_splice($tasks, $taskIndex, 1);
            saveTasks($tasks);
            
            echo json_encode(['message' => 'Tarefa removida']);
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint não encontrado']);
}
?>