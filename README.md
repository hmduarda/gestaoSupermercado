# Sistema Administrativo - Supermercado

Sistema web desenvolvido em ReactJS para gerenciar produtos, promoções e usuários de um supermercado.

## Sobre o Projeto

Este é um sistema administrativo que permite aos funcionários de um supermercado gerenciar:

- **Produtos**: Cadastrar, editar, visualizar e remover produtos
- **Promoções**: Aplicar e remover promoções em produtos específicos
- **Usuários**: Gerenciar funcionários do sistema (cadastrar, editar, visualizar e remover)

## Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
│   ├── Navbar.jsx
│   └── RotaProtegida.jsx
├── context/         # Context API para gerenciamento de estado
│   └── AuthContext.jsx
├── pages/           # Páginas da aplicação
│   ├── Login.jsx
│   ├── Produtos.jsx
│   ├── Promocoes.jsx
│   └── Usuarios.jsx
├── services/        # Serviços e chamadas à API
│   └── api.js
├── App.jsx
└── main.jsx
```

## Autenticação

Para fins de desenvolvimento, o sistema aceita qualquer combinação de email e senha para login.

Exemplo de credenciais de teste:

- Email: `admin@email.com`
- Senha: `123456`

## Funcionalidades

### Gerenciamento de Produtos

- Listar todos os produtos cadastrados
- Adicionar novos produtos com informações: nome, preço, tipo, descrição e validade
- Editar produtos existentes
- Remover produtos
- Visualizar produtos em promoção

### Gerenciamento de Promoções

- Visualizar produtos em promoção com destaque de desconto
- Aplicar promoção em produtos específicos
- Calcular desconto automaticamente
- Remover promoções

### Gerenciamento de Usuários

- Listar todos os usuários/funcionários
- Cadastrar novos usuários com: nome, email, CPF e senha
- Editar informações de usuários
- Visualizar detalhes de usuários
- Remover usuários

## Interface

O sistema possui uma interface simples e funcional com:

- Barra de navegação intuitiva
- Formulários de cadastro e edição
- Tabelas para listagem de dados
- Feedback visual para ações do usuário
