# Clinica 2 API
Uma API REST para realizar o controle de filas de atendimento dos médicos de um hospital veterinário.

## Compilação

Para compilar é necessário possuir o gerenciador de pacotes npm ou yarn 
e executará os seguintes comandos.
- npm i
- npm run build 
- npm start

Ou caso possua o docker apenas:
- docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

## Rotas da API

- **POST** /api/speciality - *Cadastro de Especialidade*
- **GET** /api/speciality - *Listagem de Especialidades*
- **GET** /api/speciality/:id - *Buscar uma Especialidade pelo id*
- **GET** /api/speciality/name/:name - *Buscar uma Especialidade pelo nome*
- **DELETE** /api/speciality/:id - *Apagar Especialidade*

+ **POST** /api/doctor - *Cadastro de Médico*
+ **GET** /api/doctor - *Listagem de Médicos*
+ **GET** /api/doctor/speciality/:speciality - *Listagem de Médicos por Especialidade*
+ **GET** /api/doctor/:id - *Buscar um Médico pelo id*
+ **PUT** /api/doctor/:id - *Atualizar informações do médico*
+ **DELETE** /api/doctor/:id - *Apagar médico*
+ **DELETE** /api/doctor/soft/:id - *"Desativar" médico*

* **POST** /api/appointment - *Cadastrar Consulta para um animal*
* **GET** /api/appointment - *Listar Consultas*
* **GET** /api/appointment/speciality/:speciality - *Listar Consultas por Especialidade*
* **GET** /api/appointment/pending - *Listar Consultas pendentes*
* **GET** /api/appointment/next/:doctor_id - *Próxima Consulta de um médico*
* **GET** /api/appointment/:id - *Buscar um Consulta pelo id*
* **PUT** /api/appointment/done/:id - *Marcar consulta como realizada*
* **PUT** /api/appointment/cancel/:id - *Remover animal da fila por cancelamento*
* **DELETE** /api/appointment/:id - *Apagar Consulta*
* **DELETE** /api/appointment/soft/:id - *"Desativar" Consulta*

## Exemplos de Request

### *Cadastro de Especialidade*

**POST** /api/speciality

***Body***

```
{
	"name": "Cardiologista"
}
```
***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Cardiologista",
    "created_at": "2020-09-06T20:46:05.668Z",
    "updated_at": null,
    "deleted_at": null
  }
}
```

### *Listagem de Especialidades*

**GET** /api/speciality

***Retorno***

```
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Cardiologista",
      "created_at": "2020-09-06T20:46:05.668Z",
      "updated_at": null,
      "deleted_at": null
    },
    {
      "id": 2,
      "name": "Endocrinologista",
      "created_at": "2020-09-06T20:47:36.646Z",
      "updated_at": null,
      "deleted_at": null
    }
  ]
}
```

### *Buscar uma Especialidade pelo id*

**GET** /api/speciality/:id

***/api/speciality/1***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Cardiologista",
    "created_at": "2020-09-06T20:46:05.668Z",
    "updated_at": null,
    "deleted_at": null
  }
}
```

### *Buscar uma Especialidade pelo nome*

**GET** /api/speciality/name/:name

***/api/speciality/name/Cardiologista***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Cardiologista",
    "created_at": "2020-09-06T20:46:05.668Z",
    "updated_at": null,
    "deleted_at": null
  }
}
```

### *Apagar Especialidade*

**DELETE** /api/speciality/:id

***/api/speciality/2***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Endocrinologista",
    "created_at": "2020-09-06T20:47:36.646Z",
    "updated_at": null,
    "deleted_at": null
  }
}
```

