const csvFilePath = 'master_dataset.csv'; // Ensure this path is correct

let data = [];

// Load the CSV file
Papa.parse(csvFilePath, {
    download: true,
    header: true,
    complete: (results) => {
        data = results.data;
        populateCategories();
        displayCategoryCounts();
    },
    error: (error) => {
        console.error("Error loading data:", error);
    }
});

// Populate categories in the dropdown
function populateCategories() {
    const filterSelect = document.getElementById('filter');
    const keys = Object.keys(data[0]); // Get keys from the first row to use as categories

    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        filterSelect.appendChild(option);
    });
}

// Display count of people per category
function displayCategoryCounts() {
    const categoryCounts = document.getElementById('categoryCounts');
    const keys = Object.keys(data[0]);

    keys.forEach(key => {
        const count = data.reduce((acc, curr) => curr[key] ? acc + 1 : acc, 0);
        categoryCounts.innerHTML += `<p>${key}: ${count}</p>`;
    });
}

// Filter data based on user input
document.getElementById('filterButton').addEventListener('click', () => {
    const filter = document.getElementById('filter').value;
    const filterValue = document.getElementById('filterValue').value.trim().toLowerCase();

    if (!filter || !filterValue) {
        alert("Please select a category and enter a filter value.");
        return;
    }

    const filteredCount = data.filter(row => {
        return row[filter] && row[filter].toLowerCase().includes(filterValue);
    }).length;

    document.getElementById('filteredCount').innerHTML = `Count for ${filter} = "${filterValue}": ${filteredCount}`;
});
