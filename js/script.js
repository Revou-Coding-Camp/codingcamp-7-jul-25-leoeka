const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const filterInput = document.getElementById('filter-input');
const todoList = document.getElementById('todo-list');
const historyList = document.getElementById('history-list');
const filterSelect = document.getElementById('filter-select');
const clearBtn = document.getElementById('clear-btn');

let todos = [];
let allActivities = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    const todoDate = dateInput.value;

    if (todoText === '' || todoDate === '') {
        alert('Form tidak boleh kosong ya!');
        return;
    }

    const todoItem = {
        text: todoText,
        date: todoDate,
        id: Date.now(),
    };

    todos.push(todoItem);
    // menyimpan aktivitas ke dalam array allActivities
    if (!allActivities.includes(todoText)) {
        allActivities.push(todoText);
    }
    addToHistory(`Menambahkan aktivitas: "${todoText}" pada tanggal ${todoDate}`);
    DisplayTodos();
    form.reset();
});

function addToHistory(message) {
    const time = new Date().toLocaleTimeString();
    const li = document.createElement("li");
    li.textContent = `[${time}] ${message}`;
    historyList.prepend(li);
}

function updateFilterOptions() {
    filterSelect.innerHTML = `<option value="">-- Filter aktivitas --</option>`;

    const uniqueSortedActivities = [...new Set(allActivities)].sort();

    uniqueSortedActivities.forEach(text => {
        const option = document.createElement("option");
        option.value = text;
        option.textContent = text;
        filterSelect.appendChild(option);
    });
}

function DisplayTodos(filtered = "") {
    todoList.innerHTML = "";

    todos
    .filter((item) => item.text.toLowerCase().includes(filtered.toLowerCase()))
    .forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = `${todo.text} ${todo.date}`;
        todoList.appendChild(li);
    });

    updateFilterOptions();

}

filterSelect.addEventListener("change", () => {
    DisplayTodos(filterSelect.value);
});

clearBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua aktivitas?")) {
        todos = [];
        addToHistory("Menghapus semua aktivitas");
        historyList.innerHTML = "";
        DisplayTodos(filterSelect.value);
    }
});