"use strict";

import { isEmpty } from "./módulos/utilitarios.js";

function atribuirLinks(){
  const linkElementos = document.querySelectorAll('[data-link]');

  linkElementos.forEach(link => {
    switch(link.dataset.link.toLowerCase().trim()){
      case 'ultimos-registros':
        link.href = './ultimos-registros.php';
      break;

      case 'horarios':
        link.href = './horarios.php';
      break;

      case 'inicio':
        link.href = './index.php';
      break;

      case 'sair':
        link.href = '#';
      break;
    }
  })

}

(() => {
  hljs.highlightAll();

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });

  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })

  atribuirLinks();
})();

function marcarPaginaNoCabecalho(nome){
  if(!isEmpty(nome)){

    const nav = document.querySelector('[data-conteudo="opcoes-paginas-navegacao"]');
    
    switch(nome.toLowerCase().trim()){
      case 'ultimos-registros':
        
      case 'horarios':
      nav.querySelector(`[data-referencia="${nome.toLowerCase().trim()}"]`).classList.add('ativo');
      break;
    }
  }
}

export{
  marcarPaginaNoCabecalho
}