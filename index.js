const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer');
const path = require('path');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/files', express.static(path.join(__dirname, 'uploads')))
app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var filename = "uploads_"+Date.now(new Date()).toString() +"_"+ file.originalname
        cb(null, filename)
    }
})

var upload = multer({ storage: storage })

// function to save image   rl  to mongodb
let store = (filename) => {
    //your servername + filename
    var imgUrl = 'http://localhost:3000/files/uploads/' + filename; //save this to db  
}

// note 'img' in upload is the key you use in FormData in frontend
//e.g : var data =  new FormData()
// data.append('img' ,uploadedFiles)

// app.post('/uploadMultiple', upload.array('img', 10), (req, res, next) => {
//     const imgs = req.files
//     if (!imgs) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     } else {
//         imgs.map(img => {
//             store(img.filename)
//         })
//         res.send(imgs)
//     }
// })

app.post('/uploadSingle', upload.single('img'), (req, res, next) => {
    const img = req.file
    if (!img) {
        const error = new Error('Please select a file')
        error.httpStatusCode = 400
        return next(error)
    }
    else {
        store(img.filename)
        img.filename =  'http://localhost:3000/files/' + img.filename
        res.send(img )
    }
})

app.listen(3000, () => {
    console.log(`server running at ${3000}`);
})
