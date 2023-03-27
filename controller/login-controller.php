<?php

require '../dao/conexao.php';
require '../dao/login-dao.php';
require '../lib/lib.php';

class LoginController{
  private $LoginDao;
  
  public function __construct(){
    $this -> LoginDao = new LoginDao(new Conexao());
  }
  
  # Retorna 1 caso o usuário exista e 0 se ele não existir
  public function verificarUsuario($email, $senha){
    foreach($this->LoginDao->verificarUsuario(trim(strtolower($email)), trim($senha)) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
      foreach($value as $key_2 => $value_2){
        return $value_2;
      }
    }
  }
  
  public function retornarIDUsuario($email, $senha){
    return $this->LoginDao->retornarIDUsuario($email, $senha);
  }
  
  public function registrarAcessoUsuario($codigo_usuario, $sistema_op, $local, $ip, $dispositivo){
    return $this->registrarAcessoUsuario($codigo_usuario, $sistema_op, $local, $ip, $dispositivo);
  }
}



?>