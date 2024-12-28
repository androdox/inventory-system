require('dotenv').config(); // Cargar las variables de entorno
const { Client } = require('pg');

class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
      console.log(this.client.host)
      // Intentar conectar a la base de datos y manejar errores
      this.client.connect()
        .then(() => console.log('Conectado a la base de datos'))
        .catch((err) => {
          console.error('Error de conexión a la base de datos', err.stack);
          process.exit(1);  // Salir si no se puede conectar
        });

      // Guardamos la instancia en Database.instance
      Database.instance = this;
    }

    return Database.instance; // Devolvemos la instancia única
  }

  // Método para realizar una consulta
  async query(queryText, params) {
    try {
      const res = await this.client.query(queryText, params);
      return res.rows; // Devolvemos las filas de la consulta
    } catch (err) {
      console.error('Error al ejecutar la consulta', err.stack);
      throw new Error('Error al ejecutar la consulta'); // Lanzamos error si falla la consulta
    }
  }
}

// Exportamos la instancia única
module.exports = new Database();