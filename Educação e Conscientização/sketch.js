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
