/* =========================
   DATOS
========================= */

let currentLanguage = null;

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
        dianabol: "Dianabol",
        addTest: "Agregar prueba",
        subject: "Materia",
        notes: "Notas adicionales",
        average: "Promedio /10",
        deleteLast: "Borrar lo último",
        deleteAll: "Borrar todo",
        pending: "Pendiente",
        done: "Hecha",
        cancelled: "Cancelada",
        date: "Fecha",
        score: "Nota sobre 10",
        earnedPoints: "Puntos obtenidos",
        maxPoints: "Puntos totales",
        status: "Estado",
        addTestTitle: "Agregar prueba",
        additionalNotes: "Información sobre la prueba...",
        subjectPlaceholder: "Ej: Matemática",
        firstSelectDay: "Primero seleccioná un día.",
        enterSubject: "Ingresá una materia.",
        noTests: "No hay pruebas para borrar.",
        confirmDelete: "¿Seguro que querés borrar todas las pruebas?",
        testOf: "Prueba del"
    },

    en: {
        calendar: "Calendar",
        results: "Test Results",
        dianabol: "Dianabol",
        addTest: "Add test",
        subject: "Subject",
        notes: "Additional notes",
        average: "Average /10",
        deleteLast: "Delete last",
        deleteAll: "Delete all",
        pending: "Pending",
        done: "Done",
        cancelled: "Cancelled",
        date: "Date",
        score: "Score out of 10",
        earnedPoints: "Points obtained",
        maxPoints: "Total points",
        status: "Status",
        addTestTitle: "Add test",
        additionalNotes: "Information about the test...",
        subjectPlaceholder: "Example: Mathematics",
        firstSelectDay: "First select a day.",
        enterSubject: "Enter a subject.",
        noTests: "There are no tests to delete.",
        confirmDelete: "Are you sure you want to delete all tests?",
        testOf: "Test on"
    },

    he: {
        calendar: "לוח שנה",
        results: "תוצאות מבחנים",
        dianabol: "דיאנבול",
        addTest: "הוסף מבחן",
        subject: "מקצוע",
        notes: "הערות נוספות",
        average: "ממוצע /10",
        deleteLast: "מחק את האחרון",
        deleteAll: "מחק הכול",
        pending: "ממתין",
        done: "הושלם",
        cancelled: "בוטל",
        date: "תאריך",
        score: "ציון מתוך 10",
        earnedPoints: "נקודות שהושגו",
        maxPoints: "סך הנקודות",
        status: "סטטוס",
        addTestTitle: "הוסף מבחן",
        additionalNotes: "מידע על המבחן...",
        subjectPlaceholder: "לדוגמה: מתמטיקה",
        firstSelectDay: "בחר קודם יום.",
        enterSubject: "הכנס מקצוע.",
        noTests: "אין מבחנים למחיקה.",
        confirmDelete: "האם אתה בטוח שברצונך למחוק את כל המבחנים?",
        testOf: "מבחן בתאריך"
    }

};


/* =========================
   CAMBIAR IDIOMA
========================= */

function selectLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    localStorage.setItem("language", language);

    document
        .getElementById("languageScreen")
        .classList.add("hidden");

    document
        .getElementById("app")
        .classList.remove("hidden");

    applyLanguage();

    showPage("calendar");

    updateTrembo();

}


/* =========================
   APLICAR IDIOMA
========================= */

