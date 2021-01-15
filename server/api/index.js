const router = require('express').Router();

router.use('/nominations', require('./nominations'));
// router.use('/galleries', require('./galleries'));
// router.use('/photos', require('./photos'));

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
})

module.exports = router;




//Send all data requests to:
//http://www.omdbapi.com/?apikey=fcf9a313&
//Poster API Requests:
//http://img.omdbapi.com/?apikey=fcf9a313&
