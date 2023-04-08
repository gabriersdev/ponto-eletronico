<?php

require '../dao/conexao.php';
require '../dao/horarios-dao.php';
require '../lib/lib.php';

class HorariosController{
  private $HorariosDao;
  
  public function __construct(){
    $this->HorariosDao = new HorariosDao(new Conexao());
  }

  public function todosHorarios($usuario){
    return $this->HorariosDao->todosHorarios($usuario);
  }

  public function horario($usuario, $dia){
    return $this->HorariosDao->horario($usuario, $dia);
  }
}

// $teste = new HorariosController();

// foreach($teste -> horario(1, 1) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
//   print_r($value);
// }

// foreach($teste -> todosHorarios(1) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
//   print_r($value);
// }

?>