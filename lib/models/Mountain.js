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
}

module.exports = { Mountain };
