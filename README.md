# Sistema de Gestão de Supermercado

Sistema web para gerenciamento de produtos, promoções e usuários de supermercado com autenticação JWT e MongoDB.

## Tecnologias

**Frontend:** React 19, React Router DOM, Vite

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt

## Como Rodar

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Configuração

Crie `.env` em `server/`:

```
DB_URL=mongodb://localhost:27017/supermercado
SECRET=sua_chave_secreta
PORT=5000
```

## Primeiro Usuário

```bash
POST http://localhost:5000/api/users
{
  "nome": "Admin",
  "email": "admin@email.com",
  "senha": "123456",
  "cpf": "11111111111"
}
```

Login: `admin@email.com` / `123456`
