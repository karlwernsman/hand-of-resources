const pool = require('../utils/pool');

class Dog {
  id;
  name;
  age;
  breed;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.breed = row.breed;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from dogs');
    return rows.map((dog) => new Dog(dog));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from dogs where id = $1', [id]);
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
