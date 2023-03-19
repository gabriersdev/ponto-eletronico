"use strict";

import { isEmpty, zeroEsquerda } from "./módulos/utilitarios.js";

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

function verificarODia(){
  const data = moment()
  let diaSemanaExtenso = null;

  const dataCompleta = `${data.get('date')}/${zeroEsquerda(2, data.get('month') + 1)}/${data.get('year')}`;
  console.log(converterParaMesBRL(data.get('month')))

  switch(data.day()){
    case '0':
    diaSemanaExtenso = 'domingo';
    break;
    
    case '1':
    diaSemanaExtenso = 'segunda-feira';
    break;
    
    case '2':
    diaSemanaExtenso = 'terca-feira';
    break;
    
    case '3':
    diaSemanaExtenso = 'quarta-feira';
    break;
    
    case '4':
    diaSemanaExtenso = 'quinta-feira';
    break;
    
    case '5':
    diaSemanaExtenso = 'sexta-feira';
    break;
    
    case '6':
    diaSemanaExtenso = 'sábado';
    break;    
  }
}

const converterParaMesBRL = (numero) => {
  let mes = null;

  switch (numero + 1){
    case 1: mes = 'janeiro'; break;
    case 2: mes = 'fevereiro'; break;
    case 3: mes = 'março'; break;
    case 4: mes = 'abril'; break;
    case 5: mes = 'maio'; break;
    case 6: mes = 'junho'; break;
    case 7: mes = 'julho'; break;
    case 8: mes = 'agosto'; break;
    case 9: mes = 'setembro'; break;
    case 10: mes = 'outubro'; break;
    case 11: mes = 'novembro'; break;
    case 12: mes = 'dezembro'; break;
    default: mes = 'janeiro'; break;
  }

  return mes;
}

verificarODia();

export{
  marcarPaginaNoCabecalho
}