# Explicação do Projeto - Sistema Administrativo de Supermercado

**Aluno:** [Seu Nome]  
**Disciplina:** Desenvolvimento Web com React  
**Data:** 04/11/2025

---

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias)
3. [Estrutura de Pastas](#estrutura)
4. [Como o Código Funciona](#funcionamento)
5. [Explicação Detalhada dos Arquivos](#arquivos)
6. [Fluxo de Funcionamento](#fluxo)
7. [Decisões de Implementação](#decisoes)
8. [Dificuldades Encontradas](#dificuldades)
9. [Melhorias Futuras](#melhorias)

---

## 📖 Visão Geral do Projeto {#visao-geral}

Este projeto é um **Sistema Administrativo para Supermercado** desenvolvido em **ReactJS**. O objetivo é permitir que funcionários do supermercado façam login e gerenciem:

- **Produtos** (adicionar, editar, listar, remover)
- **Promoções** (aplicar e remover descontos em produtos)
- **Usuários** (cadastrar e gerenciar funcionários)

O sistema foi desenvolvido seguindo os requisitos do trabalho acadêmico, com foco em funcionalidade e organização de código.

### Requisitos Atendidos

✅ **5 páginas funcionais:**

1. Página de Login
2. Gerenciamento de Produtos
3. Gerenciamento de Promoções
4. Gerenciamento de Usuários
5. Visualização de Detalhes do Usuário

✅ **CRUD completo** de Produtos e Usuários  
✅ **Sistema de Promoções** funcionando  
✅ **Autenticação** com proteção de rotas  
✅ **Dados Mock** preparados para conexão futura com backend

---

## 🛠️ Tecnologias Utilizadas {#tecnologias}

### Bibliotecas Principais

- **React 19** - Biblioteca JavaScript para construir interfaces
- **React Router DOM 7** - Gerenciamento de rotas e navegação
- **Vite 7** - Ferramenta de build e desenvolvimento rápido
- **CSS3** - Estilização das páginas

### Conceitos React Utilizados

- **Hooks** (`useState`, `useEffect`, `useContext`)
- **Context API** (para autenticação global)
- **Componentes Funcionais**
- **Props** e **Children**
- **Conditional Rendering**

---

## 📁 Estrutura de Pastas {#estrutura}

```
supermercado-admin/
│
├── public/                    # Arquivos públicos
├── src/
│   ├── assets/               # Imagens e recursos
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Navbar.jsx        # Barra de navegação
│   │   ├── Navbar.css
│   │   └── RotaProtegida.jsx # Componente de proteção de rotas
│   │
│   ├── context/              # Contextos globais
│   │   └── AuthContext.jsx   # Contexto de autenticação
│   │
│   ├── pages/                # Páginas da aplicação
│   │   ├── Login.jsx         # Página de login
│   │   ├── Login.css
│   │   ├── Produtos.jsx      # CRUD de produtos
│   │   ├── Produtos.css
│   │   ├── Promocoes.jsx     # Gerenciamento de promoções
│   │   ├── Promocoes.css
│   │   ├── Usuarios.jsx      # CRUD de usuários
│   │   └── Usuarios.css
│   │
│   ├── services/             # Serviços e API
│   │   └── api.js            # Funções mock do backend
│   │
│   ├── App.jsx               # Componente raiz com rotas
│   ├── App.css
│   ├── main.jsx              # Ponto de entrada
│   └── index.css             # CSS global
│
├── index.html
├── package.json              # Dependências do projeto
└── vite.config.js            # Configuração do Vite
```

### Por que essa estrutura?

- **`components/`** - Componentes que podem ser usados em várias páginas
- **`context/`** - Estado global acessível por toda aplicação
- **`pages/`** - Cada página da aplicação fica separada
- **`services/`** - Lógica de comunicação com backend (mock)

---

## ⚙️ Como o Código Funciona {#funcionamento}

### 1. Inicialização da Aplicação

Quando você roda `npm run dev`, o Vite inicia o servidor e carrega o arquivo **`main.jsx`**:

```jsx
// main.jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Isso renderiza o componente `<App />` dentro do elemento com id "root" do `index.html`.

### 2. Estrutura do App.jsx

O **`App.jsx`** é o coração da aplicação. Ele configura:

```jsx
<AuthProvider>
  {" "}
  {/* 1. Envolve tudo com contexto de autenticação */}
  <Router>
    {" "}
    {/* 2. Habilita navegação entre páginas */}
    <Navbar /> {/* 3. Barra de navegação visível em todas as páginas */}
    <Routes>
      {" "}
      {/* 4. Define todas as rotas */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/produtos"
        element={
          <RotaProtegida>
            {" "}
            {/* 5. Protege rotas privadas */}
            <Produtos />
          </RotaProtegida>
        }
      />
      {/* ... outras rotas */}
    </Routes>
  </Router>
</AuthProvider>
```

**O que cada parte faz:**

1. **AuthProvider** - Disponibiliza dados do usuário logado para todos os componentes
2. **Router** - Permite navegar sem recarregar a página (SPA)
3. **Navbar** - Menu superior com links e botão de sair
4. **Routes** - Define qual componente renderizar para cada URL
5. **RotaProtegida** - Verifica se o usuário está logado antes de mostrar a página

### 3. Fluxo de Autenticação

#### Como funciona o login:

```
Usuário digita email/senha
     ↓
Clica em "Entrar"
     ↓
handleSubmit() é executado
     ↓
e.preventDefault() (previne reload)
     ↓
Valida campos (não estão vazios?)
     ↓
Chama login(email, senha) do AuthContext
     ↓
Cria usuário mock
     ↓
Salva no estado e localStorage
     ↓
Redireciona para /produtos
```

#### Como funciona a proteção de rotas:

```jsx
// RotaProtegida.jsx
const RotaProtegida = ({ children }) => {
  const { usuario } = useAuth(); // Pega usuário do contexto

  if (!usuario) {
    return <Navigate to="/login" />; // Se não tá logado, manda pro login
  }

  return children; // Se tá logado, mostra a página
};
```

### 4. Gerenciamento de Estado

#### Estado Local (useState)

Usado para dados específicos de um componente:

```jsx
// Exemplo em Produtos.jsx
const [produtos, setProdutos] = useState([]); // Lista de produtos
const [formulario, setFormulario] = useState({
  // Dados do formulário
  nome: "",
  precoAtual: "",
  tipo: "",
  descricao: "",
  dataValidade: "",
});
```

#### Estado Global (Context API)

Usado para dados que precisam estar disponíveis em toda aplicação:

```jsx
// AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Estado global

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

Qualquer componente pode acessar com:

```jsx
const { usuario, login, logout } = useAuth();
```

### 5. Comunicação com "Backend" (Mock)

Todas as funções de API estão em **`services/api.js`**. São funções **assíncronas** que simulam chamadas HTTP:

```javascript
// api.js
export const listarProdutos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...produtos]); // Retorna cópia dos produtos
    }, 300); // Simula delay de rede
  });
};
```

**Por que Promise e setTimeout?**

- **Promise** - Simula operação assíncrona (como fetch)
- **setTimeout** - Simula o tempo que uma requisição HTTP leva
- **async/await** - Sintaxe moderna para trabalhar com Promises

#### Exemplo de uso:

```jsx
// Na página de Produtos
const carregarProdutos = async () => {
  const dados = await listarProdutos(); // Espera a Promise resolver
  setProdutos(dados); // Atualiza o estado
};
```

---

## 📄 Explicação Detalhada dos Arquivos {#arquivos}

### 🔐 AuthContext.jsx (Autenticação)

**Responsabilidade:** Gerenciar o usuário logado e fornecer funções de login/logout.

**Como funciona:**

1. **Cria um contexto** com `createContext()`
2. **Guarda o usuário** no estado com `useState(null)`
3. **Função login():**
   - Recebe email e senha
   - Cria um objeto usuário mock
   - Salva no estado e no localStorage
4. **Função logout():**
   - Limpa o estado (setUsuario(null))
   - Remove do localStorage
5. **Provider envolve a aplicação** e disponibiliza as funções

**Código simplificado:**

```jsx
const [usuario, setUsuario] = useState(null);

const login = (email, senha) => {
  const usuarioMock = { id: 1, nome: "Admin", email };
  setUsuario(usuarioMock);
  localStorage.setItem("usuario", JSON.stringify(usuarioMock));
  return true;
};

const logout = () => {
  setUsuario(null);
  localStorage.removeItem("usuario");
};
```

**Por que localStorage?**

Para manter o usuário logado mesmo após recarregar a página (F5).

---

### 🛡️ RotaProtegida.jsx (Proteção de Rotas)

**Responsabilidade:** Impedir acesso a páginas privadas se não estiver logado.

**Como funciona:**

```jsx
const RotaProtegida = ({ children }) => {
  const { usuario } = useAuth(); // Pega usuário do contexto

  if (!usuario) {
    return <Navigate to="/login" replace />; // Redireciona
  }

  return children; // Renderiza a página
};
```

**Fluxo:**

```
Tenta acessar /produtos
     ↓
RotaProtegida verifica se há usuário
     ↓
     ├─> SIM: Mostra <Produtos />
     └─> NÃO: Redireciona para /login
```

---

### 🧭 Navbar.jsx (Barra de Navegação)

**Responsabilidade:** Menu superior com links e botão de logout.

**Elementos principais:**

```jsx
<nav className="navbar">
  <h2>Sistema Supermercado</h2> {/* Logo */}
  <ul className="navbar-menu">
    {" "}
    {/* Menu */}
    <li>
      <Link to="/produtos">Produtos</Link>
    </li>
    <li>
      <Link to="/promocoes">Promoções</Link>
    </li>
    <li>
      <Link to="/usuarios">Usuários</Link>
    </li>
  </ul>
  <div className="navbar-user">
    {" "}
    {/* Área do usuário */}
    <span>Olá, {usuario.nome}</span>
    <button onClick={handleLogout}>Sair</button>
  </div>
</nav>
```

**Por que usar Link em vez de `<a>`?**

- **Link** não recarrega a página (SPA - Single Page Application)
- **`<a>`** recarregaria toda a aplicação

**Função de logout:**

```jsx
const handleLogout = () => {
  logout(); // Limpa autenticação
  navigate("/login"); // Redireciona
};
```

---

### 🔑 Login.jsx (Página de Login)

**Responsabilidade:** Formulário de autenticação.

**Estados necessários:**

```jsx
const [email, setEmail] = useState(""); // Email digitado
const [senha, setSenha] = useState(""); // Senha digitada
const [erro, setErro] = useState(""); // Mensagem de erro
```

**Fluxo do formulário:**

```jsx
<form onSubmit={handleSubmit}>
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)} // Atualiza estado
  />
  <input value={senha} onChange={(e) => setSenha(e.target.value)} />
  <button type="submit">Entrar</button>
</form>
```

**Função handleSubmit:**

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // NÃO recarrega a página
  setErro(""); // Limpa erros anteriores

  if (!email || !senha) {
    // Validação
    setErro("Preencha todos os campos");
    return;
  }

  const sucesso = login(email, senha); // Chama função do contexto

  if (sucesso) {
    navigate("/produtos"); // Redireciona
  }
};
```

**Por que e.preventDefault()?**

Formulários HTML recarregam a página por padrão. Isso quebraria nossa SPA.

---

### 📦 Produtos.jsx (CRUD de Produtos)

**Responsabilidade:** Gerenciar produtos (criar, ler, atualizar, deletar).

**Estados necessários:**

```jsx
const [produtos, setProdutos] = useState([]); // Lista
const [mostrarFormulario, setMostrarFormulario] = useState(false); // Controle
const [produtoEditando, setProdutoEditando] = useState(null); // Qual produto
const [formulario, setFormulario] = useState({
  // Dados do form
  nome: "",
  precoAtual: "",
  tipo: "",
  descricao: "",
  dataValidade: "",
});
```

**Carregar produtos ao abrir a página:**

```jsx
useEffect(() => {
  carregarProdutos(); // Executa uma vez quando o componente monta
}, []); // Array vazio = só executa uma vez

const carregarProdutos = async () => {
  const dados = await listarProdutos(); // Chama API mock
  setProdutos(dados); // Atualiza estado
};
```

**Atualizar campo do formulário:**

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormulario({
    ...formulario, // Mantém valores anteriores
    [name]: value, // Atualiza apenas o campo alterado
  });
};
```

**Exemplo:** Se o usuário digita no campo "nome", só o nome é atualizado.

**Adicionar ou atualizar produto:**

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  const produtoData = {
    ...formulario,
    precoAtual: parseFloat(formulario.precoAtual), // Converte pra número
  };

  if (produtoEditando) {
    // ATUALIZAR produto existente
    await atualizarProduto(produtoEditando.id, produtoData);
  } else {
    // ADICIONAR produto novo
    await adicionarProduto(produtoData);
  }

  limparFormulario(); // Limpa campos
  carregarProdutos(); // Recarrega lista
};
```

**Editar produto:**

```jsx
const handleEditar = (produto) => {
  setProdutoEditando(produto); // Marca qual produto tá editando
  setFormulario({
    // Preenche o formulário
    nome: produto.nome,
    precoAtual: produto.precoAtual,
    tipo: produto.tipo,
    descricao: produto.descricao,
    dataValidade: produto.dataValidade,
  });
  setMostrarFormulario(true); // Abre o formulário
};
```

**Remover produto:**

```jsx
const handleRemover = async (id) => {
  if (window.confirm("Tem certeza?")) {
    // Confirma com usuário
    await removerProduto(id); // Chama API mock
    carregarProdutos(); // Recarrega lista
  }
};
```

**Renderizar lista de produtos:**

```jsx
<tbody>
  {produtos.map(
    (
      produto // Percorre array
    ) => (
      <tr key={produto.id}>
        {" "}
        // Key é obrigatório
        <td>{produto.id}</td>
        <td>{produto.nome}</td>
        <td>R$ {produto.precoAtual.toFixed(2)}</td>
        <td>
          <button onClick={() => handleEditar(produto)}>Editar</button>
          <button onClick={() => handleRemover(produto.id)}>Remover</button>
        </td>
      </tr>
    )
  )}
</tbody>
```

**Por que .map()?**

É a forma do React de transformar um array em elementos JSX.

---

### 🏷️ Promocoes.jsx (Gerenciar Promoções)

**Responsabilidade:** Aplicar e remover promoções em produtos.

**Estados principais:**

```jsx
const [produtos, setProdutos] = useState([]);
const [produtoSelecionado, setProdutoSelecionado] = useState(null);
const [precoPromocao, setPrecoPromocao] = useState("");
```

**Select para escolher produto:**

```jsx
<select
  onChange={(e) => {
    const produto = produtos.find((p) => p.id === parseInt(e.target.value));
    setProdutoSelecionado(produto);
  }}
>
  <option value="">Escolha um produto</option>
  {produtos.map((produto) => (
    <option key={produto.id} value={produto.id}>
      {produto.nome} - R$ {produto.precoAtual.toFixed(2)}
    </option>
  ))}
</select>
```

**Aplicar promoção:**

```jsx
const handleAplicarPromocao = async (e) => {
  e.preventDefault();

  // Validações
  if (!produtoSelecionado || !precoPromocao) {
    alert("Preencha todos os campos");
    return;
  }

  const preco = parseFloat(precoPromocao);

  if (preco >= produtoSelecionado.precoAtual) {
    alert("Preço promocional deve ser menor!");
    return;
  }

  // Aplica a promoção
  await aplicarPromocao(produtoSelecionado.id, preco);
  alert("Promoção aplicada!");

  // Limpa e recarrega
  setProdutoSelecionado(null);
  setPrecoPromocao("");
  carregarProdutos();
};
```

**Calcular desconto:**

```jsx
const calcularDesconto = (produto) => {
  if (!produto.precoPromocao) return 0;

  // Fórmula: ((preço normal - preço promoção) / preço normal) * 100
  const desconto =
    ((produto.precoAtual - produto.precoPromocao) / produto.precoAtual) * 100;

  return desconto.toFixed(0); // Arredonda
};
```

**Exemplo:** Produto de R$ 10,00 em promoção por R$ 7,00 = 30% de desconto.

**Exibir produtos em promoção:**

```jsx
{
  produtos
    .filter((p) => p.precoPromocao) // Só produtos com promoção
    .map((produto) => (
      <div className="card-promocao">
        <div className="badge-desconto">-{calcularDesconto(produto)}%</div>
        <h3>{produto.nome}</h3>
        <span className="preco-antigo">
          De: R$ {produto.precoAtual.toFixed(2)}
        </span>
        <span className="preco-promocao">
          Por: R$ {produto.precoPromocao.toFixed(2)}
        </span>
        <button onClick={() => handleRemoverPromocao(produto)}>
          Remover Promoção
        </button>
      </div>
    ));
}
```

---

### 👥 Usuarios.jsx (CRUD de Usuários)

**Responsabilidade:** Gerenciar usuários do sistema.

**Funcionamento muito similar a Produtos.jsx:**

```jsx
const [usuarios, setUsuarios] = useState([]);
const [usuarioEditando, setUsuarioEditando] = useState(null);
const [usuarioDetalhes, setUsuarioDetalhes] = useState(null); // NOVO!
const [formulario, setFormulario] = useState({
  nome: "",
  email: "",
  senha: "",
  cpf: "",
});
```

**Diferencial:** Painel lateral para visualizar detalhes:

```jsx
const handleVisualizarDetalhes = (usuario) => {
  setUsuarioDetalhes(usuario); // Guarda usuário selecionado
  setMostrarFormulario(false); // Fecha formulário se estiver aberto
};
```

**Layout com 2 colunas:**

```jsx
<div className="usuarios-layout">
  <div className="lista-usuarios">{/* Tabela com todos os usuários */}</div>

  {usuarioDetalhes && (
    <div className="painel-lateral">
      <h2>Detalhes do Usuário</h2>
      <p>Nome: {usuarioDetalhes.nome}</p>
      <p>Email: {usuarioDetalhes.email}</p>
      <p>CPF: {usuarioDetalhes.cpf}</p>
      <button onClick={() => handleEditar(usuarioDetalhes)}>Editar</button>
    </div>
  )}
</div>
```

**Formatação de CPF:**

```jsx
const formatarCPF = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Uso: formatarCPF("12345678900") → "123.456.789-00"
```

---

### 🔌 api.js (Serviços Mock)

**Responsabilidade:** Simular um backend com dados em memória.

**Estrutura geral:**

```javascript
// Banco de dados fake
let produtos = [
  /* array com produtos */
];
let usuarios = [
  /* array com usuários */
];

// Todas as funções seguem este padrão:
export const nomeDaFuncao = async (parametros) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica aqui
      resolve(resultado);
    }, 300); // Simula delay de rede
  });
};
```

**Exemplo - Adicionar produto:**

```javascript
export const adicionarProduto = async (produto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Gera ID único
      const novoProduto = {
        ...produto,
        id:
          produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
        precoPromocao: null,
      };

      produtos.push(novoProduto); // Adiciona no array
      resolve(novoProduto); // Retorna o produto criado
    }, 300);
  });
};
```

**Como gerar ID único:**

```javascript
// Pega todos os IDs, encontra o maior, soma 1
Math.max(...produtos.map((p) => p.id)) + 1;

