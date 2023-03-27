import { acaoControleVisualizacaoSenha, confirmarSaidaUsuarioFormulario } from '../módulos/utilitarios.js'

(() => {
  /* Funções apenas para a página de login */
  $(document).ready(function (){
    $('[data-formulario="login"]').submit(function(evento){
      evento.preventDefault();

      const dados = {
        usuario: $('#username').val(), 
        senha: $('#password').val()
      }

      $.ajax({
        method: "POST",
        url: "../../ajax-php/login-ajax-php.php",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: dados,
        dataType: 'json',
        // encode: true,
        success: function(retorno){
          console.log(retorno, 'Sucesso')
        }
      })

        .done(function(msg) {
          console.log("Data Saved: " + msg);
          console.log((msg));
        })

        .fail(function(erro){
          console.log(erro);
          // alert("error");
        })
        .always(function(){
          // alert("complete");
        });

    })
  })
  

  acaoControleVisualizacaoSenha();
  // confirmarSaidaUsuarioFormulario();
})();