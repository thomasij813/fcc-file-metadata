var express = require('express');
var multer = require('multer');
var path = require('path');

var router = express.Router();
var storage = multer.memoryStorage();
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    onFileSizeLimit: function(file) {
        fileTooLarge = true;
        res.json({
            "uploadError": "Upload failed. File must be less than 1 MB"
        });
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting...');
    },
    onFileComplete: function(file) {
        res.json({
            "size": file.size
        });
    }
}).single('file');

router.get('/', function(req, res) {
    res.render('index');
});

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err && err.code === 'LIMIT_FILE_SIZE') {
            res.json({
                "message": "The size of your file cannot exceed 5 MB"
            });
            return false;
        }
        res.json({
            "size": req.file.size
        });
    });
});

module.exports = router;
