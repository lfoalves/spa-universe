const input = document.querySelector('input')
const button = document.querySelector('header button')
// console.log(input.value, button)

window.addEventListener('mousemove', () => {
  if (!input.value) {
    button.setAttribute('disabled', 'disabled')
    button.setAttribute('title', 'Por favor preencha o campo de usuário')
  } else {
    button.setAttribute('title', 'Adicionar aos favoritos')
    button.removeAttribute('disabled')
  }
})
button.addEventListener('click', () => {
  setTimeout(()=> {
    button.setAttribute('disabled', 'disabled');
    input.value = ''
  } ,1000)
})