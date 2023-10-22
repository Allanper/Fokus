const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btnStartPause = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const btnIniciarOuPausar = document.querySelector('#start-pause span');
const trocaImagemIniciarOuPausarBt = document.querySelector('.app__card-primary-butto-icon'); 
const tempoNaTela = document.querySelector('#timer');


const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playMusica = new Audio('/sons/play.wav');
const pauseMusica = new Audio('/sons/pause.mp3');
const toqueFinal = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add('active');
});

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
});

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active');
});


function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma parada.</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"><br>Faça uma pausa longa.</strong>`;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        toqueFinal.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos-= 1;
    mostrarTempo();
}

btnStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pauseMusica.play();
        zerar();
        return;
    }
    playMusica.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    btnIniciarOuPausar.textContent = 'Pausar';
    trocaImagemIniciarOuPausarBt.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    btnIniciarOuPausar.textContent = 'Começar';
    trocaImagemIniciarOuPausarBt.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();