<?php
session_start();

header('Content-Type: text/html; charset = utf-8');
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: *');

require '../controller/login-controller.php';
require '../lib/lib.php';
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
    foreach($LoginController -> verificarUsuario($usuario, $senha) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
      foreach($value as $key_2 => $value_2){
        $existe = htmlentities($value_2);
      }
    };
    
    if(isset($existe)){
      if(!empty($existe) && $existe == 1){
        
        try{
          $_SESSION['usuario'] = criptografar($senha);
          $_SESSION['senha'] = criptografar($senha);

          $retorno['mensagem'] = 'Dados corretos';
        }catch(Exception $e){
          $retorno['mensagem'] = 'Erro na criação da sessão';
        }

      }else{
        $retorno['mensagem'] = 'Dados incorretos';
      }
    }else{
      $retorno['mensagem'] = 'Erro na consulta dos dados informados';
      $retorno['sucesso'] = false;
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