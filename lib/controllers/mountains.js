const { Router } = require('express');
const { Mountain } = require('../models/Mountain');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const mountain = await Mountain.getById(req.params.id);
      if (!mountain) {
        next();
      }
      res.json(mountain);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const mountains = await Mountain.getAll();
    res.json(mountains);
  });
