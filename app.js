const express = require('express');
const formidable = require('formidable');
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
app = express();

//load view engine **imp
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



app.get('/', (req, res) => {
    console.log("hello wolrd ");
    // res.render('index');
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

    var form = new formidable.IncomingForm();



    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });
    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });

    form.parse(req, function (err, fields, files) {
        fs.readFile('uploads/samplesastest.txt', 'utf8', function (err, data) {
            //console.log(typeof data);
            let m;
            const regex = /[a-zA-z1-9]*\.[a-zA-Z_]*/gm;
            while ((m = regex.exec(data)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                });
            }
        });
    });
    console.log("supposed to process something");

    res.sendFile(__dirname + '/redirect.html');

});


function extract() {

}

app.listen(3010, () => console.log('Express server started at port 3010'));