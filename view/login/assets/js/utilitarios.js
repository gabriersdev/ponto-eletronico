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