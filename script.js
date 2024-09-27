document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const analyzeButton = document.getElementById('analyze');
    const resultsDiv = document.getElementById('results');
    let parsedData = {};

    // Load CSV data
    fetch('master_dataset.csv')
        .then(response => response.text())
        .then(data => {
            parsedData = parseCSV(data);
            populateDropdown(parsedData);
        })
        .catch(error => {
            console.error('Error loading CSV data:', error);
            resultsDiv.innerHTML = 'Error loading data.';
        });

    // Parse CSV data
    function parseCSV(data) {
        const rows = data.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const values = rows.slice(1);
        return { headers, values };
    }

    // Populate dropdown with unique values
    function populateDropdown(data) {
        data.headers.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            categorySelect.appendChild(option);
        });
    }

    // Analyze data based on user input
    analyzeButton.addEventListener('click', () => {
        const selectedCategory = categorySelect.value;
        const inputValue = document.getElementById('value').value.toLowerCase();
        const filteredData = filterData(selectedCategory, inputValue);
        displayResults(filteredData);
    });

    // Filter data based on selected category and input value
    function filterData(category, value) {
        const categoryIndex = parsedData.headers.indexOf(category);
        return parsedData.values.filter(row => row[categoryIndex].toLowerCase() === value);
    }

    // Display results
    function displayResults(data) {
        resultsDiv.innerHTML = `<p>Found ${data.length} entries.</p>`;
        if (data.length > 0) {
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            parsedData.headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            data.forEach(row => {
                const rowElement = document.createElement('tr');
                row.forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell;
                    rowElement.appendChild(cellElement);
                });
                table.appendChild(rowElement);
            });

            resultsDiv.appendChild(table);
        }
    }
});
