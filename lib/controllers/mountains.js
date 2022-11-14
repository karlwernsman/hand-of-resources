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
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Mountain.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Mountain.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Mountain.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
