function credentialError(condition, title, text, error){
  if(condition == true){
    title == null ? title = 'Credenciais inválidas' : "" + title;
    text == null ? text = 'Usuário ou senha informados não estão corretos' : "" + text;
    error == null ? error = 'Erro: 8713CI' : "" + error;
    
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: error
    });
    
    clearForm();
    const feedbackError = document.querySelector('#feedback-message-error');
    feedbackError.style.display = 'block';
    feedbackError.textContent = 'Credenciais inválidas!';
    setTimeout( () => {feedbackError.style.display = 'none'}, 5000);
  }
}

function accessWarning(condition, title, text, error){
  
  if(condition == true){
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      footer: error
    });
    
    clearForm();
    const feedbackWarning = document.querySelector('#feedback-message-warning');
    feedbackWarning.style.display = 'block';
    feedbackWarning.textContent = title;
    setTimeout( () => {feedbackWarning.style.display = 'none'}, 5000);
  }
}

function accessAut(condition){
  if(condition == true){
    clearForm();
    const feedbackError = document.querySelector('#feedback-message-error');
    const feedbackSuccess = document.querySelector('#feedback-message-success');
    
    if(!feedbackError.style.display == 'block'){
    }else{
      feedbackError.style.display = 'none';
      clearTimeout(5000);
    }
    feedbackSuccess.style.display = 'block';
    feedbackSuccess.textContent = 'Autenticando...';
    setTimeout( () => {feedbackSuccess.style.display = 'none'}, 3000);
  }
}

function loginAut(condition, title, text, acao){
  try{
    if(condition == true){
      Swal.fire({
        icon: 'success',
        title: title,
        text: text,
      });
    }
  
    if(acao !== null){
      setTimeout(() => {
        window.location.href = "../interno-expresso/paginas";
      }, 3000);
    }
  
    return true;
  }catch{
    return false;
  }
}

export{
  credentialError,
  accessWarning,
  accessAut,
  loginAut
}