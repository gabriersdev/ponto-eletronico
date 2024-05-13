<?php

  require 'ultimos-horarios-dao.php';

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

    public function registrarHorario($usuario, $dia, $entrada, $saida, $saida_almoco, $retorno_almoco, $dado){
      $horariosArm = [];
      $verificaHorarioArm = new UltimosHorariosDAO($this -> conexao);
      foreach($verificaHorarioArm -> registrosUsuariosPeriodos($usuario, $dia, $dia) -> fetchAll(PDO::FETCH_ASSOC) as $key => $value){
        array_push($horariosArm, $value);
      }
  
      if(count($horariosArm) > 0 && $horariosArm[0]['data_usuario_registro'] == $dia && $horariosArm[0]['id_usuario_registro']){
        // Tem registro
        $horario = 0;

        switch($dado){
          case 'entrada_registro':
            if(!empty($horariosArm[0]['hora_entrada_usuario_registro'])) return "Horário de entrada já foi registrado";
            else if (empty($horariosArm[0]['hora_entrada_usuario_registro']) && !empty($horariosArm[0]['hora_saida_usuario_registro'])) return "O horário de saída já foi registrado e a entrada não pode ser posterior a saída";
            else if (empty($horariosArm[0]['hora_entrada_usuario_registro']) && empty($horariosArm[0]['hora_saida_usuario_registro'])) $horario = $entrada;
            break;

          case 'saida_registro':
            if(empty($horariosArm[0]['hora_entrada_usuario_registro'])) return "Primeiro registre a entrada para depois registrar a saída";
            else if (!empty($horariosArm[0]['hora_saida_usuario_registro'])) return "O horário de saída já foi registrado";
            else if (!empty($horariosArm[0]['hora_entrada_usuario_registro'])){
              if (strtotime($horariosArm[0]['hora_entrada_usuario_registro']) > strtotime($saida)) return "O horário de entrada não pode ser posterior ao horário de saída";
              else if (strtotime($horariosArm[0]['hora_entrada_usuario_registro']) == strtotime($saida)) return "O horário de entrada não pode ser igual ao horário de saída";
              else $horario = $saida;
            }
            break;

          case 'saida_almoco':
            if(empty($horariosArm[0]['hora_entrada_usuario_registro'])) return "Primeiro registre a entrada para depois registrar a saída para o almoço";
            else if (!empty($horariosArm[0]['hora_saida_usuario_registro'])) return "O horário de saída já foi registrado e não é possível registrar a saída para o almoço";
            else if (!empty($horariosArm[0]['hora_saida_usuario_almoco'])) return "O horário de saída para o almoço já foi registrado";
            else if (!empty($horariosArm[0]['hora_retorno_usuario_almoco'])) return "O horário de retorno do almoço já foi registrado e a saída para o almoço não pode ser posterior ao retorno";
            else $horario = $saida_almoco;
            break;

          case 'retorno_almoco':
            if(empty($horariosArm[0]['hora_entrada_usuario_registro'])) return "Primeiro registre a entrada para depois registrar o retorno para o almoço";
            else if(empty($horariosArm[0]['hora_saida_usuario_almoco'])) return "Primeiro registre a saída para o almoço para depois registrar o retorno";
            else if (!empty($horariosArm[0]['hora_saida_usuario_registro'])) return "O horário de saída já foi registrado e não é possível registrar o retorno do almoço";
            else if (!empty($horariosArm[0]['hora_retorno_usuario_almoco'])) return "O horário de retorno para o almoço já foi registrado";
            else if (!empty($horariosArm[0]['hora_saida_usuario_almoco'])) {
              if (strtotime($horariosArm[0]['hora_saida_usuario_almoco']) > strtotime($retorno_almoco)) return "O horário de saída do almoço não pode ser posterior ao horário de retorno";
              else if (strtotime($horariosArm[0]['hora_saida_usuario_almoco']) == strtotime($retorno_almoco)) return "O horário de saída do almoço não pode ser igual ao horário de retorno";
              else $horario = $retorno_almoco;
            }
            break;

          default:
            return null;
        }
  
        $this->alterarHorario($horariosArm[0]['id_usuario_registro'], $usuario, $dia, $dado, $horario);
        return true;
      } else {
        // Não tem registro e não foi passado param dado;
        if(!empty($usuario) && !empty($dia) && !empty($entrada)){
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
  
            return true;
  
          }catch(Exception $e){
            echo $e;
            return null;
          }catch(PDOException $e){
            echo $e;
            return null;
          }
        } else if (empty($entrada)){
          return "Primeiro registre a entrada!";
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