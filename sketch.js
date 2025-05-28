let images = [];

function preload() {
  images[0] = loadImage("https://i.ibb.co/jzfJ04k/campo.jpg");
  images[1] = loadImage("https://i.ibb.co/ZYW3VTp/cidade.jpg");
  images[2] = loadImage("https://i.ibb.co/RCzD3cJ/educacao.jpg");
}

function setup() {
  createCanvas(windowWidth, 800);
  background("#e9f5f2");
  textFont('Georgia');

  drawHeader();
  drawContent();
  drawImages();
  drawFooter();
}

function drawHeader() {
  fill("#006644");
  noStroke();
  rect(0, 0, width, 80);
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Educação e Conscientização", width / 2, 28);
  textSize(14);
  text("Formando cidadãos conscientes para um futuro sustentável", width / 2, 58);
}

function drawContent() {
  fill("#000");
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  text("A importância da educação no campo e na cidade", 50, 100);
  textStyle(NORMAL);
  textSize(14);
  text(
    "A educação é a base para promover mudanças significativas nas comunidades rurais e urbanas. " +
    "Ela permite que os indivíduos compreendam seu papel na sociedade e a importância de práticas sustentáveis.",
    50, 130, width - 100
  );

  textStyle(BOLD);
  textSize(18);
  text("Conscientização para um futuro melhor", 50, 210);
  textStyle(NORMAL);
  textSize(14);
  text(
    "Por meio da conscientização, é possível fomentar valores como o respeito à natureza, o consumo responsável " +
    "e a valorização do trabalho no campo. Iniciativas educativas, como o Agrinho, são fundamentais.",
    50, 240, width - 100
  );

  textStyle(BOLD);
  textSize(18);
  text("A união do saber e da prática", 50, 320);
  textStyle(NORMAL);
  textSize(14);
  text(
    "É essencial unir o conhecimento teórico das escolas com a prática no dia a dia, no campo e na cidade. " +
    "Essa conexão fortalece o entendimento sobre a importância de cada um para um futuro melhor.",
    50, 350, width - 100
  );
}

function drawImages() {
  textStyle(BOLD);
  textSize(18);
  fill(0);
  textAlign(CENTER);
  text("Imagens Relacionadas", width / 2, 450);

  let imgY = 480;
  let imgW = 200;
  let spacing = (width - 3 * imgW) / 4;

  for (let i = 0; i < 3; i++) {
    image(images[i], spacing + i * (imgW + spacing), imgY, imgW, 120);
  }
}

function drawFooter() {
  fill("#006644");
  rect(0, height - 40, width, 40);
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(12);
  text("© 2025 - Projeto Agrinho | Tema: Educação e Conscientização", width / 2, height - 20);
}
let player;
let items = [];
let score = 0;
let speed = 3;
let bg;
let currentScene = 'campo';
let estado = 'menu';
let pausado = false;

// Imagens
let campoImg, cidadeImg;
let playerImg;
let goodItemImg, badItemImg;

// Sons
let bgMusic, collectSound, hitSound, defeatSound;

// Botões
let botaoJogar, botaoComoJogar, botaoSair, botaoTentar, botaoVoltar, botaoVoltarComoJogar;
let botaoContinuar, botaoSairPause;

function preload() {
  campoImg = loadImage('img/campogame.jpg');
  cidadeImg = loadImage('img/cidadegame.jpg');
  
  playerImg = loadImage('img/cesta.png');
  goodItemImg = loadImage('img/fruta.png');
  badItemImg = loadImage('img/bomba.png');

  bgMusic = loadSound('sons/ambiente.mp3');
  collectSound = loadSound('sons/ponto.mp3');
  hitSound = loadSound('img/bomba.mp3');
  defeatSound = loadSound('sons/derrota.mp3');
}

