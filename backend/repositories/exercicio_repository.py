def get_all_exercises(cursor):
    cursor.execute("SELECT id, nome, maquina, repeticoes, treino_id FROM exercicios")
    return cursor.fetchall()

def get_exercise_by_id(cursor, exercise_id):
    cursor.execute("SELECT id, nome, maquina, repeticoes, treino_id FROM exercicios WHERE id = %s", (exercise_id,))
    return cursor.fetchone()

def create_exercise(cursor, nome, maquina, repeticoes, treino_id):
    query = "INSERT INTO exercicios (nome, maquina, repeticoes, treino_id) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (nome, maquina, repeticoes, treino_id))
    return cursor.lastrowid

def update_exercise(cursor, exercise_id, nome, maquina, repeticoes, treino_id):
    query = "UPDATE exercicios SET nome = %s, maquina = %s, repeticoes = %s, treino_id = %s WHERE id = %s"
    cursor.execute(query, (nome, maquina, repeticoes, treino_id, exercise_id))
    return cursor.rowcount > 0

def delete_exercise(cursor, exercise_id):
    cursor.execute("DELETE FROM exercicios WHERE id = %s", (exercise_id,))
    return cursor.rowcount > 0