-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- Copiando estrutura do banco de dados para ponto_eletronico
CREATE DATABASE IF NOT EXISTS `ponto_eletronico` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ponto_eletronico`;
-- Copiando estrutura para função ponto_eletronico.fn_consulta_id
DELIMITER //
CREATE FUNCTION `fn_consulta_id`(nome VARCHAR(45)) RETURNS bigint
BEGIN
DECLARE id BIGINT;
SELECT id_usuario INTO id FROM usuarios WHERE nome_usuario = nome;
RETURN id;
END//
DELIMITER ;
-- Copiando estrutura para função ponto_eletronico.fn_consulta_id_email
DELIMITER //
CREATE FUNCTION `fn_consulta_id_email`(email VARCHAR(100), senha VARCHAR(45)) RETURNS bigint
BEGIN
DECLARE id_usuario_email BIGINT;
SELECT id_usuario INTO id_usuario_email FROM usuarios WHERE email_usuario = email AND senha_usuario = senha;
RETURN id_usuario_email;
END//
DELIMITER ;
-- Copiando estrutura para função ponto_eletronico.fn_consulta_letras_nome
DELIMITER //
CREATE FUNCTION `fn_consulta_letras_nome`(id BIGINT) RETURNS varchar(2) CHARSET utf8mb4
BEGIN
DECLARE letrasNome VARCHAR(2);
SELECT UCASE(SUBSTRING(nome_usuario, 1, 2))  FROM usuarios WHERE id_usuario = id INTO letrasNome;
RETURN letrasNome;
END//
DELIMITER ;
-- Copiando estrutura para função ponto_eletronico.fn_data_atual
DELIMITER //
CREATE FUNCTION `fn_data_atual`() RETURNS varchar(10) CHARSET utf8mb4
BEGIN
DECLARE retorno VARCHAR(10);
SELECT DATE_FORMAT(CURRENT_TIMESTAMP(), '%Y%m%d') INTO retorno;
RETURN retorno;
END//
DELIMITER ;
-- Copiando estrutura para função ponto_eletronico.fn_verifica_dados
DELIMITER //
CREATE FUNCTION `fn_verifica_dados`(email VARCHAR(100), senha VARCHAR(45)) RETURNS bit(1)
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
END//
DELIMITER ;
-- Copiando estrutura para tabela ponto_eletronico.logs_acessos_usuarios
CREATE TABLE IF NOT EXISTS `logs_acessos_usuarios` (
`id_log` bigint NOT NULL AUTO_INCREMENT,
`data_hora_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`cod_usuario_log` bigint NOT NULL,
`sistema_op_log` varchar(45) NOT NULL,
`local_log` varchar(45) NOT NULL,
`ip_log` varchar(45) NOT NULL,
`dispositivo_log` varchar(45) NOT NULL,
PRIMARY KEY (`id_log`,`data_hora_log`),
KEY `fk_logs_acessos_usuarios_usuarios_idx` (`cod_usuario_log`),
CONSTRAINT `fk_logs_acessos_usuarios_usuarios` FOREIGN KEY (`cod_usuario_log`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Exportação de dados foi desmarcado.
-- Copiando estrutura para procedure ponto_eletronico.pd_logs_acessos_usuarios_insert
DELIMITER //
CREATE PROCEDURE `pd_logs_acessos_usuarios_insert`(codigo BIGINT, sistema VARCHAR(45), local_acesso VARCHAR(45), ip VARCHAR(45), dispositivo VARCHAR(45))
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
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_filtro_select
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_filtro_select`(cod_usuario BIGINT, num_ultimos_dias INT, filtro TEXT)
BEGIN
CASE 
WHEN LOWER(filtro) = 'últimos 30 dias' THEN 
CALL pd_usuarios_registros_select_periodo(DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE(), cod_usuario);
WHEN LOWER(filtro) = 'mais recentes' THEN
CALL pd_usuarios_registros_select(cod_usuario, num_ultimos_dias);
WHEN LOWER(filtro) = 'mais antigos' THEN
CALL pd_usuarios_registros_select_asc(cod_usuario, num_ultimos_dias);
END CASE;
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_insert
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_insert`(codigo BIGINT, data_registro DATE, entrada_registro TIME, saida_registro TIME, saida_almoco TIME, retorno_almoco TIME)
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
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_select
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_select`(cod_usuario BIGINT, num_ultimos_dias INT)
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
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_select_asc
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_select_asc`(cod_usuario BIGINT, num_ultimos_dias INT)
BEGIN
SELECT 
`usuarios_registros`.`data_usuario_registro`,
`usuarios_registros`.`hora_entrada_usuario_registro`,
`usuarios_registros`.`hora_saida_usuario_registro`,
`usuarios_registros`.`hora_saida_usuario_almoco`,
`usuarios_registros`.`hora_retorno_usuario_almoco`
FROM `ponto_eletronico`.`usuarios_registros`
WHERE cod_usuario = `usuarios_registros`.`cod_usuario_registro`
ORDER BY `usuarios_registros`.`data_usuario_registro` ASC
LIMIT num_ultimos_dias;
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_select_periodo
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_select_periodo`(inicio DATE, fim DATE, cod_usuario BIGINT)
BEGIN
SELECT 
`usuarios_registros`.`id_usuario_registro`,
`usuarios_registros`.`data_usuario_registro`,
`usuarios_registros`.`hora_entrada_usuario_registro`,
`usuarios_registros`.`hora_saida_usuario_registro`,
`usuarios_registros`.`hora_saida_usuario_almoco`,
`usuarios_registros`.`hora_retorno_usuario_almoco`
FROM `ponto_eletronico`.`usuarios_registros`
WHERE `usuarios_registros`.`data_usuario_registro` >= inicio AND `usuarios_registros`.`data_usuario_registro` <= fim AND cod_usuario_registro = cod_usuario
ORDER BY `usuarios_registros`.`data_usuario_registro` DESC
LIMIT 50;
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.pd_usuarios_registros_update_horarios
DELIMITER //
CREATE PROCEDURE `pd_usuarios_registros_update_horarios`(id_registro VARCHAR(15), cod_usuario BIGINT, data_registro DATE, dado VARCHAR(20), horario TIME)
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
END//
DELIMITER ;
-- Copiando estrutura para tabela ponto_eletronico.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
`id_usuario` bigint NOT NULL AUTO_INCREMENT,
`email_usuario` varchar(100) NOT NULL,
`nome_usuario` varchar(45) NOT NULL,
`senha_usuario` varchar(45) NOT NULL,
PRIMARY KEY (`id_usuario`,`email_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela ponto_eletronico.usuarios_horarios
CREATE TABLE IF NOT EXISTS `usuarios_horarios` (
`cod_usuario_horario` bigint NOT NULL,
`dia_semana_usuario_horario` char(1) NOT NULL,
`hora_entrada_usuario_horario` time NOT NULL,
`hora_saida_usuario_horario` time NOT NULL,
`hora_saida_usuario_almoco` time NOT NULL,
`hora_retorno_usuario_almoco` time NOT NULL,
PRIMARY KEY (`cod_usuario_horario`,`dia_semana_usuario_horario`),
KEY `fk_usuarios_horarios_usuarios1_idx` (`cod_usuario_horario`),
CONSTRAINT `fk_usuarios_horarios_usuarios1` FOREIGN KEY (`cod_usuario_horario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Exportação de dados foi desmarcado.
-- Copiando estrutura para procedure ponto_eletronico.usuarios_horarios_select_registros
DELIMITER //
CREATE PROCEDURE `usuarios_horarios_select_registros`(cod_usuario BIGINT)
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
END//
DELIMITER ;
-- Copiando estrutura para procedure ponto_eletronico.usuarios_horarios_select_registro_dia
DELIMITER //
CREATE PROCEDURE `usuarios_horarios_select_registro_dia`(cod_usuario BIGINT, dia_semana CHAR(1) )
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
END//
DELIMITER ;
-- Copiando estrutura para tabela ponto_eletronico.usuarios_registros
CREATE TABLE IF NOT EXISTS `usuarios_registros` (
`id_usuario_registro` varchar(15) NOT NULL,
`cod_usuario_registro` bigint NOT NULL,
`data_usuario_registro` date NOT NULL,
`hora_entrada_usuario_registro` time DEFAULT NULL,
`hora_saida_usuario_registro` time DEFAULT NULL,
`hora_saida_usuario_almoco` time DEFAULT NULL,
`hora_retorno_usuario_almoco` time DEFAULT NULL,
PRIMARY KEY (`id_usuario_registro`,`cod_usuario_registro`,`data_usuario_registro`),
KEY `fk_usuarios_registros_usuarios1_idx` (`cod_usuario_registro`),
CONSTRAINT `fk_usuarios_registros_usuarios1` FOREIGN KEY (`cod_usuario_registro`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Exportação de dados foi desmarcado.
-- Copiando estrutura para trigger ponto_eletronico.tg_usuarios_registros_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `tg_usuarios_registros_insert` BEFORE INSERT ON `usuarios_registros` FOR EACH ROW BEGIN
SET NEW.id_usuario_registro = CONCAT(fn_data_atual(),  fn_consulta_letras_nome(NEW.cod_usuario_registro));
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;