import mysql.connector

def get_db_connection():

    try:
        connection = mysql.connector.connect(
            host='127.0.0.1',       
            user='root',            
            password='',            
            database='gym'
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None