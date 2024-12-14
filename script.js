let data = [];

// Функция для добавления или редактирования данных
function dadajDane() {
    const imie = document.getElementById('imie').value;
    const wiek = document.getElementById('wiek').value;
    const miasto = document.getElementById('miasto').value;

    if (imie === "" || wiek === "" || miasto === "") {
        alert("Все поля должны быть заполнены!");
        return;
    }

    // Если запись редактируется, обновляем её
    let editIndex = -1;
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].imie === imie) {
                editIndex = i;
                break;
            }
        }
    }

    if (editIndex !== -1) {
        data[editIndex].wiek = wiek;
        data[editIndex].miasto = miasto;
    } else {
        // Добавляем новую запись
        data.push({
            imie,
            wiek: parseInt(wiek),
            miasto
        });
    }

    document.getElementById('imie').value = '';
    document.getElementById('wiek').value = '';
    document.getElementById('miasto').value = '';

    renderTable();  // Перерисовываем таблицу
}

// Функция для отрисовки таблицы
function renderTable() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';  // Очищаем текущие строки

    data.forEach((entry, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.imie}</td>
            <td>${entry.wiek}</td>
            <td>${entry.miasto}</td>
            <td>
                <button class="tabele_btn" type="button" onclick="editData(${index})">Edytuj</button>
                <button type="button" onclick="deleteData(${index})">Usuń</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Функция для редактирования данных
function editData(index) {
    const entry = data[index];
    document.getElementById('imie').value = entry.imie;
    document.getElementById('wiek').value = entry.wiek;
    document.getElementById('miasto').value = entry.miasto;
}

// Функция для удаления данных
function deleteData(index) {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
        data.splice(index, 1);  // Удаляем запись по индексу
        renderTable();  // Перерисовываем таблицу
    }
}

// Функция для увеличения возраста на 5
function mapujDane() {
    // Проходим по всем данным и увеличиваем возраст на 5
    data.forEach(entry => {
        entry.wiek += 5;
    });

    // Перерисовываем таблицу, чтобы отобразить обновленные данные
    renderTable();
}

// Пример фильтрации данных
function filtrujDane() {
    const filteredData = data.filter(entry => entry.wiek > 30);
    renderFilteredTable(filteredData);
}

// Функция для отображения отфильтрованных данных
function renderFilteredTable(filteredData) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    filteredData.forEach((entry, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.imie}</td>
            <td>${entry.wiek}</td>
            <td>${entry.miasto}</td>
            <td>
                <button class="tabele_btn" type="button" onclick="editData(${index})">Edytuj</button>
                <button type="button" onclick="deleteData(${index})">Usuń</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Функция для сброса данных (удаления всех записей)
function zresetujDane() {
    // Очищаем все данные в массиве
    data = [];

    // Перерисовываем таблицу, которая теперь будет пустой
    renderTable();
}
