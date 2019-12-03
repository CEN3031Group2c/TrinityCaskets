const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');


const s3 = new aws.S3({
    accessKeyId: 'AKIAQXRABT4C4RT37FWF',
    secretAccessKey: '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',
    Bucket: 'trinity-caskets-bucket'
});

const imageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'trinity-caskets-bucket',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, fileName,cb) {
            cb(null, path.basename(fileName.originalname, path.extname(fileName.originalname)) + path.extname(fileName.originalname))
        }
    }),
    limits: {fileSize: 2000000},
    fileFilter: function(req, fileName, cb) {
        checkFileType(fileName, cb);
    }
}).single('image');

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
    imageUpload(req, res, (error) => {
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