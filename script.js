document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const analyzeButton = document.getElementById('analyze');
    const resultsDiv = document.getElementById('results');

    // Load CSV data
    fetch('master_dataset.csv')
        .then(response => response.text())
        .then(data => {
            const parsedData = parseCSV(data);
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
        data.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.textContent = row.join(', ');
            resultsDiv.appendChild(rowDiv);
        });
    }
});
