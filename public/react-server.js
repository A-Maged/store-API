const express = require('express');
const path = require('path');
var http = require('http');
const app = express();
app.use(express.static(path.join(__dirname, '.')));

var port =80;


var server = http.createServer(app);

server.listen(port, function() {
    console.log(`listening on http://127.0.0.1:${port}`)  
});

app.use(function(req, res){
		if(req.url.indexOf('bundle.js') != -1){
            res.sendFile(path.resolve(__dirname, './assets/js/bundle.js'))	
        }
        else{
            res.sendFile(path.resolve(__dirname, './index.html'))	        
        }
})

