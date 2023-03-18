<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php require './padroes/head.php'; ?>
</head>
<body>

  <?php require './padroes/no-script.php'; ?>
  <?php require './padroes/header.php'; ?>

  <main class="principal">
    <div class="container">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="text-muted">Todos os registros</h5>
        </div>
        <div class="card-body">
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
              <tr>
                <td scope="row" colspan="2">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" checked>
                    </div>
                    <input type="text" class="form-control" value="Sábado, 17/03/2023" disabled>
                  </div>
                </td>
                <td>08:00</td>
                <td>17:30</td>
                <td>08:30:00</td>
              </tr>
              <tr>
                <td scope="row" colspan="2">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" checked>
                    </div>
                    <input type="text" class="form-control" value="Sexta-feira, 16/03/2023" disabled>
                  </div>
                </td>
                <td>08:00</td>
                <td>17:30</td>
                <td>08:30:00</td>
              </tr>
              <tr>
                <td scope="row" colspan="2">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" checked>
                    </div>
                    <input type="text" class="form-control" value="Sexta-feira, 16/03/2023" disabled>
                  </div>
                </td>
                <td>08:00</td>
                <td>17:30</td>
                <td>08:30:00</td>
              </tr>
              <tr>
                <td scope="row" colspan="2">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" checked>
                    </div>
                    <input type="text" class="form-control" value="Sexta-feira, 16/03/2023" disabled>
                  </div>
                </td>
                <td>08:00</td>
                <td>17:30</td>
                <td>08:30:00</td>
              </tr>
              <tr>
                <td scope="row" colspan="2">
                  <div class="input-group">
                    <div class="input-group-text">
                      <input class="form-check-input mt-0" type="checkbox" checked>
                    </div>
                    <input type="text" class="form-control" value="Sexta-feira, 16/03/2023" disabled>
                  </div>
                </td>
                <td>08:00</td>
                <td>17:30</td>
                <td>08:30:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  </main>
  
  <script type="module" defer>
    import { marcarPaginaNoCabecalho } from './assets/js/script.js'
    marcarPaginaNoCabecalho('ultimos-registros');
  </script>

</body>
</html>