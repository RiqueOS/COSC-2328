// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Enrique Sanchez
// 1. db.all() return every matching row as an array and db.get() returns only the first matching row as single objeect or undefined if nothing mathces

//2. building a query with + puts the user input directly into the SQL, so the user ocntrol part of the data base itself, known as SQL injection
// if someone sent 1; DROP TABLES students then the database would read as SELECT * FROM students WHERE id = 1; DROP TABLE students
//The database would read that as two statements, and the second would delete the whole students table. The fix is to use a ? placeholder with a values array: 'SELECT * FROM students WHERE id = ?', [id].

//3. the naming convention is meaniful in this case becuase the name tells you what shape of data to expect
// db.all() always gives back an array, even when only one row matches, so rows (plural) signals a collection you can loop over or send with res.json(rows)
// while db.get()gives back one object, so row (singular) signals a single record whose fields you read directly

//4. When a request comes in, Express compares the path to the pattern, captures whatever is in the :id position, and stores it in req.params.id


async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
        list.appendChild(li);
    });

}

document.getElementById('lookup-btn').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    } else {
        result.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});

loadStudents();

