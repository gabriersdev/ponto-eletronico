import { isEmpty, capitalize, resumirHorario, escutaClickRecarregaPagina, swalAlert, diferencaEntreDatas, formatarData } from "../módulos/utilitarios.js";
import { verificarODia, converterParaMesBRL, retornarUltimosRegistros } from "../script.js";
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
    // return diferencaEntreDatas(inicio, fim, condicao).horas;
    return "-"
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
                card_body.innerHTML += `<ul class="list-group" data-conteudo="horarios-horarios-hoje"><li class="list-group-item d-flex align-items-center justify-content-between list-group-title"><b>Horário</b>&nbsp;<div><button type="button" class="btn btn-primary" id="registrar-entrada" onclick="registrarEntrada(event)">Registrar entrada</button>&nbsp;<button type="button" class="btn btn-secondary" id="registrar-saida" onclick="registrarSaida(event)">Registrar saída</button></div></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Entrada:</span><span id="hr-entrada">&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Saída:</span><span id="hr-saida">&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item contador-periodos"><div><span class="text-muted">Tempo decorrido:</span><span data-conteudo="tempo-decorrido-horario">&nbsp;${"-"/* cronometrar(entrada, moment(), 'crescente') */}</span></div><div><span class="text-muted">Tempo restante:</span><span data-conteudo="tempo-restante-horario">&nbsp;${"-"/*cronometrar(entrada, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente')*/}</span></div></li></ul><br>`;
                
                // setInterval(() => {
                //   if(cronometrar(entrada, moment()).split('').includes('-')){
                //     card_body.querySelectorAll('.contador-atraso')[0].textContent = 'Atrasado';
                //   }else{
                //     card_body.querySelectorAll('.contador-atraso')[0].textContent = 'Sem atraso';
                //   }
                
                //   if(cronometrar(saida, moment()).split('').includes('-')){
                //     card_body.querySelectorAll('.contador-atraso')[1].textContent = 'Atrasado';
                //   }else{
                //     card_body.querySelectorAll('.contador-atraso')[1].textContent = 'Sem atraso';
                //   }
                
                //   const tempoDecorrido = cronometrar(entrada, moment(), 'crescente');
                //   const tempoRestante = cronometrar(entrada, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente');
                
                //   card_body.querySelector('[data-conteudo="tempo-decorrido-horario"]').innerHTML = `&nbsp;${tempoDecorrido}`;
                //   card_body.querySelector('[data-conteudo="tempo-restante-horario"]').innerHTML = `&nbsp;${tempoRestante}`;
                // }, 1000);
              }
              
              if(!isEmpty(saida_almoco) && !isEmpty(retorno_almoco)){
                card_body.innerHTML += `<ul class="list-group" data-conteudo="horarios-almoco-hoje"><li class="list-group-item d-flex align-items-center justify-content-between list-group-title"><b>Almoço</b>&nbsp;<div><button type="button" class="btn btn-primary" id="registrar-saida-almoco" onclick="registrarSaidaAlmoco(event)">Registrar saída</button>&nbsp;<button type="button" class="btn btn-secondary" id="registrar-retorno-almoco" onclick="registraRetornoAlmoco(event)">Registrar retorno</button></div></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Saída:</span><span id="hr-saida-almoco">&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item d-flex align-items-center justify-content-between"><div><span class="text-muted">Retorno:</span><span id="hr-retorno-almoco">&nbsp;${`00:00`}</span></div><span class="text-muted contador-atraso">Sem atraso</span></li><li class="list-group-item contador-periodos"><div><span class="text-muted">Tempo decorrido:</span><span data-conteudo="tempo-decorrido-almoco">&nbsp;${"-"/*cronometrar(saida_almoco, moment(), 'crescente')*/}</span></div><div><span class="text-muted">Tempo restante:</span><span data-conteudo="tempo-restante-almoco">&nbsp;${"-"/*cronometrar(retorno_almoco, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente')*/}</span></div></li></ul>`;
                
                // setInterval(() => {
                //   if(cronometrar(saida_almoco, moment()).split('').includes('-')){
                //     card_body.querySelectorAll('.contador-atraso')[2].textContent = 'Atrasado';
                //   }else{
                //     card_body.querySelectorAll('.contador-atraso')[2].textContent = 'Sem atraso';
                //   }
                
                //   if(cronometrar(retorno_almoco, moment()).split('').includes('-')){
                //     card_body.querySelectorAll('.contador-atraso')[3].textContent = 'Atrasado';
                //   }else{
                //     card_body.querySelectorAll('.contador-atraso')[3].textContent = 'Sem atraso';
                //   }
                
                //   const tempoDecorrido = cronometrar(saida_almoco, moment(), 'crescente');
                //   const tempoRestante = cronometrar(retorno_almoco, moment(), 'decrescente').split('').includes('-') ? '0:00:00' : cronometrar(entrada, moment(), 'decrescente');
                
                //   card_body.querySelector('[data-conteudo="tempo-decorrido-almoco"]').innerHTML = `&nbsp;${tempoDecorrido}`;
                //   card_body.querySelector('[data-conteudo="tempo-restante-almoco"]').innerHTML = `&nbsp;${tempoRestante}`;
                // }, 1000);
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
  
  $(document).ready(function (){
    retornarUltimosRegistros(5);
    atualizarDadosDia();
    carregarHorariosHoje();
    carregarHorariosProximosDias();

    // Carrega o que foi registrado para hoje
    $.ajax({
      method: "POST",
      url: "../../ajax-php/ultimos-horarios-ajax-php.php",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: {solicitacao: 'true', inicio: moment().format('YYYY-MM-DD'), fim: moment().format('YYYY-MM-DD')},
      // data: {solicitacao: 'true', inicio: '2024-05-02', fim: '2024-05-02'},
      dataType: 'json',
      encode: true,
    })
    
    .done(function(msg){
      if (!isEmpty(msg) && !isEmpty(msg.mensagem)) {
        if(msg.mensagem.toLowerCase() === 'dados recebidos'){
          if(!isEmpty(msg.dados)){
            const formatarApresentacao = (horario) => {
              return horario.substr(0, 5);
            }

            msg.dados.forEach(element => {
              $('#hr-entrada').html(!isEmpty(element.hora_entrada_usuario_horario) ? `&nbsp;${formatarApresentacao(element.hora_entrada_usuario_horario)}` : '&nbsp;00:00');
              $('#hr-saida').html(!isEmpty(element.hora_saida_usuario_horario) ? `&nbsp;${formatarApresentacao(element.hora_saida_usuario_horario)}` : '&nbsp;00:00');
              $('#hr-saida-almoco').html(!isEmpty(element.hora_saida_usuario_almoco) ? `&nbsp;${formatarApresentacao(element.hora_saida_usuario_almoco)}` : '&nbsp;00:00');
              $('#hr-retorno-almoco').html(!isEmpty(element.hora_retorno_usuario_almoco) ? `&nbsp;${formatarApresentacao(element.hora_retorno_usuario_almoco)}` : '&nbsp;00:00');
            })
          } else {
            // Não há horários registrados para hoje
            
          }
        }
      }
    })

    .fail(function(erro){
      console.log(erro)
    });
  })
})();

