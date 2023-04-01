import { isEmpty, capitalize, resumirHorario, escutaClickRecarregaPagina, swalAlert } from "../módulos/utilitarios.js";
import { verificarODia, converterParaMesBRL } from "../script.js";
import { conteudos } from "../módulos/conteudos.js";

(() => {
  /* Funções apenas para a página inicial */
  function atualizarDadosDia(){
    const data = moment(new Date());
    const componente = document.querySelector('[data-conteudo="dados-dia"]');
    const dia = verificarODia(data);
    if(!isEmpty(dia)){
      componente.querySelector('.text-primary').textContent = capitalize(dia);
      componente.querySelector('.text-dark-emphasis').textContent = `${data.get('date')} de ${converterParaMesBRL(data.get('month'))} de ${data.get('year')}`;
    }
  }
  
  atualizarDadosDia();
  
  
  function retornarProximosDias(hoje){
    const diasSemana = [0, 1, 2, 3, 4, 5, 6];
    
    if(diasSemana.includes(hoje)){
      let vez = 0;
      let quantidade = 3;
      let proximosDias = new Array();
      
      for(let I = vez; I <= quantidade; I++){
        let proximo = diasSemana[diasSemana.indexOf(hoje) + 1 + I];
        
        if(proximo == undefined){
          proximo = diasSemana[vez];
          
          if(proximo == 0){
            proximo = diasSemana[vez + 1];
            // console.log(proximo);
          }else{
            // console.log(proximo);
          }
        }
        
        if(!proximosDias.includes(proximo) && proximosDias.length < 3){
          proximosDias.push(proximo);
        }
        
        vez++;
      }
      
      return proximosDias;
    }else{
      return null;
    }
  }

  console.log(retornarProximosDias(5));

  $.ajax({
    method: "POST",
    url: "../../ajax-php/horarios-ajax-php.php",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: {solicitacao: 'true', diasSelecionados: retornarProximosDias(moment(new Date()).day())},
    dataType: 'json',
    encode: true,
  })
  
  // .done(function(msg){
  //   if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
  //     console.log(msg);
  //     switch(msg.mensagem.toLowerCase()){
  //       case 'dados vazios':
  //       swalAlert('error', 'error', 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 0129EM', null);
  //       break;
        
  //       case 'usuário não definido':
  //       swalAlert('error', 'error', 'Usuário não definido', 'Login pendente ou não registrado corretamente. Por favor contate o administrador', 'Erro: 3553LG', null);
  //       break;
        
  //       case 'solicitação recebida':
  //       // console.log(msg);
  //       const card_body = document.querySelector('[data-conteudo="horarios-proximos-dias"]');
        
  //       if(!isEmpty(msg.dados)){
  //         msg.dados.forEach(element => {
  //           const dia = capitalize(verificarODia(element.dia_semana_usuario_horario));
  //           const entrada = element.hora_entrada_usuario_horario;
  //           const saida = element.hora_saida_usuario_horario;
  //           const saida_almoco = !isEmpty(element.hora_saida_usuario_almoco) ? element.hora_saida_usuario_almoco : ' ';
  //           const retorno_almoco = !isEmpty(element.hora_retorno_usuario_almoco) ? element.hora_retorno_usuario_almoco : ' ';
            
  //           card_body.innerHTML += `<div class="table-responsive"><table class="table table-bordered border-dark-subtle table-striped table-hover"><thead><th colspan="3">${dia}</th></thead><tr><th>Entrada</th><th>Almoço</th><th>Saída</th></tr><tbody><tr><td>${resumirHorario(entrada)}</td><td>${resumirHorario(saida_almoco)} - ${resumirHorario(retorno_almoco)}</td><td>${resumirHorario(saida)}</td></tr></tbody></table></div>`;
  //         });
  //       }else{
  //         if(!isEmpty(conteudos.feedback.nenhum_horario)){
  //           card_body.innerHTML = conteudos.feedback.nenhum_horario;
  //           escutaClickRecarregaPagina();
  //         }
  //       }
  //       break;
        
  //       case 'nenhum dado foi recebido':
  //       default:
  //       swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
  //       break;
  //     }
  //   }
  // })
  
  // .fail(function(erro){
  //   swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
  // })
  
})();