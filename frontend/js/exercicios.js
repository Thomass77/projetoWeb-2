import { fetchData, postData, deleteData } from './api.js';
import { openModal, closeModal, addFormSubmitListener } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('exercicios-list');
    const btnNovo = document.getElementById('btn-novo-exercicio');

    let allWorkouts = [];

    async function loadInitialData() {
        allWorkouts = await fetchData('treinos');
        await loadExercicios();
    }

    async function loadExercicios() {
        const exercicios = await fetchData('exercicios');
        if (exercicios) {
            renderExercicios(exercicios);
        }
    }

    function renderExercicios(exercicios) {
        listContainer.innerHTML = '';
        exercicios.forEach(exercise => {
            const workout = allWorkouts.find(w => w.id === exercise.treino_id);
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-main-content">
                     <div class="card-content">
                        <p><strong>ID:</strong> ${exercise.id}</p>
                        <p><strong>Nome:</strong> ${exercise.nome}</p>
                        <p><strong>Máquina:</strong> ${exercise.maquina || 'N/A'}</p>
                        <p><strong>Repetições:</strong> ${exercise.repeticoes}</p>
                        <p><strong>Treino:</strong> ${workout ? workout.nome : 'N/A'}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn-edit" data-id="${exercise.id}">Editar</button>
                        <button class="btn-delete" data-id="${exercise.id}">Deletar</button>
                    </div>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }

    listContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const type = 'exercicio';

        if (target.classList.contains('btn-edit')) {
            const data = await fetchData(`${type}s/${id}`);
            if (data) openModal(type, data, { allWorkouts });
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja deletar o ${type} com ID ${id}?`)) {
                await deleteData(`${type}s/${id}`);
                await loadExercicios();
            }
        }
    });
    
    btnNovo.addEventListener('click', () => openModal('exercicio', {}, { allWorkouts }));

    addFormSubmitListener(async (type, id, data) => {
        if (type !== 'exercicio') return;
        
        if (id) {
            await postData(`${type}s/${id}`, data, 'PUT');
        } else {
            await postData(`${type}s`, data);
        }
        closeModal();
        await loadExercicios();
    });

    loadInitialData();
});
