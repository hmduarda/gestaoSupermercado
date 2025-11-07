// lista de produtos pra testar
let produtos = [
  {
    id: 1,
    nome: "Arroz Integral 1kg",
    precoAtual: 8.99,
    precoPromocao: null,
    tipo: "Grãos",
    descricao: "Arroz integral de alta qualidade",
    dataValidade: "2025-12-31",
  },
  {
    id: 2,
    nome: "Feijão Preto 1kg",
    precoAtual: 7.5,
    precoPromocao: 6.0,
    tipo: "Grãos",
    descricao: "Feijão preto tipo 1",
    dataValidade: "2025-11-30",
  },
  {
    id: 3,
    nome: "Macarrão Espaguete 500g",
    precoAtual: 4.99,
    precoPromocao: null,
    tipo: "Massas",
    descricao: "Macarrão de sêmola",
    dataValidade: "2026-01-15",
  },
];

// lista de usuarios pra testar
let usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    senha: "123456",
    cpf: "111.222.333-44",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    senha: "123456",
    cpf: "222.333.444-55",
  },
];

// funcoes pra mexer nos produtos
export const listarProdutos = () => {
  return [...produtos]; // retorna uma copia do array
};

export const buscarProduto = (id) => {
  return produtos.find((p) => p.id === parseInt(id)); // acha o produto pelo id
};

export const adicionarProduto = (produto) => {
  const novoProduto = {
    ...produto,
    id: produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1, // gera um id novo
    precoPromocao: null,
  };
  produtos.push(novoProduto); // adiciona no array
  return novoProduto;
};

export const atualizarProduto = (id, produtoAtualizado) => {
  const index = produtos.findIndex((p) => p.id === parseInt(id)); // acha o produto
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...produtoAtualizado }; // atualiza
    return produtos[index];
  }
  return null;
};

export const removerProduto = (id) => {
  produtos = produtos.filter((p) => p.id !== parseInt(id)); // tira o produto do array
  return true;
};

export const aplicarPromocao = (id, precoPromocao) => {
  const index = produtos.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    produtos[index].precoPromocao = precoPromocao; // bota o preco de promocao
    return produtos[index];
  }
  return null;
};

export const removerPromocao = (id) => {
  const index = produtos.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    produtos[index].precoPromocao = null; // tira a promocao
    return produtos[index];
  }
  return null;
};

// funcoes pra mexer nos usuarios
export const listarUsuarios = () => {
  return [...usuarios]; // retorna copia do array
};

export const buscarUsuario = (id) => {
  return usuarios.find((u) => u.id === parseInt(id)); // busca o usuario
};

export const adicionarUsuario = (usuario) => {
  const novoUsuario = {
    ...usuario,
    id: usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1, // id novo
  };
  usuarios.push(novoUsuario); // adiciona
  return novoUsuario;
};

export const atualizarUsuario = (id, usuarioAtualizado) => {
  const index = usuarios.findIndex((u) => u.id === parseInt(id));
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...usuarioAtualizado }; // atualiza
    return usuarios[index];
  }
  return null;
};

export const removerUsuario = (id) => {
  usuarios = usuarios.filter((u) => u.id !== parseInt(id)); // remove do array
  return true;
};
