const fundoModal = document.getElementById('fundoModal');
const modal = document.getElementById('modal');
const containerModal = document.getElementById('containerModal')

let filmeAtual = {};

// Adiciona a função de fechar o modal ao clicar no fundo
fundoModal.addEventListener('click', fecharModal)

// Atualiza a lista e atualiza a interface da página
function addFilmeAtualNaLista() {

  addLista(filmeAtual);
  atualizarTela(filmeAtual);
  fecharModal();
}

function criarModal(data) {

  filmeAtual = data; // armazena o objeto do filme

  containerModal.innerHTML = `
  <h2>${data.Title} - ${data.Year}</h2>

  <section id="infosFilme">
    <img 
      id="posterFilme"
      src="${data.Poster}" 
      alt="Poster do filme"
    >

    <div id="textoFilme">
      <div id="resumoFilme">
        <h3>Resumo</h3>
        <p>${data.Plot}</p>
      </div>

      <div id="elencoFilme">
        <h3>Elenco</h3>
        <p>${data.Actors}</p>
      </div>

      <div id="generoFilme">
        <h3>Gênero</h3>
        <p>${data.Genre}</p>
      </div>
    </div>
  </section>

  <button id="botaoAdicionar" onclick="addFilmeAtualNaLista()">Adicionar à Lista</button>`
}

function abrirModal() {
  modal.classList.remove('fechado');
  modal.classList.add('aberto');
}

function fecharModal() {
  modal.classList.remove('aberto')
  modal.classList.add('fechado')
}