function applyLanguage() {

    if (!currentLanguage) {
        return;
    }

    const t = translations[currentLanguage];


    const menuCalendar =
        document.getElementById("menuCalendar");

    if (menuCalendar) {
        menuCalendar.textContent = t.calendar;
    }


    const menuResults =
        document.getElementById("menuResults");

    if (menuResults) {
        menuResults.textContent = t.results;
    }


    const addTestText =
        document.getElementById("addTestText");

    if (addTestText) {
        addTestText.textContent = t.addTest;
    }


    const averageText =
        document.getElementById("averageText");

    if (averageText) {
        averageText.textContent = t.average;
    }


    const tremboText =
        document.getElementById("tremboText");

    if (tremboText) {
        tremboText.textContent =
            currentLanguage === "he"
                ? "טרמבולונה"
                : "Trembolona";
    }


    /*
       Dirección solamente del contenido.
       NO modificamos body.dir porque eso puede
       afectar el comportamiento visual del menú.
    */

    const app =
        document.getElementById("app");

    if (app) {

        if (currentLanguage === "he") {
            app.setAttribute("dir", "rtl");
        } else {
            app.setAttribute("dir", "ltr");
        }

    }


    /*
       Actualizamos los botones de borrar
       si ya existen.
    */

    const deleteButtons =
        document.querySelectorAll(
            ".delete-buttons button"
        );

    if (deleteButtons.length >= 2) {

        deleteButtons[0].textContent =
            t.deleteLast;

        deleteButtons[1].textContent =
            t.deleteAll;

    }


    renderCalendar();

    renderResults();

}


/* =========================
   NAVEGACIÓN
========================= */

function showPage(page) {

    const calendarPage =
        document.getElementById("calendarPage");

    const resultsPage =
        document.getElementById("resultsPage");

    const dianabolPage =
        document.getElementById("dianabolPage");


    if (!calendarPage ||
        !resultsPage ||
        !dianabolPage) {

        return;

    }


    /*
       Ocultamos todas las páginas.
    */

    calendarPage.classList.add("hidden");

    resultsPage.classList.add("hidden");

    dianabolPage.classList.add("hidden");


    /*
       Mostramos solamente la seleccionada.
    */

    if (page === "calendar") {

        calendarPage.classList.remove("hidden");

        renderCalendar();

        return;

    }


    if (page === "results") {

        resultsPage.classList.remove("hidden");

        renderResults();

        return;

    }


    if (page === "dianabol") {

        dianabolPage.classList.remove("hidden");

        return;

    }

}


/* =========================
   CALENDARIO
========================= */

function renderCalendar() {

    const calendar =
        document.getElementById("calendar");

    if (!calendar || !currentLanguage) {
        return;
    }


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


    const monthTitle =
        document.getElementById("monthTitle");

    if (monthTitle) {

        monthTitle.textContent =
            `${monthNames[currentLanguage][month]} ${year}`;

    }


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /*
       Días vacíos antes del primer día.
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


    /*
       Días del mes.
    */

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
                test => test.date === date
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


        /*
           Usamos addEventListener para que
           el click quede correctamente asociado.
        */

        cell.addEventListener(
            "click",
            function () {
                selectDate(date);
            }
        );


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


    const form =
        document.getElementById("testForm");

    if (form) {
        form.classList.remove("hidden");
    }


    const title =
        document.getElementById("selectedDateTitle");

    if (title) {

        title.textContent =
            `${translations[currentLanguage].testOf} ${date}`;

    }


    const subject =
        document.getElementById("subjectInput");

    if (subject) {
        subject.value = "";
    }


    const notes =
        document.getElementById("notesInput");

    if (notes) {
        notes.value = "";
    }

}


/* =========================
   AGREGAR PRUEBA
========================= */

