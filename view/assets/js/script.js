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

function diferencaEmHoras(inicio, fim){
  const ms = moment(inicio,"YYYY-MM-DD HH:mm:ss").diff(moment(fim,"YYYY-MM-DD HH:mm:ss"));
  const duracao = moment.duration(ms);
  return Math.floor(duracao.get('hours')) + moment.utc(ms).format(":mm:ss");
}

// console.log(diferencaEmHoras('2023-03-19 15:12:00', '2023-03-19 15:08:00'))

function verificarODia(){
  const data = moment()
  let diaSemanaExtenso = null;

  const dataCompleta = `${data.get('date')}/${zeroEsquerda(2, data.get('month') + 1)}/${data.get('year')}`;

  // const agora = new Date();
  // console.log(agora.getHours())
  // console.log(agora.getMinutes())
  // console.log(agora.getSeconds())
  
  // console.log(Date.now() - new Date('2023-03-19 13:00:00').getTime())

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

function escutaSelecaoDropdown(){
  const dropdowns = document.querySelectorAll('.dropdown-menu');

  if(!isEmpty(dropdowns)){
    if(Array.isArray(dropdowns) || typeof dropdowns == 'object'){
      dropdowns.forEach(dropdown => {
        acao(dropdown);
      })
    }else{
      acao(dropdowns[0]);
    }
  }

  function acao(dropdown){
    dropdown.addEventListener('click', (evento) => {
      evento.preventDefault();
      if(evento.target.tagName.toLowerCase() == 'a'){
        desmarcarTodasOpcoesDropdown(dropdown);
        marcarOpcaoSelecionada(evento.target);
        acionarBusca(dropdown);
      }
    })
  }

  function acionarBusca(dropdown){
    const botao = dropdown.parentElement.querySelector('[data-acao="btn-dropdown-toggle"]');
    if(!isEmpty(botao)){
      botao.classList.contains('dropdown-toggle') ? botao.classList.remove('dropdown-toggle') : ''
      const width = botao.offsetWidth;
      botao.innerHTML = `<span class="spinner-border text-light" role="status"></span>`;
      botao.style.width = `${width}px`;
    }
  }

  function marcarOpcaoSelecionada(opcao){
    opcao.classList.add('selecionado');
  }

  function desmarcarTodasOpcoesDropdown(dropdown){
    const opcoes = dropdown.querySelectorAll('a.dropdown-item');

    if(!isEmpty(opcoes)){
      if(Array.isArray(opcoes) || typeof opcoes == 'object'){
        opcoes.forEach(opcao => {
          opcao.classList.contains('selecionado') ? opcao.classList.remove('selecionado') : '';
        })
      }else{
        opcoes[0].classList.contains('selecionado') ? opcoes[0].classList.remove('selecionado') : '';
      }
    }

  }
}

escutaSelecaoDropdown();
verificarODia();

export{
  marcarPaginaNoCabecalho
}