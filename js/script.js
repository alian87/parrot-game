document.addEventListener('DOMContentLoaded', function () {
  console.log('Jogo iniciado');

  function iniciarJogo() 
  {
    let numeroCartas;
    do 
    {
      numeroCartas = parseInt(prompt('Com quantas cartas quer jogar? (Escolha um número par entre 4 e 14)'));
    } 
    while (isNaN(numeroCartas) || numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 !== 0);

    const imagens = 
    [
      './img/bobrossparrot.gif', './img/bobrossparrot.gif',
      './img/explodyparrot.gif', './img/explodyparrot.gif',
      './img/fiestaparrot.gif', './img/fiestaparrot.gif',
      './img/metalparrot.gif', './img/metalparrot.gif',
      './img/revertitparrot.gif', './img/revertitparrot.gif',
      './img/tripletsparrot.gif', './img/tripletsparrot.gif',
      './img/unicornparrot.gif', './img/unicornparrot.gif'
    ].slice(0, numeroCartas);

    imagens.sort(comparador);

    const container = document.createElement('div');
    container.classList.add('container-cartas');
    document.body.appendChild(container);

    imagens.forEach((imagem, index) => {
      const carta = document.createElement('div');
      carta.classList.add('card');
      carta.dataset.index = index;

      // Cria a face da frente da carta com um wrapper para a imagem
      const frontFace = document.createElement('div');
      frontFace.classList.add('front-face', 'face');

      // Cria o contêiner da imagem
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('image-wrapper');

      const img = document.createElement('img');
      img.src = imagem;
      imgWrapper.appendChild(img);
      frontFace.appendChild(imgWrapper);

      // Cria a face de trás da carta
      const backFace = document.createElement('img');
      backFace.src = './img/back.png';
      backFace.classList.add('back-face', 'face');

      carta.appendChild(frontFace);
      carta.appendChild(backFace);
      container.appendChild(carta);

      carta.addEventListener('click', virarCarta);
    });

    console.log('Cartas criadas com sucesso');
  }

  let cartaVirada = false;
  let primeiraCarta, segundaCarta;
  let jogadas = 0;

  function virarCarta() 
  {
    if (this.classList.contains('virada') || this === primeiraCarta) 
      return;

    this.classList.add('virada');
    jogadas++;
    console.log(`Carta virada: ${this.dataset.index}, Total de jogadas: ${jogadas}`);

    if (!cartaVirada) 
    {
      cartaVirada = true;
      primeiraCarta = this;
      return;
    }

    segundaCarta = this;
    cartaVirada = false;

    verificarPar();
  }

  function verificarPar() 
  {
    const isPar = primeiraCarta.querySelector('.front-face img').src === segundaCarta.querySelector('.front-face img').src;
    console.log(`Par encontrado: ${isPar}`);

    if (isPar) 
      desativarCartas();
    else 
      desvirarCartas();
  }

  function desativarCartas() 
  {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarTabuleiro();
    verificarFimDeJogo();
  }

  function desvirarCartas() 
  {
    setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      resetarTabuleiro();
    }, 1000);
  }

  function resetarTabuleiro() 
  {
    [cartaVirada, primeiraCarta, segundaCarta] = [false, null, null];
  }

  function verificarFimDeJogo() 
  {
    const cartasViradas = document.querySelectorAll('.container-cartas .card.virada').length;
    const totalCartas = document.querySelectorAll('.container-cartas .card').length;

    console.log(`Cartas viradas: ${cartasViradas}, Total de cartas: ${totalCartas}`);

    if (cartasViradas === totalCartas) 
    {
      setTimeout(() => {
        alert(`Você ganhou em ${jogadas} jogadas!`);
        console.log('Jogo terminado com sucesso');
      }, 500);
    }
  }

  function comparador() 
  {
    return Math.random() - 0.5;
  }

  iniciarJogo();
});
