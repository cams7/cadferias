alter table if exists TB_EQUIPE drop constraint if exists FK_TB_EQU_ID_USU_CRI;
alter table if exists TB_EQUIPE add constraint FK_TB_EQU_ID_USU_CRI foreign key (ID_USUARIO_CRIACAO) references TB_USUARIO;

alter table if exists TB_EQUIPE drop constraint if exists FK_TB_EQU_ID_USU_ALT;
alter table if exists TB_EQUIPE add constraint FK_TB_EQU_ID_USU_ALT foreign key (ID_USUARIO_ALTERACAO) references TB_USUARIO;

alter table if exists TB_FERIAS drop constraint if exists FK_TB_FER_ID_USU_CRI;
alter table if exists TB_FERIAS add constraint FK_TB_FER_ID_USU_CRI foreign key (ID_USUARIO_CRIACAO) references TB_USUARIO;

alter table if exists TB_FERIAS drop constraint if exists FK_TB_FER_ID_USU_ALT;
alter table if exists TB_FERIAS add constraint FK_TB_FER_ID_USU_ALT foreign key (ID_USUARIO_ALTERACAO) references TB_USUARIO;

alter table if exists TB_FERIAS drop constraint if exists FK_TB_FER_ID_FUNC;
alter table if exists TB_FERIAS add constraint FK_TB_FER_ID_FUNC  foreign key (ID_FUNCIONARIO) references TB_FUNCIONARIO;

alter table if exists TB_FOTO_FUNCIONARIO drop constraint if exists FK_TB_FO_FUNC_ID_FUNC;
alter table if exists TB_FOTO_FUNCIONARIO add constraint FK_TB_FO_FUNC_ID_FUNC foreign key (ID_FUNCIONARIO) references TB_FUNCIONARIO;

alter table if exists TB_FUNCIONARIO drop constraint if exists FK_TB_FUNC_ID_USU_CRI;
alter table if exists TB_FUNCIONARIO add constraint FK_TB_FUNC_ID_USU_CRI foreign key (ID_USUARIO_CRIACAO) references TB_USUARIO;

alter table if exists TB_FUNCIONARIO drop constraint if exists FK_TB_FUNC_ID_USU_ALT;
alter table if exists TB_FUNCIONARIO add constraint FK_TB_FUNC_ID_USU_ALT foreign key (ID_USUARIO_ALTERACAO) references TB_USUARIO;

alter table if exists TB_FUNCIONARIO drop constraint if exists FK_TB_FUNC_ID_EQU;
alter table if exists TB_FUNCIONARIO add constraint FK_TB_FUNC_ID_EQU foreign key (ID_EQUIPE) references TB_EQUIPE;

alter table if exists TB_FUNCIONARIO drop constraint if exists FK_TB_FUNC_ID_USU;
alter table if exists TB_FUNCIONARIO add constraint FK_TB_FUNC_ID_USU foreign key (ID_USUARIO) references TB_USUARIO;

alter table if exists TB_USUARIO drop constraint if exists FK_TB_USU_ID_USU_CRI;
alter table if exists TB_USUARIO add constraint FK_TB_USU_ID_USU_CRI foreign key (ID_USUARIO_CRIACAO) references TB_USUARIO;

alter table if exists TB_USUARIO drop constraint if exists FK_TB_USU_ID_USU_ALT;
alter table if exists TB_USUARIO add constraint FK_TB_USU_ID_USU_ALT foreign key (ID_USUARIO_ALTERACAO) references TB_USUARIO;

alter table if exists TB_USUARIO_FUNCIONALIDADE drop constraint if exists FK_TB_TB_USU_FUNC_ID_FUNC;
alter table if exists TB_USUARIO_FUNCIONALIDADE add constraint FK_TB_TB_USU_FUNC_ID_FUNC foreign key (ID_FUNCIONALIDADE) references tb_funcionalidade;

alter table if exists TB_USUARIO_FUNCIONALIDADE drop constraint if exists FK_TB_TB_USU_FUNC_ID_USU;
alter table if exists TB_USUARIO_FUNCIONALIDADE add constraint FK_TB_TB_USU_FUNC_ID_USU foreign key (ID_USUARIO) references TB_USUARIO;