const { Router } = require('express');
const { Color } = require('../models/Color');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const color = await Color.getById(req.params.id);
      if (!color) {
        next();
      }
      res.json(color);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const colors = await Color.getAll();
    res.json(colors);
  });
