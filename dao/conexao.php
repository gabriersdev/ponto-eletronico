<?php

class Conexao{
  private $pdo;

  public function __construct(){
    $this->pdo = $this->oconn();
    return $this->conectar();
  }

  private function oconn(){
    $config = array(
      'host' => 'localhost',
      'dbname' => 'ponto_eletronico',
      'charset' => 'utf8mb4',
      'dbuser' => 'root',
      'dbpass' => '',
    );

    try{
      $pdo = new PDO('mysql:host='. $config['host']. ';dbname='. $config['dbname']. ';charset='. $config['charset'], $config['dbuser'], $config['dbpass']);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    }catch(Exception $e){
      print($e);
      return null;
    }catch(PDOException $e){
      print($e);
      return null;
    }
  }
  
  public function conectar(){
    return $this->pdo;
  }

  public static function fechar($pdo){
    unset($pdo);
  }
}

?>