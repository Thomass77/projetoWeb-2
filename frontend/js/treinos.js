import { fetchData, postData, deleteData } from './api.js';
import { openModal, closeModal, addFormSubmitListener } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('treinos-list');
    const btnNovo = document.getElementById('btn-novo-treino');

    let allUsers = [];
    let allExercises = [];

    async function loadInitialData() {

        [allUsers, allExercises] = await Promise.all([
            fetchData('usuarios'),
            fetchData('exercicios')
        ]);
        await loadTreinos();
    }
    
    async function loadTreinos() {
        const treinos = await fetchData('treinos');
        if (treinos) {
            renderTreinos(treinos);
        }
    }

    function renderTreinos(treinos) {
        listContainer.innerHTML = '';
        treinos.forEach(workout => {
            const user = allUsers.find(u => u.id === workout.usuario_id);
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-main-content">
                    <div class="card-content">
                        <p><strong>ID:</strong> ${workout.id}</p>
                        <p><strong>Nome:</strong> ${workout.nome}</p>
                        <p><strong>Duração:</strong> ${workout.duracao} minutos</p>
                        <p><strong>Usuário:</strong> ${user ? user.nome : 'N/A'}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn-view-exercises" data-id="${workout.id}">Ver Exercícios</button>
                        <button class="btn-edit" data-id="${workout.id}">Editar</button>
                        <button class="btn-delete" data-id="${workout.id}">Deletar</button>
                    </div>
                </div>
                <!-- Container para os exercícios detalhados, inicialmente vazio -->
                <div class="detailed-exercises-list" data-workout-id="${workout.id}" style="display: none;"></div>
            `;
            listContainer.appendChild(card);
        });
    }

    listContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const id = target.dataset.id;
        const type = 'treino';

        if (target.classList.contains('btn-edit')) {
            const data = await fetchData(`${type}s/${id}`);
            if (data) openModal(type, data, { allUsers });
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja deletar o ${type} com ID ${id}?`)) {
                await deleteData(`${type}s/${id}`);
                await loadTreinos();
            }
        }
        
        if (target.classList.contains('btn-view-exercises')) {
            const detailContainer = document.querySelector(`.detailed-exercises-list[data-workout-id="${id}"]`);

            const isVisible = detailContainer.style.display !== 'none';
            if(isVisible) {
                detailContainer.style.display = 'none';
                detailContainer.innerHTML = '';
            } else {
                const exercisesForWorkout = allExercises.filter(ex => ex.treino_id == id);
                detailContainer.innerHTML = '<h4>Exercícios do Treino:</h4>';
                if (exercisesForWorkout.length > 0) {
                    exercisesForWorkout.forEach(ex => {
                        detailContainer.innerHTML += `<p><strong>${ex.nome}</strong> - ${ex.repeticoes}</p>`;
                    });
                } else {
                    detailContainer.innerHTML += `<p>Nenhum exercício cadastrado para este treino.</p>`;
                }
                detailContainer.style.display = 'block';
            }
        }
    });
    
    btnNovo.addEventListener('click', () => openModal('treino', {}, { allUsers }));

    addFormSubmitListener(async (type, id, data) => {
        if (type !== 'treino') return;
        
        if (id) {
            await postData(`${type}s/${id}`, data, 'PUT');
        } else {
            await postData(`${type}s`, data);
        }
        closeModal();
        await loadTreinos();
    });

    loadInitialData();
});
