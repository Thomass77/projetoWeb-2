const API_URL = 'http://127.0.0.1:5000/api';

/**
 * Busca dados de um endpoint da API.
 * @param {string} endpoint - O endpoint a ser consultado (ex: 'usuarios').
 * @returns {Promise<any>} Os dados em formato JSON.
 */
export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Falha ao buscar dados de ${endpoint}:`, error);
        return null;
    }
}

/**
 * Envia dados para a API via POST ou PUT.
 * @param {string} endpoint - O endpoint de destino.
 * @param {object} data - O objeto com os dados a serem enviados.
 * @param {string} [method='POST'] - O método HTTP ('POST' ou 'PUT').
 * @returns {Promise<any>} A resposta da API.
 */
export async function postData(endpoint, data, method = 'POST') {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Falha ao enviar dados para ${endpoint}:`, error);
        return null;
    }
}

/**
 * Deleta um recurso da API.
 * @param {string} endpoint - O endpoint do recurso a ser deletado.
 * @returns {Promise<any>} A resposta da API.
 */
export async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Falha ao deletar dados de ${endpoint}:`, error);
        return null;
    }
}
