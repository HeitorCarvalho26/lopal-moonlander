//MoonLander. Um jogo de alunissagem.
//Heitor Carvalho (https://github.com/HeitorCarvalho26)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

// contexto.beginPath();
// contexto.rect(0,0, 100, 100);
// contexto.fillStyle = "white";
// contexto.fill();
// contexto.strokeStyle = "black";
// contexto.stroke();

// contexto.beginPath();
// contexto.moveTo(100, 100);
// contexto.lineTo(200, 100);
// contexto.lineTo(100, 200);
// contexto.lineTo(100, 100);
// contexto.fillStyle = "black";
// contexto.fill();

let moduloLunar = {
    posicao: {
        x: 100,
 @@ -26, 14 + 17, 16 @@let moduloLunar = {
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "black",
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: 0,
        y: 0
    }
},
    combustivel: 1000
 }

//Seção de visualização
function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    function desenharModuloLunar() {

        if (moduloLunar.motorLigado) {
            desenharChama();
            consumoCombustivel();
        }

        contexto.restore();
        function desenharChama() {
            contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
            contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
            //Determina o tamanho da chama
            contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 10);
            contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
            contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
            contexto.closePath();
            contexto.fillStyle = "orange";
            contexto.fill();
        }

        function mostrarVelocidade() {
            contexto.font = "bold 18px Arial";
            contexto.textAlign = "center";
            contexto.textBaseLine = "middle";
            contexto.fillStyle = "lightgray";
            let velocidade = `Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
            contexto.fillText(velocidade, 100, 60);
        }

        function mostrarCombustivel() {
            contexto.font = "bold 18px Arial";
            contexto.textAlign = "center";
            contexto.textBaseLine = "middle";
            contexto.fillStyle = "lightgray";
            let combustivel = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}`;
            contexto.fillText(combustivel, 100, 80);
        }


        let x = 100;

        function desenhar() {
            //limpar a tela
            contexto.clearRect(0, 0, canvas.width, canvas.height);

            contexto.save() //salvando contexto atual
            //vai (muda o contexto) para o centro da tela 
            contexto.translate(canvas.width / 2, canvas.height / 2);
            contexto.beginPath();
            //contexto.arc(x, 100, 25, 0, 2 * Math.PI);
            contexto.rotate(Math.PI / 4);
            contexto.rect(x, 100, 25, 10);
            contexto.fillStyle = "black";
            contexto.fill();
            contexto.restore(); //restaura o contexto anterior

            x = x + 1;
            //Esta função atualiza a posição do módulo lunar em função da gravidade

            atracaoGravitacional();
            desenharModuloLunar();
            mostrarVelocidade();
            mostrarCombustivel();
            //Esta função repete a execução da função desenhar a cada quadro
            if (moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)) {

                if (moduloLunar.velocidade.y >= 0.5) {
                    return alert("Você morreu na queda!");
                } else {
                    return alert("Você conseguiu pousar!")
                }
            }
            requestAnimationFrame(desenhar);

        }


        //Seção de controle


        //Pressionando a seta para cima para ligar o motor
        document.addEventListener("keydown", teclaPressionada);
        function teclaPressionada(evento) {
            if (evento.keyCode == 38) {
                if (evento.keyCode == 38 && moduloLunar.combustivel > 0) {
                    moduloLunar.motorLigado = true;

                }
            }
            //Soltando a seta para cima para desligar o motor
            function teclaSolta(evento) {
            }
        }

        let gravidade = 0.1;
        function consumoCombustivel() {
            if (moduloLunar.combustivel > 0) {
                moduloLunar.combustivel--;
            } else {
                moduloLunar.combustivel = 0;
                moduloLunar.motorLigado = false;
            }
        }
        desenhar();
