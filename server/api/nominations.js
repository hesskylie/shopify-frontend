const router = require('express').Router();
const { Nomination } = require('../db/models')


router.get('/', async (req, res, next) => {
  try {
    const noms = await Nomination.findAll();
    res.json(noms);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await Nomination.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete('/:nomId',  async (req, res, next) => {
  try {
    const nomination = await Nomination.findByPk(req.params.nomId);
    await nomination.destroy();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
