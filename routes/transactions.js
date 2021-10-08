var express = require('express');
var router = express.Router();
var Transaction = reqlib('models/transaction.js')
router.get('/', async (req, res) => {
    let items = await Transaction.listAll();
    res.send({
        'data': items
    });
});

module.exports = router;
