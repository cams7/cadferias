alter table tb_equipe add constraint fk_tb_equ_id_usu_cri foreign key (id_usuario_criacao) references tb_usuario;
alter table tb_ferias add constraint fk_tb_fer_id_usu_cri foreign key (id_usuario_criacao) references tb_usuario;
alter table tb_ferias add constraint fk_tb_fer_id_usu_alt foreign key (id_usuario_alteracao) references tb_usuario;
alter table tb_ferias add constraint fk_tb_fer_id_func foreign key (id_funcionario) references tb_funcionario;
alter table tb_foto_funcionario add constraint fk_tb_fo_func_id_func foreign key (id_funcionario) references tb_funcionario;
alter table tb_funcionario add constraint fk_tb_func_id_usu_cri foreign key (id_usuario_criacao) references tb_usuario;
alter table tb_funcionario add constraint fk_tb_func_id_usu_alt foreign key (id_usuario_alteracao) references tb_usuario;
alter table tb_funcionario add constraint fk_tb_func_id_equ foreign key (id_equipe) references tb_equipe;
alter table tb_funcionario add constraint fk_tb_func_id_usu foreign key (id_usuario) references tb_usuario;
alter table tb_usuario add constraint fk_tb_usu_id_usu_cri foreign key (id_usuario_criacao) references tb_usuario;
alter table tb_usuario add constraint fk_tb_usu_id_usu_alt foreign key (id_usuario_alteracao) references tb_usuario;
alter table tb_usuario_funcionalidade add constraint fk_tb_tb_usu_func_id_func foreign key (id_funcionalidade) references tb_funcionalidade;
alter table tb_usuario_funcionalidade add constraint fk_tb_tb_usu_func_id_usu foreign key (id_usuario) references tb_usuario;