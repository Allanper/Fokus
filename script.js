const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');

btnFoco.addEventListener('click', () => {
    alterarContexto('foco')
});

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
});

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo')
});

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
}