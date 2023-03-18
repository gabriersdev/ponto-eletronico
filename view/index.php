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
        <span class="tag-destaque"></span>
        <div class="card-header">
          <h5 class="text-primary bold">Segunda-feira</h5>
          <h5 class="text-dark-emphasis">18 de março de 2023</h5>
        </div><br>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center justify-content-between list-group-title">
              <b>Horário</b>
              <div>
                <button type="button" class="btn btn-primary">Registrar entrada</button>
                <button type="button" class="btn btn-secondary">Registrar saída</button>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <span class="text-muted">Entrada:</span>
                <span>09:00</span>
              </div>
              <span class="text-muted contador-atraso">Sem atraso</span>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <span class="text-muted">Saída:</span>
                <span>17:30</span>
              </div>
              <span class="text-muted contador-atraso">Sem atraso</span>
            </li>
            <li class="list-group-item contador-periodos">
              <div>
                <span class="text-muted">Tempo decorrido:</span>
                <span>01:00:00</span>
              </div>
              <div>
                <span class="text-muted">Tempo restante:</span>
                <span>01:00:00</span>
              </div>
            </li>
          </ul><br>
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center justify-content-between list-group-title">
              <b>Almoço</b>
              <div>
                <button type="button" class="btn btn-primary">Registrar saída</button>
                <button type="button" class="btn btn-secondary">Registrar retorno</button>
              </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <span class="text-muted">Saída:</span>
                <span>12:00</span>
              </div>
              <span class="text-muted contador-atraso">Sem atraso</span>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <span class="text-muted">Retorno:</span>
                <span>13:00</span>
              </div>
              <span class="text-muted contador-atraso">Sem atraso</span>
            </li>
            <li class="list-group-item contador-periodos">
              <div>
                <span class="text-muted">Tempo decorrido:</span>
                <span>01:00:00</span>
              </div>
              <div>
                <span class="text-muted">Tempo restante:</span>
                <span>01:00:00</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <br>

      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="text-muted">Últimos registros</h5>
          <a href="" data-link="ultimos-registros" type="button" class="btn btn-outline-secondary">Ver todos</a>
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

      <br>

      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="text-dark-emphasis">Horários</h5>
            <p>Os horários dos próximos dias</p>
          </div>
          <a href="" data-link="horarios" type="button" class="btn btn-outline-secondary">Ver todos</a>
        </div>
        <div class="card-body">
          <table class="table table-bordered border-dark-subtle table-striped table-hover">
            <thead>
              <th colspan="3">Terça-feira</th>
            </thead>
            <tr>
              <th>Entrada</th>
              <th>Almoço</th>
              <th>Saída</th>
            </tr>
            <tbody>
              <tr>
                <td>09:00</td>
                <td>12:00 - 13:00</td>
                <td>18:30</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered border-dark-subtle table-striped table-hover">
            <thead>
              <th colspan="3">Quarta-feira</th>
            </thead>
            <tr>
              <th>Entrada</th>
              <th>Almoço</th>
              <th>Saída</th>
            </tr>
            <tbody>
              <tr>
                <td>09:00</td>
                <td>12:00 - 13:00</td>
                <td>17:30</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered border-dark-subtle table-striped table-hover">
            <thead>
              <th colspan="3">Quinta-feira</th>
            </thead>
            <tr>
              <th>Entrada</th>
              <th>Almoço</th>
              <th>Saída</th>
            </tr>
            <tbody>
              <tr>
                <td>09:00</td>
                <td>12:00 - 13:00</td>
                <td>18:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  </main>
  
</body>
</html>