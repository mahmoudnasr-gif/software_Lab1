function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';
      const list = data.data;
      list.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => deleteEmployee(item.id)); // Attach event listener
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}

// Submit Button Event Listener
document.getElementById('employeeForm').addEventListener('submit', createEmployee);

function createEmployee(event) {
  event.preventDefault(); // Prevent form from reloading
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ id, name }) // JSON string
  })
  .then(response => response.json())
  .then(data => {
    console.log('Employee created:', data);
    fetchEmployees(); 
  })
  .catch(error => console.error('Error:', error));
}

function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      console.log('Employee deleted:', data);
      fetchEmployees(); // Refresh table
    })
    .catch(error => console.error('Error:', error));
}

// Initial Fetch
fetchEmployees();
