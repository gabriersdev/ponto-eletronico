function removeSpace(element){
  const selectElement = document.querySelector("#" + element);
  const noSpace = (selectElement.value).replace(/( )+/g, '');
  document.getElementById(element).value = noSpace;
}

function viewPassword(condition){
  const inputPassword = document.querySelector('#password');
  const btnViewPassword = document.querySelector('#basic-addon2');
  const iconView = document.querySelector('#icon-view');
  
  if(condition == true){
    inputPassword.setAttribute('type','text');
    btnViewPassword.setAttribute('onclick', 'viewPassword(false)');
    iconView.setAttribute('class', 'bi bi-eye-fill');
  }else{
    inputPassword.setAttribute('type', 'password');
    btnViewPassword.setAttribute('onclick', 'viewPassword(true)');
    iconView.setAttribute('class', 'bi bi-eye-slash-fill');
  }
  inputPassword.focus();
}

function clearForm(){
  const inputUser = document.querySelector('#username');
  const inputPassword = document.querySelector('#password');
  inputUser.value = "";
  inputPassword.value = "";
}