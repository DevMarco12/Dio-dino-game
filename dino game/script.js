// Variáveis globais
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if (!isJumping){
            jump();
        }
    }
}

// Função para o dinossauro pular
function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150){
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
        else {
            // Subindo    
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Função para criar e dar vida aos cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60){
            // Saiu da tela

            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over

            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);