<?php

class LoginDao{
  private $conexao;
  
  public function __construct($conexao){
    $this->conexao = $conexao;
  }
  
  public function verificarUsuario($email, $senha){
    if(!empty($email) && !empty($senha)){
      try{
        $requisicao = $this -> conexao;
        $stmt = $requisicao -> conectar() -> prepare('SELECT fn_verifica_dados(:email, :senha)');
        $stmt -> bindValue(':email', $email);
        $stmt -> bindValue(':senha', $senha);
        $stmt -> execute();
        
        // $stmt -> fetchAll(PDO::FETCH_ASSOC);
        return $stmt;
        
      }catch(Exception $e){
        echo $e;
        return null;
      }catch(PDOException $e){
        echo $e;
        return null;
      }
      
    }else{
      return null;
    }
  }
  
  public function retornarIDUsuario($email, $senha){
    if(!empty($email) && !empty($senha)){
      try{
        $requisicao = $this -> conexao;
        $stmt = $requisicao -> conectar() -> prepare('SELECT fn_consulta_id_email(:email, :senha)');
        $stmt -> bindValue(':email', $email);
        $stmt -> bindValue(':senha', $senha);
        $stmt -> execute();
        
        // $stmt -> fetchAll(PDO::FETCH_ASSOC);
        return $stmt;
        
      }catch(Exception $e){
        echo $e;
        return null;
      }catch(PDOException $e){
        echo $e;
        return null;
      }
      
    }else{
      return null;
    }
  }

  public function registrarAcessoUsuario($codigo_usuario, $sistema_op, $local, $ip, $dispositivo){
    if(!empty($codigo_usuario) && !empty($sistema_op) && !empty($local) && !empty($ip) && !empty($dispositivo)){
      try{
        
        $requisicao = $this -> conexao;
        $stmt = $requisicao -> conectar() -> prepare('CALL pd_logs_acessos_usuarios_insert(:codigo, :sistema, :local, :ip, :dispositivo)');
        $stmt -> bindValue(':codigo', $codigo_usuario);
        $stmt -> bindValue(':sistema', substr($sistema_op, 0, 45));
        $stmt -> bindValue(':local', substr($local, 0, 45));
        $stmt -> bindValue(':ip', substr($ip, 0, 45));
        $stmt -> bindValue(':dispositivo', substr($dispositivo, 0, 45));
        $stmt -> execute();

        return true;

      }catch(Exception $e){
        echo $e;
        return false;
      }catch(PDOException $e){
        echo $e;
        return false;
      }
    }else{
      return null;
    }
  }
}

?>