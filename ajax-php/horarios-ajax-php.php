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

      if(!empty($_POST['diasSelecionados']) || $_POST['diasSelecionados'] == 0){
        $retorno['dados'] = array();

        $dias_selecionados = $_POST['diasSelecionados'];

        if(is_array($dias_selecionados)){
          foreach($dias_selecionados as $key => $value){
            foreach($HorariosController -> horario($id_usuario, $value) -> fetchAll(PDO::FETCH_ASSOC) as $key_2 => $value_2){
              array_push($retorno['dados'], $value_2);
            }
          }
        }else{
          foreach($HorariosController -> horario($id_usuario, $dias_selecionados) -> fetchAll(PDO::FETCH_ASSOC) as $key_2 => $value_2){
            array_push($retorno['dados'], $value_2);
          }
        }

        $retorno['xxx'] = $dias_selecionados;

        $retorno['mensagem'] = 'Solicitação recebida';
        $retorno['sucesso'] = true;
      }else{
        $retorno['dados'] = array();
        
        foreach($HorariosController -> todosHorarios($id_usuario) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
          array_push($retorno['dados'], $value);
        }
        
        $retorno['mensagem'] = 'Solicitação recebida';
        $retorno['sucesso'] = true;
      }
      
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