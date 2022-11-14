const pool = require('../utils/pool');

class Flower {
  id;
  name;
  sun_needs;
  soil_needs;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.sun_needs = row.sun_needs;
    this.soil_needs = row.soil_needs;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from flowers');
    return rows.map((flower) => new Flower(flower));
  }
}

module.exports = { Flower };
