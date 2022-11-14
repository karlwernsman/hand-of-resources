const { Router } = require('express');
const { Mountain } = require('../models/Mountain');

module.exports = Router().get('/', async (req, res) => {
  const mountains = await Mountain.getAll();
  res.json(mountains);
});
