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
  static async insert({ name, height_in_feet, location }) {
    const { rows } = await pool.query(
      `
        INSERT INTO mountains (name, height_in_feet, location)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [name, height_in_feet, location]
    );
    return new Mountain(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const mountain = await Mountain.getById(id);
    if (!mountain) return null;
    const updatedMountain = { ...mountain, ...newAttrs };
    const { rows } = await pool.query(
      `
        UPDATE mountains
        SET name = $2, height_in_feet = $3, location = $4
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedMountain.name,
        updatedMountain.height_in_feet,
        updatedMountain.location,
      ]
    );
    return new Mountain(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE from mountains
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Mountain(rows[0]);
  }
}

module.exports = { Mountain };
