# PortLouis - Gerenciador de Contatos

## ✅ Requisitos para execução

Antes de começar, certifique-se de ter os seguintes softwares instalados no seu computador:

- Node.js (v18 ou superior)
- MySQL Server instalado e em execução
- Git (opcional)

## ⚠️ Instalando o MySQL

Se você ainda não tem o MySQL instalado, siga os passos abaixo:

1. Acesse o site oficial: [Download MySQL](https://dev.mysql.com/downloads/mysql/)
2. Baixe o instalador compatível com seu sistema operacional (Windows, macOS ou Linux)
3. Durante a instalação:
   - Crie um usuário administrador (root) e defina uma senha
   - Deixe o MySQL configurado para iniciar automaticamente com o sistema (recomendado)
4. Após a instalação, o servidor MySQL precisa estar ativo sempre que você for rodar esta aplicação.

## 📁 Como rodar o projeto localmente

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd portlouis
   ```

2. **Instale as dependências**
   ```bash
   cd backend
   npm install
   ```

3. **Configure o ambiente**
   Crie um arquivo chamado `.env` na pasta `backend` com o seguinte conteúdo:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua_senha_do_mysql
   DB_NAME=contato_db
   PORT=3000
   ```
   **Atenção:** Substitua `sua_senha_do_mysql` pela senha definida durante a instalação do MySQL.

## 🛠 Conexão com o banco de dados

O sistema se conecta automaticamente ao servidor MySQL usando as variáveis de ambiente definidas no arquivo `.env`.

- Se o banco `contato_db` ainda não existir, ele será criado ao rodar a aplicação.
- Também será criada automaticamente a tabela `Contato` com os campos `nome` e `telefone`.

## ▶️ Executando a aplicação

```bash
cd backend
npm start
```

Ou para desenvolvimento com nodemon:
```bash
npx nodemon server.js
```

Se estiver tudo certo, você verá no terminal:
```
Conexão com MySQL estabelecida com sucesso!
Servidor rodando na porta 3000
```

Acesse a aplicação no navegador: `http://localhost:3000`

## 🔍 Endpoints disponíveis

| Método  | Rota          | Descrição                    |
|---------|---------------|------------------------------|
| GET     | /api          | Lista todos os contatos     |
| POST    | /api          | Cria um novo contato        |
| PATCH   | /api/:id      | Atualiza um contato pelo ID |
| DELETE  | /api/:id      | Remove um contato pelo ID   |

### Exemplo de JSON para POST ou PATCH:
```json
{
  "nome": "lucas damaceno",
  "telefone": "(11) 9999-9999"
}
```

### Validações
- **Nome**: Pelo menos duas palavras, cada uma com no mínimo 3 letras.
- **Telefone**: Formato brasileiro (xx) xxxxx-xxxx.

## 🧪 Testando com Postman ou Insomnia

Você pode testar os endpoints utilizando ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

Para testar a API, envie requisições para `http://localhost:3000/api`.

## 📱 Interface Frontend

O frontend é uma aplicação Vue.js com Vuetify que permite gerenciar contatos através de uma interface responsiva. Ele se conecta automaticamente à API backend rodando no mesmo servidor.

### Funcionalidades da Interface
- Listar contatos em cards
- Adicionar novo contato
- Editar contato existente
- Excluir contato
- Validações em tempo real
- Destaque para telefones iniciados com (11)

## 📂 Estrutura do Projeto

```
portlouis/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── ContatoControle.js
│   │   ├── models/
│   │   │   └── Contato.js
│   │   └── routes/
│   │       └── contatos.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── app.js
│   └── index.html
└── README.md
```

## 🤝 Contribuição

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a ISC License.
