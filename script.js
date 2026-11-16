// Abre a modal do projeto escolhido
  document.querySelectorAll('[data-modal]').forEach(function (botao) {
      botao.addEventListener('click', function () {
          document.getElementById(botao.dataset.modal).showModal();
      });
  });

