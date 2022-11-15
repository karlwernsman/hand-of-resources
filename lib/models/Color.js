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
}

module.exports = { Color };
