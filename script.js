/* =========================
   DATOS
========================= */

let currentLanguage =
    localStorage.getItem("language") || null;

let tests =
    JSON.parse(localStorage.getItem("tests")) || [];

let trembo =
    Number(localStorage.getItem("trembo")) || 0;

let currentDate = new Date();

let selectedDate = null;


/* =========================
   IDIOMAS
========================= */

const translations = {

    es: {
        calendar: "Calendario",
        results: "Resultados de las pruebas",
        addTest: "Agregar prueba",
        subject: "Materia",
        notes: "Notas adicionales",
        average: "Promedio /10"
    },

    en: {
        calendar: "Calendar",
        results: "Test Results",
        addTest: "Add test",
        subject: "Subject",
        notes: "Additional notes",
        average: "Average /10"
    },

    he: {
        calendar: "לוח שנה",
        results: "תוצאות מבחנים",
        addTest: "הוסף מבחן",
        subject: "מקצוע",
        notes: "הערות",
        average: "ממוצע /10"
    }

};


/* =========================
   CAMBIAR IDIOMA
========================= */

function selectLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "language",
        language
    );

    document.getElementById(
        "languageScreen"
    ).classList.add("hidden");

    document.getElementById(
        "app"
    ).classList.remove("hidden");

    applyLanguage();

    renderCalendar();

    renderResults();

    updateTrembo();
}


/* =========================
   APLICAR IDIOMA
========================= */

function applyLanguage() {

    const t =
        translations[currentLanguage];

    document.getElementById(
        "menuCalendar"
    ).textContent = t.calendar;

    document.getElementById(
        "menuResults"
    ).textContent = t.results;

    document.getElementById(
        "addTestText"
    ).textContent = t.addTest;

    document.getElementById(
        "averageText"
    ).textContent = t.average;


    if (currentLanguage === "he") {

        document.body.dir = "rtl";

    } else {

        document.body.dir = "ltr";

    }

}


/* =========================
   NAVEGACIÓN
========================= */

function showPage(page) {

    document
        .getElementById("calendarPage")
        .classList.add("hidden");

    document
        .getElementById("resultsPage")
        .classList.add("hidden");

    document
        .getElementById("dianabolPage")
        .classList.add("hidden");


    if (page === "calendar") {

        document
            .getElementById("calendarPage")
            .classList.remove("hidden");

        renderCalendar();

    }


    if (page === "results") {

        document
            .getElementById("resultsPage")
            .classList.remove("hidden");

        renderResults();

    }


    if (page === "dianabol") {

        document
            .getElementById("dianabolPage")
            .classList.remove("hidden");

    }

}


/* =========================
   CALENDARIO
========================= */

function renderCalendar() {

    const calendar =
        document.getElementById("calendar");

    calendar.innerHTML = "";


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const monthNames = {

        es: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],

        en: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],

        he: [
            "ינואר",
            "פברואר",
            "מרץ",
            "אפריל",
            "מאי",
            "יוני",
            "יולי",
            "אוגוסט",
            "ספטמבר",
            "אוקטובר",
            "נובמבר",
            "דצמבר"
        ]

    };


    document.getElementById(
        "monthTitle"
    ).textContent =
        `${monthNames[currentLanguage][month]} ${year}`;


    const firstDay =
        new Date(year, month, 1).getDay();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    /*
       Domingo = 0
       Lunes = 1
       ...
    */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendar.appendChild(empty);

    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


        const cell =
            document.createElement("div");

        cell.className =
            "calendar-day";


        cell.innerHTML =
            `<div class="day-number">${day}</div>`;


        const dayTests =
            tests.filter(
                test =>
                    test.date === date
            );


        dayTests.forEach(test => {

            const marker =
                document.createElement("div");

            marker.className =
                "test-marker";

            marker.textContent =
                test.subject;

            cell.appendChild(marker);

        });


        cell.onclick = () => {

            selectDate(date);

        };


        calendar.appendChild(cell);

    }

}


/* =========================
   CAMBIAR MES
========================= */

function changeMonth(amount) {

    currentDate.setMonth(
        currentDate.getMonth() + amount
    );

    renderCalendar();

}


/* =========================
   SELECCIONAR DÍA
========================= */

function selectDate(date) {

    selectedDate = date;

    document
        .getElementById("testForm")
        .classList.remove("hidden");


    document
        .getElementById("selectedDateTitle")
        .textContent =
        "Prueba del " + date;


    document
        .getElementById("subjectInput")
        .value = "";

    document
        .getElementById("notesInput")
        .value = "";

}


/* =========================
   AGREGAR PRUEBA
========================= */

function addTest() {

    if (!selectedDate) {

        alert(
            "Primero seleccioná un día."
        );

        return;

    }


    const subject =
        document
            .getElementById("subjectInput")
            .value
            .trim();


    const notes =
        document
            .getElementById("notesInput")
            .value
            .trim();


    if (!subject) {

        alert(
            "Ingresá una materia."
        );

        return;

    }


    const newTest = {

        id: Date.now(),

        date: selectedDate,

        subject: subject,

        notes: notes,

        score: null,

        points: 0,

        maxPoints: 0,

        status: "pending",

        rewarded: false

    };


    tests.push(newTest);


    saveData();


    document
        .getElementById("testForm")
        .classList.add("hidden");


    renderCalendar();

    renderResults();

}


/* =========================
   RESULTADOS
========================= */

