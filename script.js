let data = [];

// List of allowed categories
const allowedCategories = [
    "Name",
    "Gender",
    "UniversityType",
    "CurrentDesignation",
    "Department",
    "Institution",
    "State",
    "Specialisation",
    "AreaofInterest",
    "UGDegree",
    "UGDepartment",
    "UGInstitute",
    "PGDegree",
    "PGDepartment",
    "PGInstitute",
    "MPhil",
    "MPhilDepartment",
    "MPhilInstitute",
    "Doctoral",
    "DoctoralDepartment",
    "DoctoralInstitute",
    "FirstJobPosition",
    "FirstJobInstitution",
    "FirstJobDuration",
    "SecondJobPosition",
    "SecondJobInstitution",
    "SecondJobDuration",
    "ThirdJobPosition",
    "ThirdJobInstitution",
    "ThirdJobDuration",
    "FourthJobPosition",
    "FourthJobInstitution",
    "FourthJobDuration",
    "FifthJobPosition",
    "FifthJobInstitution",
    "FifthJobDuration",
    "SixthJobPosition",
    "SixthJobInstitution",
    "SixthJobDuration",
    "SeventhJobPosition",
    "SeventhJobInstitution",
    "SeventhJobDuration",
    "EightJobPosition",
    "EightJobInstitution",
    "EightJobDuration",
    "NinthJobPosition",
    "NinthJobInstitution",
    "NinthJobDuration",
    "TenthJobPosition",
    "TenthJobInstitution",
    "TenthJobDuration",
    "EleventhJobPosition",
    "EleventhJobInstitution",
    "EleventhJobDuration",
    "TwelfthJobPosition",
    "TwelfthJobInstitution",
    "TwelfthJobDuration",
    "ThirteenthJobPosition",
    "ThirteenthJobInstitution",
    "ThirteenthJobDuration",
    "FourteenthJobPosition",
    "FourteenthJobInstitution",
    "FourteenthJobDuration",
    "FifteenthJobPosition",
    "FifteenthJobInstitution",
    "FifteenthJobDuration",
    "name",
    "institution",
    "state",
    "State_id",
    "Name_id",
    "Institution_id",
    "university_type",
    "UniversityType_id",
    "unique_id",
    "gender",
    "revised_gender_r",
    "dept",
    "Current_Designation",
    "CurrentDesignation_r",
];

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

// Populate filter options dynamically, only including allowed categories
function populateFilters() {
    const filterSelect = document.getElementById('filter');
    allowedCategories.forEach(category => {
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
