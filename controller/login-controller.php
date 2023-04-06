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
    return $this->LoginDao->verificarUsuario(trim(strtolower($email)), trim($senha));
  }
  
  public function retornarIDUsuario($email, $senha){
    return $this->LoginDao->retornarIDUsuario($email, $senha);
  }
  
  public function registrarAcessoUsuario($codigo_usuario, $sistema_op, $local, $ip, $dispositivo){
    return $this->LoginDao->registrarAcessoUsuario($codigo_usuario, $sistema_op, $local, $ip, $dispositivo);
  }
}

## Testar Registro de Acesso
// $t = new LoginController();
// foreach($t -> registrarAcessoUsuario(152, 'Windows', 'Belo Horizonte', '12345', 'PC') -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
// }

?>