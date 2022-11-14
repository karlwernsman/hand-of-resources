const pool = require('../utils/pool');

class Cat {
  id;
  name;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.color = row.color;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cats');
    return rows.map((cat) => new Cat(cat));
  }
}

module.exports = { Cat };
