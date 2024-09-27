let data = [];

// Load the CSV data
async function loadCSV() {
    const response = await fetch('master_dataset.csv'); // Ensure the CSV file is in the root directory
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip header row
    const keys = rows[0].split(',').map(key => key.trim()); // Get keys from the header
    data = rows.map(row => {
        const values = row.split(',').map(value => value.trim()); // Trim values
        return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
    });
    populateFilters();
}

// Populate filter options dynamically
function populateFilters() {
    const filterSelect = document.getElementById('filter');
    const categories = Object.keys(data[0]); // Get all column names

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
    });
}

// Update statistics based on selected category
function updateStats() {
    const filterSelect = document.getElementById('filter');
    const selectedCategory = filterSelect.value;
    const categoryCounts = {};

    // Count occurrences for the selected category
    data.forEach(item => {
        const value = item[selectedCategory];
        categoryCounts[value] = (categoryCounts[value] || 0) + 1;
    });

    // Display results
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `<h3>Counts for ${selectedCategory}:</h3>`;
    for (const [key, count] of Object.entries(categoryCounts)) {
        statsDiv.innerHTML += `<p>${key}: ${count}</p>`;
    }
}

// Initialize the app
loadCSV();
