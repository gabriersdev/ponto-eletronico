<?php

  $retorno = array();

  if(isset($_POST)){
    if(!empty($_POST['dados']['usuario']) && !empty($_POST['dados']['senha'])){
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

      
      $usuario = filter_var($_POST['dados']['usuario'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_NULL_ON_FAILURE);
      $usuario = trim(strtolower($usuario));

      $senha = filter_var($_POST['dados']['senha'], FILTER_SANITIZE_SPECIAL_CHARS, FILTER_NULL_ON_FAILURE);
      $senha = trim($senha);

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