import { Router } from "./router.js";
const router = new Router();

const ancoras = document.querySelectorAll('a');

ancoras.forEach((ancora) => {
  ancora.addEventListener('click', (event) => {
    router.route(event);
  })
})

router.add('/', '/pages/home.html');
router.add('/universe', '/pages/universe.html');
router.add('/exploration', '/pages/exploration.html');
router.add(404, '/pages/notfound.html');

// router.handle();

window.onpopstate = () => router.handle();
window.route = () => router.route();