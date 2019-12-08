alter table tb_funcionalidade add constraint uk_tb_func_nome unique (nome);
alter table tb_funcionario add constraint uk_tb_func_id_usu unique (id_usuario);
alter table tb_funcionario add constraint uk_tb_func_matr unique (matricula);