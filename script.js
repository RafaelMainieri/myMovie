const inputNome = document.getElementById('inputNome')
const inputAno = document.getElementById('inputAno')
const botaoBusca = document.getElementById('botaoBusca')
const containerListaFilmes = document.getElementById('listaFilmes')

let listaFilmes = [];

botaoBusca.addEventListener('click', async function () {
  // Tenta se conectar com a API com as informações passadas nos inputs
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${tratarInputNome()}&y=${tratarInputAno()}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('Objeto: ', data);

    // Se a resposta da API foi um erro, devolve essa mensagem de erro
    if (data.Error) {
      throw new Error('Filme não encontrado!');
    }

    // Se a resposta da API for um sucesso, cria o modal e abre ele na tela 
    criarModal(data);
    abrirModal();
    // Se não conseguir se conectar com a API, ou seja, se cair dentro do if ↑ e voltar um erro, cai dentro desse catch e notifica o usuario de que o o filme não foi encontrado
  } catch (error) {
    notie.alert({
      type: 'error',
      text: error.message,
    });
  }
})

function tratarInputNome() {
  if (inputNome.value === '') {
    throw new Error('O nome do filme deve ser informado!');
  } else {
    return inputNome.value.split(' ').join('+');
    //split('ch') → separa os elementos com base no ch
    //join('ch') → une os elementos com base no ch
  }
}

function tratarInputAno() {
  if (inputAno.value === '') {
    return '';
  } else if (inputAno.value < 1890 || inputAno.value > 2024) {
    throw new Error('Ano do filme inválido!');
  } else {
    return inputAno.value;
  }
}

// Adiciona o objeto do filme (completo) na lista
function addLista(objetoDoFilme) {
  listaFilmes.push(objetoDoFilme);
}

function isFilmeNaLista(idDoFilme) {
  function isIdDoFilmeNaLista(objetoDoFilme) {
    return objetoDoFilme.imdbID === idDoFilme;
    // se o id do pertencer ao filme retorna true, se nao retorna false
  }
  return Boolean(listaFilmes.find(isIdDoFilmeNaLista));
  // percorre toda a listaFilmes, se encontrar algum id que pertence ao filme que está na lista, retorna o objeto do filme, se nao, retorna undefined. Transformando essa operação pra boolean se consegue os valores true (para o objeto) e false (para undefined)
}

// Atualiza a tela adicionando o filme dentro do container
function atualizarTela(objetoDoFilme) {
  containerListaFilmes.innerHTML += `
  <div class="caixaFilme">
    <img 
      src="${objetoDoFilme.Poster}" 
      alt="Poster do Filme ${objetoDoFilme.Title}"
    >

    <button class="botaoRemover">
      <i class="bi bi-trash"></i> Remover
    </button>
  </div>`
}



