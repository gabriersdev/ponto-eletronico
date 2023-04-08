<?php
  session_start();

  try{
    session_destroy();
    unset($_SESSION);  
    echo "<script>window.location.href='../login/'</script>";
  }catch(Exception $e){
    echo $e;
  }
?>