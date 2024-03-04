const fs = require('fs');
const path = require('path');
const publicFolderPath = path.join(__dirname, 'public');

const uploadImages = async (req, res) => {
    try {
        console.log('reached in images server');
        console.log(req.body);
        console.log('body printed');
        console.log(req.body.file);
        // console.log(req.file);

    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    uploadImages
}