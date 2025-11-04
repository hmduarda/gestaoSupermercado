# Guia Rápido de Uso

## 🚀 Como Executar o Projeto

### Requisitos

- Node.js versão 20.19+ ou 22.12+

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:5173
```

## 📖 Como Usar o Sistema

### 1. Login

- Acesse a página inicial
- Digite qualquer email (ex: `admin@email.com`)
- Digite qualquer senha (ex: `123456`)
- Clique em "Entrar"

### 2. Gerenciar Produtos

**Adicionar Produto:**

1. Na página "Produtos", clique em "Novo Produto"
2. Preencha os campos:
   - Nome do Produto
   - Preço Atual
   - Tipo (ex: Grãos, Massas, Bebidas)
   - Data de Validade
   - Descrição
3. Clique em "Adicionar"

**Editar Produto:**

1. Na tabela de produtos, clique em "Editar"
2. Modifique os campos desejados
3. Clique em "Atualizar"

**Remover Produto:**

1. Na tabela de produtos, clique em "Remover"
2. Confirme a ação

### 3. Gerenciar Promoções

**Aplicar Promoção:**

1. Na página "Promoções", selecione um produto
2. Digite o preço promocional (deve ser menor que o preço atual)
3. O sistema mostrará o desconto calculado
4. Clique em "Aplicar Promoção"

**Remover Promoção:**

1. No lado direito, você verá os produtos em promoção
2. Clique em "Remover Promoção" no produto desejado
3. Confirme a ação

### 4. Gerenciar Usuários

**Adicionar Usuário:**

1. Na página "Usuários", clique em "Novo Usuário"
2. Preencha os campos:
   - Nome Completo
   - Email
   - CPF
   - Senha
3. Clique em "Adicionar"

**Visualizar Detalhes:**

1. Na tabela de usuários, clique em "Ver"
2. Os detalhes aparecerão no painel lateral

**Editar Usuário:**

1. Clique em "Editar" na tabela ou no painel de detalhes
2. Modifique os campos desejados
3. Clique em "Atualizar"

**Remover Usuário:**

1. Clique em "Remover"
2. Confirme a ação

## ⚠️ Observações Importantes

1. **Dados Mock**: Todos os dados são simulados e armazenados em memória
2. **Persistência**: Os dados são perdidos ao recarregar a página
3. **Autenticação**: Aceita qualquer combinação de email/senha
4. **Backend**: Futuramente será conectado a uma API real

## 🎯 Funcionalidades Implementadas

✅ Sistema de login com autenticação mock
✅ Rotas protegidas (requer login)
✅ CRUD completo de Produtos
✅ CRUD completo de Usuários
✅ Aplicar e remover promoções
✅ Cálculo automático de descontos
✅ Validação de formulários
✅ Interface responsiva e intuitiva
✅ Navegação entre páginas

## 🔄 Estrutura de Navegação

```
Login → Dashboard (Produtos)
  ├── Produtos (CRUD)
  ├── Promoções (Aplicar/Remover)
  └── Usuários (CRUD + Visualizar)
```

## 💡 Dicas

- Use a navegação superior para alternar entre as páginas
- Todos os formulários possuem validação básica
- Mensagens de confirmação aparecem antes de remover itens
- O botão "Sair" no canto superior direito faz logout
