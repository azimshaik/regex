var http = require("http");
var fs = require("fs");

var host = "127.0.0.1";
var port = 3001;

var server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  const regex = /EDWOOP.([a-zA-Z_]*)\s/gm;
  var filename = "content.txt";
  var str = fs.readFileSync(filename).toString();
  let m;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
  response.end("Server Working Success");
});

server.listen(port, host, error => {
  if (error) {
    return console.log("Error occured : ", error);
  }

  console.log("server is listening on " + host + ":" + port);
});

// const string = "EDWOOP.SCHEMA_NAME";
// const regex = "/EDWOOP.([a-zA-Z_]*)s";
// const isExisting = regex.exec(string);
// console.log(isExisting);

//   var filename = "content.txt";
//   var content = fs.readFileSync(filename).toString();
//   //console.log("Content : " + content);
//   var reg = /EDWOOP.([a-zA-Z_]*)\s/;
//   var myarray = content.match(reg);
//   console.log(myarray);
//   var len = myarray.length;
//   console.log("Occurrences of pattern in the string is : " + len);