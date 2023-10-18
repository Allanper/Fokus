const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btnStartPause = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 5;
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
    alterarContexto('foco');
    btnFoco.classList.add('active');
});

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
});

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active');
});

function alterarContexto(contexto) {
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
    // iniciar()
    tempoDecorridoEmSegundos-= 1;
    console.log('temporizador: ' + tempoDecorridoEmSegundos);
}

btnStartPause.addEventListener('click', contagemRegressiva);

function iniciar() {
    intervaloId = setInterval(contagemRegressiva, 1000);
}