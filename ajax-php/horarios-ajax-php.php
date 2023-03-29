<?php
header('Content-Type: text/html; charset = utf-8');
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: *');

require '../controller/horarios-controller.php';
$retorno = array();

$id_usuario = 1;

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST)){
  if(!empty($_POST['solicitacao'])){
    if(isset($id_usuario) && !empty($id_usuario)){
      $HorariosController = new HorariosController();

      $retorno['dados'] = array();

      foreach($HorariosController -> todosHorarios($id_usuario) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
        array_push($retorno['dados'], $value);
      }

      $retorno['mensagem'] = 'Solicitação recebida';
      $retorno['sucesso'] = true;

    }else{
      $retorno['mensagem'] = 'Usuário não definido';
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