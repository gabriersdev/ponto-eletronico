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
        eval(executar)
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

export{
  isEmpty,
  capitalize,
  atualizarDatas,
  controleFechamentoModal,
  sanitizarString,
  zeroEsquerda,
  swalAlert,
  removeSpace,
  clearForm
}