import { acaoControleVisualizacaoSenha, confirmarSaidaUsuarioFormulario } from '../módulos/utilitarios.js'

(() => {
  /* Funções apenas para a página de login */
  $(document).ready(function (){
    $('[data-formulario="login"]').submit(function(evento){
      evento.preventDefault();
      console.log('Enviado')

      const dados = {
        usuario: "John", 
        senha: "Boston"
      }

      $.ajax({
        method: "POST",
        url: "../../controller/login-controller.php",
        data: { dados: dados }
      })

        .done(function( msg ) {
          console.log("Data Saved: " + msg);
        })

        .fail(function() {
          alert("error");
        })
        .always(function() {
          // alert("complete");
        });

    })
  })
  

  acaoControleVisualizacaoSenha();
  // confirmarSaidaUsuarioFormulario();
})();