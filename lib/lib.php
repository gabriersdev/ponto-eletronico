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

  function verificarValoresArmazenados(){
    if(isset($_SESSION)){
      if(!empty($_SESSION['usuario']) || $_SESSION['usuario'] == 0 && 
      !empty($_SESSION['senha']) || $_SESSION['senha'] == 0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  function login($status){
    if(!$status){
      die("<script type='module'>import { swalAlert } from '../assets/js/módulos/utilitarios.js'; swalAlert('error', 'error', 'Sessão inválida ou não definida', 'As informações não foram armazenadas corretamente ou estão inválidas. Você será redirecionado para o login', '8870SS', null).then(() => {setTimeout(()=>{window.location.href = '../login/'}, 4000)});</script>");
    }
  }

?>