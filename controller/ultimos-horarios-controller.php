<?php

require '../dao/conexao.php';
require '../dao/ultimos-horarios-dao.php';
require '../lib/lib.php';

class UltimosHorariosController{
  private $UltimosHorariosDAO;

  public function __construct(){
    $this -> UltimosHorariosDAO = new UltimosHorariosDAO(new Conexao());
  }

  public function registrosUsuariosLimite($codigo_usuario, $quantidade_ultimos_dias){
    return $this -> UltimosHorariosDAO -> registrosUsuariosLimite($codigo_usuario, $quantidade_ultimos_dias);
  }

  public function registrosUsuariosPeriodos($codigo_usuario, $inicio, $fim){
    return $this -> UltimosHorariosDAO -> registrosUsuariosPeriodos($codigo_usuario, $inicio, $fim);
  }
}
?>