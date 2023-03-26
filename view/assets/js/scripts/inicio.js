(() => {
  /* Funções apenas para a página inicial */
  function atualizarDadosDia(){
    const data = moment();
    const componente = document.querySelector('[data-conteudo="dados-dia"]');
    const dia = verificarODia(data);
    if(!isEmpty(dia)){
      componente.querySelector('.text-primary').textContent = capitalize(dia);
      componente.querySelector('.text-dark-emphasis').textContent = `${data.get('date')} de ${converterParaMesBRL(data.get('month'))} de ${data.get('year')}`;
    }
  }
  
  atualizarDadosDia();
})();