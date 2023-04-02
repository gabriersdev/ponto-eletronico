import { isEmpty, capitalize, resumirHorario, escutaClickRecarregaPagina, swalAlert, diferencaEntreDatas } from "../módulos/utilitarios.js";
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
  
  function cronometrar(inicio, fim, condicao){
    return diferencaEntreDatas(inicio, fim, condicao).horas;
  }
  
  function carregarHorariosHoje(){
    $.ajax({
      method: "POST",
      url: "../../ajax-php/horarios-ajax-php.php",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: {solicitacao: 'true', diasSelecionados: moment(new Date()).day()},
      dataType: 'json',
      encode: true,
    })
    
    .done(function(msg){
      if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
        switch(msg.mensagem.toLowerCase()){
          case 'dados vazios':
          swalAlert('error', 'error', 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 0129EM', null);
          break;
          
          case 'usuário não definido':
          swalAlert('error', 'error', 'Usuário não definido', 'Login pendente ou não registrado corretamente. Por favor contate o administrador', 'Erro: 3553LG', null);
          break;
          
          case 'solicitação recebida':
          const card_body = document.querySelector('[data-conteudo="horarios-hoje"]');
          
          if(!isEmpty(msg.dados)){
            msg.dados.forEach(element => {
              const dia = capitalize(verificarODia(parseInt(element.dia_semana_usuario_horario)));
              const entrada = element.hora_entrada_usuario_horario;
              const saida = element.hora_saida_usuario_horario;
              const saida_almoco = !isEmpty(element.hora_saida_usuario_almoco) ? element.hora_saida_usuario_almoco : '';
              const retorno_almoco = !isEmpty(element.hora_retorno_usuario_almoco) ? element.hora_retorno_usuario_almoco : '';
              
              if(!isEmpty(entrada) && !isEmpty(saida)){
                card_body.innerHTML += `<ul class="list-group" data-conteudo="horarios-horarios-hoje"><li class="list-group-item d-flex align-items-center justify-content-between list-group-title"><b>Horário</b>&nbsp;<div><button type="button" class="btn btn-primary">Registrar entrada</button>&nbsp;<button type="button" class="btn btn-secondary">Registrar saída</button></div></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Entrada:</span><span>&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Saída:</span><span>&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item contador-periodos"><div><span class="text-muted">Tempo decorrido:</span><span data-conteudo="tempo-decorrido-horario">&nbsp;${cronometrar(entrada, moment(), 'crescente')}</span></div><div><span class="text-muted">Tempo restante:</span><span data-conteudo="tempo-restante-horario">&nbsp;${cronometrar(entrada, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente')}</span></div></li></ul><br>`;
                
                setInterval(() => {
                  if(cronometrar(entrada, moment()).split('').includes('-')){
                    card_body.querySelectorAll('.contador-atraso')[0].textContent = 'Atrasado';
                  }else{
                    card_body.querySelectorAll('.contador-atraso')[0].textContent = 'Sem atraso';
                  }
                  
                  if(cronometrar(saida, moment()).split('').includes('-')){
                    card_body.querySelectorAll('.contador-atraso')[1].textContent = 'Atrasado';
                  }else{
                    card_body.querySelectorAll('.contador-atraso')[1].textContent = 'Sem atraso';
                  }
                  
                  const tempoDecorrido = cronometrar(entrada, moment(), 'crescente');
                  const tempoRestante = cronometrar(entrada, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente');
                  
                  card_body.querySelector('[data-conteudo="tempo-decorrido-horario"]').innerHTML = `&nbsp;${tempoDecorrido}`;
                  card_body.querySelector('[data-conteudo="tempo-restante-horario"]').innerHTML = `&nbsp;${tempoRestante}`;
                }, 1000);
              }
              
              if(!isEmpty(saida_almoco) && !isEmpty(retorno_almoco)){
                card_body.innerHTML += `<ul class="list-group" data-conteudo="horarios-almoco-hoje"><li class="list-group-item d-flex align-items-center justify-content-between list-group-title"><b>Almoço</b>&nbsp;<div><button type="button" class="btn btn-primary">Registrar saída</button>&nbsp;<button type="button" class="btn btn-secondary">Registrar retorno</button></div></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Saída:</span><span>&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Retorno:</span><span>&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item contador-periodos"><div><span class="text-muted">Tempo decorrido:</span><span data-conteudo="tempo-decorrido-almoco">&nbsp;${cronometrar(saida_almoco, moment(), 'crescente')}</span></div><div><span class="text-muted">Tempo restante:</span><span data-conteudo="tempo-restante-almoco">&nbsp;${cronometrar(retorno_almoco, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente')}</span></div></li></ul>`;
                
                setInterval(() => {
                  if(cronometrar(saida_almoco, moment()).split('').includes('-')){
                    card_body.querySelectorAll('.contador-atraso')[2].textContent = 'Atrasado';
                  }else{
                    card_body.querySelectorAll('.contador-atraso')[2].textContent = 'Sem atraso';
                  }
                  
                  if(cronometrar(retorno_almoco, moment()).split('').includes('-')){
                    card_body.querySelectorAll('.contador-atraso')[3].textContent = 'Atrasado';
                  }else{
                    card_body.querySelectorAll('.contador-atraso')[3].textContent = 'Sem atraso';
                  }
                  
                  const tempoDecorrido = cronometrar(saida_almoco, moment(), 'crescente');
                  const tempoRestante = cronometrar(retorno_almoco, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente');

                  card_body.querySelector('[data-conteudo="tempo-decorrido-almoco"]').innerHTML = `&nbsp;${tempoDecorrido}`;
                  card_body.querySelector('[data-conteudo="tempo-restante-almoco"]').innerHTML = `&nbsp;${tempoRestante}`;
                }, 1000);
              }
            });
          }else{
            if(!isEmpty(conteudos.feedback.nenhum_horario)){
              card_body.innerHTML = conteudos.feedback.nenhum_horario_hoje;
              escutaClickRecarregaPagina();
            }
          }
          break;
          
          case 'nenhum dado foi recebido':
          default:
          // swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
          card_body.innerHTML = conteudos.feedback.nenhum_dado;
          break;
        }
      }
    })
    
    .fail(function(erro){
      console.log(erro)
      // swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
    })
  }
  
  function carregarHorariosProximosDias(){
    $.ajax({
      method: "POST",
      url: "../../ajax-php/horarios-ajax-php.php",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: {solicitacao: 'true', diasSelecionados: retornarProximosDias(moment(new Date()).day())},
      dataType: 'json',
      encode: true,
    })
    
    .done(function(msg){
      if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
        switch(msg.mensagem.toLowerCase()){
          case 'dados vazios':
          swalAlert('error', 'error', 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 0129EM', null);
          break;
          
          case 'usuário não definido':
          swalAlert('error', 'error', 'Usuário não definido', 'Login pendente ou não registrado corretamente. Por favor contate o administrador', 'Erro: 3553LG', null);
          break;
          
          case 'solicitação recebida':
          const card_body = document.querySelector('[data-conteudo="horarios-proximos-dias"]');
          
          if(!isEmpty(msg.dados)){
            msg.dados.forEach(element => {
              const dia = capitalize(verificarODia(element.dia_semana_usuario_horario));
              const entrada = element.hora_entrada_usuario_horario;
              const saida = element.hora_saida_usuario_horario;
              const saida_almoco = !isEmpty(element.hora_saida_usuario_almoco) ? element.hora_saida_usuario_almoco : ' ';
              const retorno_almoco = !isEmpty(element.hora_retorno_usuario_almoco) ? element.hora_retorno_usuario_almoco : ' ';
              
              card_body.innerHTML += `<div class="table-responsive"><table class="table table-bordered border-dark-subtle table-striped table-hover"><thead><th colspan="3">${dia}</th></thead><tr><th>Entrada</th><th>Almoço</th><th>Saída</th></tr><tbody><tr><td>${resumirHorario(entrada)}</td><td>${resumirHorario(saida_almoco)} - ${resumirHorario(retorno_almoco)}</td><td>${resumirHorario(saida)}</td></tr></tbody></table></div>`;
            });
          }else{
            if(!isEmpty(conteudos.feedback.nenhum_horario)){
              card_body.innerHTML = conteudos.feedback.nenhum_horario;
              escutaClickRecarregaPagina();
            }
          }
          break;
          
          case 'nenhum dado foi recebido':
          default:
          // swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
          card_body.innerHTML = conteudos.feedback.nenhum_dado;
          break;
        }
      }
    })
    
    .fail(function(erro){
      swalAlert('error', 'error', 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI', null);
    })
  }
  
  atualizarDadosDia();
  carregarHorariosHoje();
  carregarHorariosProximosDias();
  
})();