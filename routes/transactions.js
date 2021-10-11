var express = require('express');
var router = express.Router();
var Transaction = reqlib('models/transaction.js')
router.get('/', async (req, res) => {
    let items = await Transaction.listAll();
    res.send({
        'data': items,
        'count': items.length
    });
});
router.post('/', async (req, res, next) => {
    let data = req.body || {};
    // Todo: Make input model validation
    if (!data['user_id']) {
        return res.status(400).send({
            message: 'Missing user id'
        });
    }
    if (!data['amount']) {
        return res.status(400).send({
            message: 'Missing amount'
        });
    }
    if(data['amount'] <= 0){
        return res.status(400).send({
            message: 'Amount is invalid'
        });
    }
    // Create transaction
    try {
        let transaction = await Transaction.add(data);
        return res.send({...transaction});
    } catch (e) {
        return res.status(400).send({
            message: e.toString()
        });
    }

});

module.exports = router;
