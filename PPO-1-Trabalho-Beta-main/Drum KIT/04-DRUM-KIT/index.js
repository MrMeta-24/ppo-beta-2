'use strict';

const sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
};

let volume = 1;
let playbackRate = 1;

// Pré-carregamento dos sons
const sounds = {};
Object.keys(sons).forEach(key => {
    const audio = new Audio(`./sounds/${sons[key]}`);
    audio.onerror = (e) => console.error(`Erro ao carregar ${sons[key]}`);
    sounds[key] = audio;
});

const criarDiv = (texto) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = texto;
    div.id = texto;
    document.getElementById('container').appendChild(div);
};

const exibir = (sons) => Object.keys(sons).forEach(criarDiv);

const tocarSom = (letra) => {
    const audio = sounds[letra];
    audio.volume = volume;
    audio.playbackRate = playbackRate;
    audio.play();
};

const adicionarEfeito = (letra) => {
    const div = document.getElementById(letra);
    div.classList.add('active');
};

const removerEfeito = (letra) => {
    const div = document.getElementById(letra);
    div.addEventListener('transitionend', () => {
        div.classList.remove('active');
    }, { once: true });
};

const ativarDiv = (evento) => {
    const letra = evento.type === 'click' ? evento.target.id : evento.key.toUpperCase();
    
    const letraPermitida = sons.hasOwnProperty(letra);
    if (!letraPermitida) return;

    adicionarEfeito(letra);
    tocarSom(letra);
    removerEfeito(letra);
};

// Controles de volume e velocidade
const controlarVolume = (evento) => {
    volume = evento.target.value;
    document.getElementById('volume-display').textContent = `Volume: ${Math.round(volume * 100)}%`;
};

const controlarVelocidade = (evento) => {
    playbackRate = evento.target.value;
    document.getElementById('speed-display').textContent = `Velocidade: ${Math.round(playbackRate * 100)}%`;
};

exibir(sons);

document.getElementById('container').addEventListener('click', ativarDiv);
window.addEventListener('keydown', ativarDiv);

// Configurar sliders
document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volume-slider');
    const speedSlider = document.getElementById('speed-slider');

    volumeSlider.addEventListener('input', controlarVolume);
    speedSlider.addEventListener('input', controlarVelocidade);

    // Defina valores iniciais se necessário
    volumeSlider.value = volume;
    speedSlider.value = playbackRate;
});