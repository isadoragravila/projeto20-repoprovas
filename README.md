# <p align = "center"> Projeto RepoProvas </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/102394075/190261240-d9a23716-be95-447d-934c-62c88f0bb1a9.jpg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-isadoragravila-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/isadoragravila/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

Sistema de compartilhamento de provas entre estudantes

***

## :computer:	 Tecnologias e Conceitos

- Node.js
- TypeScript
- PostgreSQL
- JWTs

***

## :rocket: Rotas

### Rota: POST ```/sign-up```
  - **Função**: Registro de usuários;
  - **Request:** body no formato:
```json
{
  "email": "teste@email.com", //string (email)
  "password": "1234567890" //string (min 10 dígitos)
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 409: email já cadastrado;
    - 422: erro no formato do body.

### Rota: POST ```/sign-in```
  - **Função**: Login de usuários;
  - **Request:** body no formato:
```json
{
  "email": "teste@email.com", //string (email)
  "password": "1234567890" //string (min 10 dígitos)
}
```
- **Retorno:**
```json
{
  "token": "$token" //token gerado por jwt
}
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: email ou senha incorretos;
    - 422: erro no formato do body.

### Rota: POST ```/exams```
  - **Função**: Cadastro de provas (autenticada);
  - **Headers:** ```{ "Authorization": "Bearer $token" }```
  - **Request:** body no formato:
```json
{
  "name": "Projeto JavaScript",
  "pdfUrl": "https://www.site.com/",
  "categoryId": 1,
  "disciplineId": 2,
  "teacherId": 1
}
```
- **Retorno:**
```json
{
   "id": 1,
  "name": "Projeto JavaScript",
  "pdfUrl": "https://www.site.com/",
  "categoryId": 1,
  "disciplineId": 2,
  "teacherId": 1
}
```
  - **StatusCodes**:
    - 201: sucesso na criação;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token) ou categoria, disciplina ou professor não encontrados;
    - 409: professor não está relacionado com a disciplina;
    - 422: erro no formato do body.