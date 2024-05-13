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
      
      if(isset($_POST['diasSelecionados']) || !empty($_POST['diasSelecionados'])){
        $retorno['dados'] = array();
        
        $dias_selecionados = $_POST['diasSelecionados'];
        
        if(is_array($dias_selecionados)){
          foreach($dias_selecionados as $key => $value){
            foreach($HorariosController -> horario($id_usuario, $value) -> fetchAll(PDO::FETCH_ASSOC) as $key_2 => $value_2){
              $dia = htmlentities($value_2['dia_semana_usuario_horario']);
              $entrada = htmlentities($value_2['hora_entrada_usuario_horario']);
              $saida = htmlentities($value_2['hora_saida_usuario_horario']);
              $saida_almoco = !empty($value_2['hora_saida_usuario_almoco']) ? htmlentities($value_2['hora_saida_usuario_almoco']) : '';
              $retorno_almoco = !empty($value_2['hora_retorno_usuario_almoco']) ? htmlentities($value_2['hora_retorno_usuario_almoco']) : '';
              
              array_push($retorno['dados'], 
              array(
                "dia_semana_usuario_horario" => $dia, 
                "hora_entrada_usuario_horario" => $entrada, 
                "hora_saida_usuario_horario" => $saida, 
                "hora_saida_usuario_almoco" => $saida_almoco, 
                "hora_retorno_usuario_almoco" => $retorno_almoco)
              );
            }
          }
        }else{
          foreach($HorariosController -> horario($id_usuario, $dias_selecionados) -> fetchAll(PDO::FETCH_ASSOC) as $key_2 => $value_2){
            $dia = htmlentities($value_2['dia_semana_usuario_horario']);
            $entrada = htmlentities($value_2['hora_entrada_usuario_horario']);
            $saida = htmlentities($value_2['hora_saida_usuario_horario']);
            $saida_almoco = !empty($value_2['hora_saida_usuario_almoco']) ? htmlentities($value_2['hora_saida_usuario_almoco']) : '';
            $retorno_almoco = !empty($value_2['hora_retorno_usuario_almoco']) ? htmlentities($value_2['hora_retorno_usuario_almoco']) : '';
            
            array_push($retorno['dados'], 
            array(
              "dia_semana_usuario_horario" => $dia, 
              "hora_entrada_usuario_horario" => $entrada, 
              "hora_saida_usuario_horario" => $saida, 
              "hora_saida_usuario_almoco" => $saida_almoco, 
              "hora_retorno_usuario_almoco" => $retorno_almoco)
            );
          }
        }
        
        $retorno['mensagem'] = 'Solicitação recebida';
        $retorno['sucesso'] = true;
      }else if((isset($_POST['action']) || !empty($_POST['action'])) && $_POST['action'] == 'registrar'){
        $dia_semana = htmlentities($_POST['dia_semana']);
        $hora_entrada = htmlentities(isset($_POST['hora_entrada']) ? $_POST['hora_entrada'] : '');
        $hora_saida = htmlentities(isset($_POST['hora_saida']) ? $_POST['hora_saida'] : '');
        $hora_saida_almoco = htmlentities(isset($_POST['hora_saida_almoco']) ? $_POST['hora_saida_almoco'] : '');
        $hora_retorno_almoco = htmlentities(isset($_POST['hora_retorno_almoco']) ? $_POST['hora_retorno_almoco'] : '');
        $dado = htmlentities(isset($_POST['dado']) ? $_POST['dado'] : '');

        $com = $HorariosController -> registrarHorario($id_usuario, $dia_semana, $hora_entrada, $hora_saida, $hora_saida_almoco, $hora_retorno_almoco, $dado);
        $retorno['retorno'] = $com;
        if($com){
          $retorno['mensagem'] = 'Horário registrado';
          $retorno['sucesso'] = true;
        }else{
          $retorno['mensagem'] = 'Erro ao registrar horário';
          $retorno['sucesso'] = false;
        }
      }else{
        $retorno['dados'] = array();
        
        foreach($HorariosController -> todosHorarios($id_usuario) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
          $dia = htmlentities($value['dia_semana_usuario_horario']);
          $entrada = htmlentities($value['hora_entrada_usuario_horario']);
          $saida = htmlentities($value['hora_saida_usuario_horario']);
          $saida_almoco = !empty($value['hora_saida_usuario_almoco']) ? htmlentities($value['hora_saida_usuario_almoco']) : '';
          $retorno_almoco = !empty($value['hora_retorno_usuario_almoco']) ? htmlentities($value['hora_retorno_usuario_almoco']) : '';
          
          array_push($retorno['dados'], 
          array(
            "dia_semana_usuario_horario" => $dia, 
            "hora_entrada_usuario_horario" => $entrada, 
            "hora_saida_usuario_horario" => $saida, 
            "hora_saida_usuario_almoco" => $saida_almoco, 
            "hora_retorno_usuario_almoco" => $retorno_almoco)
          );
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