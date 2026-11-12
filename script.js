const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Ambil data dari localStorage atau buat array kosong
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  render();
}

// Tambah tugas
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = '';
  saveAndRender();
});

// Ubah status selesai
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveAndRender();
}

// Hapus tugas
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

// Tampilkan ke layar
function render() {
  todoList.innerHTML = '';
  if (tasks.length === 0) {
    todoList.innerHTML = '<p style="text-align:center; color:#888; font-size:14px;">Belum ada tugas.</p>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <label style="cursor: pointer; display: flex; align-items: center; gap: 8px; flex: 1;">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
      </label>
      <button class="delete-btn">Hapus</button>
    `;

    // Event listener untuk checkbox & tombol hapus
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleTask(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

    todoList.appendChild(li);
  });
}

render();