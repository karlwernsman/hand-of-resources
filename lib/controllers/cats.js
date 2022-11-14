const { Router } = require('express');
const { Cat } = require('../models/Cat');

module.exports = Router()
  .get('/', async (req, res) => {
    const cats = await Cat.getAll();
    res.json(cats);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.getById(req.params.id);
      if (!cat) {
        next();
      }
      res.json(cat);
    } catch (e) {
      next(e);
    }
  });
