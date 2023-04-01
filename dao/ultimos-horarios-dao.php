<?php

class UltimosHorariosDAO{
  private $conexao;

  public function __construct($conexao){
    $this->conexao = $conexao;
  }

  public function registrosUsuariosLimite($codigo_usuario, $quantidade_ultimos_dias){
    if(!empty($codigo_usuario) && !empty($quantidade_ultimos_dias)){
      try{
        $requisicao = $this -> conexao;
        $stmt = $requisicao -> conectar() -> prepare("CALL pd_usuarios_registros_select(:codigo, :quantidade)");
        $stmt -> bindValue(':codigo', $codigo_usuario);
        $stmt -> bindValue(':quantidade', $quantidade_ultimos_dias);
        $stmt -> execute();

        return $stmt;

      }catch(Exception $e){
        echo $e;
        return null;
      }catch(PDOException $e){
        echo $e;
        return null;
      }

    }else{
      return null;
    }
  }

  public function registrosUsuariosPeriodos($codigo_usuario, $inicio, $fim){
    if(!empty($codigo_usuario) && !empty($inicio) && !empty($fim)){
      try{
        $requisicao = $this -> conexao;
        $stmt = $requisicao -> conectar() -> prepare("CALL pd_usuarios_registros_select_periodo(:inicio, :fim, :codigo)");
        $stmt -> bindValue(':inicio', $inicio);
        $stmt -> bindValue(':fim', $fim);
        $stmt -> bindValue(':codigo', $codigo_usuario);
        $stmt -> execute();

        return $stmt;

      }catch(Exception $e){
        echo $e;
        return null;
      }catch(PDOException $e){
        echo $e;
        return null;
      }

    }else{
      return null;
    }
  }
}

?>