// Exemplo:
// produtos = [{id: 1}, {id: 5}, {id: 3}]
// IDs = [1, 5, 3]
// Math.max(1, 5, 3) = 5
// 5 + 1 = 6 (novo ID)
```

**Exemplo - Atualizar produto:**

```javascript
export const atualizarProduto = async (id, produtoAtualizado) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Encontra índice do produto
      const index = produtos.findIndex((p) => p.id === parseInt(id));

      if (index !== -1) {
        // Mescla dados antigos com novos
        produtos[index] = {
          ...produtos[index], // Dados antigos
          ...produtoAtualizado, // Dados novos (sobrescrevem)
        };
        resolve(produtos[index]);
      }

      resolve(null); // Não encontrou
    }, 300);
  });
};
```

**Exemplo - Remover produto:**

```javascript
export const removerProduto = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter cria novo array SEM o produto com esse ID
      produtos = produtos.filter((p) => p.id !== parseInt(id));
      resolve(true);
    }, 300);
  });
};
```

**Por que usar filter?**

```javascript
// ANTES
produtos = [
  { id: 1, nome: "Arroz" },
  { id: 2, nome: "Feijão" },
  { id: 3, nome: "Macarrão" },
];

// Remover id 2
produtos = produtos.filter((p) => p.id !== 2);

