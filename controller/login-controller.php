<?php

  $retorno = array();

  if(isset($_POST)){
    if(!empty($_POST['dados']['usuario']) && !empty($_POST['dados']['senha'])){
      $retorno['mensagem'] = 'Dados recebidos';
      $retorno['sucesso'] = true;
    }else{
      $retorno['mensagem'] = 'Dados não recebidos ou incompletos';
      $retorno['sucesso'] = false;
    }
  }else{
    $retorno['mensagem'] = 'Nenhum dado foi recebido';
    $retorno['sucesso'] = false;
  }

  echo json_encode($retorno);
?>