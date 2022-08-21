const ancoras = document.querySelectorAll('a');

const routes = {
  '/': '/pages/home.html',
  '/universe': '/pages/universe.html',
  '/exploration': '/pages/exploration.html',
  404: '/pages/notfound.js'
}

ancoras.forEach(ancora => {
  ancora.addEventListener('click', (event) => {
    route(event);
  })
})

function route(event) {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, '', event.target.href);
  handle();  
}

function handle() {
  const { pathname } = window.location;
  const route = routes[pathname] || routes[404];
  console.log(route)

  fetch(route)
  .then(data => data.text())
  .then(html => {
    root.innerHTML = html;
  })
}

window.onpopstate = () => route();

