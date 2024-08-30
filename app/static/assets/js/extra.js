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

//filter by farness ###############################################
const locations = {}
const calcDistance = (x, y) => {
    return true;
}

//filter by admission likelihood
const inRange = (x, y) => {
    const left = (-parseFloat(x)) > -200;
    const calc = (-parseFloat(x)) <= y;
    return left && calc;
}

//sorting table
function sortTableByColumn(table, column, asc = true) {
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
};
document.querySelectorAll("table th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        // sort table
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

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
        "Génie Productique"
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
        "Chimie Analytique et Instrumentation"
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
        "Topographie"
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
}
document.addEventListener('DOMContentLoaded', () => {
    let filter = 'all';
    const buttons = document.querySelectorAll('.no-bullets button');
    const rows = document.querySelectorAll('table.table-sortable tbody tr');

    //filter by category & leniency
    function filterTable() {
        rows.forEach(row => {
            const filiere = row.querySelector('td:nth-child(2)').textContent.trim();
            const location = row.querySelector('td:nth-child(3)').textContent.trim();
            const diff = row.querySelector('td:nth-child(5)').textContent.trim();

            const categoryMatch = filter === 'all' || data[filter].includes(filiere);
            const sliderMatch = inRange(diff, tslider.value);

            if (categoryMatch && sliderMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    //change color of diff
    function changeColor() {
        rows.forEach(row => {
            const cell = row.querySelector('td:nth-child(5)');
            const cellValue = parseFloat(cell.textContent.trim());
            if (!isNaN(cellValue)) {
                if (cellValue > 0) {
                    cell.classList.add('positive');
                } else if (cellValue < 0) {
                    cell.classList.add('negative');
                }
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            filter = button.value;
            filterTable();
        });
    });

    tslider.addEventListener('input', filterTable);
    pslider.addEventListener('input', filterTable);
    changeColor();
});