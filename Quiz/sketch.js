let perguntas = [
  {
    texto: "O que a cidade recebe do campo?",
    opcoes: ["Tecnologia", "Matéria-prima e alimentos", "Internet", "Transporte público"],
    correta: 1,
    dica: "Pense em comida, algodão, madeira, leite..."
  },
  {
    texto: "Qual é a ideia da valorização cultural entre campo e cidade?",
    opcoes: ["Separar as tradições", "Celebrar juntos com respeito", "Imitar costumes urbanos", "Ignorar o campo"],
    correta: 1,
    dica: "A chave está em RESPEITO e UNIÃO."
  },
  {
    texto: "Como a educação ajuda na conexão entre campo e cidade?",
    opcoes: ["Cria rivalidade", "Ensina consumo", "Promove consciência e cooperação", "Enfraquece o campo"],
    correta: 2,
    dica: "Pense em escolas, alunos e sustentabilidade."
  },
  {
    texto: "O que significa 'festejar é unir'?",
    opcoes: ["Criar competições", "Celebrar juntos com alegria", "Festejar só na cidade", "Apagar as diferenças"],
    correta: 1,
    dica: "Festejar = parceria, alegria e inclusão!"
  },
  {
    texto: "Qual setor depende mais diretamente do campo?",
    opcoes: ["Moda", "Tecnologia", "Indústria alimentícia", "Educação"],
    correta: 2,
    dica: "Pense em comida, bebidas e produtos naturais."
  },
  {
    texto: "O que o campo pode aprender com a cidade?",
    opcoes: ["Desigualdade", "Crescimento desordenado", "Acesso a serviços e inovações", "Consumo excessivo"],
    correta: 2,
    dica: "Tecnologia e saúde são bons exemplos."
  },
  {
    texto: "Um exemplo de intercâmbio entre campo e cidade é:",
    opcoes: ["Feiras de agricultura", "Shopping centers", "Praças públicas", "Trânsito urbano"],
    correta: 0,
    dica: "Onde produtos rurais chegam até os consumidores."
  },
  {
    texto: "Como o transporte influencia a conexão entre campo e cidade?",
    opcoes: ["Aumenta a distância", "Reduz o comércio", "Facilita o acesso e a troca", "Causa isolamento"],
    correta: 2,
    dica: "Ajuda a levar produtos e pessoas de um lado ao outro."
  },
  {
    texto: "Qual atitude ajuda no respeito entre campo e cidade?",
    opcoes: ["Preconceito", "Escuta e diálogo", "Competição", "Ignorar culturas locais"],
    correta: 1,
    dica: "Ouvir o outro é o primeiro passo para o respeito."
  },
  {
    texto: "Qual produto é típico do campo?",
    opcoes: ["Software", "Leite", "Placa-mãe", "Ônibus"],
    correta: 1,
    dica: "Vem das vacas e é usado no café da manhã."
  },
  {
    texto: "Por que valorizar festas juninas é importante?",
    opcoes: ["São eventos de massa", "Geram poluição", "Celebram a cultura do campo", "Afastam tradições"],
    correta: 2,
    dica: "Tradição, comida típica e danças!"
  },
  {
    texto: "O que pode ser feito para melhorar a vida no campo?",
    opcoes: ["Investir em tecnologia e serviços", "Desmatar mais", "Fechar escolas rurais", "Incentivar o êxodo rural"],
    correta: 0,
    dica: "A melhoria vem com mais acesso à saúde, educação e tecnologia."
  },
  {
    texto: "Qual desses é um valor importante na convivência entre campo e cidade?",
    opcoes: ["Intolerância", "Individualismo", "Solidariedade", "Ignorância"],
    correta: 2,
    dica: "Ajudar o outro fortalece as comunidades."
  }
];

let perguntaAtual = 0;

function setup() {
  noCanvas();
  perguntas = shuffle(perguntas); // Embaralha as perguntas
  mostrarPergunta();

  const dicaBtn = document.getElementById("dica-btn");
  dicaBtn.addEventListener("click", mostrarDica);
}

function mostrarPergunta() {
  let container = document.getElementById("quiz-container");
  let msg = document.getElementById("mensagem");
  let dica = document.getElementById("dica-texto");

  msg.textContent = "";
  dica.textContent = "";

  let pergunta = perguntas[perguntaAtual];

  // Adiciona o número da pergunta com a ordem correta
  container.innerHTML = `<h2>Pergunta ${perguntaAtual + 1}: ${pergunta.texto}</h2>`;

  pergunta.opcoes.forEach((opcao, index) => {
    let botao = document.createElement("button");
    botao.textContent = opcao;
    botao.className = "opcao-btn";
    botao.addEventListener("click", () => verificarResposta(index));
    container.appendChild(botao);
  });
}

function verificarResposta(resposta) {
  let msg = document.getElementById("mensagem");
  if (resposta === perguntas[perguntaAtual].correta) {
    msg.textContent = "✅ Resposta correta!";
    msg.style.color = "green";
  } else {
    msg.textContent = "❌ Resposta errada. Tente novamente!";
    msg.style.color = "red";
    return;
  }

  setTimeout(() => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      document.getElementById("quiz-container").innerHTML = "<h2>🎉 Parabéns! Você completou o quiz!</h2>";
      document.getElementById("dica-btn").style.display = "none";
      msg.textContent = "";
      document.getElementById("dica-texto").textContent = "";
    }
  }, 1500);
}

function mostrarDica() {
  let dica = perguntas[perguntaAtual].dica;
  document.getElementById("dica-texto").textContent = "💡 Dica: " + dica;
}

// Função para embaralhar
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
