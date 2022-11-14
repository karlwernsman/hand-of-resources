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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cats where id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return new Cat(rows[0]);
  }
  static async insert({ name, age, color }) {
    const { rows } = await pool.query(
      `
      INSERT INTO cats (name, age, color)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, age, color]
    );
    return new Cat(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const cat = await Cat.getById(id);
    if (!cat) return null;
    const updatedCat = { ...cat, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE cats
      SET name = $2, age = $3, color = $4
      WHERE id = $1
      RETURNING *;
      `,
      [id, updatedCat.name, updatedCat.age, updatedCat.color]
    );
    return new Cat(rows[0]);
  }
}

module.exports = { Cat };
