# services/exercicio_service.py
from database.db import get_db_connection
from repositories import exercicio_repository

def get_all_exercises():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        exercises = exercicio_repository.get_all_exercises(cursor)
        cursor.close()
        conn.close()
        return exercises
    return None

def get_exercise_by_id(exercise_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        exercise = exercicio_repository.get_exercise_by_id(cursor, exercise_id)
        cursor.close()
        conn.close()
        return exercise
    return None

def create_exercise(data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        exercise_id = exercicio_repository.create_exercise(cursor, data['nome'], data.get('maquina'), data['repeticoes'], data['treino_id'])
        conn.commit()
        cursor.close()
        conn.close()
        return exercise_id
    return None

def update_exercise(exercise_id, data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        # AGORA INCLUÍMOS O data['treino_id'] na chamada
        success = exercicio_repository.update_exercise(
            cursor, 
            exercise_id, 
            data['nome'], 
            data.get('maquina'), 
            data['repeticoes'],
            data['treino_id']  # <-- Adicionado aqui
        )
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False

def delete_exercise(exercise_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        success = exercicio_repository.delete_exercise(cursor, exercise_id)
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False