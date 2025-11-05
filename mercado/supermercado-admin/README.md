# Sistema Administrativo - Supermercado

Sistema web desenvolvido em ReactJS para gerenciar produtos, promoções e usuários de um supermercado.

## 📋 Sobre o Projeto

Este é um sistema administrativo que permite aos funcionários de um supermercado gerenciar:

- **Produtos**: Cadastrar, editar, visualizar e remover produtos
- **Promoções**: Aplicar e remover promoções em produtos específicos
- **Usuários**: Gerenciar funcionários do sistema (cadastrar, editar, visualizar e remover)

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** - Gerenciamento de rotas
- **Vite** - Build tool e servidor de desenvolvimento
- **CSS3** - Estilização

## 📁 Estrutura do Projeto

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

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para executar

1. Instale as dependências:

```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```
http://localhost:5173
```

## 🔐 Autenticação

Para fins de desenvolvimento, o sistema aceita qualquer combinação de email e senha para login.

Exemplo de credenciais de teste:

- Email: `admin@email.com`
- Senha: `123456`

## 📱 Funcionalidades

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

## 🎨 Interface

O sistema possui uma interface simples e funcional com:

- Barra de navegação intuitiva
- Formulários de cadastro e edição
- Tabelas para listagem de dados
- Feedback visual para ações do usuário

## 🔄 Dados Mock

Atualmente, o sistema utiliza dados **mock** (simulados) armazenados em memória através do arquivo `src/services/api.js`.

**Importante**: Todos os dados são perdidos ao recarregar a página. Futuramente, este serviço será substituído por uma conexão real com o backend.

## 📝 Modelos de Dados

### Produto

```javascript
{
  id: number,
  nome: string,
  precoAtual: number,
  precoPromocao: number | null,
  tipo: string,
  descricao: string,
  dataValidade: string (YYYY-MM-DD)
}
```

### Usuário

```javascript
{
  id: number,
  nome: string,
  email: string,
  senha: string,
  cpf: string
}
```

## 🛠️ Próximos Passos

- [ ] Conectar com backend real
- [ ] Implementar validações mais robustas
- [ ] Adicionar paginação nas listagens
- [ ] Implementar busca e filtros
- [ ] Adicionar upload de imagens de produtos
- [ ] Melhorar responsividade mobile

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Web.

---

**Nota**: Este é um projeto educacional e não está pronto para uso em produção.
