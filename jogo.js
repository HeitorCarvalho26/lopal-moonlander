//MoonLander. Um jogo de alunissagem.
//Heitor Carvalho (https://github.com/HeitorCarvalho26)
//28/03/2025
//Versão 0.1.0
/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let x;
let velocidadeX;
let angulo;

if (Math.round(Math.random()) == 0) {
    x = 100;
    velocidadeX = 2;
    angulo = -Math.PI / 2;
} else {
    x = 700;
    velocidadeX = -2;
    angulo = Math.PI / 2;
}

let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: -Math.PI / 2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0
    },
    combustivel: 1000,
    rotacaoAntHorario: false,
    rotacaoHorario: false
}

let estrelas = [];
for (let i = 0; i < 500; i++) {
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0,
        diminuicao: true,
        razaoDeCintilacao: Math.random() * 0.05  // Corrigido para Math.random()
    }
}

//Seção de visualização
function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if (moduloLunar.motorLigado) {
        desenharChama();
        consumoCombustivel();
    }

    contexto.restore();
}

function desenharChama() {
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //Determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
    contexto.closePath();
    contexto.fillStyle = "purple";
    contexto.fill();
}

// Função para mostrar a velocidade vertical
function mostrarVelocidadeVertical() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "right"; // Ajustado para o canto direito
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidadeVertical = `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y).toFixed(2)} m/s`;
    contexto.fillText(velocidadeVertical, canvas.width - 10, 60); // Alinhado à direita
}

// Função para mostrar a velocidade horizontal
function mostrarVelocidadeHorizontal() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "right"; // Ajustado para o canto direito
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidadeHorizontal = `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(2)} m/s`;
    contexto.fillText(velocidadeHorizontal, canvas.width - 10, 80); // Alinhado à direita
}

// Função para mostrar o ângulo
function mostrarAngulo() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "right"; // Ajustado para o canto direito
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(2)}°`;
    contexto.fillText(angulo, canvas.width - 10, 100); // Alinhado à direita
}

// Função para mostrar a altitude
function mostrarAltitude() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "right"; // Ajustado para o canto direito
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let altitude = `Altitude: ${(canvas.height - moduloLunar.posicao.y).toFixed(2)} m`;
    contexto.fillText(altitude, canvas.width - 10, 120); // Alinhado à direita
}

// Função para mostrar o combustível como porcentagem
function mostrarCombustivel() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "right"; // Ajustado para o canto direito
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustivelPorcentagem = `Combustível: ${((moduloLunar.combustivel / 1000) * 100).toFixed(0)}%`;
    contexto.fillText(combustivelPorcentagem, canvas.width - 10, 140); // Alinhado à direita
}

function desenharEstrelas() {
    for (let i = 0; i < estrelas.length; i++) {
        let estrela = estrelas[i];
        contexto.save(); // Adicionando o contexto.save()
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba(255, 255, 255, " + estrela.transparencia + ")";
        contexto.fill();
        contexto.restore(); // A restauração deve ocorrer aqui
    }
}

function desenhar() {
    // Limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    // Esta função atualiza a posição do módulo lunar em função da gravidade

    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();
    mostrarAngulo();
    mostrarAltitude();
    mostrarCombustivel();
    desenharEstrelas();
    
    if (moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)) {
        if (moduloLunar.velocidade.y >= 0.5 ||
            moduloLunar.velocidade.x >= 0.5 ||
            5 < moduloLunar.angulo ||
            moduloLunar.angulo < -5
        ) {
            return (
                contexto.font = "bold 35px pixel_gamer",
                contexto.textAlign = "center",
                contexto.textBaseLine = "middle",
                contexto.fillStyle = "red",
                contexto.fillText("GAME OVER", canvas.width / 2, canvas.height / 2)
            )
        } else {
            return (
                contexto.font = "bold 35px pixel_gamer",
                contexto.textAlign = "center",
                contexto.textBaseLine = "middle",
                contexto.fillStyle = "red",
                contexto.fillText("VOCÊ POUSOU PARABÉNS", canvas.width / 2, canvas.height / 2)
            )
        }
    }
    requestAnimationFrame(desenhar);
}

//Seção de controle

// Pressionando a seta para cima para ligar o motor
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento) {
    if (evento.keyCode == 38 && moduloLunar.combustivel > 0) {
        moduloLunar.motorLigado = true;
    } else if (evento.keyCode == 39) {
        moduloLunar.rotacaoAntHorario = true;
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = true;
    }
}

// Soltando a seta para cima para desligar o motor
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = false;
    } else if (evento.keyCode == 39) {
        moduloLunar.rotacaoAntHorario = false;
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = false;
    }
}

function consumoCombustivel() {
    if (moduloLunar.combustivel > 0) {
        moduloLunar.combustivel--;
    } else {
        moduloLunar.combustivel = 0;
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.01;
function atracaoGravitacional() {
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if (moduloLunar.rotacaoAntHorario) {
        moduloLunar.angulo += Math.PI / 180;
    } else if (moduloLunar.rotacaoHorario) {
        moduloLunar.angulo -= Math.PI / 180;
    }

    if (moduloLunar.motorLigado) {
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
    moduloLunar.velocidade.y += gravidade;
}

desenhar();
