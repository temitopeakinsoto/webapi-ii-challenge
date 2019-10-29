const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('hello from GET /posts route');
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).send(`hello from GET /post/${id} route`);
});

router.post('/', (req, res) => {
    res.status(200).send("hello from POST /post route");
});

module.exports = router;