const feedback = {
    sem_carga_horaria: `<div class="alert alert-info d-flex justify-content-between align-items-center" role="alert">Não foram encontrados registros no período.<button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div>`,
    nenhum_registro: `<div class="alert alert-warning d-flex justify-content-between align-items-center" role="alert">Não foram encontrados registros no período.<button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div>`,
    nenhum_horario: `<div class="alert alert-warning d-flex justify-content-between align-items-center" role="alert">Não foram definidos horários para você.<button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div>`,
    nenhum_horario_hoje: `<div class="alert alert-warning d-flex justify-content-between align-items-center" role="alert">Não foram definidos horários para você hoje.<button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div>`,
    nenhum_dado: `<div class="alert alert-danger d-flex justify-content-between align-items-center" role="alert">Nenhum dado foi retornado.<button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div>`,
}

const elementos = {
    basico_registros: `<div class="alert alert-secondary d-flex justify-content-between align-items-center feedback-resultados-pesquisa" role="alert" style="display: none !important;"><div><h5><b>Resultados para a pesquisa</b></h5><span data-conteudo="range-datas-pesquisa"></span></div><button class="btn btn-outline-secondary" onclick="reload()">Recarregar</button></div><div class="table-responsive"><table class="table table-hover" data-tabela="ultimos-registros"><thead><tr><th scope="col">#</th><th scope="col">Data</th><th scope="col">Entrada</th><th scope="col">Saída</th><th scope="col">Tempo</th></tr></thead><tbody></tbody></table></div>`
}

export const conteudos = {
    feedback,
    elementos
}