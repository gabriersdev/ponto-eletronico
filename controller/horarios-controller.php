<?php

require '../dao/conexao.php';
require '../dao/horarios-dao.php';
require '../dao/ultimos-horarios-dao.php';
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
  
  public function registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco){
    // TODO - Refatorar: BAD Code
    $horariosArm = [];
    $verificaHorarioArm = new UltimosHorariosDAO(new Conexao());
    foreach($verificaHorarioArm -> registrosUsuariosPeriodos($usuario, $dia, $dia) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
      array_push($horariosArm, $value);
    }

    // TODO - Implementar verificação do dado que mudou

    if(count($horariosArm) > 0 && $horariosArm[0]['data_usuario_registro'] == $dia && $horariosArm[0]['id_usuario_registro']){
      // Tem registro
      // $this->HorariosDao->alterarHorario($horariosArm[0]['id_usuario_registro'], $usuario, $dia, 'retorno_almoco', );
      // return null;'
    } else {
      // Não tem registro
      return $this->HorariosDao->registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco);
    }
  }
}

?>