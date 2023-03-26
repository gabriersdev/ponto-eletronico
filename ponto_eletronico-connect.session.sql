DELIMITER $ 
    CREATE PROCEDURE pd_usuarios_registros_select_linha(codigo_usuario BIGINT, data_registro DATE)
    BEGIN
        SELECT 
            `usuarios_registros`.`id_usuario_registro`,
            `usuarios_registros`.`hora_entrada_usuario_registro`,
            `usuarios_registros`.`hora_saida_usuario_registro`,
            `usuarios_registros`.`hora_saida_usuario_almoco`,
            `usuarios_registros`.`hora_retorno_usuario_almoco`
        FROM `ponto_eletronico`.`usuarios_registros`
        WHERE `usuarios_registros`.`cod_usuario_registro` = codigo_usuario AND `usuarios_registros`.`data_usuario_registro` = data_registro;
    END $
DELIMITER ;