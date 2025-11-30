# Backend - Sistema de Gestão de Supermercado

API REST com Node.js, Express e MongoDB.

## Estrutura

```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
└── routes/
```

## Endpoints

### Autenticação

- `POST /api/auth/login`

### Usuários

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Produtos

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/:id/promocao`
- `DELETE /api/products/:id/promocao`

## Configuração

`.env`:

```
DB_URL=mongodb://localhost:27017/supermercado
SECRET=sua_chave_secreta
PORT=5000
```

## Executar

```bash
npm install
npm run dev
```
