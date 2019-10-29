const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    db.find()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(() => {
        res
          .status(500)
          .json({
            errorMessage: "There was an error retrieving records from the database..."
          });
      });
  })

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).send(`hello from GET /post/${id} route`);
});

router.post('/', (req, res) => {
    res.status(200).send("hello from POST /post route");
});

module.exports = router;