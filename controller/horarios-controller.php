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
  
  public function registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco, $dado = null){
    // TODO - Refatorar: BAD Code
    $horariosArm = [];
    $verificaHorarioArm = new UltimosHorariosDAO(new Conexao());
    foreach($verificaHorarioArm -> registrosUsuariosPeriodos($usuario, $dia, $dia) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
      array_push($horariosArm, $value);
    }

    // TODO - Implementar verificação do dado que mudou
    if(count($horariosArm) > 0 && $horariosArm[0]['data_usuario_registro'] == $dia && $horariosArm[0]['id_usuario_registro']){
      // Tem registro
      $horario = 0;

      switch($dado){
        case 'entrada_registro':
          $horario = $entrada;
          break;
        case 'saida_registro':
          $horario = $saida;
          break;
        case 'saida_almoco':
          $horario = $saida_almoco;
          break;
        case 'retorno_almoco':
          $horario = $retorno_almoco;
          break;
        default:
          return null;
      }

      $this->HorariosDao->alterarHorario($horariosArm[0]['id_usuario_registro'], $usuario, $dia, $dado, $horario);
      return true;
    } else {
      // Não tem registro e não foi passado param dado;
      return $this->HorariosDao->registrarHorario($usuario, $dia, empty($entrada) ? null : $entrada, empty($saida) ? null : $saida, empty($saida_almoco) ? null : $saida_almoco, empty($retorno_almoco) ? null : $retorno_almoco);
    }
  }
}

?>