const { Router } = require('express');
const { Flower } = require('../models/Flower');

module.exports = Router().get('/', async (req, res) => {
  const flowers = await Flower.getAll();
  res.json(flowers);
});
