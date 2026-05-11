const button = document.getElementById("GenerateBtn");
const prefixBTN = document.getElementById("PrefixoBtn")
const resultadoContainer = document.getElementById("resultadoContainer");
const resultadoTexto = document.getElementById("resultadoTexto");
const resultadoEconomia = document.getElementById("resultadoEconomia");
const container = document.getElementById("network");

const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);

const data = {
    nodes,
    edges
};

const options = {

    layout: {
        hierarchical: {
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 100,
            nodeSpacing: 120
        }
    },

    physics: false,

    nodes: {
        background: "#c8ad93",
        border: "#8d6e63",
        shape: "circle",
        highlight: {
            background: "#d6b89c",
            border: "#6d4c41"
        },
        size: 30,

        font: {
            size: 18,
            color: "#4e342e"
        }
    },

    edges: {

        color: "#8d6e63",

        smooth: true,
        smooth: false,

        font: {
            size: 18,
            align: "middle",
            color: "#5d4037"
        }
    }
};

const network = new vis.Network(
    container,
    data,
    options
);

prefixBTN.addEventListener("click", generateCodigo)


async function generateCodigo() {
    const text = document
        .getElementById("entrada")
        .value
        .trim();
    try {
        const resposta = await fetch(
            "http://localhost:5000/diferenca",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        )


        const response = await fetch(
            "http://localhost:5000/codificado",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );

        if (!response.ok || !resposta.ok) {
            throw new Error("Erro no servidor");
        }

        const result = await response.json();
        const result2 = await resposta.json()

        showResultado(result.texto_cod, result2)
        showTreeButton()

    } catch (error) {
        console.log(error)
        alert("erro ao gerar codigo prefixo ou na tx. de economia ")
    }




}

function showTreeButton() {

    button.classList.remove("hidden");

}
const frase = 'taxa de economia de bits em relação a tabela ASCII'
function showResultado(codigo,tx_economia) {

    resultadoTexto.innerText = codigo;
    resultadoEconomia.innerText = `Quantidade de bits em ASCII: ${tx_economia.ascii} \n Quantidade de bits em Codigo prefixo/método hufman: ${tx_economia.codificado_bits} \n Economia de bits: ${tx_economia.ascii - tx_economia.codificado_bits}` 

    resultadoContainer.classList.remove("hidden");
}

button.addEventListener(
    "click",
    generateTree

);

async function generateTree() {

    prefixBTN.classList.remove("hidden");


    const text = document
        .getElementById("entrada")
        .value
        .trim();

    if (!text) {

        alert("Digite uma frase.");

        return;
    }

    try {

        resetGraph();

        const graph = await fetchTree(text);

        await animateTree(graph);

    } catch (error) {

        console.error(error);

        alert("Erro ao gerar árvore.");
    }
}

async function fetchTree(text) {


    const response = await fetch(
        "http://localhost:5000/huffman",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })
        }
    );

    if (!response.ok) {
        throw new Error("Erro no servidor");
    }

    return await response.json();
}

function resetGraph() {


    nodes.clear();

    edges.clear();
}

async function animateTree(graph) {


    for (const node of graph.nodes) {

        nodes.add({
            ...node,
            size: 0
        });

        await animateNode(node.id);
    }

    for (const edge of graph.edges) {

        edges.add(edge);

        await sleep(400);
    }

    await sleep(500)

    network.fit({
        animation: {
            duration: 1200,
            easingFunction: "easeInOutQuad"
        }
    })

    showPrefixButton()


}

function showPrefixButton() {
    prefixBTN.classList.remove("hidden");
}

async function animateNode(id) {

    for (let size = 0; size <= 30; size += 2) {

        nodes.update({
            id,
            size
        });

        await sleep(20);
    }
}

function sleep(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}