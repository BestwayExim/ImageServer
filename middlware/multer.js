const multer = require("multer");
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 * 1024,
    },
})

module.exports = upload;


// const multer = require("multer")
// const path = require('path')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public'))
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + "-" + file.originalname;
//         cb(null, name);
//     }
// });
// const upload = multer({ storage: storage })

// module.exports = upload




