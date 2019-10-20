--DELETE FROM TB_FERIAS;
--ALTER SEQUENCE SQ_FERIAS RESTART WITH 1;
--DELETE FROM TB_FUNCIONARIO;
--ALTER SEQUENCE SQ_FUNCIONARIO RESTART WITH 1;
--DELETE FROM TB_EQUIPE;
--ALTER SEQUENCE SQ_EQUIPE RESTART WITH 1;
--DELETE FROM TB_USUARIO_FUNCAO;
--DELETE FROM TB_USUARIO;
--ALTER SEQUENCE SQ_USUARIO RESTART WITH 1;
--DELETE FROM TB_FUNCAO;
--ALTER SEQUENCE SQ_FUNCAO RESTART WITH 1;

--senha: abc12345
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'jorge78@teste.com',     '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, NULL, NOW(), NULL, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'diego68@teste.com',     '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 1, NOW(), 1, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'carolina77@teste.com',  '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 1, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'leticia84@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 2, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'jessica74@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 3, NOW(), 1, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'gael86@teste.com',      '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 3, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'jennifer80@teste.com',  '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 3, NOW(), 3, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'julio84@teste.com',     '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 2, NOW(), 3, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'allana92@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 4, NOW(), 3, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'bernado86@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 5, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'allana80@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 6, NOW(), 1, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'lavinia91@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 4, NOW(), 4, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'marcos84@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 5, NOW(), 4, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'liz82@teste.com',       '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 3, NOW(), 5, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'jaqueline73@teste.com', '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 2, NOW(), 6, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'theo83@teste.com',      '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 3, NOW(), 7, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'benicio93@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 4, NOW(), 6, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'jaqueline84@teste.com', '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 5, NOW(), 5, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'regina69@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 6, NOW(), 4, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'sebastiao81@teste.com', '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 7, NOW(), 1, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'andreia93@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 8, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'bernardo75@teste.com',  '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 9, NOW(), 9, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'oliver67@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 8, NOW(), 8, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'fabiana81@teste.com',   '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 7, NOW(), 8, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'igor68@teste.com',      '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 6, NOW(), 9, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'igor95@teste.com',      '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 5, NOW(), 1, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'luana76@teste.com',     '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 4, NOW(), 3, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'betina77@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 9, NOW(), 2, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'pietro78@teste.com',    '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 7, NOW(), 9, NOW());
INSERT INTO TB_USUARIO (ID_USUARIO, EMAIL, SENHA, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_USUARIO.NEXTVAL, 'davi83@teste.com',      '$2a$10$La7k40SK9fyVMgBa4z1KseOzfn5J.hZMffKIdpcyTWkM61gFD4Oia', TRUE, 6, NOW(), 8, NOW());

INSERT INTO TB_FUNCAO(ID_FUNCAO, NOME) VALUES(SQ_FUNCAO.NEXTVAL, 'ROLE_USER');
INSERT INTO TB_FUNCAO(ID_FUNCAO, NOME) VALUES(SQ_FUNCAO.NEXTVAL, 'ROLE_ADMIN');

INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (1, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (1, 2);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (2, 2);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (3, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (4, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (5, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (6, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (7, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (8, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (9, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (10, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (11, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (12, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (13, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (14, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (15, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (16, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (17, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (18, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (19, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (20, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (21, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (22, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (23, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (24, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (25, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (26, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (27, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (28, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (29, 1);
INSERT INTO TB_USUARIO_FUNCAO(ID_USUARIO, ID_FUNCAO) VALUES (30, 1);

INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Lourdes',         TRUE, 1, NOW(), 4, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Savassi',         TRUE, 2, NOW(), 7, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Belvedere',       TRUE, 3, NOW(), 6, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Pampulha',        TRUE, 4, NOW(), 8, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Anchieta',        TRUE, 5, NOW(), 3, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Sion',            TRUE, 1, NOW(), 2, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Buritis',         TRUE, 3, NOW(), 8, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Santa Efigênia',  TRUE, 2, NOW(), 2, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Cidade Jardim',   TRUE, 4, NOW(), 4, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Barro Preto',     TRUE, 5, NOW(), 3, NOW());
INSERT INTO TB_EQUIPE (ID_EQUIPE, NOME, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_EQUIPE.NEXTVAL, 'Santo Agostinho', TRUE, 1, NOW(), 6, NOW());

INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2016-05-01', '1000100010001', 1,  1,  'Jorge Marcelo Viana',                   '1978-02-02', 'Travessa Melancia',                      896, 'Montanhês',                        'Rio Branco',     'AC', '68983377124', TRUE, 2, NOW(), 1, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2014-07-01', '1000100010002', 2,  2,  'Diego Edson Enrico Lima',               '1968-05-07', 'Rua Guariúba',                           427, 'Loteamento Novo Horizonte',        'Rio Branco',     'AC', '68999764219', TRUE, 3, NOW(), 9, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2018-02-11', '1000100010003', 3,  3,  'Carolina Esther Duarte',                '1977-11-06', 'Rua Pernambuco',                         629, 'Bosque',                           'Rio Branco',     'AC', '68982351667', TRUE, 4, NOW(), 8, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2010-09-21', '1000100010004', 4,  4,  'Letícia Nina Silveira',                 '1984-02-26', 'Rua São Jorge',                          769, 'São Geraldo',                      'Ariquemes',      'RO', '69984541610', TRUE, 5, NOW(), 6, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2005-11-10', '1000100010005', 5,  5,  'Jéssica Isabelle da Costa',             '1974-06-11', 'Rua Alfredo Zaire',                      496, 'Conjunto Bela Vista',              'Rio Branco',     'AC', '68988571317', TRUE, 6, NOW(), 5, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2009-04-01', '1000100010006', 6,  6,  'Gael Felipe Miguel Peixoto',            '1986-10-20', 'Rua Coronel Favorino',                   142, 'Getúlio Vargas',                   'Bagé',           'RS', '53985863230', TRUE, 7, NOW(), 2, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2018-02-10', '1000100010007', 7,  7,  'Jennifer Jéssica Ferreira',             '1980-07-27', 'Rua José Alberice',                      936, 'José Bonifácio',                   'Erechim',        'RS', '54981060076', TRUE, 8, NOW(), 3, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2017-09-08', '1000100010008', 8,  8,  'Julio Pedro Henrique Nogueira',         '1984-02-25', 'Rua Halley Mestrinho',                   478, 'Ponta Negra',                      'Natal',          'RN', '84997570827', TRUE, 9, NOW(), 4, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2011-03-05', '1000100010009', 9,  9,  'Allana Amanda Gonçalves',               '1992-11-23', 'Rua Pedro Leandro Vitorino',             300, 'Mina do Mato',                     'Criciúma',       'SC', '48994331876', TRUE, 7, NOW(), 8, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2008-06-12', '1000100010010', 10, 10, 'Bernardo Iago Fernandes',               '1986-05-05', 'Rua Martelo',                            989, 'Ayrton Sena',                      'Rio Branco',     'AC', '68996129206', TRUE, 6, NOW(), 7, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2007-04-19', '1000100010011', 11, 11, 'Allana Emilly Milena Figueiredo',       '1980-08-23', 'Rua Bartolomeu Bueno',                   412, 'Bosque',                           'Rio Branco',     'AC', '68981803745', TRUE, 5, NOW(), 5, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2006-07-10', '1000100010012', 12, 10, 'Lavínia Eloá Bernardes',                '1991-09-07', 'Rua Honduras',                           500, 'Setor 10',                         'Ariquemes',      'RO', '69988599725', TRUE, 5, NOW(), 3, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2005-12-11', '1000100010013', 13, 5,  'Marcos Paulo Gonçalves',                '1984-10-10', 'Travessa Dois A',                        331, 'Lamarão',                          'Aracaju',        'SE', '79987663712', TRUE, 8, NOW(), 2, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2006-07-21', '1000100010014', 14, 3,  'Liz Marlene Barbosa',                   '1982-01-08', 'Rua Adão Jose Pinto de Almeida',         178, 'Loteamento Quitéria Teruel Lopes', 'Rondonópolis',   'MT', '66998257668', TRUE, 6, NOW(), 4, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2004-08-25', '1000100010015', 15, 10, 'Jaqueline Vanessa Rezende',             '1973-12-15', 'Passagem Independência',                 617, 'Umarizal',                         'Belém',          'PA', '91993386638', TRUE, 3, NOW(), 9, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2008-11-02', '1000100010016', 16, 1,  'Theo Thiago Sérgio da Luz',             '1983-07-23', 'Rua das Árvores',                        434, 'Nova Marabá',                      'Marabá',         'PA', '94983638974', TRUE, 2, NOW(), 3, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2006-08-10', '1000100010017', 17, 2,  'Benício Rafael Francisco Drumond',      '1993-08-24', 'Rua Tonga',                              460, 'Cidade Continental-Setor Oceania', 'Serra',          'ES', '27997959392', TRUE, 1, NOW(), 1, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2006-06-14', '1000100010018', 18, 7,  'Jaqueline Betina Isabel Peixoto',       '1984-05-14', 'Rua Itahaem',                            996, 'Piratininga (Venda Nova)',         'Belo Horizonte', 'MG', '31989691579', TRUE, 4, NOW(), 8, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2006-05-22', '1000100010019', 19, 2,  'Regina Andreia Antônia Viana',          '1969-12-20', 'Rua Governador Aquilino Mota Duarte',    527, 'São Francisco',                    'Boa Vista',      'RR', '95993811968', TRUE, 5, NOW(), 2, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2001-04-10', '1000100010020', 20, 3,  'Sebastião Rafael Filipe da Conceição',  '1981-12-26', 'Rua 8',                                  136, 'Pedras',                           'Fortaleza',      'CE', '85989282058', TRUE, 4, NOW(), 4, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2005-05-21', '1000100010021', 21, 4,  'Andrea Caroline Pietra Rocha',          '1993-06-19', 'Rua Dois',                               374, 'Milionários (Barreiro)',           'Belo Horizonte', 'MG', '31981061691', TRUE, 3, NOW(), 6, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2004-09-22', '1000100010022', 22, 5,  'Bernardo Cláudio Silva',                '1975-02-20', 'Rua Vigário Luiz Azevedo',               866, 'Parque do Itatiaia',               'Gravataí',       'RS', '51985390557', TRUE, 8, NOW(), 7, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2001-11-22', '1000100010023', 23, 4,  'Oliver Manuel Corte Real',              '1967-05-13', 'Rua Nélio Abreu',                        380, 'Vila Nova',                        'Blumenau',       'SC', '47999830217', TRUE, 7, NOW(), 8, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2007-08-20', '1000100010024', 24, 5,  'Fabiana Melissa Pietra da Luz',         '1981-04-05', 'Rua Gameleira',                          766, 'Nova Parnamirim',                  'Parnamirim',     'RN', '84991643194', TRUE, 5, NOW(), 9, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2007-08-20', '1000100010025', 25, 6,  'Igor Levi Cavalcanti',                  '1968-09-14', 'Rua Juriti',                             197, 'Monte Castelo',                    'Campo Grande',   'MS', '67989504086', TRUE, 6, NOW(), 3, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2001-06-22', '1000100010026', 26, 4,  'Igor Manuel Gomes',                     '1995-01-14', 'Avenida Aeroporto',                      737, 'Vila São José',                    'Rondonópolis',   'MT', '66996697028', TRUE, 2, NOW(), 4, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2002-07-20', '1000100010027', 27, 3,  'Luana Mirella Duarte',                  '1976-10-25', 'Rua Hugo Herrmann Filho',                199, 'Jardim Lindóia',                   'Porto Alegre',   'RS', '51987304446', TRUE, 3, NOW(), 5, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2009-04-20', '1000100010028', 28, 8,  'Betina Tatiane Giovanna Jesus',         '1977-10-02', 'Rua Doutor Júlio Drumond 55',            636, 'Celeste',                          'Ferros',         'MG', '31993788335', TRUE, 2, NOW(), 4, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2002-04-24', '1000100010029', 29, 9,  'Pietro Alexandre Jesus',                '1978-07-19', 'Rua Antônio Vaz',                        194, 'Areias',                           'Recife',         'PE', '81985868991', TRUE, 4, NOW(), 2, NOW());
INSERT INTO TB_FUNCIONARIO (ID_FUNCIONARIO, DATA_CONTRATACAO, MATRICULA, ID_USUARIO, ID_EQUIPE, NOME, DATA_NASCIMENTO, LOGRADOURO, NUMERO_RESIDENCIAL, BAIRRO, CIDADE, UF, TELEFONE, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FUNCIONARIO.NEXTVAL, '2003-05-15', '1000100010030', 30, 6,  'Davi Marcos Vinicius Alexandre Duarte', '1983-01-08', 'Rua Promotora Terezinha Lopes de Moura', 350, 'Estação Velha',                    'Campina Grande', 'PB', '83981048078', TRUE, 8, NOW(), 3, NOW());

INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2019-08-20', '2019-09-10', 1,  TRUE, 1,  NOW(), 1, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2019-09-21', '2019-10-15', 2,  TRUE, 2,  NOW(), 2, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2019-09-30', '2019-10-28', 3,  TRUE, 3,  NOW(), 2, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-01-02', '2020-01-29', 7,  TRUE, 4,  NOW(), 3, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-01-10', '2020-02-05', 8,  TRUE, 5,  NOW(), 3, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-01-20', '2020-02-15', 11, TRUE, 6,  NOW(), 3, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-01-28', '2020-02-25', 16, TRUE, 7,  NOW(), 4, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-02-05', '2020-02-25', 19, TRUE, 8,  NOW(), 4, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-02-03', '2020-02-28', 25, TRUE, 9,  NOW(), 4, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-02-10', '2020-03-05', 26, TRUE, 10, NOW(), 4, NOW());
INSERT INTO TB_FERIAS (ID_FERIAS, DATA_INICIAL, DATA_FINAL, ID_FUNCIONARIO, ATIVO, ID_USUARIO_CRIACAO, DATA_HORA_CRIACAO, ID_USUARIO_ALTERACAO, DATA_HORA_ALTERACAO) VALUES(SQ_FERIAS.NEXTVAL, '2020-02-15', '2020-03-10', 29, TRUE, 11, NOW(), 5, NOW());