function renderResults() {

    const list =
        document.getElementById(
            "resultsList"
        );

    list.innerHTML = "";


    tests.forEach(test => {

        const card =
            document.createElement("div");

        card.className =
            "result-card";


        const statusText = {

            pending: "Pendiente",

            done: "Hecha",

            cancelled: "Cancelada"

        };


        card.innerHTML = `

            <h2>${test.subject}</h2>

            <p>
                <strong>Fecha:</strong>
                ${test.date}
            </p>

            <p>
                ${test.notes || ""}
            </p>

            <br>

            <label>
                Nota sobre 10:
            </label>

            <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value="${test.score ?? ""}"
                onchange="updateScore(${test.id}, this.value)"
            >


            <label>
                Puntos obtenidos:
            </label>

            <input
                type="number"
                min="0"
                value="${test.points || ""}"
                onchange="updatePoints(${test.id}, this.value)"
            >


            <label>
                Puntos totales:
            </label>

            <input
                type="number"
                min="0"
                value="${test.maxPoints || ""}"
                onchange="updateMaxPoints(${test.id}, this.value)"
            >


            <br><br>


            <label>
                Estado:
            </label>

            <select
                onchange="updateStatus(${test.id}, this.value)"
            >

                <option
                    value="pending"
                    ${test.status === "pending" ? "selected" : ""}
                >
                    Pendiente
                </option>

                <option
                    value="done"
                    ${test.status === "done" ? "selected" : ""}
                >
                    Hecha
                </option>

                <option
                    value="cancelled"
                    ${test.status === "cancelled" ? "selected" : ""}
                >
                    Cancelada
                </option>

            </select>

            <br><br>

            <span class="status">
                ${statusText[test.status]}
            </span>

        `;


        list.appendChild(card);

    });


    calculateAverages();

}


/* =========================
   ACTUALIZAR NOTA
========================= */

function updateScore(id, value) {

    const test =
        tests.find(
            t => t.id === id
        );

    if (!test) return;


    test.score =
        value === ""
            ? null
            : Number(value);


    processReward(test);

    saveData();

    renderResults();

}


/* =========================
   PUNTOS
========================= */

function updatePoints(id, value) {

    const test =
        tests.find(
            t => t.id === id
        );

    if (!test) return;


    test.points =
        Number(value) || 0;


    saveData();

    calculateAverages();

}


/* =========================
   PUNTOS MÁXIMOS
========================= */

function updateMaxPoints(id, value) {

    const test =
        tests.find(
            t => t.id === id
        );

    if (!test) return;


    test.maxPoints =
        Number(value) || 0;


    saveData();

    calculateAverages();

}


/* =========================
   ESTADO
========================= */

function updateStatus(id, status) {

    const test =
        tests.find(
            t => t.id === id
        );

    if (!test) return;


    test.status = status;


    processReward(test);

    saveData();

    renderResults();

}


/* =========================
   RECOMPENSAS
========================= */

function rewardForScore(score) {

    if (score >= 10) return 500;

    if (score >= 9) return 70;

    if (score >= 8) return 40;

    if (score >= 7) return 30;

    if (score >= 6) return 10;

    if (score >= 5) return 5;

    return -5;

}


/* =========================
   PROCESAR TREMBOLONA
========================= */

function processReward(test) {

    if (
        test.status !== "done" ||
        test.score === null ||
        test.rewarded
    ) {

        return;

    }


    const reward =
        rewardForScore(test.score);


    trembo += reward;


    test.rewarded = true;


    saveData();

    updateTrembo();

}


/* =========================
   CONTADOR
========================= */

function updateTrembo() {

    document
        .getElementById("tremboAmount")
        .textContent = trembo;


    document
        .getElementById("tremboText")
        .textContent =
        currentLanguage === "he"
            ? "טרמבולונה"
            : currentLanguage === "en"
                ? "Trembolona"
                : "Trembolona";

}


/* =========================
   PROMEDIOS
========================= */

function calculateAverages() {

    const completed =
        tests.filter(
            test =>
                test.status === "done" &&
                test.score !== null
        );


    if (completed.length === 0) {

        document
            .getElementById("average")
            .textContent = "-";

        document
            .getElementById("percentage")
            .textContent = "-";

        document
            .getElementById("totalPoints")
            .textContent = "-";

        return;

    }


    /* PROMEDIO SOBRE 10 */

    const totalGrades =
        completed.reduce(
            (sum, test) =>
                sum + Number(test.score),
            0
        );


    const average =
        totalGrades / completed.length;


    document
        .getElementById("average")
        .textContent =
        average.toFixed(2);


    /* PUNTOS */

    const earned =
        completed.reduce(
            (sum, test) =>
                sum + Number(test.points || 0),
            0
        );


    const maximum =
        completed.reduce(
            (sum, test) =>
                sum + Number(test.maxPoints || 0),
            0
        );


    document
        .getElementById("totalPoints")
        .textContent =
        `${earned} / ${maximum}`;


    /* PORCENTAJE */

    if (maximum > 0) {

        const percentage =
            (earned / maximum) * 100;


        document
            .getElementById("percentage")
            .textContent =
            percentage.toFixed(1) + "%";

    } else {

        document
            .getElementById("percentage")
            .textContent =
            "-";

    }

}


/* =========================
   GUARDAR DATOS
========================= */

function saveData() {

    localStorage.setItem(
        "tests",
        JSON.stringify(tests)
    );


    localStorage.setItem(
        "trembo",
        trembo
    );

}


/* =========================
   CARGAR APLICACIÓN
========================= */

window.onload = function () {

    if (currentLanguage) {

        document
            .getElementById("languageScreen")
            .classList.add("hidden");


        document
            .getElementById("app")
            .classList.remove("hidden");


        applyLanguage();

        renderCalendar();

        renderResults();

        updateTrembo();

    }

};