function setup() {
  let canvas = createCanvas(1024, 768);
  canvas.position((windowWidth - 1024) / 2, (windowHeight - 768) / 2);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('pointer-events', 'none');
  
  player = new Player();
  bg = campoImg;

  botaoJogar = { x: width / 2 - 100, y: height / 2 - 40, w: 200, h: 40 };
  botaoComoJogar = { x: width / 2 - 100, y: height / 2 + 20, w: 200, h: 40 };
  botaoSair = { x: width / 2 - 100, y: height / 2 + 80, w: 200, h: 40 };
  
  botaoTentar = { x: width / 2 - 100, y: height / 2, w: 200, h: 40 };
  botaoVoltar = { x: width / 2 - 100, y: height / 2 + 60, w: 200, h: 40 };
  botaoVoltarComoJogar = { x: width / 2 - 100, y: height / 2 + 120, w: 200, h: 40 };
  
  botaoContinuar = { x: width/2 - 100, y: height/2 - 20, w: 200, h: 40 };
  botaoSairPause = { x: width/2 - 100, y: height/2 + 40, w: 200, h: 40 };

  bgMusic.setVolume(0.1);
  collectSound.setVolume(0.1);
  hitSound.setVolume(0.1);
  defeatSound.setVolume(0.1);
}

function draw() {
  background(bg);

  if (estado === 'menu') {
    mostrarMenu();
  } else if (estado === 'jogando') {
    if (pausado) {
      mostrarPause();
    } else {
      jogar();
    }
  } else if (estado === 'comoJogar') {
    mostrarComoJogar();
  } else if (estado === 'gameover') {
    mostrarGameOver();
  }
}

function mostrarMenu() {
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, 340, 260, 30);

  fill(255, 255, 0);
  textSize(36);
  textAlign(CENTER, CENTER);
  text('Bem-vindo ao Jogo!', width / 2, height / 2 - 90);

  desenharBotao(botaoJogar, "Jogar");
  desenharBotao(botaoComoJogar, "Como Jogar");
  desenharBotao(botaoSair, "Sair");
}

function mostrarComoJogar() {
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, 500, 300, 30);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Use as setas ← → para mover.\nAperte ESPAÇO para dar dash!\nPegue as maças para ganhar ponto e \nevite as bombas", width / 2, height / 2 - 40);

  desenharBotao(botaoVoltarComoJogar, "Voltar");
}

function mostrarGameOver() {
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, 340, 200, 30);

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("GAME OVER", width / 2, height / 2 - 60);

  desenharBotao(botaoTentar, "Tentar Novamente");
  desenharBotao(botaoVoltar, "Voltar");
}

function mostrarPause() {
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, 340, 220, 30);

  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Jogo Pausado", width/2, height/2 - 70);

  desenharBotao(botaoContinuar, "Continuar");
  desenharBotao(botaoSairPause, "Sair");
}

