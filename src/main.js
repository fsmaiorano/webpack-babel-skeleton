import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');
        this.inputEl = document.querySelector('input[name=repository]');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading) {
            let loadingEl = document.createElement('spam');
            loadingEl.appendChild(document.createTextNode('carregando...'));
            loadingEl.setAttribute('id','loading');

            this.formEl.appendChild(loadingEl);
        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0) return;
        this.setLoading();
        try {
            const response = await api.get(`/repos/${repoInput}`);

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url
                }
            } = response.data;

            this.repositories.push({
                name,
                description,
                html_url,
                avatar_url,
            });

            // this.repositories.push({
            //     name: "Fábio",
            //     description: "Descrição",
            //     avatar_url: "https://avatars0.githubusercontent.com/u/5588353?s=460&v=4",
            //     html_url: "https://github.com/fsmaiorano"
            // });

            this.render();
        } catch (err) {
            alert('O repositório não existe');
        }
        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}
new App();

// import axios from 'axios';

// class Api {
//     static async getUserInfo(username) {
//         try {
//             const response = await axios.get(`https://api.github.com/users/${username}`);
//             console.log(response.data);
//         } catch (err) {
//             console.warn('Erro');
//         }
//     }
// }

// Api.getUserInfo('fsmaiorano');