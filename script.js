const key = '55c17dd5';

const fundoModal = document.getElementById('fundoModal');
const modal = document.getElementById('modal');

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
    console.log(inputAno.value);

    modal.classList.remove('fechado');
    modal.classList.add('aberto');
  } catch (error) {
    console.error(error.message);
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

