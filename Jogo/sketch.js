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
  campoImg = loadImage('campogame.jpg');
  cidadeImg = loadImage('cidadegame.jpg');
  
  playerImg = loadImage('cesta.png');
  goodItemImg = loadImage('fruta.png');
  badItemImg = loadImage('bomba.png');

  bgMusic = loadSound('ambiente.mp3');
  collectSound = loadSound('game-start-317318.mp3');
  hitSound = loadSound('80s-gated-reverb-96326.mp3');
  defeatSound = loadSound('sons e derrota (mp3cut.net).mp3');
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
