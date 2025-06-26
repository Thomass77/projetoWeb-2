const modal = document.getElementById('form-modal');
const modalTitle = document.getElementById('modal-title');
const form = document.getElementById('entity-form');
const formFields = document.getElementById('form-fields');
const entityIdInput = document.getElementById('entity-id');

/**
 * Abre o modal com os campos corretos para o tipo de entidade.
 * @param {string} type - O tipo de entidade ('usuario', 'treino', 'exercicio').
 * @param {object} [data={}] - Os dados existentes para preencher o formulário (para edição).
 * @param {object} [dependencies={}] - Listas de dependências para selects (ex: allUsers).
 */
export function openModal(type, data = {}, dependencies = {}) {
    form.reset();
    entityIdInput.value = data.id || '';
    modalTitle.textContent = `${data.id ? 'Editar' : 'Novo'} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    createFormFields(type, data, dependencies);
    modal.showModal();
}


export function closeModal() {
    modal.close();
}

/**
 * Adiciona um listener para o evento de submit do formulário.
 * @param {function} callback - A função a ser chamada no submit.
 */
export function addFormSubmitListener(callback) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const id = entityIdInput.value;
        const type = modalTitle.textContent.split(' ')[1].toLowerCase();
        
        await callback(type, id, data);
    });
}


document.getElementById('btn-cancel').addEventListener('click', () => closeModal());



function createFormFields(type, data = {}, dependencies) {
    formFields.innerHTML = '';
    switch (type) {
        case 'usuario':
            formFields.innerHTML = `
                <label>Nome: <input type="text" name="nome" value="${data.nome || ''}" required></label>
                <label>Email: <input type="email" name="email" value="${data.email || ''}" required></label>
                ${!data.id ? '<label>Senha: <input type="password" name="senha" required></label>' : ''}
            `;
            break;
        case 'treino':
            const { allUsers = [] } = dependencies;
            formFields.innerHTML = `
                <label>Nome: <input type="text" name="nome" value="${data.nome || ''}" required></label>
                <label>Duração (minutos): <input type="number" name="duracao" value="${data.duracao || ''}" required></label>
                <label>Usuário:
                    <select name="usuario_id" required>
                        ${allUsers.map(u => `<option value="${u.id}" ${data.usuario_id == u.id ? 'selected' : ''}>${u.nome}</option>`).join('')}
                    </select>
                </label>
            `;
            break;
        case 'exercicio':
            const { allWorkouts = [] } = dependencies;
            formFields.innerHTML = `
                <label>Nome: <input type="text" name="nome" value="${data.nome || ''}" required></label>
                <label>Máquina: <input type="text" name="maquina" value="${data.maquina || ''}"></label>
                <label>Repetições: <input type="text" name="repeticoes" value="${data.repeticoes || ''}" required></label>
                <label>Treino:
                    <select name="treino_id" required>
                        ${allWorkouts.map(w => `<option value="${w.id}" ${data.treino_id == w.id ? 'selected' : ''}>${w.nome}</option>`).join('')}
                    </select>
                </label>
            `;
            break;
    }
}
