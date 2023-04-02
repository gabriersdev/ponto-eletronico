<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php require '../padroes/head.php'; ?>
</head>
<body>

  <?php require '../padroes/no-script.php'; ?>
  <?php require '../padroes/header.php'; ?>

  <main class="principal">
    <div class="container">
      <div class="card">
        <div class="card-body d-flex justify-content-start align-items-center flex-wrap">
          <img src="../assets/img/person-circle.svg" alt="Icon de uma pessoa" class="rounded-circle" height="50rem" style="opacity: 0.6;">
          <div class="ms-3">
            <h5 class="text-dark-emphasis text-rigth" data-cumprimento-atual>Bom dia</h5>
            <h4 class="text-dark-emphasis text-right bold mt-1">Gabriel</h4>
          </div>
        </div>
      </div>
      <br>
      <div class="card">
        <span class="tag-destaque"></span>
        <div class="card-header" data-conteudo="dados-dia">
          <h5 class="text-primary bold"></h5>
          <h5 class="text-dark-emphasis"></h5>
        </div><br>
        <div class="card-body" data-conteudo="horarios-hoje">
        </div>
      </div>
      <br>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="text-muted">Últimos registros</h5>
          <a href="" data-link="ultimos-registros" type="button" class="btn btn-outline-secondary">Ver todos</a>
        </div>
        <div class="card-body" data-conteudo="registros">
          <div class="table-responsive">
            <table class="table table-hover">
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
      </div>
      <br>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-dark-emphasis">Horários</h5>
            <p>Os horários dos próximos dias</p>
          </div>
          <a href="" data-link="horarios" type="button" class="btn btn-outline-secondary">Ver todos</a>
        </div>
        <div class="card-body" data-conteudo="horarios-proximos-dias">
        </div>
      </div>
      </div>
    </div>
  </main>
  
  <script type="module" src="../assets/js/scripts/inicio.js" defer></script>
  <?php include '../padroes/footer.php' ?>

</body>
</html>