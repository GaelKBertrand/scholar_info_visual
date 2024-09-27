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
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(csv => {
        const rows = csv.split('\n').slice(1);
        data = rows.map(row => row.split(',').map(cell => cell.trim()));

        populateCategoryCounts();
        populateStatisticalSummary();
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

// Populate statistical summary
function populateStatisticalSummary() {
    const totalCitations = data.map(row => Number(row[categories.indexOf("total_citation")]) || 0);
    const hIndex = data.map(row => Number(row[categories.indexOf("h-index")]) || 0);
    const hIndex5y = data.map(row => Number(row[categories.indexOf("h-index_5y_dynmc")]) || 0);

    const meanCitations = (totalCitations.reduce((a, b) => a + b, 0) / totalCitations.length).toFixed(2);
    const meanHIndex = (hIndex.reduce((a, b) => a + b, 0) / hIndex.length).toFixed(2);
    const meanHIndex5y = (hIndex5y.reduce((a, b) => a + b, 0) / hIndex5y.length).toFixed(2);

    const statisticalSummaryDiv = document.getElementById('statisticalSummary');
    statisticalSummaryDiv.innerHTML = `
        <h3>Statistical Summary</h3>
        <p>Mean Total Citations: ${meanCitations}</p>
        <p>Mean H-Index: ${meanHIndex}</p>
        <p>Mean H-Index (5 Years): ${meanHIndex5y}</p>
    `;
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
    const filterValue = document.getElementById('filterValue').value.trim();

    const filteredData = data.filter(row => {
        const cellValue = row[categories.indexOf(selectedCategory)];
        return cellValue && cellValue.toLowerCase().includes(filterValue.toLowerCase());
    });

    const filteredCount = filteredData.length;

    document.getElementById('filteredCount').innerHTML = `Count for "${filterValue}" in ${selectedCategory}: ${filteredCount}`;
});
