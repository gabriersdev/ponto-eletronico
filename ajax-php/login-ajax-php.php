<?php
header('Content-Type: text/html; charset = utf-8');
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: *');

require '../controller/login-controller.php';
$retorno = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST)){
  if(!empty($_POST['usuario']) && !empty($_POST['senha'])){
    $retorno['mensagem'] = 'Dados recebidos';
    $retorno['sucesso'] = true;
    
    $filtro = array(
      "dados" => array(
        "usuario" => array(
          "filter" => FILTER_SANITIZE_SPECIAL_CHARS,
          "flags" => FILTER_FORCE_ARRAY,
          "options" => "ucwords"
        ),
        "senha" => array(
          "filter" => FILTER_SANITIZE_SPECIAL_CHARS,
          "flags" => FILTER_FORCE_ARRAY,
          "options" => "ucwords"
        )
      )
      );
    
    $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_SPECIAL_CHARS);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_SPECIAL_CHARS);

    $LoginController = new LoginController();
    $existe = $LoginController -> verificarUsuario($usuario, $senha);

    if(!empty($existe) && $existe == 1){
      $retorno['mensagem'] = 'Dados corretos';
    }else{
      $retorno['mensagem'] = 'Dados incorretos';
    }

  }else{
    $retorno['mensagem'] = 'Dados vazios';
    $retorno['sucesso'] = false;
  }
}else{
  $retorno['mensagem'] = 'Nenhum dado foi recebido';
  $retorno['sucesso'] = false;
}

echo json_encode($retorno);

?>