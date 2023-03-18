"use strict";

import { isEmpty } from "./módulos/utilitarios.js";

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