alter table if exists TB_FUNCIONALIDADE drop constraint if exists UK_TB_FUNC_NOME;
alter table if exists TB_FUNCIONALIDADE add constraint UK_TB_FUNC_NOME unique (NOME);

alter table if exists TB_FUNCIONARIO drop constraint if exists UK_TB_FUNC_ID_USU;
alter table if exists TB_FUNCIONARIO add constraint UK_TB_FUNC_ID_USU unique (ID_USUARIO);

alter table if exists TB_FUNCIONARIO drop constraint if exists UK_TB_FUNC_MATR;
alter table if exists TB_FUNCIONARIO add constraint UK_TB_FUNC_MATR unique (MATRICULA);