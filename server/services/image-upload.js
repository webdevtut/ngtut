const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/dev');


aws.config.update({
  accessKeyId: "AKIAJCOWRQQHLWNFV5CA",
  secretAccessKey: "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"
});

const s3 = new aws.S3();

const fileFilter= (req, file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null,true);
  }
  else{
    cb(new Error('Invalid file type, only JPEG and PNG is allowd'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'fcc-ng-dev',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
