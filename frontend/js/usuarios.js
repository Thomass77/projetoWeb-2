import { fetchData, postData, deleteData } from './api.js';
import { openModal, closeModal, addFormSubmitListener } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('usuarios-list');
    const btnNovo = document.getElementById('btn-novo-usuario');

    async function loadUsuarios() {
        const usuarios = await fetchData('usuarios');
        if (usuarios) {
            renderUsuarios(usuarios);
        }
    }

    function renderUsuarios(usuarios) {
        listContainer.innerHTML = '';
        usuarios.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-main-content">
                    <div class="card-content">
                        <p><strong>ID:</strong> ${user.id}</p>
                        <p><strong>Nome:</strong> ${user.nome}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn-edit" data-id="${user.id}">Editar</button>
                        <button class="btn-delete" data-id="${user.id}">Deletar</button>
                    </div>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }

    listContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const type = 'usuario';

        if (target.classList.contains('btn-edit')) {
            const data = await fetchData(`${type}s/${id}`);
            if (data) openModal(type, data);
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja deletar o ${type} com ID ${id}?`)) {
                await deleteData(`${type}s/${id}`);
                await loadUsuarios();
            }
        }
    });
    
    btnNovo.addEventListener('click', () => openModal('usuario'));

    addFormSubmitListener(async (type, id, data) => {
        if (type !== 'usuario') return;
        
        if (id) {
            await postData(`${type}s/${id}`, data, 'PUT');
        } else {
            await postData(`${type}s`, data);
        }
        closeModal();
        await loadUsuarios();
    });

    loadUsuarios();
});
