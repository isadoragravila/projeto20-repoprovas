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
- Prisma
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
  "name": "Projeto JavaScript", //string
  "pdfUrl": "https://www.site.com/", //string (url)
  "categoryId": 1, //number (categorias já cadastradas no banco de dados: 1, 2, 3)
  "disciplineId": 2, //number (disciplinas já cadastradas no banco de dados: 1, 2, 3, 4, 5, 6)
  "teacherId": 1 //number (professores já cadastrados no banco de dados: 1, 2)
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

### Rota: GET ```/exams/disciplines```
  - **Função**: Busca provas agrupadas por disciplinas (autenticada);
  - **Headers:** ```{ "Authorization": "Bearer $token" }```
- **Retorno:**
```json
[
  {
    "termId": 1,
    "termName": 1,
    "disciplines": [
      {
        "disciplineId": 1,
        "disciplineName": "HTML e CSS",
        "categories": [
          {
            "categoryId": 1,
            "categoryName": "Projeto",
            "tests": [
              {
                "testId": 1,
                "testName": "Projeto HTML",
                "pdfUrl": "https://www.site.com/",
                "teacher": "Diego Pinho"
              }
            ]
          },
          {
            "categoryId": 2,
            "categoryName": "Prática",
            "tests": [
              {
                "testId": 2,
                "testName": "Pratica HTML",
                "pdfUrl": "https://www.site.com/",
                "teacher": "Diego Pinho"
              }
            ]
          },
          {
            "categoryId": 3,
            "categoryName": "Recuperação",
            "tests": []
          }
        ]
      },
      {
        "disciplineId": 4,
        "disciplineName": "Humildade",
        "categories": [
          {
            "categoryId": 1,
            "categoryName": "Projeto",
            "tests": []
          },
          {
            "categoryId": 2,
            "categoryName": "Prática",
            "tests": []
          },
          {
            "categoryId": 3,
            "categoryName": "Recuperação",
            "tests": [
              {
                "testId": 3,
                "testName": "Recuperação Humildade",
                "pdfUrl": "https://www.site.com/",
                "teacher": "Bruna Hamori"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "termId": 2,
    "termName": 2,
    "disciplines": []
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

### Rota: GET ```/exams/teachers```
  - **Função**: Busca provas agrupadas por professores (autenticada);
  - **Headers:** ```{ "Authorization": "Bearer $token" }```
- **Retorno:**
```json
[
  {
    "teacherId": 1,
    "teacherName": "Diego Pinho",
    "categories": [
      {
        "categoryId": 1,
        "categoryName": "Projeto",
        "tests": [
          {
            "testId": 1,
            "testName": "Projeto HTML",
            "pdfUrl": "https://www.site.com/",
            "discipline": "HTML e CSS"
          }
        ]
      },
      {
        "categoryId": 2,
        "categoryName": "Prática",
        "tests": [
          {
            "testId": 2,
            "testName": "Pratica HTML",
            "pdfUrl": "https://www.site.com/",
            "discipline": "HTML e CSS"
          }
        ]
      },
      {
        "categoryId": 3,
        "categoryName": "Recuperação",
        "tests": []
      }
    ]
  },
  {
    "teacherId": 2,
    "teacherName": "Bruna Hamori",
    "categories": [
      {
        "categoryId": 1,
        "categoryName": "Projeto",
        "tests": []
      },
      {
        "categoryId": 2,
        "categoryName": "Prática",
        "tests": []
      },
      {
        "categoryId": 3,
        "categoryName": "Recuperação",
        "tests": [
          {
            "testId": 3,
            "testName": "Recuperação Humildade",
            "pdfUrl": "https://www.site.com/",
            "discipline": "Humildade"
          }
        ]
      }
    ]
  }
]
```
  - **StatusCodes**:
    - 200: sucesso;
    - 401: token inválido;
    - 404: usuário não encontrado (verificação do token).

***

