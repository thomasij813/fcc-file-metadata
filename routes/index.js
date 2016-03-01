var express = require('express');
var multer = require('multer');
var path = require('path');

var router = express.Router();
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    }
}).single('file');

router.get('/', function(req, res) {
    res.locals.protocol = req.protocol;
    res.locals.hostname = req.hostname;
    res.render('index');
});

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err && err.code === 'LIMIT_FILE_SIZE') {
            res.json({
                "message": "The size of your file cannot exceed 5 MB",
                "error": err
            });
            return false;
        }
        res.json({
            "size": req.file.size
        });
    });
});

module.exports = router;
