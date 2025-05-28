let trocas = [
  { campo: "🌽 Campo envia alimentos", cidade: "🏙️ Cidade envia tecnologia" },
  { campo: "🚜 Campo envia matéria-prima", cidade: "🏢 Cidade envia máquinas" },
  { campo: "🥛 Campo envia leite", cidade: "🧃 Cidade envia embalagens" },
  { campo: "🍅 Campo envia hortaliças", cidade: "🧂 Cidade envia temperos industrializados" },
  { campo: "🐄 Campo envia carne", cidade: "🚚 Cidade envia transporte" }
];

let indice = 0;
let animando = false;
let fase = "campo"; // "campo" ou "cidade"
let iconeX, destinoX;
let mensagem = "";
let mostrarConexao = false;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("sketch-holder");
  textAlign(CENTER, CENTER);
  textSize(20);

  let botao = createButton("Fazer Conexão");
  botao.parent("sketch-holder");
  botao.mousePressed(() => {
    mostrarConexao = true;
    iniciarAnimacao();
  });
}

function draw() {
  background(255);

  // Título
  fill(0);
  textSize(24);
  text("Conexão Campo-Cidade", width / 2, 40);

  if (!mostrarConexao) return;

  // Campo
  fill('#c5e1a5');
  rect(50, 150, 200, 100, 20);
  fill(0);
  textSize(20);
  text("🌾 Campo", 150, 200);

  // Cidade
  fill('#90caf9');
  rect(550, 150, 200, 100, 20);
  fill(0);
  text("🏙️ Cidade", 650, 200);

  // Animação da seta
  if (animando) {
    textSize(26);
    fill(0);
    if (fase === "campo") {
      text("➡️", iconeX, 200);
      iconeX += 5;
      if (iconeX >= destinoX) {
        fase = "cidade";
        iconeX = 700;
        destinoX = 100;
        mensagem = trocas[indice].cidade; // Cidade envia na volta ⬅️
      }
    } else if (fase === "cidade") {
      text("⬅️", iconeX, 200);
      iconeX -= 5;
      if (iconeX <= destinoX) {
        fase = "campo";
        iconeX = 100;
        destinoX = 700;
        mensagem = trocas[indice].campo; // Campo envia na ida ➡️

        // próxima troca
        indice = (indice + 1) % trocas.length;
      }
    }
  }

  // Mensagem
  textSize(20);
  fill(50);
  text(mensagem, width / 2, 300);
}

function iniciarAnimacao() {
  animando = true;
  fase = "campo";
  iconeX = 100;
  destinoX = 700;
  mensagem = "";
}
