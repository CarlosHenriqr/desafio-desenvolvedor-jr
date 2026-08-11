const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskDueDate').min = new Date().toISOString().slice(0, 10);
    loadTasks();
});

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas. Verifique se o servidor está rodando.');
    }
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title) {
        alert('Digite uma tarefa!');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, dueDate: dueDate || null })
        });
        
        if (response.ok) {
            taskInput.value = '';
            document.getElementById('taskDueDate').value = '';
            loadTasks();
        }
    } catch (error) {
        alert('Erro ao adicionar tarefa');
    }
}

async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !completed })
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        alert('Erro ao atualizar tarefa');
    }
}

async function deleteTask(id) {
    if (!confirm('Excluir esta tarefa?')) return;
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        alert('Erro ao excluir tarefa');
    }
}

function formatDueDate(dueDate) {
    const [year, month, day] = dueDate.split('-');
    return `${day}/${month}/${year}`;
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<li style="text-align: center; color: #666;">Nenhuma tarefa</li>';
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id}, ${task.completed})">
            <span class="task-text">
                ${task.title}
                ${task.dueDate ? `<small class="task-date">Prazo: ${formatDueDate(task.dueDate)}</small>` : ''}
            </span>
            <div class="task-actions">
                <button class="btn-danger btn-small" onclick="deleteTask(${task.id})">
                    Excluir
                </button>
            </div>
        </li>
    `).join('');
}