// DEPOIS
produtos = [
  { id: 1, nome: "Arroz" },
  { id: 3, nome: "Macarrão" },
];
```

---

## 🔄 Fluxo de Funcionamento {#fluxo}

### Fluxo Completo: Do Login ao CRUD

#### 1. Usuário acessa a aplicação

```
http://localhost:5173
     ↓
App.jsx renderiza
     ↓
Rota "/" redireciona para "/login"
     ↓
Página de Login é exibida
```

#### 2. Usuário faz login

```
Digite email/senha
     ↓
Clica "Entrar"
     ↓
handleSubmit() executa
     ↓
e.preventDefault() (não recarrega)
     ↓
Validação (campos preenchidos?)
     ↓
login(email, senha) do AuthContext
     ↓
Cria usuário mock
     ↓
setUsuario(usuarioMock)
     ↓
localStorage.setItem("usuario", ...)
     ↓
navigate("/produtos")
     ↓
Página de Produtos é exibida
```

#### 3. Carregar produtos

```
Produtos.jsx monta
     ↓
useEffect(() => carregarProdutos(), [])
     ↓
carregarProdutos() executa
     ↓
await listarProdutos() (API mock)
     ↓
Promise resolve após 300ms
     ↓
setProdutos(dados)
     ↓
React re-renderiza componente
     ↓
