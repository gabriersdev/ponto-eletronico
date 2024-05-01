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
      if(!empty($dia) || $dia == 0 && !empty($usuario)){

        try{

          $requisicao = $this -> conexao;
          $stmt = $requisicao -> conectar() -> prepare('CALL usuarios_horarios_select_registro_dia(:usuario, :dia)');
          $stmt -> bindValue(':usuario', $usuario);
          $stmt -> bindValue(':dia', intval($dia));
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

    public function registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco){
      if(!empty($usuario) && !empty($dia) && !empty($entrada) && !empty($saida) && !empty($saida_almoco) && !empty($retorno_almoco)){
        try{
          $requisicao = $this -> conexao;
          $stmt = $requisicao -> conectar() -> prepare('CALL pd_usuarios_registros_insert(:usuario, :dia, :entrada, :saida, :saida_almoco, :retorno_almoco)');
          $stmt -> bindValue(':usuario', $usuario);
          $stmt -> bindValue(':dia', $dia);
          $stmt -> bindValue(':entrada', $entrada);
          $stmt -> bindValue(':saida', $saida);
          $stmt -> bindValue(':saida_almoco', $saida_almoco);
          $stmt -> bindValue(':retorno_almoco', $retorno_almoco);
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

    public function alterarHorario($id_registro, $usuario, $dia, $tipo_dado, $horario){
      if (!empty($id_registro) && !empty($usuario) && !empty($dia) && !empty($tipo_dado) && !empty($horario)) {
        try {
          $requisicao = $this -> conexao;
          $stmt = $requisicao -> conectar() -> prepare('CALL pd_usuarios_registros_update_horarios(:id_registro, :usuario, :dia, :tipo_dado, :horario)');
          $stmt -> bindValue(':id_registro', $id_registro);
          $stmt -> bindValue(':usuario', $usuario);
          $stmt -> bindValue(':dia', $dia);
          $stmt -> bindValue(':tipo_dado', $tipo_dado);
          $stmt -> bindValue(':horario', $horario);
          $stmt -> execute();
          echo('Aqui');
          return $stmt;

        } catch (Exception $e) {
          echo $e;
          return null;
        } catch (PDOException $e) {
          echo $e;
          return null;
        }
      }
    }
  }

?>