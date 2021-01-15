const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

// Tradução: handleKeyUp - Lidar com KeyUp. Botão espaço para subir
// keycode.info -> interceptar número das letras.
function handleKeyUp(event) {
  if (event.keyCode === 32) { //Código da tecla 32 = Espaço
    if (!isJumping) {     // Se não estiver pulando Diferente de false. 
      jump();
    }
  }
}

function jump() {   //Responsavel pelo pulo do boneco
  isJumping = true; 

  let upInterval = setInterval(() => { // Intervalo 
    if (position >= 150) { // Subir a 150px
      // Descendo
      clearInterval(upInterval); // Limpar o intervalo

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval); // Limpar o intervalo de decida.
          isJumping = false;
        } else {
          position -= 20;   // Intervalo de decida a cada 20 ms.
          dino.style.bottom = position + 'px';
        }
      }, 20);     // Intervalo de decida a cada 20 ms.
    } else {
      // Subindo
      position += 20; // Será  executado a cada 20 ms.
      dino.style.bottom = position + 'px'; 
    }
  }, 20);       // Será  executado a cada 20 ms.
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000; // Posição do cactus
  let randomTime = Math.random() * 6000;  // Tempo em ms para apercer novo cactus 

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);   // Adicionar um filho "cactus"
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) { 
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {    // Se cactus maior que 0, menor que 60 espaço do dino e a posição do dino não ta maior que a aultura do cactus a gente diz que o jogo acabou.
      // Game over
      clearInterval(leftTimer); // Limpar cactus para esquerda
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime); // setTimeout: Serve para executar uma determinada função - em um determinado tempo.
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
