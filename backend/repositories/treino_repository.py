def get_all_workouts(cursor):
    cursor.execute("SELECT id, nome, duracao, usuario_id FROM treinos")
    return cursor.fetchall()

def get_workout_by_id(cursor, workout_id):
    cursor.execute("SELECT id, nome, duracao, usuario_id FROM treinos WHERE id = %s", (workout_id,))
    return cursor.fetchone()

def create_workout(cursor, nome, duracao, usuario_id):
    query = "INSERT INTO treinos (nome, duracao, usuario_id) VALUES (%s, %s, %s)"
    cursor.execute(query, (nome, duracao, usuario_id))
    return cursor.lastrowid

def update_workout(cursor, workout_id, nome, duracao, usuario_id):
    query = "UPDATE treinos SET nome = %s, duracao = %s, usuario_id = %s WHERE id = %s"
    cursor.execute(query, (nome, duracao, usuario_id, workout_id))
    return cursor.rowcount > 0

def delete_workout(cursor, workout_id):
    cursor.execute("DELETE FROM treinos WHERE id = %s", (workout_id,))
    return cursor.rowcount > 0