Tabela mostra produtos
```

#### 4. Adicionar novo produto

```
Clica "Novo Produto"
     ↓
setMostrarFormulario(true)
     ↓
Formulário aparece
     ↓
Usuário preenche campos
     ↓
onChange atualiza estado (formulario)
     ↓
Clica "Adicionar"
     ↓
handleSubmit() executa
     ↓
e.preventDefault()
     ↓
Prepara dados (parseFloat no preço)
     ↓
await adicionarProduto(produtoData)
     ↓
API mock adiciona no array
     ↓
limparFormulario()
     ↓
carregarProdutos()
     ↓
Lista atualizada aparece na tela
```

#### 5. Editar produto

```
Clica "Editar" na tabela
     ↓
handleEditar(produto) executa
     ↓
setProdutoEditando(produto)
     ↓
setFormulario({ ...dados do produto })
     ↓
setMostrarFormulario(true)
     ↓
Formulário abre preenchido
     ↓
Usuário altera campos
     ↓
Clica "Atualizar"
     ↓
handleSubmit() verifica: tem produtoEditando?
     ↓
await atualizarProduto(id, dados)
     ↓
API mock atualiza produto no array
     ↓
limparFormulario()
     ↓
carregarProdutos()
     ↓
Lista atualizada
```

#### 6. Remover produto

```
Clica "Remover"
     ↓
