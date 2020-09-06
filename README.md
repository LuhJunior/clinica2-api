# Clinica 2 API
Uma API REST para realizar o controle de filas de atendimento dos médicos de um hospital veterinário.

# Compilação

Para compilar é necessário possuir o gerenciador de pacotes npm ou yarn 
e executará os seguintes comandos.
- npm i
- npm run build 
- npm start

# Rotas da API

## Especialidade
### Cadastro de Especialidade
#### POST /api/speciality
### Listagem de Especialidade
#### GET /api/speciality
### Apagar Especialidade
#### DELETE /api/speciality

## Médico
### Cadastro de médico
#### POST /api/doctor
### Listagem de médicos
#### GET /api/doctor
### Atualizar informações do médico
#### PUT /api/doctor/:id
### Apagar médico
#### DELETE /api/doctor/:id
### "Desativar" médico
#### DELETE /api/doctor/soft/:id

## Consulta
### Cadastrar consulta para um animal
#### POST /api/appointment
### Listar consultas
#### GET /api/appointment
### Próxima Consulta de um médico
#### GET /api/appointment/next/:doctor_id
### Marcar consulta como realizada
#### PUT /api/appointment/done/:id
### Remover animal da fila por cancelamento
#### PUT /api/appointment/cancel/:id

