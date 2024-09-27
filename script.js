const csvFilePath = 'master_dataset.csv'; // Ensure this path is correct

let data = [];
const categories = [
    "Name", "revised_gender", "UniversityType", "Institution", "archive_link",
    "college_url", "scholar_profile_url", "State", "Specialisation", "AreaofInterest",
    "UGDegree", "UGDepartment", "UGInstitute", "PGDegree", "PGDepartment", "PGInstitute",
    "MPhil", "MPhilDepartment", "MPhilInstitute", "Doctoral", "DoctoralDepartment",
    "DoctoralInstitute", "FirstJobPosition", "FirstJobInstitution", "FirstJobDuration",
    "SecondJobPosition", "SecondJobInstitution", "SecondJobDuration", "ThirdJobPosition",
    "ThirdJobInstitution", "ThirdJobDuration", "FourthJobPosition", "FourthJobInstitution",
    "FourthJobDuration", "FifthJobPosition", "FifthJobInstitution", "FifthJobDuration",
    "unique_id", "university_type", "name", "institution", "UniversityType_id",
    "State_id", "Name_id", "Institution_id", "Current_Designation", "dept", "state",
    "CurrentDesignation_r", "archive_timeline", "identifier", "names_scholar", "position",
    "field", "total_citation", "citations_dynmc", "citation_5y_dynmc", "h-index",
    "h-index_5y_dynmc", "i10-index", "i10-index_5y_dynmc", "profile_since", "co-authors",
    "personal_site", "linkedin", "orcid", "personal_site_manual", "linkedin_site_manual",
    "university_profile_manual", "research_gate_manual"
];

// Load CSV data
fetch(csvFilePath)
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split('\n').slice(1);
        data = rows.map(row => row.split(',').map(cell => cell.trim()));
        populateCategoryCounts();
        populateCategorySelect();
    })
    .catch(error => console.error('Error loading CSV:', error));

// Populate category counts
function populateCategoryCounts() {
    const counts = {};
    for (let category of categories) {
        counts[category] = data.filter(row => row[categories.indexOf(category)]).length;
    }

    const categoryCountsDiv = document.getElementById('categoryCounts');
    categoryCountsDiv.innerHTML = '<h3>Counts per Category</h3>';
    for (let [category, count] of Object.entries(counts)) {
        categoryCountsDiv.innerHTML += `<p>${category}: ${count}</p>`;
    }
}

// Populate category select dropdown
function populateCategorySelect() {
    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Filter data based on category and value
document.getElementById('filterButton').addEventListener('click', () => {
    const selectedCategory = document.getElementById('categorySelect').value;
    const filterValue = document.getElementById('filterValue').value;

    const filteredCount = data.filter(row => row[categories.indexOf(selectedCategory)] === filterValue).length;
    document.getElementById('filteredCount').innerHTML = `Count for ${selectedCategory} = "${filterValue}": ${filteredCount}`;
});
