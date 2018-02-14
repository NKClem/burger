const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

router.get('/', function(req, res) {
    burger.selectAll(function(data) {
        let hbsObj = {
            cats: data
        };
        console.log(hbsObj);
        res.render('index', hbsObj);
    });
});

router.post('/api/burgers', function(req, res) {
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put('api/burgers/:id', function(req, res) {
    let condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;