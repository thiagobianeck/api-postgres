CREATE TABLE usuario (
	id serial NOT NULL,
	"role" varchar(30) NOT NULL,
	nome varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(64) NOT NULL,
	created_by int4 NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_by int4 NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_usuario PRIMARY KEY (id),
	CONSTRAINT fk_usuario_usuario_created FOREIGN KEY (created_by) REFERENCES usuario(id),
	CONSTRAINT fk_usuario_usuario_updated FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE tipo_elemento (
	id serial NOT NULL,
	descricao text NOT NULL,
	codigo varchar(3) NOT NULL,
	created_by int4 NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_by int4 NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_tipo_elemento PRIMARY KEY (id),
	CONSTRAINT fk_tipo_elemento_usuario_created FOREIGN KEY (created_by) REFERENCES usuario(id),
	CONSTRAINT fk_tipo_elemento_usuario_updated FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE sistema (
	id serial NOT NULL,
	descricao text NOT NULL,
	created_by int4 NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_by int4 NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_sistema PRIMARY KEY (id),
	CONSTRAINT fk_sistema_usuario_created FOREIGN KEY (created_by) REFERENCES usuario(id),
	CONSTRAINT fk_sistema_usuario_updated FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE elemento (
	id serial NOT NULL,
	descricao text NOT NULL,
	caracteristicas text NOT NULL,
	tipo_elemento_id int4 NULL,
	sistema_id int4 NULL,
	created_by int4 NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_by int4 NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_elemento PRIMARY KEY (id),
	CONSTRAINT fk_elemento_sistema FOREIGN KEY (sistema_id) REFERENCES sistema(id),
	CONSTRAINT fk_elemento_tipo_elemento FOREIGN KEY (tipo_elemento_id) REFERENCES tipo_elemento(id),
	CONSTRAINT fk_elemento_usuario_created FOREIGN KEY (created_by) REFERENCES usuario(id),
	CONSTRAINT fk_elemento_usuario_updated FOREIGN KEY (updated_by) REFERENCES usuario(id)
);

CREATE TABLE public.manutencao (
	id serial NOT NULL,
	atividade varchar(255) NOT NULL,
	elemento_id int4 NOT NULL,
	periodicidade varchar(2) NOT NULL,
	situacao varchar(2) NOT NULL,
	data_manutencao timestamp NULL,
	responsavel varchar(100) NOT NULL,
	observacoes text NULL,
	tipo_manutenção varchar(45) NULL,
	created_by int4 NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_by int4 NULL,
	updated_at timestamp NULL,
	CONSTRAINT pk_manutencao PRIMARY KEY (id),
	CONSTRAINT fk_manutencao_elemento FOREIGN KEY (elemento_id) REFERENCES elemento(id),
	CONSTRAINT fk_manutencao_usuario_created FOREIGN KEY (created_by) REFERENCES usuario(id),
	CONSTRAINT fk_manutencao_usuario_updated FOREIGN KEY (updated_by) REFERENCES usuario(id)
);