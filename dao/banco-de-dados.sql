CREATE SCHEMA IF NOT EXISTS ponto_eletronico CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';
USE ponto_eletronico;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ponto_eletronico` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema ponto_eletronico
-- -----------------------------------------------------
USE `ponto_eletronico` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`usuarios` (
  `id_usuarios` BIGINT NOT NULL AUTO_INCREMENT,
  `email_usuario` VARCHAR(100) NOT NULL,
  `nome_usuario` VARCHAR(45) NOT NULL,
  `senha_usuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`, `email_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`logs_acessos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`logs_acessos_usuarios` (
  `id_log` INT NOT NULL AUTO_INCREMENT,
  `data_hora_log` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `cod_usuario_log` BIGINT NOT NULL,
  `sistema_op_log` VARCHAR(45) NOT NULL,
  `local_log` VARCHAR(45) NOT NULL,
  `ip_log` VARCHAR(45) NOT NULL,
  `dispositivo_log` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_log`, `data_hora_log`),
  INDEX `fk_logs_acessos_usuarios_usuarios_idx` (`cod_usuario_log` ASC) VISIBLE,
  CONSTRAINT `fk_logs_acessos_usuarios_usuarios`
    FOREIGN KEY (`cod_usuario_log`)
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuarios_registros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`usuarios_registros` (
  `id_usario_registro` VARCHAR(15) NOT NULL,
  `cod_usuario_registro` BIGINT NOT NULL,
  `data_usuario_registro` DATE NOT NULL,
  `hora_entrada_usuario_registro` TIME NULL,
  `hora_saida_usuario_registro` TIME NULL,
  `hora_saida_usuario_almoco` TIME NULL,
  `hora_retorno_usuario_almoco` TIME NULL,
  PRIMARY KEY (`id_usario_registro`, `cod_usuario_registro`, `data_usuario_registro`),
  INDEX `fk_usuarios_registros_usuarios1_idx` (`cod_usuario_registro` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_registros_usuarios1`
    FOREIGN KEY (`cod_usuario_registro`)
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuarios_horarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`usuarios_horarios` (
  `cod_usuario_horario` BIGINT NOT NULL,
  `dia_semana_usuario_horario` CHAR(1) NOT NULL,
  `hora_entrada_usuario_horario` TIME NOT NULL,
  `hora_saida_usuario_horario` TIME NOT NULL,
  `hora_saida_usuario_almoco` TIME NOT NULL,
  `hora_retorno_usuario_almoco` TIME NOT NULL,
  PRIMARY KEY (`cod_usuario_horario`, `dia_semana_usuario_horario`),
  INDEX `fk_usuarios_horarios_usuarios1_idx` (`cod_usuario_horario` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_horarios_usuarios1`
    FOREIGN KEY (`cod_usuario_horario`)
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;