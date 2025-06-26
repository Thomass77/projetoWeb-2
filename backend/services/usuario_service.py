from database.db import get_db_connection
from repositories import usuario_repository

def get_all_users():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        users = usuario_repository.get_all_users(cursor)
        cursor.close()
        conn.close()
        return users
    return None

def get_user_by_id(user_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        user = usuario_repository.get_user_by_id(cursor, user_id)
        cursor.close()
        conn.close()
        return user
    return None

def create_user(data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        user_id = usuario_repository.create_user(cursor, data['nome'], data['email'], data['senha'])
        conn.commit()
        cursor.close()
        conn.close()
        return user_id
    return None

def update_user(user_id, data):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        success = usuario_repository.update_user(cursor, user_id, data['nome'], data['email'])
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False

def delete_user(user_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        success = usuario_repository.delete_user(cursor, user_id)
        conn.commit()
        cursor.close()
        conn.close()
        return success
    return False