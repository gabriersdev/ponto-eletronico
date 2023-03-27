<?php

  class LoginModel{
    private $id;
    private $email;
    private $nome;
    private $senha;

    public function __construct($id, $email, $nome, $senha){
      $this->id = $id;
      $this->email = $email;
      $this->nome = $nome;
      $this->senha = $senha;
    }

    public function getId(){
      return $this->id;
    }

    public function getEmail(){
      return $this->email;
    }

    public function getNome(){
      return $this->nome;
    }

    public function getSenha(){
      return $this->senha;
    }

    public function __destruct(){
      $this->id = null;
      $this->email = null;
      $this->nome = null;
      $this->senha = null;
    }
  }

?>