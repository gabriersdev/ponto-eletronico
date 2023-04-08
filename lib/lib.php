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

function verificarNavegador(){
  $MSIE = strpos($_SERVER['HTTP_USER_AGENT'],"MSIE");
  $Firefox = strpos($_SERVER['HTTP_USER_AGENT'],"Firefox");
  $Mozilla = strpos($_SERVER['HTTP_USER_AGENT'],"Mozilla");
  $Chrome = strpos($_SERVER['HTTP_USER_AGENT'],"Chrome");
  $Chromium = strpos($_SERVER['HTTP_USER_AGENT'],"Chromium");
  $Safari = strpos($_SERVER['HTTP_USER_AGENT'],"Safari");
  $Opera = strpos($_SERVER['HTTP_USER_AGENT'],"Opera");
  
  if($MSIE == true){
    $navegador = "IE"; 
  }else if($Firefox == true){
    $navegador = "Firefox";
  }else if($Mozilla == true){
    $navegador = "Firefox";
  }else if($Chrome == true){
    $navegador = "Chrome";
  }else if($Chromium == true){
    $navegador = "Chromium"; 
  }else if($Safari == true){
    $navegador = "Safari";
  }else if($Opera == true){
    $navegador = "Opera";
  }else{ 
    $navegador = $_SERVER['HTTP_USER_AGENT'];
  }
  
  return substr($navegador, 0, 45);
}

function verificarSistemaOperacional(){
  preg_match('((?<=\().*?(?=;))',$_SERVER['HTTP_USER_AGENT'],$matches);
  return substr($matches[0], 0, 45);
}

function retornarIP(){
  $ip = 0;
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
  } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
    $ip = $_SERVER['REMOTE_ADDR'];
  }

  return $ip;
}

?>