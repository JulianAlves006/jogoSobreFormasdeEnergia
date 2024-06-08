let level = 0;

const quizQuestions = [
    {
        tema: "Energia Eólica",
        perguntas: [
            {
                pergunta: "O que é energia eólica?",
                respostas: ["Energia do vento", "Energia solar", "Energia hidrelétrica"],
                correta: 0,
                elaborada: "Energia eólica é a energia obtida através do vento, aproveitada por aerogeradores."
            },
            {
                pergunta: "Quais são os principais componentes de um aerogerador?",
                respostas: ["Rotor, gerador, torre", "Painel, inversor, bateria", "Turbina, reservatório, conduta"],
                correta: 0,
                elaborada: "Os principais componentes de um aerogerador são o rotor, o gerador e a torre."
            },
            {
                pergunta: "Quais são as vantagens da energia eólica?",
                respostas: ["Renovável, limpa, abundante", "Poluente, cara, limitada", "Escassa, intermitente, suja"],
                correta: 0,
                elaborada: "As vantagens da energia eólica incluem ser renovável, limpa e abundante."
            }
        ]
    },
    {
        tema: "Energia Solar",
        perguntas: [
            {
                pergunta: "Como funciona a energia solar fotovoltaica?",
                respostas: ["Converte luz em eletricidade", "Queima combustível", "Usa energia eólica"],
                correta: 0,
                elaborada: "A energia solar fotovoltaica funciona convertendo a luz solar diretamente em eletricidade."
            },
            {
                pergunta: "Quais são os principais benefícios da energia solar?",
                respostas: ["Reduz contas de energia, renovável", "Poluente, caro", "Depende de combustíveis fósseis"],
                correta: 0,
                elaborada: "Os principais benefícios da energia solar incluem a redução das contas de energia e ser uma fonte renovável."
            },
            {
                pergunta: "O que é um painel solar e como ele gera eletricidade?",
                respostas: ["Dispositivo que converte luz solar", "Turbina que gera eletricidade", "Máquina que queima carvão"],
                correta: 0,
                elaborada: "Um painel solar é um dispositivo que converte a luz solar em eletricidade através de células fotovoltaicas."
            }
        ]
    },
    {
        tema: "Energia Hidrelétrica",
        perguntas: [
            {
                pergunta: "O que é energia hidrelétrica?",
                respostas: ["Energia gerada pela água", "Energia do vento", "Energia solar"],
                correta: 0,
                elaborada: "Energia hidrelétrica é a energia gerada pela força da água em movimento."
            },
            {
                pergunta: "Como uma usina hidrelétrica gera eletricidade?",
                respostas: ["Usa a força da água", "Usa a luz solar", "Usa o vento"],
                correta: 0,
                elaborada: "Uma usina hidrelétrica gera eletricidade usando a força da água para mover turbinas conectadas a geradores."
            },
            {
                pergunta: "Quais são os impactos ambientais da energia hidrelétrica?",
                respostas: ["Desmatamento, deslocamento de pessoas", "Reduz emissão de CO2", "Melhora a qualidade do ar"],
                correta: 0,
                elaborada: "Os impactos ambientais da energia hidrelétrica incluem desmatamento e deslocamento de pessoas."
            }
        ]
    }
];

let perguntaAnterior = -1;
let perguntaSelecionada;

function tipoPergunta(perguntaAnterior) {
    let pergunta = Math.floor(Math.random() * quizQuestions.length);
    while (pergunta == perguntaAnterior) {
        pergunta = Math.floor(Math.random() * quizQuestions.length);
    }
    return pergunta;
}

function pergunta(perguntaAnterior) {
    let temaIndex = tipoPergunta(perguntaAnterior);
    let tema = quizQuestions[temaIndex];
    let perguntaIndex = Math.floor(Math.random() * tema.perguntas.length);
    perguntaSelecionada = tema.perguntas[perguntaIndex];

    // Atualiza a pergunta
    document.getElementById("pergunta").textContent = perguntaSelecionada.pergunta;

    // Randomiza a ordem das respostas
    let respostas = perguntaSelecionada.respostas.slice();
    let correta = respostas.splice(perguntaSelecionada.correta, 1)[0];
    respostas = shuffle(respostas);
    respostas.splice(Math.floor(Math.random() * 3), 0, correta);

    // Atualiza os botões com as respostas
    for (let i = 0; i < respostas.length; i++) {
        let botao = document.getElementById("resposta" + (i + 1));
        botao.textContent = respostas[i];
        botao.setAttribute("data-correta", respostas[i] === correta);
    }

    // Esconde a resposta elaborada e mostra os botões de resposta
    document.getElementById("resposta-elaborada").style.display = "none";
    document.getElementById("respostas").style.display = "block";

    return temaIndex;  // Retorna o índice do tema atual para que ele possa ser usado na próxima chamada
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function verificarResposta(index) {
    let botao = document.getElementById("resposta" + (index + 1));
    let correta = botao.getAttribute("data-correta") === "true";
    let respostaTexto = correta ? "Resposta correta! " : "Resposta incorreta. ";
    respostaTexto += perguntaSelecionada.elaborada;
    document.getElementById("resposta-texto").textContent = respostaTexto;

    // Esconde os botões de resposta e mostra a resposta elaborada
    document.getElementById("resposta-elaborada").style.display = "block";
    document.getElementById("respostas").style.display = "none";

    if (correta) {
        level += 5; // Aumenta o level em 5 quando a resposta está correta
        if(level < 10){
            document.getElementById("level").textContent = "0" + level; // Atualiza o elemento HTML que mostra o level
        }
        else{
            document.getElementById("level").textContent = level;
        }

    }

    
    document.getElementById("resposta-texto").textContent = respostaTexto;

    // Esconde os botões de resposta e mostra a resposta elaborada
    document.getElementById("resposta-elaborada").style.display = "block";
    document.getElementById("respostas").style.display = "none";
}

function novaPergunta() {
    perguntaAnterior = pergunta(perguntaAnterior);
}

// Carrega a primeira pergunta
perguntaAnterior = pergunta(perguntaAnterior);