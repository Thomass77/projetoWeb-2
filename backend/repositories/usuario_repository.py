def get_all_users(cursor):
    cursor.execute("SELECT id, nome, email FROM usuarios")
    return cursor.fetchall()

def get_user_by_id(cursor, user_id):
    cursor.execute("SELECT id, nome, email FROM usuarios WHERE id = %s", (user_id,))
    return cursor.fetchone()

def create_user(cursor, nome, email, senha):
    query = "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)"

    cursor.execute(query, (nome, email, senha))
    return cursor.lastrowid

def update_user(cursor, user_id, nome, email):
    query = "UPDATE usuarios SET nome = %s, email = %s WHERE id = %s"
    cursor.execute(query, (nome, email, user_id))
    return cursor.rowcount > 0

def delete_user(cursor, user_id):
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (user_id,))
    return cursor.rowcount > 0