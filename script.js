// Load categories based on the specified columns
function loadCategories() {
    const filterSelect = document.getElementById('filter');
    const predefinedCategories = [
        "Name", "revised_gender", "UniversityType", "Institution", "archive_link",
        "college_url", "scholar_profile_url", "State", "Specialisation",
        "AreaofInterest", "UGDegree", "UGDepartment", "UGInstitute", "PGDegree",
        "PGDepartment", "PGInstitute", "MPhil", "MPhilDepartment",
        "MPhilInstitute", "Doctoral", "DoctoralDepartment", "DoctoralInstitute",
        "FirstJobPosition", "FirstJobInstitution", "FirstJobDuration",
        "SecondJobPosition", "SecondJobInstitution", "SecondJobDuration",
        "ThirdJobPosition", "ThirdJobInstitution", "ThirdJobDuration",
        "FourthJobPosition", "FourthJobInstitution", "FourthJobDuration",
        "FifthJobPosition", "FifthJobInstitution", "FifthJobDuration",
        "unique_id", "university_type", "name", "institution",
        "UniversityType_id", "State_id", "Name_id", "Institution_id",
        "Current_Designation", "dept", "state", "CurrentDesignation_r",
        "archive_timeline", "identifier", "names_scholar", "position",
        "field", "total_citation", "citations_dynmc", "citation_5y_dynmc",
        "h-index", "h-index_5y_dynmc", "i10-index", "i10-index_5y_dynmc",
        "profile_since", "co-authors", "personal_site", "linkedin",
        "orcid", "personal_site_manual", "linkedin_site_manual",
        "university_profile_manual", "research_gate_manual"
    ];

    predefinedCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
    });
}

// Function to filter and display results
function filterData() {
    const filter = document.getElementById('filter').value;
    const filterValue = document.getElementById('filterValue').value;
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    // Fetch the data from the CSV file
    fetch('master_dataset.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            let count = 0;

            rows.forEach(row => {
                const columns = row.split(',');
                const rowObject = {};

                // Create an object with the column names as keys
                columns.forEach((value, index) => {
                    rowObject[predefinedCategories[index]] = value.trim();
                });

                // Filter based on selected category and value
                if (rowObject[filter] && rowObject[filter].toLowerCase() === filterValue.toLowerCase()) {
                    count++;
                }
            });

            // Display the count of matching records
            resultsDiv.textContent = `Count: ${count}`;
        })
        .catch(error => {
            console.error('Error fetching CSV file:', error);
            resultsDiv.textContent = 'Error loading data.';
        });
}

// Event listener for the filter button
document.getElementById('filterButton').addEventListener('click', filterData);

// Load categories when the page is loaded
window.onload = loadCategories;
