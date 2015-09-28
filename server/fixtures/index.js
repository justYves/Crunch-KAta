var router = require('express').Router();
var fs = require("fs");
var path = require("path");
var orderFile = path.join(__dirname, '../fixtures/order.json');
var variablesFile = path.join(__dirname, '../fixtures/variables.json');


router.get('/order', function(req, res, next) {
    res.sendFile(orderFile);
});

router.get('/variables', function(req, res, next) {
    res.sendFile(variablesFile);
});

module.exports = router;