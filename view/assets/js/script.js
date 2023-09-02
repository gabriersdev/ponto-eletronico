"use strict";

import { conteudos } from "./módulos/conteudos.js";
import { atualizarDatas, capitalize, escutaClickRecarregaPagina, isEmpty, swalAlert, formatarData, resumirHorario, diferencaEntreDatas } from "./módulos/utilitarios.js";
import { instruirDesacionarBusca } from "./scripts/ultimos-registros.js";

function atribuirLinks(){
  const linkElementos = document.querySelectorAll('[data-link]');
  
  linkElementos.forEach(link => {
    switch(link.dataset.link.toLowerCase().trim()){
      case 'ultimos-registros':
      link.href = '../ultimos-registros';
      break;
      
      case 'horarios':
      link.href = '../horarios';
      break;
      
      case 'inicio':
      link.href = '../inicio/';
      break;
      
      case 'sair':
      link.href = '../sair/';
      break;

      case 'github-dev':
      link.href = 'https://github.com/gabrieszin';
      break;

      case 'github-projeto':
      link.href = 'https://github.com/gabrieszin/timesheet';
      break;
    }
  })
  
}

(() => {  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  $(document).ready(function(){
    $('[data-bs-toggle="popover"]').popover();  
  });

  window.addEventListener('load', function(){
    this.setTimeout(() => {
      $('.overlay').hide();
    }, 250)
  })

  escutaClickRecarregaPagina();  
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

function verificarODia(data){
  let diaSemanaExtenso = null;

  // const agora = new Date();
  // console.log(agora.getHours())
  // console.log(agora.getMinutes())
  // console.log(agora.getSeconds())
  // console.log(Date.now() - new Date('2023-03-19 13:00:00').getTime())

  try{
    switch(data.day().toString()){
      default:
        return verificar(data.day().toString());
      break;
    }  
  }catch(error){
    switch(data){
      default:
        return verificar(data);
      break;
    }  
  }

  function verificar(dia){
    switch(dia.toString()){
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
      
      default:
      console.log('O dia é inválido');
      break;
    }
    return diaSemanaExtenso;
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

function escutaClickLinkSair(){
  const link = document.querySelector('[data-link="sair"]');
  if(!isEmpty(link)){
    link.addEventListener('click', (evento) => {
      evento.preventDefault();
      swalAlert('confirmacao', 'question', 'Tem certeza que deseja sair?', 'A sua sessão será encerrada, e um novo login terá de ser feito para acessar o Ponto Eletrônico', null, `window.location.href = "${evento.target.href}"`).then(retorno => {})
    })
  }
}

async function retornarUltimosRegistros(quantidade, filtro){
  if(isEmpty(quantidade)){
    return null;
  }

  if(isEmpty(filtro)){
    filtro = null;
  }

  await $.ajax({
    method: "POST",
    url: "../../ajax-php/ultimos-horarios-ajax-php.php",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: {solicitacao: 'true', quantidade: quantidade, filtro: filtro},
    dataType: 'json',
    encode: true,
  })
  
  .done(function(msg){
    if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
      const card_body = document.querySelector('[data-conteudo="registros"]');
      switch(msg.mensagem.toLowerCase()){
        case 'dados vazios':
        swalAlert('error', 'error', 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 0129EM', null);
        break;
        
        case 'usuário não definido':
        swalAlert('error', 'error', 'Usuário não definido', 'Login pendente ou não registrado corretamente. Por favor contate o administrador', 'Erro: 3553LG', null);
        break;
        
        case 'dados recebidos':
        if(!isEmpty(msg.dados)){
          msg.dados.forEach(element => {
            const dia = capitalize(verificarODia(parseInt(moment(element.dia_semana_usuario_horario).day())));
            const entrada = !isEmpty(element.hora_entrada_usuario_horario) ? element.hora_entrada_usuario_horario : '';
            const saida = !isEmpty(element.hora_saida_usuario_horario) ? element.hora_saida_usuario_horario : '';
            const saida_almoco = !isEmpty(element.hora_saida_usuario_almoco) ? element.hora_saida_usuario_almoco : '';
            const retorno_almoco = !isEmpty(element.hora_retorno_usuario_almoco) ? element.hora_retorno_usuario_almoco : '';
            
            const checked = !isEmpty(entrada) && !isEmpty(saida) && !isEmpty(saida_almoco) && !isEmpty(retorno_almoco) || !isEmpty(entrada) && !isEmpty(saida) && dia == 'Sábado' ? 'checked' : '';

            try{
              if(!isEmpty(entrada) && !isEmpty(saida)){
                card_body.querySelector('tbody').innerHTML += `<tr><td scope="row" colspan="2"><div class="input-group"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" ${checked} disabled></div><input type="text" class="form-control" value="${dia}, ${formatarData(element.dia_semana_usuario_horario)}" disabled></div></td><td data-conteudo="horario-entrada">${resumirHorario(entrada)}</td><td data-conteudo="horario-saida">${resumirHorario(saida)}</td><td data-conteudo="tempo-trabalhado"></td></tr>`;
              }else{
                card_body.querySelector('tbody').innerHTML += `<tr><td scope="row" colspan="2"><div class="input-group"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" ${checked} disabled></div><input type="text" class="form-control" value="${dia}, ${formatarData(element.dia_semana_usuario_horario)}" disabled></div></td><td data-conteudo="horario-entrada">00:00</td><td data-conteudo="horario-saida">00:00</td><td>0:00:00</td></tr>`;
              }
            }catch(erro){

            }

            setInterval(() => {
              const tempos = document.querySelectorAll('[data-conteudo="tempo-trabalhado"]');
              if(typeof tempos == 'object'){
                tempos.forEach(tempo => {
                  acao(
                    (tempo),
                    (tempo.parentElement.querySelector('[data-conteudo="horario-entrada"]').textContent),
                    (tempo.parentElement.querySelector('[data-conteudo="horario-saida"]').textContent));
                })
              }
            }, 1000);

            function acao(elemento, inicio, fim){
              if(isEmpty(fim)){
                fim = moment(new Date());
              }
              
              elemento.textContent = diferencaEntreDatas(inicio, fim, 'crescente').horas;
            }

          });
        }else{
          if(!isEmpty(conteudos.feedback.nenhum_horario) && card_body !== null){
            card_body.innerHTML = conteudos.feedback.nenhum_horario;
            escutaClickRecarregaPagina();
          }
        }
        break;
        
        case 'nenhum dado foi recebido':
        default:
        // swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
        // card_body.innerHTML = conteudos.feedback.nenhum_dado;
        break;
      }
    }

    return true;
  })
  
  .fail(function(erro){
    console.log(erro)
    swalAlert('error', 'error', 'Ocorreu um erro no requerimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
    return false;
  })

  .always(function(){
    instruirDesacionarBusca(true);
  })
}

escutaClickLinkSair();
atualizarDatas();

const cronometro = 
setInterval(() => {
  // console.clear();
  // const agr = moment();
  // console.log(diferencaEntreDatas(ontem, agr).horas);
}, 1000);
clearInterval(cronometro);

export{
  marcarPaginaNoCabecalho,
  verificarODia,
  converterParaMesBRL,
  retornarUltimosRegistros
}