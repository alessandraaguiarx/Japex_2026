let pyodide = null;

const statusEl = document.getElementById("pythonStatus");

const calculateBtn =
    document.getElementById("calculateBtn");

const pythonCodeEl =
    document.getElementById("pythonCode");


/* STATUS */

function setStatus(message, type = "") {

    statusEl.textContent = message;

    statusEl.className = "status";

    if (type) {

        statusEl.classList.add(type);

    }

}


/* CARREGAR COD.PY */

async function loadPythonCode() {

    const response =
        await fetch("cod.py");

    if (!response.ok) {

        throw new Error(
            "Não foi possível carregar o arquivo cod.py."
        );

    }

    return await response.text();

}


/* INICIALIZAR PYTHON */

async function initializePython() {

    try {

        setStatus(
            "Carregando Python..."
        );


        pyodide =
            await loadPyodide();


        /*
         * Carrega NumPy,
         * utilizado pela matriz.
         */

        await pyodide.loadPackage(
            "numpy"
        );


        /*
         * Lê o arquivo cod.py
         * e mostra o código na página.
         */

        const source =
            await loadPythonCode();


        pythonCodeEl.textContent =
            source;


        /*
         * Executa o código Python.
         */

        await pyodide.runPythonAsync(
            source
        );


        setStatus(
            "Python pronto",
            "ready"
        );


        calculateBtn.disabled =
            false;


        calculateBtn.textContent =
            "Executar cálculo em Python";


    } catch (error) {

        console.error(error);


        setStatus(
            "Erro ao carregar Python",
            "error"
        );


        calculateBtn.textContent =
            "Python indisponível";


        pythonCodeEl.textContent =
            "Não foi possível carregar cod.py.";

    }

}


/* CONVERTER VALORES */

function getNumber(id) {

    const value =
        Number(
            document.getElementById(id).value
        );


    if (
        !Number.isFinite(value) ||
        value < 0
    ) {

        throw new Error(
            "Informe valores numéricos maiores ou iguais a zero."
        );

    }


    return value;

}


/* CALCULAR */

async function calculate() {

    try {

        if (!pyodide) {

            throw new Error(
                "O Python ainda está sendo inicializado."
            );

        }


        /*
         * Valores dos campos
         */

        const argamassaX =
            getNumber("argamassaX");


        const argamassaY =
            getNumber("argamassaY");


        const graute =
            getNumber("graute");


        const areaX =
            getNumber("areaX");


        const areaY =
            getNumber("areaY");


        /*
         * Envia os valores
         * para o Python.
         */

        pyodide.globals.set(
            "argamassa_x_input",
            argamassaX
        );


        pyodide.globals.set(
            "argamassa_y_input",
            argamassaY
        );


        pyodide.globals.set(
            "graute_input",
            graute
        );


        pyodide.globals.set(
            "area_x_input",
            areaX
        );


        pyodide.globals.set(
            "area_y_input",
            areaY
        );


        /*
         * Chamada da função Python.
         *
         * O Python realiza:
         *
         * A = matriz de consumo
         * X = vetor das áreas
         * resultado = A.dot(X)
         */

        const result =
            pyodide.runPython(`
calcular_quantitativos(
    argamassa_x_input,
    argamassa_y_input,
    graute_input,
    area_x_input,
    area_y_input
).tolist()
        `);


        const values =
            Array.from(result);


        /*
         * Mostrar resultados
         */

        document.getElementById(
            "resX"
        ).textContent =
            `${values[0].toFixed(2)} kg`;


        document.getElementById(
            "resY"
        ).textContent =
            `${values[1].toFixed(2)} kg`;


        document.getElementById(
            "resG"
        ).textContent =
            `${values[2].toFixed(2)} kg`;


        /*
         * Atualizar matriz
         */

        document.getElementById(
            "matrixOutput"
        ).textContent =
`[ ${argamassaX}   0 ]
[ 0   ${argamassaY} ]
[ 0   ${graute} ]`;


        setStatus(
            "Cálculo executado em Python",
            "ready"
        );


    } catch (error) {

        console.error(error);

        setStatus(
            error.message,
            "error"
        );

    }

}


/* BOTÃO CALCULAR */

calculateBtn.addEventListener(
    "click",
    calculate
);


/* BOTÃO EXEMPLO */

document.getElementById(
    "exampleBtn"
).addEventListener(
    "click",
    () => {

        document.getElementById(
            "argamassaX"
        ).value = 5;


        document.getElementById(
            "argamassaY"
        ).value = 3;


        document.getElementById(
            "graute"
        ).value = 2;


        document.getElementById(
            "areaX"
        ).value = 10;


        document.getElementById(
            "areaY"
        ).value = 20;


        if (pyodide) {

            calculate();

        }

    }
);


/* MENU MOBILE */

document.getElementById(
    "menuToggle"
).addEventListener(
    "click",
    () => {

        document
            .getElementById("mainNav")
            .classList.toggle("open");

    }
);


/* FECHAR MENU */

document
    .querySelectorAll("nav a")
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "mainNav"
                        )
                        .classList.remove(
                            "open"
                        );

                }
            );

        }
    );


/* INICIAR PYTHON */

initializePython();
