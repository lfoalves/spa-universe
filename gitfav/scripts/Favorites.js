// GITFAV
import { GitHubUser } from "./GitHubUser.js";
import { Sound } from "./sound.js";


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load();
  };

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-gitfav:')) || [];
  };

  save() {
    localStorage.setItem('@github-gitfav:', JSON.stringify(this.entries))
  };

  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists) {
        throw new Error('Favorito já cadastrado')
      }

      const user = await GitHubUser.search(username)

      if (user.login === undefined) {
        Sound().error.play();
        throw new Error('Usuário não encontrado')
      }

      this.entries = [user, ...this.entries];
      
      Sound().star.play();
      this.save();
      this.update();

    } catch (err) {
      alert(err.message)
    }
  };

  delete(user) {
    const filteredEntries = this.entries
    .filter((entry) => {
      return entry.login !== user.login
    });

    this.entries = filteredEntries;
    this.save();
    this.update();
  };
}


export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update();
    this.onadd();
  };

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  };

  update() {
    this.removeAllTr();

    if(this.entries.length == 0) {
      return this.nofavorites(); 
    }

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector('.user img').src = 'https://www.github.com/' + user.login + '.png';
      row.querySelector('.user img').alt = 'Imagem de&nbsp;'+ user.login;
      row.querySelector('.user a').href = 'https://www.github.com/' + user.login;
      row.querySelector('.user a').title = 'Acessar: https://www.github.com/' + user.login;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = '/' + user.login;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja excluir essa linha?')
        if (isOk) {
          this.delete(user)
          Sound().exclude.play();
        }
      }

      this.tbody.append(row);
    })
  };  

  nofavorites() {
    fetch('../partials/no_favorites.html')
    .then(data => data.text())
    .then(html => {
      const lineTable = document.createElement('tr');
      lineTable.classList.add('no-favorites');
      lineTable.innerHTML = html;
      this.tbody.append(lineTable);
    })
  };

  createRow() {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="user">
          <img src="https://www.github.com/lfoalves.png" alt="">
          <a href="https://www.github.com/lfoalves" target="_blank">
            <p>Luiz Fernando</p>
            <span>/lfoalves</span>
          </a>
        </td>
        <td class='repositories'>
          123
        </td>
        <td class='followers'>
          1234
        </td>
        <td class="remove">
          <button title="Clique para remover">Remove</button>
        </td>
    `
    return tr;
  };

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => tr.remove())
  };
}