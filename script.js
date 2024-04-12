document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.innerText = taskText;
            taskItem.addEventListener('click', toggleTask);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            saveTasks();
        }
    });

    function toggleTask() {
        this.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(task) {
            tasks.push({
                text: task.innerText,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const taskItem = document.createElement('li');
            taskItem.innerText = task.text;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.addEventListener('click', toggleTask);
            taskList.appendChild(taskItem);
        });
    }

    loadTasks();
});