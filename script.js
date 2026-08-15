/* ==========================================
   CALCULADORA DE QUANTITATIVO DE MATERIAIS
   Equivalente exato ao modelo Python com NumPy
========================================== */

function calcularMateriais() {

    // Entrada de dados (consumo por m²)
    const argamassa_x = parseFloat(document.getElementById("argamassaX").value);
    const argamassa_y = parseFloat(document.getElementById("argamassaY").value);
    const graute = parseFloat(document.getElementById("graute").value);

    // Entrada das áreas
    const x = parseFloat(document.getElementById("areaConvencional").value);
    const y = parseFloat(document.getElementById("areaEstrutural").value);

    // Verificação de validação
    if (isNaN(argamassa_x) || isNaN(argamassa_y) || isNaN(graute) || isNaN(x) || isNaN(y)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (argamassa_x < 0 || argamassa_y < 0 || graute < 0 || x < 0 || y < 0) {
        alert("Os valores informados devem ser iguais ou maiores que zero.");
        return;
    }

    // Matriz de consumo A (equivalente a np.array no Python)
    const A = [
        [argamassa_x, 0],
        [0, argamassa_y],
        [0, graute]
    ];

    // Vetor de áreas X (equivalente a np.array([x, y]))
    const X = [x, y];

    // Produto matricial: resultado = A.dot(X)
    const resultado = [
        A[0][0] * X[0] + A[0][1] * X[1],
        A[1][0] * X[0] + A[1][1] * X[1],
        A[2][0] * X[0] + A[2][1] * X[1]
    ];

    // Formatação em moeda/padrão pt-BR
    const resArgXStr = resultado[0].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const resArgYStr = resultado[1].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const resGrauteStr = resultado[2].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Exibição dos resultados detalhados
    document.getElementById("resultadoArgamassaX").innerHTML = 
        `Será necessário <strong>${resArgXStr} kg</strong> de ARGAMASSA X (alvenaria convencional - X)`;
    
    document.getElementById("resultadoArgamassaY").innerHTML = 
        `Será necessário <strong>${resArgYStr} kg</strong> de ARGAMASSA Y (alvenaria estrutural - Y)`;
    
    document.getElementById("resultadoGraute").innerHTML = 
        `Será necessário <strong>${resGrauteStr} kg</strong> de GRAUTE (alvenaria estrutural - Y)`;

    // Mostrar bloco e mover a tela
    const boxResultado = document.getElementById("resultado");
    boxResultado.style.display = "block";
    boxResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
