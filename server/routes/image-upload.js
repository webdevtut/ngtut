const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');
const upload = require('../services/image-upload');

cost singleUpload = upload.single('image');

router.post('/image-upload', UserCtrl.authMiddleware, function(req,res){
    singleUpload(req,res, function(err){
      if(err){
        
      }
      return res.json({'imageUrl', req.file.location});
    });
});

module.exports = router;
