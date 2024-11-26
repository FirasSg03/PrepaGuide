//data sets
const locations = {
    "Ariana": [36.8624, 10.1783],
    "Beja": [36.7243, 9.1816],
    "Ben Arous": [36.7558, 10.2257],
    "Bizerte": [37.2707, 9.8738],
    "Gabes": [33.8827, 10.0971],
    "Gafsa": [34.4235, 8.7838],
    "Jendouba ": [36.5048, 8.7804],
    "Kairouan ": [35.6785, 10.0997],
    "Kasserine": [35.1664, 8.8174],
    "Kebili": [33.7103, 8.7085],
    "Kef": [36.1810, 8.7138],
    "Mahdia": [35.5043, 11.0620],
    "Medenine": [33.3590, 10.5107],
    "Monastir": [35.7740, 10.8251],
    "Nabeul": [36.4534, 10.7380],
    "Sfax": [34.7404, 10.7604],
    "Sidi Bouzid": [35.0390, 9.4684],
    "Siliana": [36.1365, 9.3868],
    "Sousse": [35.8256, 10.6367],
    "Tataouine": [33.0801, 10.4461],
    "Tozeur": [33.9248, 8.12],
    "Tunis": [36.8065, 10.1815],
    "Zaghouan": [36.4067, 10.1414],
    "La Manouba": [36.8526, 10.156]
};
const data = {
    "Computer Science and IT": [
        "Génie Informatique Industrielle",
        "Génie Informatique",
        "Infotronique",
        "Génie Télécommunications Embarquées",
        "Télécommunications",
        "Génie des Communications et Réseaux",
        "Informatique Appliquée",
        "Informatique",
        "Ingénierie des Données et Systèmes Décisionnels",
        "Mécatronique",
        "Génie des Télécommunications"
    ],
    "Energy, Industrial Engineering and Management": [
        "Génie Energétique",
        "Génie Industriel",
        "Modélisation pour l'Industrie et Services",
        "Génie des Matériaux et Management Industriel",
        "Génie des Systèmes Industriels et Logistiques",
        "Technologies Avancées",
        "Génie Productique",
        "Hydraulique et Aménagement"
    ],
    "Mechanical, Electrical and Civil Engineering": [
        "Génie Mécanique",
        "Génie Civil",
        "Génie Hydraulique et Environnement",
        "Hydraulique et Amenagement",
        "Génie des Systèmes Electroniques et Communications",
        "Génie Electrique- Automatique",
        "Génie Electrique",
        "Electronique Industrielle",
        "Génie Electromécanique"
    ],
    "Chemical and Biological Engineering": [
        "Génie Chimique- Procédés",
        "Génie Chimique Industriel et Minier",
        "Chimie Analytique et Instrumentation",
        "Génie Biologique"
    ],
    "Agricultural and Environmental Engineering": [
        "Génie Mécanique et Agro-Industriel",
        "Aménagement du Paysage",
        "Production Animale et Fourragère",
        "Horticulture",
        "Génie des Systèmes Horticoles",
        "Agro- alimentaire",
        "Génie Rural, Eaux et Forêts",
        "Génie Energétique et Technologies de l'Environnement",
        "Production Animale",
        "Topographie",
        "Agro-alimentaire",
        "Géo Resources et Environnement",
        "Topographie et Géomatique"
    ],
    "Textile and Material Engineering": [
        "Génie Textile"
    ],
    "Mathematics and Statistics": [
        "Génie Mathématiques Appliquées et Modélisation",
        "Statistique et Analyse de l'Information"
    ],
    "OTHER": [
        "Techniques Avancées",
        "Polytechnique"
    ]
};

//Sliders
const tslider = document.getElementById('tSlider');
const pslider = document.getElementById('pSlider');
const tsliderValue = document.getElementById('tsliderValue');
const psliderValue = document.getElementById('psliderValue');

function updateValue() {
    tsliderValue.textContent = tslider.value + "%";
    psliderValue.textContent = pslider.value + " KM";
}
updateValue();
tslider.addEventListener('input', updateValue);
pslider.addEventListener('input', updateValue);

//filter by farness
function haversineDistance(x, y) {
    // Convert degrees to radians
    function toRad(degrees) {
        return degrees * Math.PI / 180;
    }

    // Extract latitude and longitude from coordinates
    const [lat1, lon1] = x;
    const [lat2, lon2] = y;

    // Radius of Earth in kilometers
    const R = 6371;

    // Differences in coordinates
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    // Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}
const calcDistance = (x, y) => {
    const userLocation = document.getElementById('location').textContent.trim();
    const distance = haversineDistance(locations[userLocation], locations[x]);
    return distance <= y;
};

//filter by admission likelihood
const inRange = (x, y) => {
    const calc = (-parseFloat(x)) <= y;
    return calc;
};

//sorting table from table header
function sortDesktopTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        // Check if the column is numeric
        const aColValue = parseFloat(aColText);
        const bColValue = parseFloat(bColText);

        if (!isNaN(aColValue) && !isNaN(bColValue)) {
            // Numeric comparison
            return (aColValue - bColValue) * dirModifier;
        } else {
            // String comparison
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        }
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll(".table-sortable th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.addEventListener('DOMContentLoaded', () => {
    let filter = 'all';
    const buttons = document.querySelectorAll('.filtring-btn button');
    const rows = document.querySelectorAll('table.table-sortable tbody tr');

    //filter by category & leniency
    function filterDesktopTable() {
        rows.forEach(row => {
            try {
                const filiere = row.querySelector('td:nth-child(2)').textContent.trim();
                const location = row.querySelector('td:nth-child(3)').textContent.trim();
                const diff = row.querySelector('td:nth-child(5)').textContent.trim();

                const categoryMatch = filter === 'all' || data[filter].includes(filiere);
                const sliderMatch = inRange(diff, tslider.value);
                const distanceMatch = calcDistance(location, pslider.value);

                if (categoryMatch && sliderMatch && distanceMatch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            } catch (error) {
                console.log("pass: filterDesktopTable")
            }

        });
    }

    //search bar function
    const searchInput = document.getElementById('searchInput');
    const searchRows = document.querySelectorAll('#searchTable tbody tr');

    function searchBar() {
        const searchFilter = searchInput.value.toLowerCase();

        searchRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(searchFilter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    //change color of diff
    function changeColorDesktopTable() {
        rows.forEach(row => {
            try {
                const cell = row.querySelector('td:nth-child(5)');
                const cellValue = parseFloat(cell.textContent.trim());

                if (!isNaN(cellValue)) {
                    if (cellValue > 0) {
                        cell.classList.add('positive');
                    } else if (cellValue < 0) {
                        cell.classList.add('negative');
                    }
                }
            } catch (error) {
                console.log("pass");
            }

        });
    }
    /* For Desktop size Screen */
    if (window.innerWidth >= 600) {
        document.querySelectorAll("table th").forEach(headerCell => {
            headerCell.addEventListener("click", () => {
                const tableElement = headerCell.parentElement.parentElement.parentElement;
                const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
                const currentIsAscending = headerCell.classList.contains("th-sort-asc");

                // sort table
                sortDesktopTableByColumn(tableElement, headerIndex, !currentIsAscending);
            });
        });

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                filter = button.value;
                filterDesktopTable();
            });
        });

        tslider.addEventListener('input', filterDesktopTable);
        pslider.addEventListener('input', filterDesktopTable);
        searchInput.addEventListener('input', searchBar);
        changeColorDesktopTable();
    }

});