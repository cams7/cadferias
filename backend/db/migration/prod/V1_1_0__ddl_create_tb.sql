drop sequence if exists SQ_FERIAS;
create sequence SQ_FERIAS start 1 increment 1;

drop table if exists TB_FERIAS cascade;
create table TB_FERIAS (
	ID_FERIAS int8 not null,
	ATIVO BOOLEAN DEFAULT TRUE not null,
	DATA_HORA_CRIACAO timestamp not null,
	DATA_HORA_ALTERACAO timestamp not null,
	DATA_FINAL date not null,
	DATA_INICIAL date not null,
	ID_USUARIO_CRIACAO int8,
	ID_USUARIO_ALTERACAO int8,
	ID_FUNCIONARIO int8 not null,
	primary key (ID_FERIAS)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists SQ_FOTO_FUNCIONARIO;
create sequence SQ_FOTO_FUNCIONARIO start 1 increment 1;

drop table if exists TB_FOTO_FUNCIONARIO cascade;
create table TB_FOTO_FUNCIONARIO (
	ID_FOTO_FUNCIONARIO int8 not null,
	EXTENSAO_IMAGEM int4 not null,
	FOTO_FUNCIONARIO oid not null,
	ID_FUNCIONARIO int8 not null,
	primary key (ID_FOTO_FUNCIONARIO)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists SQ_FUNCIONARIO;
create sequence SQ_FUNCIONARIO start 1 increment 1;

drop table if exists TB_FUNCIONARIO cascade;
create table TB_FUNCIONARIO (
	ID_FUNCIONARIO int8 not null,
	ATIVO BOOLEAN DEFAULT TRUE not null,
	DATA_HORA_CRIACAO timestamp not null,
	DATA_HORA_ALTERACAO timestamp not null,
	CIDADE varchar(30) not null,
	NUMERO_RESIDENCIAL int4 not null,
	BAIRRO varchar(50) not null,
	UF CHAR(2) not null,
	LOGRADOURO varchar(50) not null,
	DATA_NASCIMENTO date not null,
	MATRICULA varchar(20) not null,
	DATA_CONTRATACAO date not null,
	NOME varchar(50) not null,
	TELEFONE varchar(255) not null,
	ID_USUARIO_CRIACAO int8,
	ID_USUARIO_ALTERACAO int8,
	ID_EQUIPE int8 not null,
	ID_USUARIO int8 not null,
	primary key (ID_FUNCIONARIO)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists SQ_EQUIPE;
create sequence SQ_EQUIPE start 1 increment 1;

drop table if exists TB_EQUIPE cascade;
create table TB_EQUIPE (
	ID_EQUIPE int8 not null,
	ATIVO BOOLEAN DEFAULT TRUE not null,
	DATA_HORA_CRIACAO timestamp not null,
	DATA_HORA_ALTERACAO timestamp not null,
	NOME varchar(30) not null,
	ID_USUARIO_CRIACAO int8,
	ID_USUARIO_ALTERACAO int8,
	primary key (ID_EQUIPE)
);
---------------------------------------------------------------------------------------------------
drop table if exists TB_USUARIO_FUNCIONALIDADE cascade;
create table TB_USUARIO_FUNCIONALIDADE (
	ID_USUARIO int8 not null,
	ID_FUNCIONALIDADE int8 not null,
	primary key (ID_USUARIO, ID_FUNCIONALIDADE)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists SQ_FUNCIONALIDADE;
create sequence SQ_FUNCIONALIDADE start 1 increment 1;

drop table if exists TB_FUNCIONALIDADE cascade;
create table TB_FUNCIONALIDADE (
	ID_FUNCIONALIDADE int8 not null,
	DESCRICAO varchar(100),
	NOME varchar(50) not null,
	primary key (ID_FUNCIONALIDADE)
);
---------------------------------------------------------------------------------------------------
drop sequence if exists SQ_USUARIO;
create sequence SQ_USUARIO start 1 increment 1;

drop table if exists TB_USUARIO cascade;
create table TB_USUARIO (
	ID_USUARIO int8 not null,
	ATIVO BOOLEAN DEFAULT TRUE not null,
	DATA_HORA_CRIACAO timestamp not null,
	DATA_HORA_ALTERACAO timestamp not null,
	EMAIL varchar(30) not null,
	SENHA varchar(100) not null,
	ID_USUARIO_CRIACAO int8,
	ID_USUARIO_ALTERACAO int8,
	primary key (ID_USUARIO)
);