

-----

# Gym Management - Projeto de Programação para Web

[](https://www.google.com/search?q=https://github.com/thomasdanton/gym-management-fullstack)

Projeto full-stack desenvolvido para a disciplina de Programação para Web da **Universidade de Pernambuco (UPE)**. O sistema consiste em uma aplicação para gerenciamento de treinos de academia, incluindo o controle de usuários, treinos e exercícios.

**Dupla:**

  * Lucas Emanoel
  * Thomas Danton

-----

## 🚀 Principais Funcionalidades

O sistema permite o gerenciamento completo das principais entidades de uma academia:

### Gerenciamento de Usuários

  - **Criar**, **visualizar**, **editar** e **deletar** usuários.

### Gerenciamento de Treinos

  - **Criar**, **visualizar**, **editar** e **deletar** planos de treino.
  - Associar um treino a um **usuário específico**.

### Gerenciamento de Exercícios

  - **Criar**, **visualizar**, **editar** e **deletar** exercícios.
  - Associar um exercício a um **plano de treino específico**.

A aplicação implementa um fluxo de ponta a ponta, permitindo que um cadastro realizado na interface do front-end seja enviado para a API, gravado no banco de dados e exibido dinamicamente na tela.

-----

## 🛠️ Características e Tecnologias Utilizadas

O projeto foi construído com uma arquitetura moderna, separando claramente as responsabilidades entre o front-end, o back-end e o banco de dados.

### **Back-end**

  * **Linguagem:** Python 3
  * **Framework:** Flask
  * **API:** API RESTful com endpoints para todas as operações de CRUD.
  * **Comunicação com BD:** `mysql-connector-python`
  * **Outros:** `flask-cors` para permitir a comunicação com o front-end.

### **Front-end**

  * **Linguagem:** HTML5, CSS3, JavaScript (ES6 Modules)
  * **Funcionalidades:**
      * Três páginas distintas para o gerenciamento de cada entidade.
      * Consumo de dados da API de forma assíncrona (GET).
      * Envio de dados para criação e atualização via API (POST/PUT).
      * Manipulação dinâmica do DOM para renderizar os dados sem recarregar a página.

### **Banco de Dados**

  * **Sistema:** MySQL (Banco de Dados Relacional)
  * **Estrutura:** 3 tabelas (`usuarios`, `treinos`, `exercicios`) com relacionamentos entre si.

-----

## 🏛️ Arquitetura

O back-end foi desenvolvido utilizando uma arquitetura em camadas para garantir a organização do código, a separação de responsabilidades e a fácil manutenção.

```
[ Front-end (Navegador) ]
        |
        v
[ API REST (Flask) ]  <--- Camada de Controle (Controllers)
        |
        v
[ Lógica de Negócio ] <--- Camada de Serviço (Services)
        |
        v
[ Acesso aos Dados ]  <---- Camada de Repositório (Repositories)
        |
        v
[ Banco de Dados (MySQL) ]
```

-----

## ⚙️ Instruções de Execução

Siga os passos abaixo para configurar e executar o projeto localmente.

### **Pré-requisitos**

  * Git
  * Python 3.8+
  * MySQL Server (ou um pacote como XAMPP, WAMP, MAMP)

### **1. Configuração do Banco de Dados**

Primeiro, acesse seu cliente MySQL e crie o banco de dados que será utilizado pela aplicação.

```sql
CREATE DATABASE gym;
USE gym;
```

Em seguida, crie as tabelas com os seguintes comandos:

**Tabela `usuarios`**

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
```

**Tabela `treinos`**

```sql
CREATE TABLE treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    duracao INT NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);
```

**Tabela `exercicios`**

```sql
CREATE TABLE exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    maquina VARCHAR(255),
    repeticoes VARCHAR(100) NOT NULL,
    treino_id INT,
    FOREIGN KEY (treino_id) REFERENCES treinos(id) ON DELETE CASCADE
);
```

### **2. Configuração do Back-end**

```bash
# 1. Clone o repositório
git clone [SEU_LINK_PARA_O_REPOSITORIO]
cd [NOME_DA_PASTA_DO_PROJETO]/backend

# 2. Crie e ative um ambiente virtual
# No Windows
python -m venv venv
venv\Scripts\activate

# No macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Inicie o servidor
python app.py
```

O servidor back-end estará rodando em `http://127.0.0.1:5000`.

### **3. Execução do Front-end**

1.  Navegue até a pasta `frontend`.
2.  Abra os arquivos `index.html`, `treinos.html` ou `exercicios.html` diretamente no seu navegador de preferência (ex: Google Chrome, Firefox).

> **Dica:** Para uma melhor experiência de desenvolvimento, recomenda-se usar a extensão **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** no Visual Studio Code, que recarrega a página automaticamente ao salvar uma alteração.

-----

## 🗺️ Endpoints da API

A API expõe os seguintes endpoints, todos sob o prefixo `/api`:

| Endpoint | Método | Descrição |
| :--- | :--- | :--- |
| `/usuarios` | `GET` | Lista todos os usuários. |
| `/usuarios/<id>` | `GET` | Obtém um usuário específico. |
| `/usuarios` | `POST` | Cria um novo usuário. |
| `/usuarios/<id>` | `PUT` | Atualiza um usuário existente. |
| `/usuarios/<id>` | `DELETE` | Deleta um usuário. |
| `/treinos` | `GET` | Lista todos os treinos. |
| `/treinos/<id>` | `GET` | Obtém um treino específico. |
| `/treinos` | `POST` | Cria um novo treino. |
| `/treinos/<id>` | `PUT` | Atualiza um treino existente. |
| `/treinos/<id>` | `DELETE` | Deleta um treino. |
| `/exercicios` | `GET` | Lista todos os exercícios. |
| `/exercicios/<id>` | `GET` | Obtém um exercício específico. |
| `/exercicios` | `POST` | Cria um novo exercício. |
| `/exercicios/<id>` | `PUT` | Atualiza um exercício existente. |
| `/exercicios/<id>` | `DELETE` | Deleta um exercício. |
