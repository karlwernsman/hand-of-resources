const pool = require('../utils/pool');

class Mountain {
  id;
  name;
  height_in_feet;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.height_in_feet = row.height_in_feet;
    this.location = row.location;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from mountains');
    return rows.map((mountain) => new Mountain(mountain));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from mountains where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Mountain(rows[0]);
  }
}

module.exports = { Mountain };
