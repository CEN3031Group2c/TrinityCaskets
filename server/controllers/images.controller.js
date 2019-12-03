const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');


const s3 = new aws.S3({
    accessKeyId: '',
    secretAccessKey: '',
    Bucket: ''
});

const imageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '',
        acl: 'public-read',
        key: function(req, fileName,cb) {
            cb(null, path.basename(fileName.originalname, path.extname(fileName.originalname)) + '-' + Date.now() + path.extname(fileName.originalname))
        }
    }),
    limits: {fileSize: 2000000},
    fileFilter: function(req, fileName, cb) {
        checkFileType(fileName, cb);
    }
}).single('productImage');

function checkFileType(fileName, cb) {
    const fileType = /jpeg|jpg|gif|png/;
    const extensionName = fileType.test(path.extname(fileName.originalname).toLowerCase());
    const mimeType = fileType.test(fileName.mimetype);
    if(mimeType && extensionName) {
        return cb(null, true);
    }
    else {
        cb('Error: Invalid File Upload');
    }
}

exports.create = function(req, res) {
    imageUpload(function(req, res, error) {
        if(error) {
            res.json({error: error});
        }
        else {
            if(req.file === undefined) {
                res.json('Error: No File Selected');
            }
            else {
                const name = req.file.key;
                const location = req.file.location;
                res.json({
                    image: name,
                    location: location
                });
            }
        }
    })
}