handleRemover(id) executa
     ↓
window.confirm("Tem certeza?")
     ↓
Usuário confirma
     ↓
await removerProduto(id)
     ↓
API mock remove do array
     ↓
carregarProdutos()
     ↓
Lista atualizada (sem o produto)
```

#### 7. Aplicar promoção

```
Vai para página Promoções
     ↓
Seleciona produto no dropdown
     ↓
onChange encontra produto selecionado
     ↓
setProdutoSelecionado(produto)
     ↓
Digita preço promocional
     ↓
setPrecoPromocao(valor)
     ↓
Clica "Aplicar Promoção"
     ↓
handleAplicarPromocao() executa
     ↓
Validações (produto selecionado? preço menor?)
     ↓
await aplicarPromocao(id, preco)
     ↓
API mock seta produto.precoPromocao
     ↓
carregarProdutos()
     ↓
Produto aparece nos cards de promoção
```

---

## 🤔 Decisões de Implementação {#decisoes}

### Por que Context API em vez de Redux?

**Escolha:** Context API  
**Motivo:**

- Mais simples para projetos pequenos
- Menos configuração
- Nativo do React (sem biblioteca externa)
- Suficiente para gerenciar apenas autenticação

### Por que dados mock em vez de backend real?

**Escolha:** API Mock  
**Motivo:**

- Foco no aprendizado de React primeiro
- Backend será desenvolvido futuramente
- Permite testar todas as funcionalidades
- Fácil de substituir depois (só trocar as funções)

### Por que localStorage para autenticação?

**Escolha:** localStorage  
**Motivo:**

- Mantém usuário logado após F5
- Simples de implementar
- Não precisa de backend
- **Nota:** Em produção, usar JWT e cookies HttpOnly

### Por que React Router DOM?

**Escolha:** React Router DOM  
**Motivo:**

- Padrão do mercado para SPAs em React
- Suporta rotas protegidas
- Navegação sem reload
- Fácil de aprender

### Por que não TypeScript?

**Escolha:** JavaScript  
**Motivo:**

- Mais simples para começar
- Menos configuração
- Foco em aprender React primeiro
- **Melhoria futura:** Migrar para TypeScript

### Por que CSS puro em vez de biblioteca?

**Escolha:** CSS básico  
**Motivo:**

- Projeto acadêmico focado em funcionalidade
- Sem dependências extras
- Controle total do estilo
- Aparência "de estudante" (conforme solicitado)

---

## 😅 Dificuldades Encontradas {#dificuldades}

### 1. Entender o fluxo de dados no React

**Dificuldade:** No começo foi difícil entender quando usar `useState` vs `useEffect` vs Context API.

**Solução:**

- `useState`: Para dados que mudam e precisam re-renderizar
- `useEffect`: Para executar código quando componente monta
- Context: Para dados globais (ex: usuário logado)

### 2. Gerenciar formulários

**Dificuldade:** Como atualizar apenas um campo do formulário sem perder os outros?

**Solução:**

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormulario({
    ...formulario, // Mantém campos anteriores
    [name]: value, // Atualiza só o campo alterado
  });
};
```

