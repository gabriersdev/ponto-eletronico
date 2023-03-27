<?php

  function desempacotar_arrays($array){
    $saida = array();
    foreach($array as $key => $value){
      array_push($saida, $value);
    }

    return $saida;
  }

?>