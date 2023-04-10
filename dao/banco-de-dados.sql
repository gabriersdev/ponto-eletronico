CREATE SCHEMA IF NOT EXISTS ponto_eletronico CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';
USE ponto_eletronico;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET GLOBAL log_bin_trust_function_creators = 1;

/* 
SET @@global.time_zone = '+3:00';
QUIT;
*/

-- -----------------------------------------------------
-- Schema ponto_eletronico
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ponto_eletronico
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ponto_eletronico` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema ponto_eletronico
-- -----------------------------------------------------
USE `ponto_eletronico`;

-- -----------------------------------------------------
-- Table `ponto_eletronico`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`usuarios` (
  `id_usuario` BIGINT NOT NULL AUTO_INCREMENT,
  `email_usuario` VARCHAR(100) NOT NULL,
  `nome_usuario` VARCHAR(45) NOT NULL,
  `senha_usuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`, `email_usuario`))
ENGINE = InnoDB;

DELIMITER $
CREATE FUNCTION fn_verifica_dados(email VARCHAR(100), senha VARCHAR(45)) RETURNS BIT
	BEGIN
		DECLARE id BIGINT;
        DECLARE existe BIT DEFAULT 0;
        SELECT id_usuario AS id INTO id FROM usuarios  WHERE email_usuario = email AND senha_usuario = senha;
        
        IF isnull(id) THEN
			SET existe = 0;
		ELSE 
			SET existe = 1;
		END IF;
        
        RETURN existe;
    END $
DELIMITER ;

DELIMITER $
CREATE FUNCTION fn_consulta_id(nome VARCHAR(45)) RETURNS BIGINT
	BEGIN
		DECLARE id BIGINT;
        SELECT id_usuario INTO id FROM usuarios WHERE nome_usuario = nome;
        RETURN id;
    END $
DELIMITER ;

DELIMITER $
CREATE FUNCTION fn_consulta_id_email(email VARCHAR(100), senha VARCHAR(45)) RETURNS BIGINT
	BEGIN
		DECLARE id_usuario_email BIGINT;
        SELECT id_usuario INTO id_usuario_email FROM usuarios WHERE email_usuario = email AND senha_usuario = senha;
        RETURN id_usuario_email;
    END $
DELIMITER ;

DROP FUNCTION IF EXISTS fn_consulta_id_email;
SELECT  fn_consulta_id_email('administracao@mail.com', '123456ABC');

DELIMITER $
CREATE FUNCTION fn_consulta_letras_nome(id BIGINT) RETURNS VARCHAR(2)
	BEGIN
		DECLARE letrasNome VARCHAR(2);
        SELECT UCASE(SUBSTRING(nome_usuario, 1, 2))  FROM usuarios WHERE id_usuario = id INTO letrasNome;
        RETURN letrasNome;
    END $
DELIMITER ;

-- -----------------------------------------------------
-- Table `ponto_eletronico`.`logs_acessos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`logs_acessos_usuarios` (
  `id_log` BIGINT NOT NULL AUTO_INCREMENT,
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
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELIMITER $
	CREATE PROCEDURE pd_logs_acessos_usuarios_insert(codigo BIGINT, sistema VARCHAR(45), local_acesso VARCHAR(45), ip VARCHAR(45), dispositivo VARCHAR(45))
    BEGIN
		START TRANSACTION;
			INSERT INTO `ponto_eletronico`.`logs_acessos_usuarios`
			(`cod_usuario_log`,
			`sistema_op_log`,
			`local_log`,
			`ip_log`,
			`dispositivo_log`)
			VALUES
			(codigo,
			sistema,
			local_acesso,
			ip,
			dispositivo);
        COMMIT;
    END $
DELIMITER ;

-- -----------------------------------------------------
-- Table `ponto_eletronico`.`usuarios_registros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponto_eletronico`.`usuarios_registros` (
  `id_usuario_registro` VARCHAR(15) NOT NULL,
  `cod_usuario_registro` BIGINT NOT NULL,
  `data_usuario_registro` DATE NOT NULL,
  `hora_entrada_usuario_registro` TIME NULL,
  `hora_saida_usuario_registro` TIME NULL,
  `hora_saida_usuario_almoco` TIME NULL,
  `hora_retorno_usuario_almoco` TIME NULL,
  PRIMARY KEY (`id_usuario_registro`, `cod_usuario_registro`, `data_usuario_registro`),
  INDEX `fk_usuarios_registros_usuarios1_idx` (`cod_usuario_registro` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_registros_usuarios1`
    FOREIGN KEY (`cod_usuario_registro`)
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELIMITER $
	CREATE PROCEDURE pd_usuarios_registros_insert(codigo BIGINT, data_registro DATE, entrada_registro TIME, saida_registro TIME, saida_almoco TIME, retorno_almoco TIME)
    BEGIN
		START TRANSACTION;
			INSERT INTO `ponto_eletronico`.`usuarios_registros`
			(`cod_usuario_registro`,
			`data_usuario_registro`,
			`hora_entrada_usuario_registro`,
			`hora_saida_usuario_registro`,
			`hora_saida_usuario_almoco`,
			`hora_retorno_usuario_almoco`)
			VALUES
			(codigo,
			data_registro,
			entrada_registro,
			saida_registro,
			saida_almoco,
			retorno_almoco);
        COMMIT;
    END $
DELIMITER ;

DELIMITER $
  CREATE PROCEDURE pd_usuarios_registros_select(cod_usuario BIGINT, num_ultimos_dias INT)
  BEGIN
    SELECT 
      `usuarios_registros`.`data_usuario_registro`,
      `usuarios_registros`.`hora_entrada_usuario_registro`,
      `usuarios_registros`.`hora_saida_usuario_registro`,
      `usuarios_registros`.`hora_saida_usuario_almoco`,
      `usuarios_registros`.`hora_retorno_usuario_almoco`
    FROM `ponto_eletronico`.`usuarios_registros`
    WHERE cod_usuario = `usuarios_registros`.`cod_usuario_registro`
    ORDER BY `usuarios_registros`.`data_usuario_registro` DESC
    LIMIT num_ultimos_dias;
  END $
DELIMITER ;

DELIMITER $
	CREATE PROCEDURE pd_usuarios_registros_select_periodo(inicio DATE, fim DATE, cod_usuario BIGINT)
    BEGIN
		SELECT 
			`usuarios_registros`.`data_usuario_registro`,
			`usuarios_registros`.`hora_entrada_usuario_registro`,
			`usuarios_registros`.`hora_saida_usuario_registro`,
			`usuarios_registros`.`hora_saida_usuario_almoco`,
			`usuarios_registros`.`hora_retorno_usuario_almoco`
		FROM `ponto_eletronico`.`usuarios_registros`
        WHERE `usuarios_registros`.`data_usuario_registro` >= inicio AND `usuarios_registros`.`data_usuario_registro` <= fim AND cod_usuario_registro = cod_usuario
        ORDER BY `usuarios_registros`.`data_usuario_registro` DESC
        LIMIT 50;
    END $
DELIMITER ;

DELIMITER $
    CREATE PROCEDURE pd_usuarios_registros_update_horarios(id_registro VARCHAR(15), cod_usuario BIGINT, data_registro DATE, dado VARCHAR(20), horario TIME)
    BEGIN
        CASE 
            WHEN dado = 'entrada_registro' 
            THEN 
                START TRANSACTION;
                    UPDATE usuarios_registros SET hora_entrada_usuario_registro = horario 
                    WHERE id_usuario_registro = id_registro AND cod_usuario_registro = cod_usuario AND data_usuario_registro = data_registro;
                COMMIT;
            
            WHEN dado = 'saida_registro' 
            THEN
                START TRANSACTION;
                    UPDATE usuarios_registros SET hora_saida_usuario_registro = horario
                    WHERE id_usuario_registro = id_registro AND cod_usuario_registro = cod_usuario AND data_usuario_registro = data_registro;
                COMMIT;

            WHEN dado = 'saida_almoco' 
            THEN
                START TRANSACTION;
                    UPDATE usuarios_registros SET hora_saida_usuario_almoco = horario
                    WHERE id_usuario_registro = id_registro AND cod_usuario_registro = cod_usuario AND data_usuario_registro = data_registro;
                COMMIT;

            WHEN dado = 'retorno_almoco' 
            THEN
                START TRANSACTION;
                    UPDATE usuarios_registros SET hora_retorno_usuario_almoco = horario
                    WHERE id_usuario_registro = id_registro AND cod_usuario_registro = cod_usuario AND data_usuario_registro = data_registro;
                COMMIT;

            ELSE 
				SELECT 'Não foi implementado execução de código para este parâmetro';
        END CASE;
    END $
DELIMITER ;

DELIMITER $
CREATE FUNCTION fn_data_atual() RETURNS VARCHAR(10)
	BEGIN
        DECLARE retorno VARCHAR(10);
        SELECT DATE_FORMAT(CURRENT_TIMESTAMP(), '%Y%m%d') INTO retorno;
        RETURN retorno;
    END $
DELIMITER ;

DELIMITER $
CREATE TRIGGER tg_usuarios_registros_insert
	BEFORE INSERT 
    ON usuarios_registros FOR EACH ROW
    BEGIN
		SET NEW.id_usuario_registro = CONCAT(fn_data_atual(),  fn_consulta_letras_nome(NEW.cod_usuario_registro));
    END $
DELIMITER ;

INSERT INTO `ponto_eletronico`.`usuarios_registros`
(`id_usuario_registro`,
`cod_usuario_registro`,
`data_usuario_registro`,
`hora_entrada_usuario_registro`,
`hora_saida_usuario_registro`,
`hora_saida_usuario_almoco`,
`hora_retorno_usuario_almoco`)
VALUES
(1, 1, 20230104, 090000, 140000, NULL, NULL);


-- -----------------------------------------------------
-- Table `ponto_eletronico`.`usuarios_horarios`
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
    REFERENCES `ponto_eletronico`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELIMITER $
	CREATE PROCEDURE usuarios_horarios_select_registros(cod_usuario BIGINT)
    BEGIN
		SELECT 
		`usuarios_horarios`.`dia_semana_usuario_horario`,
		`usuarios_horarios`.`hora_entrada_usuario_horario`,
		`usuarios_horarios`.`hora_saida_usuario_horario`,
		`usuarios_horarios`.`hora_saida_usuario_almoco`,
		`usuarios_horarios`.`hora_retorno_usuario_almoco`
		FROM `ponto_eletronico`.`usuarios_horarios`
        WHERE `usuarios_horarios`.`cod_usuario_horario` = cod_usuario
        ORDER BY `usuarios_horarios`.`dia_semana_usuario_horario` ASC;
    END $
DELIMITER ;

DELIMITER $
	CREATE PROCEDURE usuarios_horarios_select_registro_dia(cod_usuario BIGINT, dia_semana CHAR(1) )
    BEGIN
		SELECT 
        `usuarios_horarios`.`dia_semana_usuario_horario`,
		`usuarios_horarios`.`hora_entrada_usuario_horario`,
		`usuarios_horarios`.`hora_saida_usuario_horario`,
		`usuarios_horarios`.`hora_saida_usuario_almoco`,
		`usuarios_horarios`.`hora_retorno_usuario_almoco`
		FROM `ponto_eletronico`.`usuarios_horarios`
        WHERE `usuarios_horarios`.`cod_usuario_horario` = cod_usuario
        AND `usuarios_horarios`.`dia_semana_usuario_horario` = dia_semana;
    END $
DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;