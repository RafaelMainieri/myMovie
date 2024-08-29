const fundoModal = document.getElementById('fundoModal');
const modal = document.getElementById('modal');
const containerModal = document.getElementById('containerModal')

const inputNome = document.getElementById('inputNome')
const inputAno = document.getElementById('inputAno')
const botaoBusca = document.getElementById('botaoBusca')

fundoModal.addEventListener('click', function () {
  modal.classList.remove('aberto')
  modal.classList.add('fechado')
})

botaoBusca.addEventListener('click', async function () {

  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${tratarInputNome()}&y=${tratarInputAno()}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('data: ', data);

    if (data.Error) {
      throw new Error('Filme não encontrado!');
    }

    criarModal(data);
    modal.classList.remove('fechado');
    modal.classList.add('aberto');
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

function criarModal(data) {
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

  <button id="botaoAdicionar">Adicionar à Lista</button>`
}

