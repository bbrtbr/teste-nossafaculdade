# teste-nossafaculdade

Este repositório contém o código-fonte de um projeto base Next.js.

## Pré-requisitos

Antes de começar, verifique se você tem o **Docker** instalado em sua máquina.

## Configuração do Ambiente Docker

1.  **Clone o repositório** e entre no diretório do projeto:

    ```bash
    git clone https://github.com/bbrtbr/teste-nossafaculdade
    cd teste-nossafaculdade
    ```

2.  **Crie o arquivo de variáveis de ambiente** a partir do exemplo fornecido:

    ```bash
    cp .env.example .env
    ```

-----

## Executando o Projeto

Siga estas etapas para configurar o banco de dados e rodar a aplicação localmente.

### 1\. Iniciar os Containers do Docker

Este comando iniciará o container do banco de dados (PostgreSQL) e do Adminer (um gerenciador de banco de dados).

```bash
docker-compose up -d
```

### 2\. Configurar e Popular o Banco de Dados

Com o banco de dados rodando, use o Prisma para criar a estrutura e inserir os dados iniciais.

```bash
# Instala as dependências do projeto
npm install

# Gera o cliente Prisma com base no schema do banco de dados
npx prisma generate

# Executa as migrações para criar as tabelas no banco de dados
npx prisma migrate dev

# Insere os dados iniciais (seed) no banco de dados
npx prisma db seed
```

### 3\. Rodar a Aplicação

Agora, inicie o servidor de desenvolvimento do Next.js.

```bash
npm run dev
```

<<<<<<< HEAD
A aplicação estará disponível em `http://localhost:3000`.   
=======
A aplicação estará disponível em `http://localhost:3000`.
>>>>>>> 404648ae0a80298461a2213dd956a18679ddc872
