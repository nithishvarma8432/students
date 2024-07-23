document.getElementById('studentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    addStudent();
});

document.getElementById('searchInput')?.addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    filterStudents(query);
});

function addStudent() {
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const studentClass = document.getElementById('class').value;
    const age = document.getElementById('age').value;

    const student = { name, rollNo, studentClass, age };
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    document.getElementById('studentForm').reset();
    alert('Student added successfully!');
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.studentClass}</td>
            <td>${student.age}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('rollNo').value = student.rollNo;
    document.getElementById('class').value = student.studentClass;
    document.getElementById('age').value = student.age;

    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
}

function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function filterStudents(query) {
    const rows = document.querySelectorAll('#studentTable tbody tr');
    rows.forEach(row => {
        const name = row.cells[0].innerText.toLowerCase();
        if (name.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadStudents);
