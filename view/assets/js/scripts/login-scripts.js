import { acaoControleVisualizacaoSenha, confirmarSaidaUsuarioFormulario, isEmpty, removeSpace } from '../módulos/utilitarios.js'
import { credentialError, accessAut, accessWarning } from '../módulos/feedback.js';

(() => {
  /* Funções apenas para a página de login */
  $(document).ready(function (){

    removeSpace(document.querySelector('#username'));
    removeSpace(document.querySelector('#password'));

    $('[data-formulario="login"]').submit(function(evento){
      evento.preventDefault();

      const botao = document.querySelector('[data-formulario="login"]').querySelector('button[type=submit]');
      const conteudo = botao.innerHTML;
      const width = botao.offsetWidth;
      botao.innerHTML = `<span class="spinner-border text-light" role="status"></span>`;
      botao.style.width = `${width}px`;

      const dados = {
        usuario: $('#username').val(), 
        senha: $('#password').val()
      }

      setTimeout(() => {
        $.ajax({
          method: "POST",
          url: "../../ajax-php/login-ajax-php.php",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          data: dados,
          dataType: 'json',
          encode: true,
        })
  
          .done(function(msg){
            if(!isEmpty(msg) && !isEmpty(msg.mensagem)){
              switch(msg.mensagem.toLowerCase()){
                case 'dados vazios':
                  credentialError(true, 'Dados inválidos', 'Os dados não podem estar vazios e devem corresponder ao solicitado', 'Erro: 8974EM')
                break;
  
                case 'dados incorretos':
                  credentialError(true, 'Dados incorretos', 'E-mail e/ou senha informado(s) incorreto(s)', 'Erro: 1235KY');
                break;
  
                case 'dados corretos':
                  accessAut(true);
                  setTimeout(() => {
                    window.location.href = '../inicio/';
                  }, 2000);
                break;
  
                case 'nenhum dado foi recebido':
                default:
                  credentialError(true, 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI')
                break;
              }
            }
          })
  
          .fail(function(erro){
            credentialError(true, 'Ocorreu um erro no recebimento das informações', 'Por favor, contacte o administrador do sistema', 'Erro: 0000CI')
          })

          .always(function() {
            botao.innerHTML = conteudo;
            botao.style.width = `${width}px`;
          });
      }, 2000);

    })
  })
  

  acaoControleVisualizacaoSenha();
  // confirmarSaidaUsuarioFormulario();
})();