const { Router } = require('express');
const { Dog } = require('../models/Dog');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const dog = await Dog.getById(req.params.id);
    res.json(dog);
  })
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  });
