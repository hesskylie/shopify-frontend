const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
})



const port = process.env.PORT || 3000;
const bootUp = async () => {
  try {
    await db.sync();
    app.listen(port, () => {
      console.log("Knock, knock");
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  } catch (err) {
      console.log('DB not synced or booting up error.', err);
    }
}
bootUp();

module.exports = app;
