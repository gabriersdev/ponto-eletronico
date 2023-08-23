import { conteudos } from '../módulos/conteudos.js';
import { capitalize, diferencaEntreDatas, escutaClickRecarregaPagina, formatarData, isEmpty, resumirHorario, swalAlert } from '../módulos/utilitarios.js'
import { verificarODia, retornarUltimosRegistros } from '../script.js';

function acaoSelecaoDropdown(instrucao){
  const dropdowns = document.querySelectorAll('.dropdown-menu');
  
  if(!isEmpty(dropdowns)){
    if(Array.isArray(dropdowns) || typeof dropdowns == 'object'){
      dropdowns.forEach(dropdown => {
        if(instrucao == 'desacionar-busca'){acao(dropdown, instrucao); return null;};
        acao(dropdown);
      })
    }else{
      if(instrucao == 'desacionar-busca'){acao(dropdowns[0], instrucao); return null;};
      acao(dropdowns[0]);
    }
  }
  
  function acao(dropdown, instrucao){
    dropdown.addEventListener('click', (evento) => {
      evento.preventDefault();
      
      if(evento.target.tagName.toLowerCase() == 'a'){
        const filtro = evento.target.textContent;
        
        if(instrucao == 'desacionar-busca'){
          desacionarBusca(dropdown, filtro)
          return null;
        }
        
        desmarcarTodasOpcoesDropdown(dropdown);
        marcarOpcaoSelecionada(evento.target);
        acionarBusca(dropdown);
        limparSecaoResultados();
        retornarUltimosRegistros(10, filtro);
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
  
  function limparSecaoResultados(){
    const card_body = document.querySelector('[data-conteudo="registros"]');
    if(!isEmpty(card_body.querySelector('tbody'))){
      card_body.querySelector('tbody').innerHTML = '';
    }
  }

  function desacionarBusca(dropdown, opcaoSelecionada){
    const botao = dropdown.parentElement.querySelector('[data-acao="btn-dropdown-toggle"]');
    if(!isEmpty(botao)){
      !botao.classList.contains('dropdown-toggle') ? botao.classList.add('dropdown-toggle') : ''
      botao.innerHTML = `${opcaoSelecionada}`;
      botao.style.width = `max-content`;
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

export function instruirDesacionarBusca(inplace){
  if(inplace){acaoSelecaoDropdown('desacionar-busca');};
}

(() => {
  
  function verificarDataValida(input){
    const data = moment(input);
    const hoje = moment(new Date());
    
    if(moment(data, 'YYYY-MM-DD').diff(moment(hoje, 'YYYY-MM-DD'), 'days') <= 0){
      if(data.get('year') >= 1970 && data.get('year') <= hoje.get('year')){
        if(data.get('month') >= 0 && data.get('month') <= 12){
          if(data.get('date') >= 1 && data.get('date') <= 31){
            return {valido: true}
          }else{
            return {valido: false, mensagem: 'Dia inválido', data: input};
          }
        }else{
          return {valido: false, mensagem: 'Mês inválido', data: input};
        }
      }else{
        return {valido: false, mensagem: 'Ano inválido', data: input};
      }
    }else{
      return {valido: false, mensagem: 'Data no futuro', data: input};
    }
  }
  
  function escutarSubmitFormularioFiltroRegistros(){
    $('[data-fomrulario="pesquisa-ultimos-horarios"]').submit(function (evento){
      evento.preventDefault();
      
      const inicio = $('#data-inicio').val();
      const fim = $('#data-fim').val();
      
      const feedbackInicio = document.querySelector('[data-input-group="data-inicio"]').parentElement.querySelector('.feedback-dados-inseridos');
      const feedbackFim = document.querySelector('[data-input-group="data-fim"]').parentElement.querySelector('.feedback-dados-inseridos');
      
      if(inicio !== fim){
        const inicioValido = verificarDataValida(inicio);
        const fimValido = verificarDataValida(fim);
        
        if(inicioValido.valido && fimValido.valido){
          if(inicioValido.valido){
            !isEmpty(feedbackInicio) ? !feedbackInicio.classList.contains('none') ? feedbackInicio.classList.add('none') : '' : '';
          }
          
          if(fimValido.valido){
            !isEmpty(feedbackFim) ? !feedbackFim.classList.contains('none') ? feedbackFim.classList.add('none') : '' : '';
          }
          
          pesquisarRegistros(inicio, fim);
        }else{
          
          if(!inicioValido.valido){
            !isEmpty(feedbackInicio) ? feedbackInicio.classList.contains('none') ? feedbackInicio.classList.remove('none') : '' : '';
            !isEmpty(feedbackInicio) ? feedbackInicio.innerHTML = inicioValido.mensagem : '';
          }
          
          if(!fimValido.valido){
            !isEmpty(feedbackFim) ? feedbackFim.classList.contains('none') ? feedbackFim.classList.remove('none') : '' : '';
            !isEmpty(feedbackFim) ? feedbackFim.innerHTML = fimValido.mensagem : '';
          }
        }
      }else{
        !isEmpty(feedbackInicio) ? feedbackInicio.classList.contains('none') ? feedbackInicio.classList.remove('none') : '' : '';
        !isEmpty(feedbackInicio) ? feedbackInicio.innerHTML = 'Datas iguais' : '';
        !isEmpty(feedbackInicio) ? feedbackInicio.parentElement.querySelector('input').focus() : '';
        
        !isEmpty(feedbackFim) ? feedbackFim.classList.contains('none') ? feedbackFim.classList.remove('none') : '' : '';
        !isEmpty(feedbackFim) ? feedbackFim.innerHTML = 'Datas iguais' : '';
        // !isEmpty(feedbackFim) ? feedbackFim.parentElement.querySelector('input').focus() : '';
      }
    })
  }
  
  $(document).ready(function(){
    retornarUltimosRegistros(10);
    escutarSubmitFormularioFiltroRegistros();
    acaoSelecaoDropdown();
  }); 
  
  function pesquisarRegistros(inicio, fim){
    $.ajax({
      method: "POST",
      url: "../../ajax-php/ultimos-horarios-ajax-php.php",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: {solicitacao: 'true', inicio: inicio, fim: fim},
      dataType: 'json',
      encode: true,
    })
    
    .done(function(msg){
      if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
        const card_body = document.querySelector('[data-conteudo="registros"]');
        const feedback = card_body.querySelector('.feedback-resultados-pesquisa');
        
        if(!isEmpty(feedback)){
          card_body.querySelector('[data-conteudo="range-datas-pesquisa"').textContent = `${formatarData(inicio)} à ${formatarData(fim)}`;
          feedback.classList.contains('none') ? feedback.classList.remove('none') : '';
          escutaClickRecarregaPagina();
        }else{
          card_body.innerHTML = conteudos.elementos.basico_registros;
        }
        
        switch(msg.mensagem.toLowerCase()){
          case 'dados vazios':
          swalAlert('error', 'error', 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 0129EM', null);
          break;
          
          case 'usuário não definido':
          swalAlert('error', 'error', 'Usuário não definido', 'Login pendente ou não registrado corretamente. Por favor contate o administrador', 'Erro: 3553LG', null);
          break;
          
          case 'dados recebidos':
          if(!isEmpty(msg.dados)){
            card_body.querySelector('tbody').innerHTML = '';
            msg.dados.forEach(element => {
              const dia = capitalize(verificarODia(parseInt(moment(element.dia_semana_usuario_horario).day())));
              const entrada = !isEmpty(element.hora_entrada_usuario_horario) ? element.hora_entrada_usuario_horario : '';
              const saida = !isEmpty(element.hora_saida_usuario_horario) ? element.hora_saida_usuario_horario : '';
              const saida_almoco = !isEmpty(element.hora_saida_usuario_almoco) ? element.hora_saida_usuario_almoco : '';
              const retorno_almoco = !isEmpty(element.hora_retorno_usuario_almoco) ? element.hora_retorno_usuario_almoco : '';
              
              const checked = !isEmpty(entrada) && !isEmpty(saida) && !isEmpty(saida_almoco) && !isEmpty(retorno_almoco) || !isEmpty(entrada) && !isEmpty(saida) && dia == 'Sábado' ? 'checked' : '';
              
              if(!isEmpty(entrada) && !isEmpty(saida)){
                card_body.querySelector('tbody').innerHTML += `<tr><td scope="row" colspan="2"><div class="input-group"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" ${checked} disabled></div><input type="text" class="form-control" value="${dia}, ${formatarData(element.dia_semana_usuario_horario)}" disabled></div></td><td data-conteudo="horario-entrada">${resumirHorario(entrada)}</td><td data-conteudo="horario-saida">${resumirHorario(saida)}</td><td data-conteudo="tempo-trabalhado"></td></tr>`;
              }else{
                card_body.querySelector('tbody').innerHTML += `<tr><td scope="row" colspan="2"><div class="input-group"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" ${checked} disabled></div><input type="text" class="form-control" value="${dia}, ${formatarData(element.dia_semana_usuario_horario)}" disabled></div></td><td data-conteudo="horario-entrada">00:00</td><td data-conteudo="horario-saida">00:00</td><td>0:00:00</td></tr>`;
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
              if(!isEmpty(conteudos.feedback.nenhum_horario)){
                card_body.innerHTML = conteudos.feedback.nenhum_registro;
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
    
  })();