function addTest() {

    if (!selectedDate) {

        alert(
            translations[currentLanguage]
                .firstSelectDay
        );

        return;

    }


    const subjectElement =
        document.getElementById("subjectInput");

    const notesElement =
        document.getElementById("notesInput");


    const subject =
        subjectElement
            ? subjectElement.value.trim()
            : "";


    const notes =
        notesElement
            ? notesElement.value.trim()
            : "";


    if (!subject) {

        alert(
            translations[currentLanguage]
                .enterSubject
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

        rewardAmount: 0

    };


    tests.push(newTest);


    saveData();


    const form =
        document.getElementById("testForm");

    if (form) {
        form.classList.add("hidden");
    }


    selectedDate = null;


    renderCalendar();

    renderResults();

}


/* =========================
   RESULTADOS
========================= */

function renderResults() {

    const list =
        document.getElementById("resultsList");

    if (!list || !currentLanguage) {
        return;
    }


    list.innerHTML = "";


    const t =
        translations[currentLanguage];


    tests.forEach(test => {

        /*
           Compatibilidad con pruebas antiguas.
        */

        if (typeof test.rewardAmount !== "number") {

            test.rewardAmount = 0;

        }


        const card =
            document.createElement("div");

        card.className =
            "result-card";


        const statusText = {

            pending: t.pending,

            done: t.done,

            cancelled: t.cancelled

        };


        card.innerHTML = `

            <h2>${escapeHTML(test.subject)}</h2>

            <p>
                <strong>
                    ${t.date}:
                </strong>
                ${escapeHTML(test.date)}
            </p>

            <p>
                ${escapeHTML(test.notes || "")}
            </p>

            <br>

            <label>
                ${t.score}:
            </label>

            <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value="${test.score ?? ""}"
            >

            <label>
                ${t.earnedPoints}:
            </label>

            <input
                type="number"
                min="0"
                value="${test.points || ""}"
            >

            <label>
                ${t.maxPoints}:
            </label>

            <input
                type="number"
                min="0"
                value="${test.maxPoints || ""}"
            >

            <br><br>

            <label>
                ${t.status}:
            </label>

            <select>

                <option value="pending">
                    ${t.pending}
                </option>

                <option value="done">
                    ${t.done}
                </option>

                <option value="cancelled">
                    ${t.cancelled}
                </option>

            </select>

            <br><br>

            <span class="status">
                ${statusText[test.status] || t.pending}
            </span>

        `;


        /*
           Obtenemos los elementos recién creados.
        */

        const inputs =
            card.querySelectorAll("input");


        const scoreInput =
            inputs[0];

        const pointsInput =
            inputs[1];

        const maxPointsInput =
            inputs[2];


        const select =
            card.querySelector("select");


        /*
           Nota.
        */

        scoreInput.addEventListener(
            "change",
            function () {

                updateScore(
                    test.id,
                    this.value
                );

            }
        );


        /*
           Puntos obtenidos.
        */

        pointsInput.addEventListener(
            "change",
            function () {

                updatePoints(
                    test.id,
                    this.value
                );

            }
        );


        /*
           Puntos máximos.
        */

        maxPointsInput.addEventListener(
            "change",
            function () {

                updateMaxPoints(
                    test.id,
                    this.value
                );

            }
        );


        /*
           Estado.
        */

        select.value =
            test.status || "pending";


        select.addEventListener(
            "change",
            function () {

                updateStatus(
                    test.id,
                    this.value
                );

            }
        );


        list.appendChild(card);

    });


    calculateAverages();

}


/* =========================
   ESCAPAR TEXTO
========================= */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================
   ACTUALIZAR NOTA
========================= */

function updateScore(id, value) {

    const test =
        tests.find(
            t => t.id === id
        );


    if (!test) {
        return;
    }


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


    if (!test) {
        return;
    }


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


    if (!test) {
        return;
    }


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


    if (!test) {
        return;
    }


    test.status =
        status;


    processReward(test);

    saveData();

    renderResults();

}


/* =========================
   RECOMPENSAS
========================= */

function rewardForScore(score) {

    score = Number(score);


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

    /*
       Aseguramos que siempre exista
       rewardAmount.
    */

    if (
        typeof test.rewardAmount !== "number"
    ) {

        test.rewardAmount = 0;

    }


    let newReward = 0;


    /*
       Solo una prueba HECHA
       con nota recibe recompensa.
    */

    if (
        test.status === "done" &&
        test.score !== null &&
        !Number.isNaN(Number(test.score))
    ) {

        newReward =
            rewardForScore(
                Number(test.score)
            );

    }


    /*
       Aplicamos solamente la diferencia.
    */

    const difference =
        newReward -
        test.rewardAmount;


    trembo += difference;


    /*
       Guardamos la recompensa actual.
    */

    test.rewardAmount =
        newReward;


    test.rewarded =
        newReward !== 0;


    saveData();

    updateTrembo();

}


/* =========================
   BORRAR LO ÚLTIMO
========================= */

function deleteLastTest() {

    if (tests.length === 0) {

        alert(
            translations[currentLanguage]
                .noTests
        );

        return;

    }


    const deletedTest =
        tests[tests.length - 1];


    const rewardToRemove =
        Number(
            deletedTest.rewardAmount || 0
        );


    trembo -=
        rewardToRemove;


    tests.pop();


    saveData();

    updateTrembo();

    renderCalendar();

    renderResults();

}


/* =========================
   BORRAR TODO
========================= */

function deleteAllTests() {

    if (tests.length === 0) {

        alert(
            translations[currentLanguage]
                .noTests
        );

        return;

    }


    const shouldDelete =
        confirm(
            translations[currentLanguage]
                .confirmDelete
        );


    if (!shouldDelete) {
        return;
    }


    const totalRewards =
        tests.reduce(
            (sum, test) =>
                sum +
                Number(test.rewardAmount || 0),
            0
        );


    trembo -=
        totalRewards;


    tests = [];


    saveData();

    updateTrembo();

    renderCalendar();

    renderResults();

}


/* =========================
   CONTADOR
========================= */

function updateTrembo() {

    const amount =
        document.getElementById(
            "tremboAmount"
        );


    const text =
        document.getElementById(
            "tremboText"
        );


    if (amount) {

        amount.textContent =
            trembo;

    }


    if (text) {

        text.textContent =
            currentLanguage === "he"
                ? "טרמבולונה"
                : "Trembolona";

    }

}


/* =========================
   PROMEDIOS
========================= */

function calculateAverages() {

    const averageElement =
        document.getElementById("average");

    const percentageElement =
        document.getElementById("percentage");

    const totalPointsElement =
        document.getElementById("totalPoints");


    if (
        !averageElement ||
        !percentageElement ||
        !totalPointsElement
    ) {

        return;

    }


    const completed =
        tests.filter(
            test =>
                test.status === "done" &&
                test.score !== null &&
                !Number.isNaN(Number(test.score))
        );


    if (completed.length === 0) {

        averageElement.textContent = "-";

        percentageElement.textContent = "-";

        totalPointsElement.textContent = "-";

        return;

    }


    /*
       PROMEDIO SOBRE 10
    */

    const totalGrades =
        completed.reduce(
            (sum, test) =>
                sum +
                Number(test.score),
            0
        );


    const average =
        totalGrades /
        completed.length;


    averageElement.textContent =
        average.toFixed(2);


    /*
       PUNTOS
    */

    const earned =
        completed.reduce(
            (sum, test) =>
                sum +
                Number(test.points || 0),
            0
        );


    const maximum =
        completed.reduce(
            (sum, test) =>
                sum +
                Number(test.maxPoints || 0),
            0
        );


    totalPointsElement.textContent =
        `${earned} / ${maximum}`;


    /*
       PORCENTAJE
    */

    if (maximum > 0) {

        const percentage =
            (earned / maximum) * 100;


        percentageElement.textContent =
            percentage.toFixed(1) + "%";

    } else {

        percentageElement.textContent =
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
   INICIO
========================= */

window.onload = function () {

    currentLanguage = null;


    const languageScreen =
        document.getElementById(
            "languageScreen"
        );


    const app =
        document.getElementById("app");


    if (languageScreen) {

        languageScreen.classList.remove(
            "hidden"
        );

    }


    if (app) {

        app.classList.add("hidden");

    }

};
