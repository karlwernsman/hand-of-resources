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
  static async insert({ name, meaning, thing }) {
    const { rows } = await pool.query(
      `
        INSERT INTO colors (name, meaning, thing)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, meaning, thing]
    );
    return new Color(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const color = await Color.getById(id);
    if (!color) return null;
    const updatedColor = { ...color, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE colors
        SET name = $2, meaning = $3, thing = $4
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedColor.name, updatedColor.meaning, updatedColor.thing]
    );
    return new Color(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from colors
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Color(rows[0]);
  }
}

module.exports = { Color };
