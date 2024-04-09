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
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="text-muted">Últimos registros</h5>
        </div>
        <div class="card-body">

          <div class="card">
            <div class="card-header normal">
              Pesquisa
            </div>
            <div class="card-body">
              <form data-fomrulario="pesquisa-ultimos-horarios">
                <div class="row">
                  <div class="col">
                    <div class="input-group mb-3" data-input-group="data-inicio">
                      <label for="data-inicio" class="input-group-text" id="basic-addon2">Início</label>
                      <input type="date" id="data-inicio" name="data-inicio" class="form-control" aria-describedby="basic-addon2" required>
                    </div>
                    <div class="alert alert-warning feedback-dados-inseridos none" role="alert"></div>
                  </div>
                  <div class="col">
                    <div class="input-group mb-3" data-input-group="data-fim">
                      <label class="input-group-text" for="data-fim" id="basic-addon2">Fim</label>
                      <input type="date" id="data-fim" name="data-fim" class="form-control" aria-describedby="basic-addon2" required>
                    </div>
                    <div class="alert alert-warning feedback-dados-inseridos none" role="alert"></div>
                  </div>
                  <div class="">
                    <button type="submit" class="btn btn-primary">Pesquisar</button>
                  </div>
                </div>
              </form>
            </div>
          </div><br>

          <div class="card">
            <div class="card-header normal d-flex justify-content-between align-items-center">
              Registros
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" data-acao="btn-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ordem
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item selecionado" href="#">Mais recentes</a></li>
                  <li><a class="dropdown-item" href="#">Mais antigos</a></li>
                  <li><a class="dropdown-item" href="#">Últimos 30 dias</a></li>
                </ul>
              </div>
            </div>
            <div class="card-body" data-conteudo="registros">
              <div class="alert alert-secondary d-flex justify-content-between align-items-center feedback-resultados-pesquisa none" role="alert">
                <div>
                  <h5><b>Resultados para a pesquisa</b></h5>
                  <span data-conteudo="range-datas-pesquisa"></span>
                </div>
                <button class="btn btn-outline-secondary" data-recarrega-pagina>Recarregar</button>
              </div>
              <div class="table-responsive">
                <table class="table table-hover" data-tabela="ultimos-registros">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Data</th>
                      <th scope="col">Entrada</th>
                      <th scope="col">Saída</th>
                      <th scope="col">Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- <div class="card-footer"> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
      </div>
    </div>
  </main>
  
  <script type="module" defer>
    import { marcarPaginaNoCabecalho } from '../assets/js/script.js'
    marcarPaginaNoCabecalho('ultimos-registros');
  </script>

  <script type="module" src="../assets/js/scripts/ultimos-registros.js"></script>

  <?php include '../padroes/footer.php' ?>

</body>
</html>