window.registrarEntrada = ((event) => {
  event.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'Registrar entrada',
    text: 'Deseja registrar a entrada agora?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    focusCancel: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Registra a entrada
      $.ajax({
        method: "POST",
        url: "../../ajax-php/horarios-ajax-php.php",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {solicitacao: 'true', action: 'registrar', dia_semana: moment().format('YYYY-MM-DD'), hora_entrada: moment().format('HH:mm:ss'), dado: 'entrada_registro'},
        dataType: 'json',
        encode: true,
      })
      
      .done(function(msg){
        if (!isEmpty(msg) && !isEmpty(msg.mensagem) && msg.sucesso) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado!',
            text: 'Entrada registrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => { window.location.reload() }, 1500);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível registrar a entrada. Tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(msg);
        }
      })
      
      .fail(function(erro){
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu uma falha ao conectar ao servidor. Tente novamente mais tarde.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      });
    }
  });
});

window.registrarSaida = ((event) => {
  event.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'Registrar saída',
    text: 'Deseja registrar a saída agora?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    focusCancel: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Registra a saída
      $.ajax({
        method: "POST",
        url: "../../ajax-php/horarios-ajax-php.php",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {solicitacao: 'true', action: 'registrar', dia_semana: moment().format('YYYY-MM-DD'), hora_saida: moment().format('HH:mm:ss'), dado: 'saida_registro'},
        dataType: 'json',
        encode: true,
      })

      .done(function(msg){
        if (!isEmpty(msg) && !isEmpty(msg.mensagem) && msg.sucesso) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado!',
            text: 'Saída registrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => { window.location.reload() }, 1500);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível registrar a saída. Tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(msg);
        }
      })

      .fail(function(erro){
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu uma falha ao conectar ao servidor. Tente novamente mais tarde.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      });
    }
  });
});

window.registrarSaidaAlmoco = ((event) => {
  event.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'Registrar saída para o almoço	',
    text: 'Deseja registrar a saída agora?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    focusCancel: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Registra a saída para o almoço
      $.ajax({
        method: "POST",
        url: "../../ajax-php/horarios-ajax-php.php",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {solicitacao: 'true', action: 'registrar', dia_semana: moment().format('YYYY-MM-DD'), hora_saida_almoco: moment().format('HH:mm:ss'), dado: 'saida_almoco'},
        dataType: 'json',
        encode: true,
      })

      .done(function(msg){
        if (!isEmpty(msg) && !isEmpty(msg.mensagem) && msg.sucesso) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado!',
            text: 'Saída para o almoço registrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => { window.location.reload() }, 1500);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível registrar a saída para o almoço. Tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(msg);
        }
      })

      .fail(function(erro){
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu uma falha ao conectar ao servidor. Tente novamente mais tarde.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      });
    }
  });
});

window.registraRetornoAlmoco = ((event) => {
  event.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'Registrar retorno do almoço	',
    text: 'Deseja registrar o retorno agora?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    focusCancel: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Registra o retorno do almoço

      $.ajax({
        method: "POST",
        url: "../../ajax-php/horarios-ajax-php.php",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {solicitacao: 'true', action: 'registrar', dia_semana: moment().format('YYYY-MM-DD'), hora_retorno_almoco: moment().format('HH:mm:ss'), dado: 'retorno_almoco'},
        dataType: 'json',
        encode: true,
      })

      .done(function(msg){
        if (!isEmpty(msg) && !isEmpty(msg.mensagem) && msg.sucesso) {
          Swal.fire({
            icon: 'success',
            title: 'Registrado!',
            text: 'Retorno do almoço registrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => { window.location.reload() }, 1500);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível registrar o retorno do almoço. Tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(msg);
        }
      })

      .fail(function(erro){
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu uma falha ao conectar ao servidor. Tente novamente mais tarde.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      });
    }
  });
});
