<?php

  if(isset($_SESSION)){
    session_destroy();
  }
  unset($_SESSION);

  echo "<script>window.location.href='../login/'</script>";

?>