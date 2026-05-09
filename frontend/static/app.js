const button = document.getElementById("GenerateBtn");

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

button.addEventListener(
    "click",
    generateTree
);

async function generateTree() {

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
    );
}