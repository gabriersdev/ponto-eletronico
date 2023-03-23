<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <?php require '../padroes/head-login.php'; ?>
</head>
  <body>

    <!-- <div class="overlay">
      <div class="lds-ring overlay"><div></div><div></div><div></div><div></div></div>
    </div> -->

    <main>
      <section class="container">
        <div class="login-form">
          <form action="" method="post">
              <h2 class="text-center">Login</h2>       
              <div class="form-group">
                <label for="username">Usuário</label>
                <input type="text" id="username" class="form-control" placeholder="Seu e-mail" required="required" autocomplete="off">
              </div>
              <div class="form-group">
                <label for="password">Senha</label>
                <div class="input-group mb-3">
                  <input type="password" id="password" class="form-control" placeholder="Sua senha">
                  <span class="input-group-text icon" id="basic-addon2"><i class="bi bi-eye-slash-fill" id="icon-view"></i></span>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" id="submit" class="btn btn-primary btn-block">Acessar</button>
              </div>
              <div class="clearfix">
              </div> 
              <div class="form-group feedback-message text-center error" id="feedback-message-error"></div>
              <div class="form-group feedback-message text-center warning" id="feedback-message-warning"></div>
              <div class="form-group feedback-message text-center success" id="feedback-message-success"></div>
          </form>
        </div>
      </section>
    </main>

  </body>
</html>