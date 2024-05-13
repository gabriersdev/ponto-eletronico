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
  
  public function registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco, $dado = null){
    return $this->HorariosDao->registrarHorario($usuario, $dia, empty($entrada) ? null : $entrada, empty($saida) ? null : $saida, empty($saida_almoco) ? null : $saida_almoco, empty($retorno_almoco) ? null : $retorno_almoco, $dado);
  }
}

?>