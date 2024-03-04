const express = require("express");
const route = express.Router();
const upload = require('../middlware/multer')
const {uploadImages} = require('../controller/olympicController')


route.post('/uplodThumpImage',upload.single('thumpImage'),uploadImages)


module.exports = route
