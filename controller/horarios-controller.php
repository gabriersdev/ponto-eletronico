<?php

// Set the timezone to America/Sao_Paulo
date_default_timezone_set('America/Sao_Paulo');

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
    $horario_t = date_format(date_create(), 'H:i:s');

    return $this->HorariosDao->registrarHorario($usuario, $dia, empty($entrada) ? null : $horario_t, empty($saida) ? null : $horario_t, empty($saida_almoco) ? null : $horario_t, empty($retorno_almoco) ? null : $horario_t, $dado);
  }
}

?>