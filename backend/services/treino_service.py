from database.db import get_db_connection
from repositories import treino_repository

def get_all_workouts():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        workouts = treino_repository.get_all_workouts(cursor)
        cursor.close()
        conn.close()
        return workouts
    return None

def get_workout_by_id(workout_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        workout = treino_repository.get_workout_by_id(cursor, workout_id)
        cursor.close()
        conn.close()
        return workout
    return None

def create_workout(data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        workout_id = treino_repository.create_workout(cursor, data['nome'], data['duracao'], data['usuario_id'])
        conn.commit()
        cursor.close()
        conn.close()
        return workout_id
    return None

def update_workout(workout_id, data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()

        success = treino_repository.update_workout(
            cursor, 
            workout_id, 
            data['nome'], 
            data['duracao'],
            data['usuario_id']
        )
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False

def delete_workout(workout_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        success = treino_repository.delete_workout(cursor, workout_id)
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False