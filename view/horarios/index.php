<?php 
  session_start();
  require '../../lib/lib.php';

  $acesso = false;

  if(verificarValoresArmazenados()){
    echo "";
    $acesso = true;
  }else{
    ;
  };
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php require '../padroes/head.php'; ?>
</head>
<body>

  <?php login($acesso)?>
  <?php require '../padroes/no-script.php'; ?>
  <?php require '../padroes/header.php'; ?>

  <main class="principal">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h5>Horários</h5>
        </div>
        <div class="card-body">
        </div>
    </div>
  </main>
  
  <script type="module" defer>
    import { marcarPaginaNoCabecalho } from '../assets/js/script.js'
    marcarPaginaNoCabecalho('horarios');
  </script>

  <script type="module" src="../assets/js/scripts/horarios.js"></script>

  <?php include '../padroes/footer.php' ?>

</body>
</html>