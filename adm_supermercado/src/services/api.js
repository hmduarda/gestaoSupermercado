// ========================================
// SERVIÇO DE API MOCK
// ========================================
// Esse arquivo simula um backend de verdade
// No futuro, trocar essas funções por chamadas HTTP reais (fetch, axios, etc)
// Por enquanto, tudo fica guardado na memória (perde quando recarrega a página)

// ========================================
// BANCO DE DADOS FAKE (em memória)
// ========================================

// Array com produtos mockados - aqui fica nossa "tabela" de produtos
let produtos = [
  {
    id: 1,
    nome: "Arroz Integral 1kg",
    precoAtual: 8.99,
    precoPromocao: null, // null = não tem promoção
    tipo: "Grãos",
    descricao: "Arroz integral de alta qualidade",
    dataValidade: "2025-12-31",
  },
  {
    id: 2,
    nome: "Feijão Preto 1kg",
    precoAtual: 7.5,
    precoPromocao: 6.0, // esse tem promoção!
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

// Array com usuários mockados - nossa "tabela" de usuários
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

// ========================================
// FUNÇÕES PARA PRODUTOS
// ========================================

// Função que lista todos os produtos
// async/await simula uma requisição HTTP que demora um pouco
export const listarProdutos = async () => {
  return new Promise((resolve) => {
    // setTimeout simula o delay da rede (300ms)
    setTimeout(() => {
      // [...produtos] cria uma cópia do array pra não modificar o original
      resolve([...produtos]);
    }, 300);
  });
};

// Função que busca um produto específico pelo ID
export const buscarProduto = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // find procura o produto com o ID certo
      const produto = produtos.find((p) => p.id === parseInt(id));
      resolve(produto);
    }, 200);
  });
};

// Função que adiciona um novo produto
export const adicionarProduto = async (produto) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Cria o novo produto com um ID único
      const novoProduto = {
        ...produto, // pega todos os dados que vieram do formulário
        // Gera um ID novo pegando o maior ID atual e somando 1
        id:
          produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
        precoPromocao: null, // produto novo nunca tem promoção
      };
      produtos.push(novoProduto); // adiciona no array
      resolve(novoProduto); // retorna o produto criado
    }, 300);
  });
};

// Função que atualiza um produto existente
export const atualizarProduto = async (id, produtoAtualizado) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Procura o índice do produto no array
      const index = produtos.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        // Se achou, atualiza ele mesclando os dados antigos com os novos
        produtos[index] = { ...produtos[index], ...produtoAtualizado };
        resolve(produtos[index]);
      }
      resolve(null); // retorna null se não achou
    }, 300);
  });
};

// Função que remove um produto
export const removerProduto = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // filter cria um novo array sem o produto que tem esse ID
      produtos = produtos.filter((p) => p.id !== parseInt(id));
      resolve(true);
    }, 300);
  });
};

// Função que aplica uma promoção em um produto
export const aplicarPromocao = async (id, precoPromocao) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Procura o produto
      const index = produtos.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        // Seta o preço promocional
        produtos[index].precoPromocao = precoPromocao;
        resolve(produtos[index]);
      }
      resolve(null);
    }, 300);
  });
};

// Função que remove a promoção de um produto
export const removerPromocao = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Procura o produto
      const index = produtos.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        // Tira a promoção setando null
        produtos[index].precoPromocao = null;
        resolve(produtos[index]);
      }
      resolve(null);
    }, 300);
  });
};

// ========================================
// FUNÇÕES PARA USUÁRIOS
// ========================================
// As funções de usuários são praticamente iguais às de produtos
// Só muda que trabalham com o array de usuários

// Lista todos os usuários
export const listarUsuarios = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...usuarios]);
    }, 300);
  });
};

// Busca um usuário específico
export const buscarUsuario = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usuario = usuarios.find((u) => u.id === parseInt(id));
      resolve(usuario);
    }, 200);
  });
};

// Adiciona um novo usuário
export const adicionarUsuario = async (usuario) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const novoUsuario = {
        ...usuario,
        // Gera ID único igual faz com produtos
        id:
          usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
      };
      usuarios.push(novoUsuario);
      resolve(novoUsuario);
    }, 300);
  });
};

// Atualiza um usuário existente
export const atualizarUsuario = async (id, usuarioAtualizado) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = usuarios.findIndex((u) => u.id === parseInt(id));
      if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...usuarioAtualizado };
        resolve(usuarios[index]);
      }
      resolve(null);
    }, 300);
  });
};

// Remove um usuário
export const removerUsuario = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      usuarios = usuarios.filter((u) => u.id !== parseInt(id));
      resolve(true);
    }, 300);
  });
};
