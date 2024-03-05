const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs')
const cors = require("cors");
const morgan = require("morgan");
const colors = require('colors');
const dotenv = require("dotenv");
require('dotenv').config();
const bodyParser = require("body-parser");
const upload = require('./middlware/multer')
const crypto = require('crypto')


const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));

dotenv.config({ path: "/.env" });

app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));


app.use("/upload", upload.array('image', 5), (req, res) => {
    console.log('reached in upload');
    try {
        console.log('reached here');
        console.log(req.files);

        const imageDatas = [];
        req.files.forEach(file => {
            const uniqueName = Date.now() + '-' + file.originalname;
            const hash = crypto.createHash('md5').update(uniqueName).digest('hex');
            const imagePath = path.join(__dirname, 'public', uniqueName);
            fs.writeFileSync(imagePath, file.buffer);


            const imageUrl = `${process.env.BASE_URL}/${uniqueName}`;

            const fileInfo = {
                filename: uniqueName,
                mimetype: file.mimetype,
                size: file.size,
                hash: hash,
                url: imageUrl
            };

            imageDatas.push({ imageUrl, hash, uniqueName })
            console.log('Image saved successfully:', uniqueName);
            console.log('Hash key:', hash);
        });

        res.status(200).json({ message: 'Image(s) uploaded successfully', imageDatas });

    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})


app.use('/update', (req, res) => {
    try {
        console.log('reached at update');
        console.log(req.files);
        const newImage = req.files;
        console.log(req.query);


        const uniqueName = req.body.uniqueImageName
        console.log(uniqueName);

        const existingImagePath = path.join(__dirname, 'public', uniqueName);
        if (!fs.existsSync(existingImagePath)) {
            return res.status(404).json({ message: 'Image not found' });
        }
        fs.unlinkSync(existingImagePath);

        const imageDatas = [];
        req.files.forEach(file => {
            const uniqueName = Date.now() + '-' + file.originalname;
            const hash = crypto.createHash('md5').update(uniqueName).digest('hex');
            const imagePath = path.join(__dirname, 'public', uniqueName);
            fs.writeFileSync(imagePath, file.buffer);

            const imageUrl = `${process.env.BASE_URL}/${uniqueName}`;

            const fileInfo = {
                filename: uniqueName,
                mimetype: file.mimetype,
                size: file.size,
                hash: hash,
                url: imageUrl
            };

            imageDatas.push({ imageUrl, hash, uniqueName })
            console.log('Image saved successfully:', uniqueName);
            console.log('Hash key:', hash);
        });
        res.status(200).json({ message: 'Image(s) uploaded successfully', imageDatas });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

})



const hostName = process.env.HOST_NAME || "localhost";
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${hostName}:${port}/`.yellow);
});