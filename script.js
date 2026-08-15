/* ==========================================
   CALCULADORA DE QUANTITATIVO DE MATERIAIS
   Modelo equivalente ao código Python
========================================== */


function calcularMateriais() {


    /* =========================
       ENTRADAS DE CONSUMO
    ========================== */


    const argamassaX = parseFloat(
        document.getElementById("argamassaX").value
    );


    const argamassaY = parseFloat(
        document.getElementById("argamassaY").value
    );


    const graute = parseFloat(
        document.getElementById("graute").value
    );


    /* =========================
       ENTRADAS DE ÁREA
    ========================== */


    const areaConvencional = parseFloat(
        document.getElementById("areaConvencional").value
    );


    const areaEstrutural = parseFloat(
        document.getElementById("areaEstrutural").value
    );


    /* =========================
       VERIFICAÇÃO
    ========================== */


    if (
        isNaN(argamassaX) ||
        isNaN(argamassaY) ||
        isNaN(graute) ||
        isNaN(areaConvencional) ||
        isNaN(areaEstrutural)
    ) {

        alert(
            "Por favor, preencha todos os campos."
        );

        return;
    }


    /* =========================
       IMPEDIR VALORES NEGATIVOS
    ========================== */


    if (
        argamassaX < 0 ||
        argamassaY < 0 ||
        graute < 0 ||
        areaConvencional < 0 ||
        areaEstrutural < 0
    ) {

        alert(
            "Os valores informados devem ser iguais ou maiores que zero."
        );

        return;
    }


    /* =========================
       MODELO MATRICIAL

       A =
       [ argamassaX     0       ]
       [      0      argamassaY  ]
       [      0        graute    ]

       X =
       [ área convencional ]
       [ área estrutural   ]

    ========================== */


    const resultadoArgamassaX =
        argamassaX * areaConvencional;


    const resultadoArgamassaY =
        argamassaY * areaEstrutural;


    const resultadoGraute =
        graute * areaEstrutural;


    /* =========================
       FORMATAR RESULTADOS
    ========================== */


    document.getElementById(
        "resultadoArgamassaX"
    ).textContent =
        resultadoArgamassaX.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ) + " kg";


    document.getElementById(
        "resultadoArgamassaY"
    ).textContent =
        resultadoArgamassaY.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ) + " kg";


    document.getElementById(
        "resultadoGraute"
    ).textContent =
        resultadoGraute.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ) + " kg";


    /* =========================
       MOSTRAR RESULTADO
    ========================== */


    const resultado =
        document.getElementById("resultado");


    resultado.style.display = "block";


    /* =========================
       LEVAR O USUÁRIO AO RESULTADO
    ========================== */


    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}
