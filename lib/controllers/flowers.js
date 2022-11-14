const { Router } = require('express');
const { Flower } = require('../models/Flower');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const flower = await Flower.getById(req.params.id);
      if (!flower) {
        next();
      }
      res.json(flower);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const flowers = await Flower.getAll();
    res.json(flowers);
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Flower.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Flower.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Flower.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
