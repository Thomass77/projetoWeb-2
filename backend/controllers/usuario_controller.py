from flask import Blueprint, request, jsonify
from services import usuario_service

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    users = usuario_service.get_all_users()
    if users is not None:
        return jsonify(users), 200
    return jsonify({'error': 'Erro ao buscar usuários'}), 500

@usuario_bp.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    user = usuario_service.get_user_by_id(id)
    if user:
        return jsonify(user), 200
    return jsonify({'error': 'Usuário não encontrado'}), 404

@usuario_bp.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.json
    user_id = usuario_service.create_user(data)
    if user_id:
        return jsonify({'id': user_id, 'message': 'Usuário criado com sucesso'}), 201
    return jsonify({'error': 'Erro ao criar usuário'}), 500

@usuario_bp.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    data = request.json
    if usuario_service.update_user(id, data):
        return jsonify({'message': 'Usuário atualizado com sucesso'}), 200
    return jsonify({'error': 'Usuário não encontrado ou erro ao atualizar'}), 404

@usuario_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    if usuario_service.delete_user(id):
        return jsonify({'message': 'Usuário deletado com sucesso'}), 200
    return jsonify({'error': 'Usuário não encontrado ou erro ao deletar'}), 404