// =====================================================
// TREMBO STUDIES - SCRIPT PRINCIPAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // VARIABLES
    // =================================================

    let currentLanguage = null;

    let tests = JSON.parse(localStorage.getItem("tests")) || [];

    let trembo = Number(localStorage.getItem("trembo")) || 0;

    let currentDate = new Date();

    let selectedDate = null;


    // =================================================
    // TRADUCCIONES
    // =================================================

    const translations = {

        es: {
            languageInstruction: "Elegí tu idioma / Choose your language",

            calendar: "Calendario",
            results: "Resultados de las pruebas",
            dianabol: "Dianabol",

            calendarTitle: "Calendario",
            resultsTitle: "Resultados de las pruebas",
            dianabolTitle: "Dianabol",

            quickAccess: "Accesos rápidos:",

            addTest: "Agregar prueba",
            addTestTitle: "Agregar prueba",

            subject: "Materia",
            notes: "Notas adicionales",

            subjectPlaceholder: "Ej: Matemática",
            notesPlaceholder: "Información sobre la prueba...",

            average: "Promedio /10",
            percentage: "Porcentaje",
            points: "Puntos",

            deleteLast: "Borrar lo último",
            deleteAll: "Borrar todo",

            pending: "Pendiente",
            done: "Hecha",
            cancelled: "Cancelada",

            date: "Fecha",
            score: "Nota",
            earnedPoints: "Puntos obtenidos",
            maxPoints: "Puntos máximos",
            status: "Estado",

            noTests: "No hay pruebas registradas.",

            firstSelectDay: "Primero seleccioná un día.",
            enterSubject: "Ingresá una materia.",

            confirmDelete: "¿Seguro que querés borrar todas las pruebas?",

            testOf: "Prueba de"
        },

        en: {
            languageInstruction: "Choose your language",

            calendar: "Calendar",
            results: "Test Results",
            dianabol: "Dianabol",

            calendarTitle: "Calendar",
            resultsTitle: "Test Results",
            dianabolTitle: "Dianabol",

            quickAccess: "Quick access:",

            addTest: "Add test",
            addTestTitle: "Add test",

            subject: "Subject",
            notes: "Additional notes",

            subjectPlaceholder: "Ex: Mathematics",
            notesPlaceholder: "Information about the test...",

            average: "Average /10",
            percentage: "Percentage",
            points: "Points",

            deleteLast: "Delete last",
            deleteAll: "Delete all",

            pending: "Pending",
            done: "Done",
            cancelled: "Cancelled",

            date: "Date",
            score: "Grade",
            earnedPoints: "Points obtained",
            maxPoints: "Maximum points",
            status: "Status",

            noTests: "No tests registered.",

            firstSelectDay: "First select a day.",
            enterSubject: "Enter a subject.",

            confirmDelete: "Are you sure you want to delete all tests?",

            testOf: "Test of"
        },

        he: {
            languageInstruction: "בחר את השפה שלך",

            calendar: "לוח שנה",
            results: "תוצאות מבחנים",
            dianabol: "דיאנבול",

            calendarTitle: "לוח שנה",
            resultsTitle: "תוצאות מבחנים",
            dianabolTitle: "דיאנבול",

            quickAccess: "גישה מהירה:",

            addTest: "הוסף מבחן",
            addTestTitle: "הוסף מבחן",

            subject: "מקצוע",
            notes: "הערות נוספות",

            subjectPlaceholder: "לדוגמה: מתמטיקה",
            notesPlaceholder: "מידע על המבחן...",

            average: "ממוצע /10",
            percentage: "אחוזים",
            points: "נקודות",

            deleteLast: "מחק אחרון",
            deleteAll: "מחק הכל",

            pending: "ממתין",
            done: "בוצע",
            cancelled: "בוטל",

            date: "תאריך",
            score: "ציון",
            earnedPoints: "נקודות שהושגו",
            maxPoints: "מקסימום נקודות",
            status: "סטטוס",

            noTests: "אין מבחנים רשומים.",

            firstSelectDay: "בחר קודם יום.",
            enterSubject: "הזן מקצוע.",

            confirmDelete: "האם אתה בטוח שברצונך למחוק את כל המבחנים?",

            testOf: "מבחן ב"
        }
    };


    // =================================================
    // ELEMENTOS
    // =================================================

    const languageScreen = document.getElementById("languageScreen");
    const app = document.getElementById("app");

    const languageTitle = document.getElementById("languageTitle");

    const spanishButton = document.getElementById("spanishButton");
    const englishButton = document.getElementById("englishButton");
    const hebrewButton = document.getElementById("hebrewButton");

    const calendarButton = document.getElementById("calendarButton");
    const resultsButton = document.getElementById("resultsButton");
    const dianabolButton = document.getElementById("dianabolButton");

    const calendarPage = document.getElementById("calendarPage");
    const resultsPage = document.getElementById("resultsPage");
    const dianabolPage = document.getElementById("dianabolPage");

    const previousMonthButton =
        document.getElementById("previousMonthButton");

    const nextMonthButton =
        document.getElementById("nextMonthButton");

    const addTestButton =
        document.getElementById("addTestButton");

    const deleteLastButton =
        document.getElementById("deleteLastButton");

    const deleteAllButton =
        document.getElementById("deleteAllButton");

    const deleteLastButtonResults =
        document.getElementById("deleteLastButtonResults");

    const deleteAllButtonResults =
        document.getElementById("deleteAllButtonResults");

    const subjectInput =
        document.getElementById("subjectInput");

    const notesInput =
        document.getElementById("notesInput");

    const tremboAmount =
        document.getElementById("tremboAmount");

    const tremboText =
        document.getElementById("tremboText");

    const calendar =
        document.getElementById("calendar");

    const monthTitle =
        document.getElementById("monthTitle");

    const testForm =
        document.getElementById("testForm");

    const selectedDateTitle =
        document.getElementById("selectedDateTitle");

    const resultsList =
        document.getElementById("resultsList");

    const average =
        document.getElementById("average");

    const percentage =
        document.getElementById("percentage");

    const totalPoints =
        document.getElementById("totalPoints");


    // =================================================
    // BOTONES DE IDIOMA
    // =================================================

    spanishButton.addEventListener("click", () => {
        selectLanguage("es");
    });

    englishButton.addEventListener("click", () => {
        selectLanguage("en");
    });

    hebrewButton.addEventListener("click", () => {
        selectLanguage("he");
    });


    // =================================================
    // BOTONES DEL MENÚ
    // =================================================

    calendarButton.addEventListener("click", () => {
        showPage("calendar");
    });

    resultsButton.addEventListener("click", () => {
        showPage("results");
    });

    dianabolButton.addEventListener("click", () => {
        showPage("dianabol");
    });


    // =================================================
    // BOTONES DEL CALENDARIO
    // =================================================

    previousMonthButton.addEventListener("click", () => {
        changeMonth(-1);
    });

    nextMonthButton.addEventListener("click", () => {
        changeMonth(1);
    });

    addTestButton.addEventListener("click", () => {
        addTest();
    });


    // =================================================
    // BOTONES DE BORRADO
    // =================================================

    deleteLastButton.addEventListener("click", () => {
        deleteLastTest();
    });

    deleteAllButton.addEventListener("click", () => {
        deleteAllTests();
    });

    deleteLastButtonResults.addEventListener("click", () => {
        deleteLastTest();
    });

    deleteAllButtonResults.addEventListener("click", () => {
        deleteAllTests();
    });


    // =================================================
    // SELECCIONAR IDIOMA
    // =================================================

    function selectLanguage(language) {

        currentLanguage = language;

        languageScreen.classList.add("hidden");
        app.classList.remove("hidden");

        applyLanguage();

        showPage("calendar");

        updateTrembo();
    }


    // =================================================
    // APLICAR IDIOMA
    // =================================================

    function applyLanguage() {

        const t = translations[currentLanguage];

        document.documentElement.lang = currentLanguage;

        if (currentLanguage === "he") {

            document.body.dir = "rtl";

            languageTitle.textContent = "לימודי טרמבו";

            app.style.direction = "ltr";

        } else {

            document.body.dir = "ltr";

            languageTitle.textContent = "Trembo Studies";

            app.style.direction = "ltr";
        }


        document.getElementById("menuCalendar").textContent =
            t.calendar;

        document.getElementById("menuResults").textContent =
            t.results;

        document.getElementById("calendarTitle").textContent =
            t.calendarTitle;

        document.getElementById("resultsTitle").textContent =
            t.resultsTitle;

        document.getElementById("dianabolTitle").textContent =
            t.dianabolTitle;

        document.getElementById("quickAccessText").textContent =
            t.quickAccess;

        document.getElementById("addTestText").textContent =
            t.addTest;

        document.getElementById("subjectLabel").textContent =
            t.subject;

        document.getElementById("notesLabel").textContent =
            t.notes;

        document.getElementById("averageText").textContent =
            t.average;

        document.getElementById("percentageText").textContent =
            t.percentage;

        document.getElementById("pointsText").textContent =
            t.points;

        document.getElementById("deleteLastButton").textContent =
            t.deleteLast;

        document.getElementById("deleteAllButton").textContent =
            t.deleteAll;

        document.getElementById("deleteLastButtonResults").textContent =
            t.deleteLast;

        document.getElementById("deleteAllButtonResults").textContent =
            t.deleteAll;

        subjectInput.placeholder =
            t.subjectPlaceholder;

        notesInput.placeholder =
            t.notesPlaceholder;

        tremboText.textContent =
            currentLanguage === "he" ? "טרמボלה" : "Trembolona";


        renderCalendar();
        renderResults();
    }


    // =================================================
    // MOSTRAR PÁGINA
    // =================================================

    function showPage(page) {

        calendarPage.classList.add("hidden");
        resultsPage.classList.add("hidden");
        dianabolPage.classList.add("hidden");


        if (page === "calendar") {

            calendarPage.classList.remove("hidden");

            renderCalendar();

        }

        else if (page === "results") {

            resultsPage.classList.remove("hidden");

            renderResults();

        }

        else if (page === "dianabol") {

            dianabolPage.classList.remove("hidden");

        }
    }


    // =================================================
    // CALENDARIO
    // =================================================

    function renderCalendar() {

        if (!currentLanguage) return;

        calendar.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const monthNames = {

            es: [
                "Enero", "Febrero", "Marzo", "Abril",
                "Mayo", "Junio", "Julio", "Agosto",
                "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],

            en: [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ],

            he: [
                "ינואר", "פברואר", "מרץ", "אפריל",
                "מאי", "יוני", "יולי", "אוגוסט",
                "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
            ]
        };


        monthTitle.textContent =
            `${monthNames[currentLanguage][month]} ${year}`;


        const firstDay =
            new Date(year, month, 1).getDay();

        const daysInMonth =
            new Date(year, month + 1, 0).getDate();


        // Domingo = 0
        // Lo convertimos para que lunes sea 0

        const startingDay =
            firstDay === 0 ? 6 : firstDay - 1;


        // Días de la semana

        const dayNames = {

            es: [
                "Lun", "Mar", "Mié",
                "Jue", "Vie", "Sáb", "Dom"
            ],

            en: [
                "Mon", "Tue", "Wed",
                "Thu", "Fri", "Sat", "Sun"
            ],

            he: [
                "ב׳", "ג׳", "ד׳",
                "ה׳", "ו׳", "ש׳", "א׳"
            ]
        };


        dayNames[currentLanguage].forEach(day => {

            const header =
                document.createElement("div");

            header.className = "calendar-day-name";

            header.textContent = day;

            calendar.appendChild(header);
        });


        // Espacios antes del primer día

        for (let i = 0; i < startingDay; i++) {

            const empty =
                document.createElement("div");

            empty.className = "calendar-cell empty";

            calendar.appendChild(empty);
        }


        // Días

        for (let day = 1; day <= daysInMonth; day++) {

            const cell =
                document.createElement("div");

            cell.className = "calendar-cell";

            cell.textContent = day;


            const dateString =
                formatDate(year, month + 1, day);


            // Si hay pruebas ese día

            const dayTests =
                tests.filter(test => test.date === dateString);


            if (dayTests.length > 0) {

                cell.classList.add("has-test");

                const testSubjects =
                    document.createElement("div");

                testSubjects.className =
                    "calendar-test-label";


                dayTests.forEach(test => {

                    const subject =
                        document.createElement("div");

                    subject.textContent =
                        test.subject;

                    testSubjects.appendChild(subject);

                });


                cell.appendChild(testSubjects);
            }


            cell.addEventListener("click", () => {

                selectDate(dateString);

            });


            calendar.appendChild(cell);
        }
    }


    // =================================================
    // FORMATO DE FECHA
    // =================================================

    function formatDate(year, month, day) {

        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }


    // =================================================
    // CAMBIAR MES
    // =================================================

    function changeMonth(amount) {

        currentDate.setMonth(
            currentDate.getMonth() + amount
        );

        renderCalendar();
    }


    // =================================================
    // SELECCIONAR FECHA
    // =================================================

    function selectDate(date) {

        selectedDate = date;

        testForm.classList.remove("hidden");

        const t = translations[currentLanguage];

        selectedDateTitle.textContent =
            `${t.addTestTitle} — ${date}`;

        subjectInput.focus();
    }


    // =================================================
    // AGREGAR PRUEBA
    // =================================================

    function addTest() {

        if (!selectedDate) {

            alert(
                translations[currentLanguage].firstSelectDay
            );

            return;
        }


        const subject =
            subjectInput.value.trim();

        const notes =
            notesInput.value.trim();


        if (!subject) {

            alert(
                translations[currentLanguage].enterSubject
            );

            return;
        }


        const test = {

            id: Date.now(),

            date: selectedDate,

            subject: subject,

            notes: notes,

            score: null,

            points: null,

            maxPoints: null,

            status: "pending",

            rewardAmount: 0
        };


        tests.push(test);

        saveData();


        subjectInput.value = "";
        notesInput.value = "";

        testForm.classList.add("hidden");

        selectedDate = null;


        renderCalendar();

        renderResults();
    }


    // =================================================
    // RESULTADOS
    // =================================================

    function renderResults() {

        if (!currentLanguage) return;

        resultsList.innerHTML = "";

        const t = translations[currentLanguage];


        if (tests.length === 0) {

            resultsList.innerHTML =
                `<p class="no-tests">${t.noTests}</p>`;

            calculateAverages();

            return;
        }


        tests.forEach((test, index) => {

            const card =
                document.createElement("div");

            card.className = "result-card";


            const title =
                document.createElement("h3");

            title.textContent =
                `${t.testOf} ${test.subject}`;

            card.appendChild(title);


            const date =
                document.createElement("p");

            date.innerHTML =
                `<strong>${t.date}:</strong> ${test.date}`;

            card.appendChild(date);


            // NOTA

            const scoreLabel =
                document.createElement("label");

            scoreLabel.textContent =
                `${t.score}: `;

            const scoreInput =
                document.createElement("input");

            scoreInput.type = "number";

            scoreInput.min = "0";

            scoreInput.max = "10";

            scoreInput.step = "0.1";

            scoreInput.value =
                test.score !== null ? test.score : "";

            scoreLabel.appendChild(scoreInput);

            card.appendChild(scoreLabel);


            // PUNTOS OBTENIDOS

            const pointsLabel =
                document.createElement("label");

            pointsLabel.textContent =
                `${t.earnedPoints}: `;

            const pointsInput =
                document.createElement("input");

            pointsInput.type = "number";

            pointsInput.min = "0";

            pointsInput.value =
                test.points !== null ? test.points : "";

            pointsLabel.appendChild(pointsInput);

            card.appendChild(pointsLabel);


            // PUNTOS MÁXIMOS

            const maxPointsLabel =
                document.createElement("label");

            maxPointsLabel.textContent =
                `${t.maxPoints}: `;

            const maxPointsInput =
                document.createElement("input");

            maxPointsInput.type = "number";

            maxPointsInput.min = "0";

            maxPointsInput.value =
                test.maxPoints !== null
                    ? test.maxPoints
                    : "";

            maxPointsLabel.appendChild(maxPointsInput);

            card.appendChild(maxPointsLabel);


            // ESTADO

            const statusLabel =
                document.createElement("label");

            statusLabel.textContent =
                `${t.status}: `;


            const statusSelect =
                document.createElement("select");


            const pendingOption =
                document.createElement("option");

            pendingOption.value = "pending";
            pendingOption.textContent = t.pending;


            const doneOption =
                document.createElement("option");

            doneOption.value = "done";
            doneOption.textContent = t.done;


            const cancelledOption =
                document.createElement("option");

            cancelledOption.value = "cancelled";
            cancelledOption.textContent = t.cancelled;


            statusSelect.appendChild(pendingOption);
            statusSelect.appendChild(doneOption);
            statusSelect.appendChild(cancelledOption);


            statusSelect.value =
                test.status || "pending";


            statusLabel.appendChild(statusSelect);

            card.appendChild(statusLabel);


            // NOTAS

            if (test.notes) {

                const notes =
                    document.createElement("p");

                notes.innerHTML =
                    `<strong>${t.notes}:</strong> ${escapeHTML(test.notes)}`;

                card.appendChild(notes);
            }


            // EVENTO NOTA

            scoreInput.addEventListener("change", () => {

                updateScore(
                    index,
                    scoreInput.value
                );

            });


            // EVENTO PUNTOS

            pointsInput.addEventListener("change", () => {

                updatePoints(
                    index,
                    pointsInput.value
                );

            });


            // EVENTO MÁXIMO

            maxPointsInput.addEventListener("change", () => {

                updateMaxPoints(
                    index,
                    maxPointsInput.value
                );

            });


            // EVENTO ESTADO

            statusSelect.addEventListener("change", () => {

                updateStatus(
                    index,
                    statusSelect.value
                );

            });


            resultsList.appendChild(card);
        });


        calculateAverages();
    }


    // =================================================
    // ESCAPAR HTML
    // =================================================

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    // =================================================
    // ACTUALIZAR NOTA
    // =================================================

    function updateScore(index, value) {

        const test = tests[index];

        const oldReward =
            Number(test.rewardAmount) || 0;


        if (value === "") {

            test.score = null;

            if (test.status === "done") {

                trembo -= oldReward;

                test.rewardAmount = 0;
            }

        } else {

            test.score =
                Number(value);


            if (
                test.status === "done" &&
                Number.isFinite(test.score)
            ) {

                const newReward =
                    rewardForScore(test.score);

                trembo +=
                    newReward - oldReward;

                test.rewardAmount =
                    newReward;
            }
        }


        saveData();

        updateTrembo();

        calculateAverages();
    }


    // =================================================
    // ACTUALIZAR PUNTOS
    // =================================================

    function updatePoints(index, value) {

        tests[index].points =
            value === ""
                ? null
                : Number(value);

        saveData();

        calculateAverages();
    }


    // =================================================
    // ACTUALIZAR MÁXIMO DE PUNTOS
    // =================================================

    function updateMaxPoints(index, value) {

        tests[index].maxPoints =
            value === ""
                ? null
                : Number(value);

        saveData();

        calculateAverages();
    }


    // =================================================
    // ACTUALIZAR ESTADO
    // =================================================

    function updateStatus(index, status) {

        const test = tests[index];

        const oldReward =
            Number(test.rewardAmount) || 0;


        // Si estaba hecha y deja de estar hecha,
        // quitamos la recompensa anterior.

        if (
            test.status === "done" &&
            status !== "done"
        ) {

            trembo -= oldReward;

            test.rewardAmount = 0;
        }


        // Si pasa a hecha

        if (
            test.status !== "done" &&
            status === "done"
        ) {

            const reward =
                rewardForScore(
                    Number(test.score)
                );

            trembo += reward;

            test.rewardAmount =
                reward;
        }


        // Si sigue hecha y cambia algo relacionado
        // con la nota, mantenemos correctamente
        // la recompensa.

        if (
            test.status === "done" &&
            status === "done"
        ) {

            const reward =
                rewardForScore(
                    Number(test.score)
                );

            trembo +=
                reward - oldReward;

            test.rewardAmount =
                reward;
        }


        test.status = status;


        saveData();

        updateTrembo();

        calculateAverages();
    }


    // =================================================
    // RECOMPENSAS TREMBO
    // =================================================

    function rewardForScore(score) {

        if (!Number.isFinite(score)) {
            return 0;
        }


        if (score < 5) {
            return -5;
        }

        if (score < 6) {
            return 5;
        }

        if (score < 7) {
            return 10;
        }

        if (score < 8) {
            return 30;
        }

        if (score < 9) {
            return 40;
        }

        if (score < 10) {
            return 70;
        }

        return 500;
    }


    // =================================================
    // BORRAR ÚLTIMA PRUEBA
    // =================================================

    function deleteLastTest() {

        if (tests.length === 0) {
            return;
        }


        const lastTest =
            tests[tests.length - 1];


        const reward =
            Number(lastTest.rewardAmount) || 0;


        trembo -= reward;


        tests.pop();


        saveData();

        updateTrembo();

        renderCalendar();

        renderResults();
    }


    // =================================================
    // BORRAR TODAS
    // =================================================

    function deleteAllTests() {

        if (tests.length === 0) {
            return;
        }


        const t =
            translations[currentLanguage];


        if (!confirm(t.confirmDelete)) {
            return;
        }


        tests.forEach(test => {

            trembo -=
                Number(test.rewardAmount) || 0;

        });


        tests = [];


        saveData();

        updateTrembo();

        renderCalendar();

        renderResults();
    }


    // =================================================
    // ACTUALIZAR CONTADOR
    // =================================================

    function updateTrembo() {

        tremboAmount.textContent =
            trembo;

        localStorage.setItem(
            "trembo",
            trembo
        );
    }


    // =================================================
    // CALCULAR PROMEDIOS
    // =================================================

    function calculateAverages() {

        const completedTests =
            tests.filter(test =>

                test.status === "done" &&
                test.score !== null &&
                Number.isFinite(Number(test.score))

            );


        if (completedTests.length === 0) {

            average.textContent = "-";

            percentage.textContent = "-";

            totalPoints.textContent = "-";

            return;
        }


        // PROMEDIO /10

        const totalScore =
            completedTests.reduce(
                (sum, test) =>
                    sum + Number(test.score),
                0
            );


        const avg =
            totalScore /
            completedTests.length;


        average.textContent =
            avg.toFixed(2);


        // PUNTOS

        const testsWithPoints =
            completedTests.filter(test =>

                test.points !== null &&
                test.maxPoints !== null &&
                Number(test.maxPoints) > 0

            );


        if (testsWithPoints.length === 0) {

            percentage.textContent = "-";

            totalPoints.textContent = "-";

            return;
        }


        const earned =
            testsWithPoints.reduce(
                (sum, test) =>
                    sum + Number(test.points),
                0
            );


        const maximum =
            testsWithPoints.reduce(
                (sum, test) =>
                    sum + Number(test.maxPoints),
                0
            );


        const percent =
            maximum > 0
                ? (earned / maximum) * 100
                : 0;


        percentage.textContent =
            `${percent.toFixed(2)}%`;


        totalPoints.textContent =
            `${earned}/${maximum}`;
    }


    // =================================================
    // GUARDAR DATOS
    // =================================================

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


    // =================================================
    // INICIO
    // =================================================

    // IMPORTANTE:
    // Cada vez que se recarga la página,
    // se vuelve a mostrar la pantalla de idioma.

    currentLanguage = null;

    languageScreen.classList.remove("hidden");

    app.classList.add("hidden");

    document.body.dir = "ltr";

});
