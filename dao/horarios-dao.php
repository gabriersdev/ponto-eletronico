<?php

  class HorariosDao{
    private $conexao;
  
    public function __construct($conexao){
      $this->conexao = $conexao;
    }

    public function todosHorarios($usuario){
      if(!empty($usuario)){

        try{

          $requisicao = $this -> conexao;
          $stmt = $requisicao -> conectar() -> prepare('CALL usuarios_horarios_select_registros(:usuario)');
          $stmt -> bindValue(':usuario', $usuario);
          $stmt -> execute();

          return $stmt;

        }catch(Exception $e){
          echo $e;
          return null;
        }catch(PDOException $e){
          echo $e;
          return null;
        }  

      }
    }

    public function horario($usuario, $dia){
      if(!empty($dia) && !empty($usuario)){

        try{

          $requisicao = $this -> conexao;
          $stmt = $requisicao -> conectar() -> prepare('CALL usuarios_horarios_select_registro_dia(:usuario, :dia)');
          $stmt -> bindValue(':usuario', $usuario);
          $stmt -> bindValue(':dia', $dia);
          $stmt -> execute();

          return $stmt;

        }catch(Exception $e){
          echo $e;
          return null;
        }catch(PDOException $e){
          echo $e;
          return null;
        }  

      }
    }
  }

?>