function jogar() {
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text('Pontuação: ' + score, 10, 10);

  player.update();
  player.display();

  if (frameCount % 90 == 0) {
    items.push(new FallingItem());
  }

  for (let i = items.length - 1; i >= 0; i--) {
    items[i].update();
    items[i].display();

    if (items[i].hits(player)) {
      if (items[i].isGood) {
        collectSound.play();
        score++;
        if (score == 20) {
          currentScene = 'cidade';
          bg = cidadeImg;
          speed = 4;
        } else if (score == 40) {
          speed = 6;
        }
      } else {
        hitSound.play();
        score -= 2;
        if (score < 0) {
          if (bgMusic.isPlaying()) {
            bgMusic.stop();
          }
          defeatSound.play();
          estado = 'gameover';
        }
      }
      items.splice(i, 1);
    } else if (items[i].offScreen()) {
      if (items[i].isGood) {
        score--;
        if (score < 0) {
          if (bgMusic.isPlaying()) {
            bgMusic.stop();
          }
          defeatSound.play();
          estado = 'gameover';
        }
      }
      items.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    player.dash();
  }
  if (keyCode === ESCAPE && estado === 'jogando') {
    pausado = !pausado;
  }
}

function desenharBotao(botao, texto) {
  let hover = mouseX > botao.x && mouseX < botao.x + botao.w &&
              mouseY > botao.y && mouseY < botao.y + botao.h;

  push();
  rectMode(CORNER);
  noStroke();
  fill(34, 139, 34);
  if (hover) {
    rect(botao.x - 5, botao.y - 5, botao.w + 10, botao.h + 10, 10);
  } else {
    rect(botao.x, botao.y, botao.w, botao.h, 10);
  }

  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(texto, botao.x + botao.w / 2, botao.y + botao.h / 2);
  pop();
}

function mousePressed() {
  if (estado === 'menu') {
    if (dentroDoBotao(mouseX, mouseY, botaoJogar)) {
      estado = 'jogando';
      pausado = false;
      if (!bgMusic.isPlaying()) {
        bgMusic.loop();
      }
    } else if (dentroDoBotao(mouseX, mouseY, botaoComoJogar)) {
      estado = 'comoJogar';
    } else if (dentroDoBotao(mouseX, mouseY, botaoSair)) {
      window.open('https://pagina-principal-fawn.vercel.app/', '_blank');
    }
  } else if (estado === 'gameover') {
    if (dentroDoBotao(mouseX, mouseY, botaoTentar)) {
      reiniciarJogo();
    } else if (dentroDoBotao(mouseX, mouseY, botaoVoltar)) {
      estado = 'menu';
    }
  } else if (estado === 'comoJogar') {
    if (dentroDoBotao(mouseX, mouseY, botaoVoltarComoJogar)) {
      estado = 'menu';
    }
  } else if (estado === 'jogando' && pausado) {
    if (dentroDoBotao(mouseX, mouseY, botaoContinuar)) {
      pausado = false;
    } else if (dentroDoBotao(mouseX, mouseY, botaoSairPause)) {
      pausado = false;
      estado = 'menu';
      if (bgMusic.isPlaying()) {
        bgMusic.stop();
      }
    }
  }
}

function dentroDoBotao(mx, my, botao) {
  return mx > botao.x && mx < botao.x + botao.w &&
         my > botao.y && my < botao.y + botao.h;
}

function reiniciarJogo() {
  if (defeatSound.isPlaying()) {
    defeatSound.stop();
  }
  
  player = new Player();
  items = [];
  score = 0;
  speed = 3;
  estado = 'jogando';
  bg = campoImg;
  currentScene = 'campo';
  
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }
}

class Player {
  constructor() {
    this.width = 100;
    this.height = 40;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;
    this.dashPower = 60;
    this.dashCooldown = 0;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 0, width - this.width);

    if (this.dashCooldown > 0) {
      this.dashCooldown--;
    }
  }

  display() {
    image(playerImg, this.x, this.y, this.width, this.height);
  }

  dash() {
    if (this.dashCooldown === 0) {
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.dashPower;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.dashPower;
      }
      this.dashCooldown = 30;
    }
  }
}

class FallingItem {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 0;
    this.size = 30;
    this.isGood = random() < 0.7;
  }

  update() {
    this.y += speed;
  }

  display() {
    if (this.isGood) {
      image(goodItemImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
      image(badItemImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
  }
  
  hits(player) {
  let itemCenterX = this.x;
  let itemCenterY = this.y;
  let playerCenterX = player.x + player.width / 2;
  let playerCenterY = player.y + player.height / 2;
  let distance = dist(itemCenterX, itemCenterY, playerCenterX, playerCenterY);
  let collisionDistance = (this.size / 2) + (player.width / 2.5);

  return distance < collisionDistance;
}

  offScreen() {
    return this.y > height;
  }
}
// Fundo animado
let currentTheme = 0;
let clouds = [];
let birds = [];
let cars = [];
let buildings = [];
let grassOffset = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('pointer-events', 'none');

  // Nuvens
  for (let i = 0; i < 5; i++) {
    clouds.push({ x: random(width), y: random(120, 220), speed: random(0.3, 1) });
  }

  // Pássaros
  for (let i = 0; i < 3; i++) {
    birds.push({ x: random(width / 2), y: random(130, 180), speed: random(1, 2) });
  }

  // Carros
  for (let i = 0; i < 3; i++) {
    cars.push({ x: random(width / 2, width), y: height - 80, speed: random(2, 3) });
  }

  // Prédios
  let buildingWidth = 50;
  for (let x = width / 2; x < width; x += buildingWidth + 10) {
    buildings.push({ x: x, h: random(80, 150), w: buildingWidth });
  }

  // Botões
  const buttonLinks = {
    btnTema1: "https://o-campo-produz-a-cidade-consome.vercel.app/",
    btnTema2: "https://valoriza-o-cultural.vercel.app/",
    btnTema3: "https://educao-e-conscientizao.vercel.app/",
    btnTema4: "https://festejar-e-unir.vercel.app/",
    btnVantagens: "https://vantagens-eosin.vercel.app/",
    btnQuiz: "https://quiz-smoky-ten-66.vercel.app/",
    btnSobre: "https://sobre-dusky.vercel.app/",
    btnJogo: "https://jogo-self-iota.vercel.app/",
  };

  Object.keys(buttonLinks).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => window.open(buttonLinks[id], "_blank"));
      btn.addEventListener("mouseover", () => btn.style.transform = "scale(1.1)");
      btn.addEventListener("mouseout", () => btn.style.transform = "scale(1)");
      btn.style.transition = "transform 0.2s";
    }
  });

  textSize(20);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  background(135, 206, 235);

  drawGround();
  drawTrees();
  drawDivider();
  drawClouds();
  drawBirds();
  drawCityBuildings();
  drawCars();

  fill(0);
  textSize(24);
  if (currentTheme === 1) text("O campo produz, a cidade consome", width / 2, 60);
  else if (currentTheme === 2) text("Valorização Cultural", width / 2, 60);
  else if (currentTheme === 3) text("Educação e Conscientização", width / 2, 60);
  else if (currentTheme === 4) text("Festejar é unir", width / 2, 60);
}

