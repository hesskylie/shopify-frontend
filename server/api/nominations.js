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
  // send status res
  try {
    await Nomination.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/:nomId', function (req, res, next) { /* etc */});

router.delete('/:nomId', function (req, res, next) { /* etc */});

module.exports = router;
