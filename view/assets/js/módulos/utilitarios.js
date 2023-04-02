const isEmpty = (valor) => {
  if(typeof valor == 'string'){
    return valor == undefined || valor == null || valor.length <= 0;
  }else if(Array.isArray(valor)){
    return valor.length <= 0;
  }else{
    return valor == undefined || valor == null
  }
}

const capitalize = (valor) => {
  return valor.charAt(0).toUpperCase() + valor.substr(1, valor.length);
}

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll("[data-ano-atual]").forEach(area => {
    area.textContent = `${dataAtual.getFullYear()}`;
  })
} 

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $('#' + modal.id).modal('hide');
    })
  })
}

function sanitizarString(string){
  if(typeof string == 'string'){
    const substituir = [
      {
        original: '-',
        subst: ''
      },
      {
        original: '(',
        subst: ''
      },
      {
        original: ')',
        subst: ''
      },
      {
        original: ' ',
        subst: ''
      },
    ]
    
    substituir.forEach(substituicao => {
      string = string.replace(substituicao.original, substituicao.subst)
    })
    
    return string.trim();
  }else{
    console.log('O tipo do parâmetro passado não é uma string.');
    return null;
  }
}

function zeroEsquerda(quantidadeZeros, valor){
  let zeros;
  
  for(let i = 0; i < quantidadeZeros; i++){
    zeros == null ? zeros = "0" : zeros = zeros + "0";
  }
  return (zeros + valor).slice(-quantidadeZeros);
}

async function swalAlert(tipo, icon, title, text, mensagem, executar){
  tipo = tipo.toLowerCase().trim();
  if(tipo == 'confirmacao'){
    await Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Sair',
      focusCancel: true
    }).then((result) => {
      if(result.isConfirmed){
        eval(executar);
      }
      
      return result.isConfirmed;
    })
  }
  
  else if(tipo == 'aviso'){
    Swal.fire({
      icon: icon,
      title: title,
      text: text
    })
  }
  
  else if(tipo == 'error'){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      footer: mensagem
    }) 
  }
}

function removeSpace(input){
  input.addEventListener('input', () => {
    input.value = (input.value).replace(/( )+/g, '');
  })
}

function clearForm(){
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
  })
}

function acaoControleVisualizacaoSenha(){
  const inputs = document.querySelectorAll('input[type=password]');
  
  if(typeof inputs == 'object'){
    inputs.forEach(input => {
      acao(input);
    })
  }else{
    acao(inputs[0]);
  }
  
  function acao(input){
    const botao = input.parentElement.querySelector('button');
    botao.addEventListener('click', () => {
      const atributo = input.getAttribute('type');
      if(atributo == 'password'){
        input.type = 'text';
        botao.querySelector('i').classList.value = 'bi bi-eye-fill';
      }else if(atributo == 'text'){
        botao.querySelector('i').classList.value = 'bi bi-eye-slash-fill';
        input.type = 'password';
      }
      
      // input.focus();
    });
  }
}

function confirmarSaidaUsuarioFormulario(){
  window.onbeforeunload = (evento) => {
    const inputs = document.querySelectorAll('input');
    if(!isEmpty(inputs)){
      inputs.forEach(input => {
        if(!isEmpty(input.value)){
          evento.returnValue = 'Tem certeza que deseja sair? Os seus dados serão perdidos.';
        }
      })
    }
  }
}

function resumirHorario(horario){
  if(horario.length >= 8){
    return horario.substr(0, 5);
  }
  
  else{
    return '';
  }
}

function escutaClickRecarregaPagina(){
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload();
    })
  })
}

function cronometrar(inicio, fim){
  const cronometro = 
  setInterval(() => {
    return diferencaEntreDatas(inicio, fim, 'crescente').horas
  }, 1000);
}

function diferencaEntreDatas(inicio, fim, condicao){
  let ms;
  let duracao;
  
  switch(condicao){
    case 'crescente':
    ms = moment(fim,"YYYY-MM-DD HH:mm:ss").diff(moment(inicio,"YYYY-MM-DD HH:mm:ss")) || moment(fim,"HH:mm:ss").diff(moment(inicio,"HH:mm:ss"));
    break;
    
    case 'decrescente':
    default:
    ms = moment(inicio,"YYYY-MM-DD HH:mm:ss").diff(moment(fim,"YYYY-MM-DD HH:mm:ss")) || moment(inicio,"HH:mm:ss").diff(moment(fim,"HH:mm:ss"));
    break;
  }
  
  duracao = moment.duration(ms);
  return {horas: Math.floor(duracao.get('hours')) + moment.utc(ms).format(":mm:ss"), dias: duracao.days};
}

function formatarData(input){
  const data = new Date(input);
  const dia  = data.getUTCDate().toString().padStart(2, '0'),
  mes  = (data.getUTCMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
  ano  = data.getUTCFullYear();
  return dia+"/"+mes+"/"+ano;
}

export{
  isEmpty,
  capitalize,
  atualizarDatas,
  controleFechamentoModal,
  sanitizarString,
  zeroEsquerda,
  swalAlert,
  removeSpace,
  clearForm,
  acaoControleVisualizacaoSenha,
  confirmarSaidaUsuarioFormulario,
  resumirHorario,
  escutaClickRecarregaPagina,
  cronometrar,
  diferencaEntreDatas,
  formatarData
}