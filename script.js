```javascript
/* =========================
   DATOS
========================= */

/*
   El idioma NO se carga desde localStorage.
   Así, cada vez que se abre o recarga la página,
   el usuario debe elegir nuevamente.
*/

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

        january: "Enero",

        firstSelectDay: "Primero seleccioná un día.",

        enterSubject: "Ingresá una materia.",

        noTests: "No hay pruebas para borrar.",

        confirmDelete:
            "¿Seguro que querés borrar todas las pruebas?"

    },


    en: {

        calendar: "Calendar",

        results: "Test Results",

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

        january: "January",

        firstSelectDay: "First select a day.",

        enterSubject: "Enter a subject.",

        noTests: "There are no tests to delete.",

        confirmDelete:
            "Are you sure you want to delete all tests?"

    },


    he: {

        calendar: "לוח שנה",

        results: "תוצאות מבחנים",

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

        january: "ינואר",

        firstSelectDay: "בחר קודם יום.",

        enterSubject: "הכנס מקצוע.",

        noTests: "אין מבחנים למחיקה.",

        confirmDelete:
            "האם אתה בטוח שברצונך למחוק את כל המבחנים?"

    }

};


/* =========================
   CAMBIAR IDIOMA
========================= */

function selectLanguage(language) {

    currentLanguage = language;


    /*
       Guardamos el idioma solamente como información,
       pero NO lo usamos para saltar la pantalla
       de selección al recargar.
    */

    localStorage.setItem(
        "language",
        language
    );


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


/* =========================
   APLICAR IDIOMA
========================= */

function applyLanguage() {

    if (!currentLanguage) return;


    const t =
        translations[currentLanguage];


    document
        .getElementById("menuCalendar")
        .textContent =
        t.calendar;


    document
        .getElementById("menuResults")
        .textContent =
        t.results;


    document
        .getElementById("addTestText")
        .textContent =
        t.addTest;


    document
        .getElementById("averageText")
        .textContent =
        t.average;


    /*
       Cambia los textos de los botones
       de borrar.
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


    /*
       Hebreo
    */

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


    if (!calendar) return;


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


    /*
       Si todavía no se eligió idioma,
       no intentamos renderizar el calendario.
    */

    if (!currentLanguage) return;


    document
        .getElementById("monthTitle")
        .textContent =
        `${monthNames[currentLanguage][month]} ${year}`;


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
            translations[currentLanguage]
                .firstSelectDay
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

        /*
           Guarda exactamente cuánta Trembolona
           recibió esta prueba.
        */

        rewardAmount: 0

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


    if (!list) return;


    list.innerHTML = "";


    tests.forEach(test => {

        const card =
            document.createElement("div");


        card.className =
            "result-card";


        const statusText = {

            pending:
                translations[currentLanguage]
                    .pending,

            done:
                translations[currentLanguage]
                    .done,

            cancelled:
                translations[currentLanguage]
                    .cancelled

        };


        card.innerHTML = `

            <h2>${test.subject}</h2>


            <p>
                <strong>
                    ${translations[currentLanguage].date}:
                </strong>
                ${test.date}
            </p>


            <p>
                ${test.notes || ""}
            </p>


            <br>


            <label>
                ${translations[currentLanguage].score}:
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
                ${translations[currentLanguage].earnedPoints}:
            </label>


            <input
                type="number"
                min="0"
                value="${test.points || ""}"
                onchange="updatePoints(${test.id}, this.value)"
            >


            <label>
                ${translations[currentLanguage].maxPoints}:
            </label>


            <input
                type="number"
                min="0"
                value="${test.maxPoints || ""}"
                onchange="updateMaxPoints(${test.id}, this.value)"
            >


            <br><br>


            <label>
                ${translations[currentLanguage].status}:
            </label>


            <select
                onchange="updateStatus(${test.id}, this.value)"
            >

                <option
                    value="pending"
                    ${test.status === "pending" ? "selected" : ""}
                >
                    ${translations[currentLanguage].pending}
                </option>


                <option
                    value="done"
                    ${test.status === "done" ? "selected" : ""}
                >
                    ${translations[currentLanguage].done}
                </option>


                <option
                    value="cancelled"
                    ${test.status === "cancelled" ? "selected" : ""}
                >
                    ${translations[currentLanguage].cancelled}
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


    /*
       Recalcula la recompensa.
       Esto permite cambiar, por ejemplo,
       de 8 a 10 sin regalar 500 extra.
    */

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


    /*
       Si pasa de pendiente a hecha,
       recibe su recompensa.

       Si pasa de hecha a cancelada o pendiente,
       se elimina la recompensa anterior.
    */

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

    /*
       Compatibilidad con pruebas antiguas
       que todavía tengan "rewarded"
       en vez de "rewardAmount".
    */

    if (
        typeof test.rewardAmount !== "number"
    ) {

        test.rewardAmount =
            test.rewarded
                ? rewardForScore(test.score)
                : 0;

    }


    let newReward = 0;


    /*
       Solamente una prueba HECHA
       y con nota recibe recompensa.
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
       Calculamos la diferencia entre
       la recompensa nueva y la anterior.
    */

    const difference =
        newReward -
        test.rewardAmount;


    /*
       Aplicamos solamente la diferencia.
    */

    trembo += difference;


    /*
       Guardamos la recompensa actual.
    */

    test.rewardAmount =
        newReward;


    /*
       Mantenemos "rewarded" por compatibilidad
       con datos antiguos.
    */

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


    /*
       Sacamos la última prueba agregada.
    */

    const deletedTest =
        tests[tests.length - 1];


    /*
       Si esa prueba había generado Trembolona,
       devolvemos/revertimos su recompensa.
    */

    const rewardToRemove =
        Number(
            deletedTest.rewardAmount || 0
        );


    trembo -= rewardToRemove;


    /*
       Eliminamos la prueba.
    */

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


    const confirmDelete =
        confirm(
            translations[currentLanguage]
                .confirmDelete
        );


    if (!confirmDelete) return;


    /*
       Sumamos todas las recompensas
       que debemos revertir.
    */

    const totalRewards =
        tests.reduce(
            (sum, test) =>
                sum +
                Number(test.rewardAmount || 0),
            0
        );


    trembo -= totalRewards;


    /*
       Eliminamos todas las pruebas.
    */

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


    /* =========================
       PROMEDIO SOBRE 10
    ========================== */

    const totalGrades =
        completed.reduce(
            (sum, test) =>
                sum + Number(test.score),
            0
        );


    const average =
        totalGrades /
        completed.length;


    document
        .getElementById("average")
        .textContent =
        average.toFixed(2);


    /* =========================
       PUNTOS
    ========================== */

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


    document
        .getElementById("totalPoints")
        .textContent =
        `${earned} / ${maximum}`;


    /* =========================
       PORCENTAJE
    ========================== */

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

/*
   IMPORTANTE:

   Ya NO usamos el idioma guardado para entrar
   automáticamente a la aplicación.

   Cada vez que se abre o recarga la página:

   1. Aparece la pantalla de idioma.
   2. Se oculta la aplicación.
   3. El usuario elige nuevamente.
*/

window.onload = function () {

    currentLanguage = null;


    document
        .getElementById("languageScreen")
        .classList.remove("hidden");


    document
        .getElementById("app")
        .classList.add("hidden");


    /*
       El saldo y las pruebas siguen existiendo
       porque están guardados en localStorage.
    */

};
```
