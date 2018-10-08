const formidable = require('formidable');
const express    = require('express');        
const app        = express();
const router     = express.Router();
const multer = require('multer');
var crypto = require('crypto');
app.use('/', router);
const port 	     = process.env.PORT || 8080;
var cloudinary = require('cloudinary');
var util = require('util');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

cloudinary.config({ 
    cloud_name: 'dc3p19dbl', 
    api_key: '188614929397199', 
    api_secret: 'I3gC5SNmcArQCo7tTrJ5TBfqGww' 
});

/* router.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'image/jpg'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        console.log(util.inspect);  
    });
    form.on('end', function(fields, files) {
        var temp_path = this.openedFiles[0].path;
        console.log(temp_path);
        var file_name = this.openedFiles[0].name;
        console.log(file_name); */
/* var upload = multer({ dest : './public/uploads'}).single('userPhoto');
app.post('/upload', function(req,res){
    upload(req, res, function(err){		
        if(err){ 
            return res.end("Error");
        };
        console.log(req);
        res.end("file uploaded") */

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    var tmp_path = req.file.path;
    console.log(tmp_path);
    var file_name = req.file.originalname;
    var target_path = 'uploads/' + req.file.originalname;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.send("ok"); });
    src.on('error', function(err) { res.send({error: "upload failed"}); });
    cloudinary.uploader.upload( tmp_path, function(result) { 
        console.log(result);
        console.log(result["url"]); }, { public_id: file_name });
    /*  console.log(req.file);
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
        console.log('file received');
        const host = req.host;
        const filePath = req.protocol + "://" + host + '/' + req.file.path;
        console.log(filepath);
        return res.send({
            success: true,
            path: filePath
        })
    } */
});




/* 
        cloudinary.uploader.upload(req.file.path, function(result) { 
            console.log(result); */

        /* cloudinary.uploader.upload( temp_path, function(result) { 
            console.log(result);
            console.log(result["url"]); }, { public_id: file_name }); */
        
 



//new one

/* router.post('/upload', (request, response, next)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.multiples = true;
    form.parse(request, (err, fields, files)=>{
        if(err){
            response.json({
                result: "failed",
                data: {},
                messge: `Cannot upload images. Error is: ${err}`
            });
        }
        var arrayOfFiles = [];
        if (files[""] instanceof Array){
            arrayOfFiles = files[""];
        }else{
            arrayOfFiles.push(files[""]);
        }
        if (arrayOfFiles.length > 0){
            var fileNames = [];
            arrayOfFiles.forEach((eachFile) => {
                fileNames.push(eachFile.path)
            });
            response.json({
                result: "ok",
                data: fileNames,
                messge: "Uploaded"
            });
        } else {
            response.json({
                result: "failed",
                message: "Image not uploaded to server"
            });
        }
    });
});*/
 
app.listen(port);
console.log(`App Runs on ${port}`);