const pool = require('../utils/pool');

class Color {
  id;
  name;
  meaning;
  thing;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.meaning = row.meaning;
    this.thing = row.thing;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from colors');
    return rows.map((color) => new Color(color));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from colors where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Color(rows[0]);
  }
}

module.exports = { Color };
