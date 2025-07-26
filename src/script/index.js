const studentNameInput = document.getElementById('studentName');
        const studentGradeInput = document.getElementById('studentGrade');
        const addStudentBtn = document.getElementById('addStudentBtn');
        const filterGradeInput = document.getElementById('filterGrade');
        const filterBtn = document.getElementById('filterBtn');
        const resetBtn = document.getElementById('resetBtn');
        const studentListDiv = document.getElementById('studentList');
        const totalStudentsSpan = document.getElementById('totalStudents');

        let students = [
            { id: 1, name: 'Long Sotheara', grade: 'A' },
            { id: 2, name: 'Chhay Davin', grade: 'B' },
            { id: 3, name: 'Por Thaihout', grade: 'C'},

        ];
        let nextStudentId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

        const renderStudents = (filteredStudents = students) => {
            studentListDiv.innerHTML = ''; // Clear existing students
            if (filteredStudents.length === 0) {
                studentListDiv.innerHTML = '<p class="text-gray-500 text-center col-span-full">No students to display.</p>';
            }
            filteredStudents.forEach((student, index) => {
                const studentCard = document.createElement('div');
                studentCard.className = 'bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200';
                studentCard.innerHTML = `
                    <p class="font-semibold text-gray-800">${index + 1}. ${student.name}</p>
                    <p class="text-gray-600">Grade: ${student.grade}</p>
                `;
                studentListDiv.appendChild(studentCard);
            });
            totalStudentsSpan.textContent = filteredStudents.length;
        };

        const addStudent = () => {
            const name = studentNameInput.value.trim();
            const grade = studentGradeInput.value.trim().toUpperCase();

            if (name && grade) {
                students.push({ id: nextStudentId++, name, grade });
                studentNameInput.value = '';
                studentGradeInput.value = '';
                renderStudents();
            } else {
                alert('Please enter both student name and grade.');
            }
        };

        const filterStudents = () => {
            const filterValue = filterGradeInput.value.trim().toUpperCase();
            if (filterValue) {
                const filtered = students.filter(student => student.grade.includes(filterValue));
                renderStudents(filtered);
            } else {
                renderStudents(); // If filter is empty, show all students
            }
        };

        const resetFilters = () => {
            filterGradeInput.value = '';
            renderStudents();
        };

        // Event Listeners
        addStudentBtn.addEventListener('click', addStudent);
        filterBtn.addEventListener('click', filterStudents);
        resetBtn.addEventListener('click', resetFilters);

        // Initial render
        document.addEventListener('DOMContentLoaded', renderStudents);