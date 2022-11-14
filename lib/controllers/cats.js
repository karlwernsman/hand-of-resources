const { Router } = require('express');
const { Cat } = require('../models/Cat');

module.exports = Router().get('/', async (req, res) => {
  const cats = await Cat.getAll();
  res.json(cats);
});
