const formidable = require('formidable');
const express    = require('express');        
const app        = express();
const router     = express.Router();
app.use('/', router);
const port 	     = process.env.PORT || 8080;
var cloudinary = require('cloudinary');
var util = require('util');

cloudinary.config({ 
    cloud_name: 'dc3p19dbl', 
    api_key: '188614929397199', 
    api_secret: 'I3gC5SNmcArQCo7tTrJ5TBfqGww' 
});

router.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'image/jpg'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));  
    });
    form.on('file', function(name, file) {
        var temp_path = file.path;
        var file_name = file.name;

        cloudinary.uploader.upload( temp_path, function(result) { 
            console.log(result);
            console.log(result["url"]); }, { public_id: file_name });
        
    });
});
app.listen(port);
console.log(`App Runs on ${port}`);