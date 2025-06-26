from flask import Blueprint, request, jsonify
from services import treino_service

treino_bp = Blueprint('treino_bp', __name__)

@treino_bp.route('/treinos', methods=['GET'])
def get_treinos():
    workouts = treino_service.get_all_workouts()
    if workouts is not None:
        return jsonify(workouts), 200
    return jsonify({'error': 'Erro ao buscar treinos'}), 500

@treino_bp.route('/treinos/<int:id>', methods=['GET'])
def get_treino(id):
    workout = treino_service.get_workout_by_id(id)
    if workout:
        return jsonify(workout), 200
    return jsonify({'error': 'Treino não encontrado'}), 404

@treino_bp.route('/treinos', methods=['POST'])
def create_treino():
    data = request.json
    workout_id = treino_service.create_workout(data)
    if workout_id:
        return jsonify({'id': workout_id, 'message': 'Treino criado com sucesso'}), 201
    return jsonify({'error': 'Erro ao criar treino'}), 500

@treino_bp.route('/treinos/<int:id>', methods=['PUT'])
def update_treino(id):
    data = request.json
    if treino_service.update_workout(id, data):
        return jsonify({'message': 'Treino atualizado com sucesso'}), 200
    return jsonify({'error': 'Treino não encontrado ou erro ao atualizar'}), 404

@treino_bp.route('/treinos/<int:id>', methods=['DELETE'])
def delete_treino(id):
    if treino_service.delete_workout(id):
        return jsonify({'message': 'Treino deletado com sucesso'}), 200
    return jsonify({'error': 'Treino não encontrado ou erro ao deletar'}), 404