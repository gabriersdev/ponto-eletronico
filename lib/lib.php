<?php

  function desempacotar_arrays($array){
    $saida = array();
    foreach($array as $key => $value){
      array_push($saida, $value);
    }

    return $saida;
  }

  function descriptografar($input){
    try{
      return base64_decode(base64_decode($input));
    }catch(Exception $e){
      echo $e;
      return null;
    }
  }

  function criptografar($input){
    try{
      return base64_encode(base64_encode($input));
    }catch(Exception $e){
      echo $e;
      return null;
    }
  }

?>