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

#

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

#

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

#

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

#

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

#

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

### *Cadastro de Médico*

#

**POST** /api/doctor

***Body***

```
{
	"name": "Teste",
	"speciality_id": 1
}
```
***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Teste",
    "speciality_id": 1,
    "created_at": "2020-09-06T21:00:14.406Z",
    "updated_at": null,
    "deleted_at": null,
    "speciality": "Cardiologista"
  }
}
```

### *Listagem de Médicos*

#

**GET** /api/doctor

***Retorno***

```
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Teste 2",
      "speciality_id": 2,
      "created_at": "2020-09-06T20:58:53.079Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Endocrinologista"
    },
    {
      "id": 2,
      "name": "Teste 3",
      "speciality_id": 1,
      "created_at": "2020-09-06T20:59:00.782Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista"
    }
  ]
}
```

### *Listagem de Médicos por Especialidade*

#

**GET** /api/doctor/speciality/:speciality

***/api/doctor/speciality/Endocrinologista***

***Retorno***

```
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Teste 2",
      "speciality_id": 2,
      "created_at": "2020-09-06T20:58:53.079Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Endocrinologista"
    }
  ]
}
```

### *Buscar um Médico pelo id*

#

**GET** /api/doctor/:id

***/api/doctor/2***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Teste 3",
    "speciality_id": 1,
    "created_at": "2020-09-06T21:00:14.406Z",
    "updated_at": null,
    "deleted_at": null,
    "speciality": "Cardiologista"
  }
}
```

### *Atualizar informações do médico*

#

**PUT** /api/doctor/:id


***Body***

```
{
	"name": "Teste 2",
	"speciality_id": 1
}
```

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Teste 2",
    "speciality_id": 1,
    "created_at": "2020-09-06T20:59:00.782Z",
    "updated_at": "2020-09-06T20:59:20.128Z",
    "deleted_at": null,
    "speciality": "Cardiologista"
  }
}
```

### *Apagar médico*

#

**DELETE** /api/doctor/:id

***/api/doctor/2***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Teste 2",
    "speciality_id": 1,
    "created_at": "2020-09-06T20:59:00.782Z",
    "updated_at": "2020-09-06T20:59:20.128Z",
    "deleted_at": null,
    "speciality": "Cardiologista"
  }
}
```

### *"Desativar" médico*

#

**DELETE** /api/doctor/soft/:id

***/api/doctor/soft/1***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Teste 4",
    "speciality_id": 2,
    "created_at": "2020-09-06T20:58:53.079Z",
    "updated_at": "2020-09-06T20:59:31.038Z",
    "deleted_at": "2020-09-06T20:59:47.929Z",
    "speciality": "Endocrinologista"
  }
}
```

### *Cadastrar Consulta para um animal*

#

**POST** /api/appointment

***Body***

```
{
	"name": "Goku",
	"specie": "Saiyajin",
	"breed": "Warrior",
	"immediate": true,
	"speciality_id": 1
}
```
***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Goku",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": true,
    "speciality_id": 1,
    "status_id": 0,
    "created_at": "2020-09-06T23:08:50.517Z",
    "updated_at": null,
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "PENDING"
  }
}
```

### *Listar Consultas*

#

**GET** /api/appointment

***Retorno***

```
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Goku",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": false,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T20:59:59.019Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    },
    {
      "id": 2,
      "name": "Vegeta",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": true,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T21:00:47.499Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    }
  ]
}
```

### *Listar Consultas por Especialidade*

#

**GET** /api/appointment/speciality/:speciality

***/api/appointment/speciality/Cardiologista***

***Retorno***

```
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Goku",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": false,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T20:59:59.019Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    },
    {
      "id": 2,
      "name": "Vegeta",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": true,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T21:00:47.499Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    }
  ]
}
```

### *Listar Consultas pendentes*

#

**GET** /api/appointment/pending

***/api/appointment/pending***


***Retorno***

```
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Goku",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": false,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T20:59:59.019Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    },
    {
      "id": 2,
      "name": "Vegeta",
      "specie": "Saiyajin",
      "breed": "Warrior",
      "immediate": true,
      "speciality_id": 1,
      "status_id": 0,
      "created_at": "2020-09-06T21:00:47.499Z",
      "updated_at": null,
      "deleted_at": null,
      "speciality": "Cardiologista",
      "status": "PENDING"
    }
  ]
}
```

### *Próxima Consulta de um médico*

#

**GET** /api/appointment/pending

***/api/appointment/next/:doctor_id***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Goku",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": false,
    "speciality_id": 1,
    "status_id": 0,
    "created_at": "2020-09-06T20:59:59.019Z",
    "updated_at": null,
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "PENDING"
  }
}
```

### *Buscar uma Consulta pelo id*

#

**GET** /api/appointment/:id

***/api/appointment/1***


***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Goku",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": false,
    "speciality_id": 1,
    "status_id": 0,
    "created_at": "2020-09-06T20:59:59.019Z",
    "updated_at": null,
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "PENDING"
  }
}
```

### *Marcar Consulta como realizada*

#

**PUT** /api/appointment/done/:id

***/api/appointment/done/3***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 3,
    "name": "Goku",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": true,
    "speciality_id": 1,
    "status_id": 1,
    "created_at": "2020-09-06T23:08:50.517Z",
    "updated_at": "2020-09-06T23:20:59.734Z",
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "DONE"
  }
}
```

### *Marcar Consulta como cancelada*

#

**PUT** /api/appointment/cancel/:id

***/api/appointment/cancel/4***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 4,
    "name": "Vegeta",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": true,
    "speciality_id": 1,
    "status_id": 2,
    "created_at": "2020-09-06T23:22:59.758Z",
    "updated_at": "2020-09-06T23:23:21.645Z",
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "CANCELED"
  }
}
```

### *Apagar Consulta*

#

**DELETE** /api/appointment/:id

***/api/appointment/1***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Goku",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": false,
    "speciality_id": 1,
    "status_id": 2,
    "created_at": "2020-09-06T20:59:59.019Z",
    "updated_at": "2020-09-06T21:01:11.497Z",
    "deleted_at": null,
    "speciality": "Cardiologista",
    "status": "CANCELED"
  }
}
```

### *"Desativar" Consulta*

**DELETE** /api/appointment/soft/:id

***/api/appointment/soft/2***

***Retorno***

```
{
  "ok": true,
  "data": {
    "id": 2,
    "name": "Vegeta",
    "specie": "Saiyajin",
    "breed": "Warrior",
    "immediate": true,
    "speciality_id": 1,
    "status_id": 0,
    "created_at": "2020-09-06T21:00:47.499Z",
    "updated_at": null,
    "deleted_at": "2020-09-06T21:01:22.583Z",
    "speciality": "Cardiologista",
    "status": "PENDING"
  }
}
```