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
    if (rows.length === 0) {
      return null;
    }
    return new Dog(rows[0]);
  }
  static async insert({ name, age, breed }) {
    const { rows } = await pool.query(
      `
        INSERT INTO dogs (name, age, breed)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, age, breed]
    );
    return new Dog(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const dog = await Dog.getById(id);
    if (!dog) return null;
    const updatedDog = { ...dog, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE dogs
        SET name = $2, age = $3, breed = $4
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedDog.name, updatedDog.age, updatedDog.breed]
    );
    return new Dog(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from dogs
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
