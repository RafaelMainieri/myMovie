const $fundoModal = document.getElementById('fundoModal');
const $modal = document.getElementById('modal');

$fundoModal.addEventListener('click', function () {
  $modal.classList.remove('aberto')
  $modal.classList.add('fechado')
})