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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from flowers where id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Flower(rows[0]);
  }
  static async insert({ name, sun_needs, soil_needs }) {
    const { rows } = await pool.query(
      `
        INSERT INTO flowers (name, sun_needs, soil_needs)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, sun_needs, soil_needs]
    );
    return new Flower(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const flower = await Flower.getById(id);
    if (!flower) return null;
    const updatedFlower = { ...flower, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE flowers
        SET name = $2, sun_needs = $3, soil_needs = $4
        WHERE id = $1
        RETURNING *
        `,
      [
        id,
        updatedFlower.name,
        updatedFlower.sun_needs,
        updatedFlower.soil_needs,
      ]
    );
    return new Flower(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from flowers
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Flower(rows[0]);
  }
}

module.exports = { Flower };
