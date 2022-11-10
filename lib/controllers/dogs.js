const { Router } = require('express');
const { Dog } = require('../models/Dog');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.getById(req.params.id);
      if (!dog) {
        next();
      }
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Dog.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Dog.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Dog.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