function drawGround() {
  fill(34, 139, 34);
  beginShape();
  for (let x = 0; x < width / 2; x++) {
    let y = height - 100 + sin((x + grassOffset) * 0.05) * 5;
    vertex(x, y);
  }
  vertex(width / 2, height);
  vertex(0, height);
  endShape(CLOSE);

  fill(169, 169, 169);
  rect(width / 2, height - 100, width / 2, 100);

  grassOffset += 0.5;
}

function drawTrees() {
  for (let i = 50; i < width / 2; i += 120) {
    let treeBaseY = height - 100 + sin((i + grassOffset) * 0.05) * 5;

    // Tronco
    fill(101, 67, 33);
    rect(i, treeBaseY - 40, 10, 40);

    // Folhas da arvore
    fill(34, 139, 34);
    ellipse(i + 5, treeBaseY - 50, 40, 40);
    ellipse(i - 10, treeBaseY - 40, 30, 30);
    ellipse(i + 20, treeBaseY - 40, 30, 30);
  }
}

function drawDivider() {
  stroke(0);
  line(width / 2, 0, width / 2, height);
}

function drawClouds() {
  noStroke();
  fill(255);
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, 60, 40);
    ellipse(cloud.x + 30, cloud.y + 10, 50, 30);
    ellipse(cloud.x - 30, cloud.y + 10, 50, 30);
    cloud.x += cloud.speed;
    if (cloud.x > width + 60) cloud.x = -60;
  }
}

function drawBirds() {
  fill(0);
  for (let bird of birds) {
    triangle(bird.x, bird.y, bird.x + 10, bird.y - 5, bird.x + 20, bird.y);
    bird.x += bird.speed;
    if (bird.x > width / 2) bird.x = -20;
  }
}

function drawCityBuildings() {
  fill(100);
  for (let b of buildings) {
    rect(b.x, height - 100 - b.h, b.w, b.h);
  }
}

function drawCars() {
  for (let car of cars) {
    fill(255, 0, 0);
    rect(car.x, car.y, 40, 20);
    fill(0);
    ellipse(car.x + 10, car.y + 20, 10, 10);
    ellipse(car.x + 30, car.y + 20, 10, 10);

    car.x += car.speed;
    if (car.x > width) car.x = width / 2;
  }
}

function theme1Animation() {
}

function theme2Animation() {
}

function theme3Animation() {
}

function theme4Animation() {
}

function changeTheme(themeNumber) {
  currentTheme = themeNumber;
  document.getElementById("text-description").innerText = getDescription(themeNumber);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
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
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
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
