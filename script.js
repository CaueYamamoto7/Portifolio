// Abre a modal do projeto escolhido
  document.querySelectorAll('[data-modal]').forEach(function (botao) {
      botao.addEventListener('click', function () {
          document.getElementById(botao.dataset.modal).showModal();
      });
  });

// Mostra uma foto por vez em cada modal
document.querySelectorAll('.fotosProjeto').forEach(function (galeria) {
    const modal = galeria.closest('dialog');
    const fotos = galeria.querySelectorAll('img');
    let atual = 0;

    const controles = document.createElement('div');
    controles.className = 'controlesFotos';

    const anterior = document.createElement('button');
    anterior.type = 'button';
    anterior.textContent = '‹';
    anterior.setAttribute('aria-label', 'Foto anterior');

    const contador = document.createElement('span');
    contador.setAttribute('aria-live', 'polite');

    const proxima = document.createElement('button');
    proxima.type = 'button';
    proxima.textContent = '›';
    proxima.setAttribute('aria-label', 'Próxima foto');

    controles.append(anterior, contador, proxima);
    galeria.after(controles);

    function mostrarFoto() {
        fotos.forEach(function (foto, indice) {
            foto.hidden = indice !== atual;
        });
        contador.textContent = fotos.length ? (atual + 1) + ' / ' + fotos.length : 'Fotos em breve';
        anterior.disabled = fotos.length < 2 || atual === 0;
        proxima.disabled = fotos.length < 2 || atual === fotos.length - 1;
    }

    anterior.addEventListener('click', function () {
        atual = Math.max(0, atual - 1);
        mostrarFoto();
    });

    proxima.addEventListener('click', function () {
        atual = Math.min(fotos.length - 1, atual + 1);
        mostrarFoto();
    });

    modal.addEventListener('keydown', function (evento) {
        if (evento.key === 'ArrowLeft' || evento.key === 'ArrowRight') {
            evento.preventDefault();
            if (evento.key === 'ArrowLeft') anterior.click();
            else proxima.click();
        }
    });

    modal.addEventListener('close', function () {
        atual = 0;
        mostrarFoto();
    });

    mostrarFoto();
});