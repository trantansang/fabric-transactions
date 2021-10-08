var express = require('express');
var router = express.Router();
var project = require('../package.json')
router.get('/', function (req, res, next) {
    res.send({
        'status': 'ok',
        'name': project.name,
        'version': project.version
    });
});

module.exports = router;
