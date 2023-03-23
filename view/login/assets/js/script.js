// (() => {

let situacaoLoginAut = false;

$(document).ready(function (){  

  $('form').submit(function (event){
    var accessData = {
      username: $('#username').val(),
      password: $('#password').val()
    };

    $.ajax({
      method: 'POST',
      // url: './confirmation.php',
      url: '../interno-expresso/paginas/confirmation.php',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: accessData,
      dataType: 'json',
      encode: true,
      success: function(){}
    }).done(function (data) {
      console.log(data);
      if(data.errors == 'Credenciais válidas'){
        accessAut(true);
        window.location.href = "../interno-expresso/paginas";
      }else if(data.access == 'Tentativas de acesso excedidas' || data.access == 'Tentativas de acesso excedidas' && data.errors == 'Usuário inválido'){
        accessWarning(true, 'Tentativas de acesso excedidas', 'Aguarde o fim do timeout. ' + data.timeout, 'Erro: 2141AE');
      }else if(data.errors == 'Ocorreu um erro no recebimento das informações'){
        credentialError(true, 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do Expresso através do e-mail mobilidadeexpresso@gmail.com', 'Erro: 0000CI')
      }
      else{
        credentialError(true);
      }
      
    })
    .fail(function (data){
      accessWarning(true, 'Não foi possível fazer a sua autenticação', 'Tente novamente mais tarde', 'Erro: 4215AE');
    });
    
    event.preventDefault();
  });

});

// })();