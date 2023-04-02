<?php
header('Content-Type: text/html; charset = utf-8');
header('Access-Control-Allow-Origin: localhost');
header('Access-Control-Allow-Methods: *');

require '../controller/ultimos-horarios-controller.php';
$retorno = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST)){
  if(!empty($_POST['solicitacao']) && !empty($_POST['quantidade'])){
    $retorno['mensagem'] = 'Dados recebidos';
    $retorno['sucesso'] = true;

    $retorno['dados'] = array();
    $quantidade = filter_input(INPUT_POST, 'quantidade', FILTER_SANITIZE_SPECIAL_CHARS);

    $UltimosHorariosController = new UltimosHorariosController();
    foreach($UltimosHorariosController -> registrosUsuariosLimite(1, $quantidade) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
      $dia = htmlentities($value['data_usuario_registro']);
      $entrada = htmlentities($value['hora_entrada_usuario_registro']);
      $saida = htmlentities($value['hora_saida_usuario_registro']);
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