### 3. E.preventDefault() nos formulários

**Dificuldade:** Formulário recarregava a página ao submeter.

**Solução:**

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // IMPORTANTE!
  // resto do código
};
```

### 4. Async/Await e Promises

**Dificuldade:** Entender quando usar `async/await` e como funciona.

**Solução:**

- Toda função que retorna Promise precisa de `await`
- Função que usa `await` precisa ser `async`
- É só uma sintaxe mais limpa que `.then()`

### 5. Key prop em listas

**Dificuldade:** Warnings no console sobre "key prop".

**Solução:**

```jsx
{
  produtos.map((produto) => (
    <tr key={produto.id}>
      {" "}
      {/* Key única! */}
      {/* ... */}
    </tr>
  ));
}
```

### 6. Rotas protegidas

**Dificuldade:** Como impedir acesso a páginas sem estar logado?

**Solução:** Criar componente `RotaProtegida` que verifica autenticação.

### 7. Compartilhar dados entre componentes

**Dificuldade:** Como Navbar sabe quem está logado?

**Solução:** Context API - dados globais acessíveis por todos.

---

## 🚀 Melhorias Futuras {#melhorias}

### Curto Prazo

1. **Validação de formulários mais robusta**

   - Validar CPF de verdade
   - Validar formato de email
   - Senhas com requisitos mínimos

2. **Feedback visual melhor**

   - Loading spinners durante requisições
   - Toasts em vez de alerts
   - Animações de transição

3. **Busca e filtros**

   - Buscar produtos por nome
   - Filtrar por tipo
   - Ordenar por preço

4. **Paginação**
   - Listar 10 produtos por página
   - Botões de próxima/anterior

### Médio Prazo

5. **Conectar com backend real**

   - Substituir API mock por fetch/axios
   - Autenticação JWT
   - Persistência de dados em banco

6. **Upload de imagens**

   - Foto dos produtos
   - Avatar dos usuários

7. **Relatórios**
   - Produtos mais vendidos
   - Promoções mais aplicadas
   - Gráficos com Chart.js

### Longo Prazo

8. **Migrar para TypeScript**

   - Tipos para maior segurança
   - Melhor autocomplete

9. **Testes automatizados**

   - Jest para testes unitários
   - React Testing Library

10. **PWA (Progressive Web App)**
    - Funcionar offline
    - Instalável como app

---

## 📚 Conceitos React Aprendidos

### Hooks Utilizados

#### useState

```jsx
const [estado, setEstado] = useState(valorInicial);
```

- Cria uma variável de estado
- Quando muda, re-renderiza o componente

#### useEffect

```jsx
useEffect(() => {
  // Código a executar
}, [dependências]);
```

- Executa código após renderização
- `[]` = só uma vez (ao montar)
- `[variavel]` = quando variavel muda

#### useContext

```jsx
const valor = useContext(MeuContexto);
```

- Acessa dados de um Context
- Alternativa a prop drilling

#### useNavigate

```jsx
const navigate = useNavigate();
navigate("/produtos");
```

- Navega programaticamente entre rotas

### Conceitos Importantes

#### Controlled Components

```jsx
<input
  value={email} // Controlado pelo estado
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### Conditional Rendering

```jsx
{
  mostrarFormulario && <Formulario />;
} // Só renderiza se true
{
  erro ? <MensagemErro /> : <MensagemSucesso />;
}
```

#### Lifting State Up

Quando 2 componentes precisam do mesmo estado, move ele pro componente pai.

#### Props Drilling

Passar props por vários níveis. Context API resolve isso.

---

## 🎓 Conclusão

Este projeto foi uma ótima oportunidade para aprender React na prática. Consegui implementar todas as funcionalidades solicitadas:

✅ Sistema de login funcional  
✅ CRUD completo de produtos  
✅ CRUD completo de usuários  
✅ Sistema de promoções  
✅ Rotas protegidas  
✅ Interface funcional  
✅ Código organizado

O código está preparado para ser facilmente expandido e conectado a um backend real no futuro. A estrutura de pastas, separação de responsabilidades e uso de Context API facilitam a manutenção e evolução do projeto.

---

## 📖 Referências

- [Documentação oficial do React](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [JavaScript MDN Web Docs](https://developer.mozilla.org/)
- Material das aulas da disciplina

---

**Desenvolvido por:** [Seu Nome]  
**GitHub:** [seu-usuario]  
**Data:** Novembro/2025
