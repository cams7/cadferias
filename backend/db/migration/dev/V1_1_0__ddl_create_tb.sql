drop sequence if exists sq_ferias;
create sequence sq_ferias start with 1 increment by 1;

drop table tb_ferias if exists;
create table tb_ferias (
	id_ferias bigint not null,
	ativo BOOLEAN DEFAULT TRUE not null,
	data_hora_criacao timestamp not null,
	data_hora_alteracao timestamp not null,
	data_final date not null,
	data_inicial date not null,
	id_usuario_criacao bigint,
	id_usuario_alteracao bigint,
	id_funcionario bigint not null,
	primary key (id_ferias)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists sq_foto_funcionario;
create sequence sq_foto_funcionario start with 1 increment by 1;

drop table tb_foto_funcionario if exists;
create table tb_foto_funcionario (
	id_foto_funcionario bigint not null,
	extensao_imagem integer not null,
	foto_funcionario blob not null,
	id_funcionario bigint not null,
	primary key (id_foto_funcionario)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists sq_funcionario;
create sequence sq_funcionario start with 1 increment by 1;

drop table tb_funcionario if exists;
create table tb_funcionario (
	id_funcionario bigint not null,
	ativo BOOLEAN DEFAULT TRUE not null,
	data_hora_criacao timestamp not null,
	data_hora_alteracao timestamp not null,
	cidade varchar(30) not null,
	numero_residencial integer not null,
	bairro varchar(50) not null,
	uf CHAR(2) not null,
	logradouro varchar(50) not null,
	data_nascimento date not null,
	matricula varchar(20) not null,
	data_contratacao date not null,
	nome varchar(50) not null,
	telefone varchar(255) not null,
	id_usuario_criacao bigint,
	id_usuario_alteracao bigint,
	id_equipe bigint not null,
	id_usuario bigint not null,
	primary key (id_funcionario)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists sq_equipe;
create sequence sq_equipe start with 1 increment by 1;

drop table tb_equipe if exists;
create table tb_equipe (
	id_equipe bigint not null,
	ativo BOOLEAN DEFAULT TRUE not null,
	data_hora_criacao timestamp not null,
	data_hora_alteracao timestamp not null,
	nome varchar(30) not null,
	id_usuario_criacao bigint,
	id_usuario_alteracao bigint,
	primary key (id_equipe)
);
---------------------------------------------------------------------------------------------------
drop table tb_usuario_funcionalidade if exists;
create table tb_usuario_funcionalidade (
	id_usuario bigint not null,
	id_funcionalidade bigint not null,
	primary key (id_usuario, id_funcionalidade)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists sq_funcionalidade;
create sequence sq_funcionalidade start with 1 increment by 1;

drop table tb_funcionalidade if exists;
create table tb_funcionalidade (
	id_funcionalidade bigint not null,
	descricao varchar(100),
	nome varchar(50) not null,
	primary key (id_funcionalidade)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists sq_usuario;
create sequence sq_usuario start with 1 increment by 1;

drop table tb_usuario if exists;
create table tb_usuario (
	id_usuario bigint not null,
	ativo BOOLEAN DEFAULT TRUE not null,
	data_hora_criacao timestamp not null,
	data_hora_alteracao timestamp not null,
	email varchar(30) not null,
	senha varchar(100) not null,
	id_usuario_criacao bigint,
	id_usuario_alteracao bigint,
	primary key (id_usuario)
);