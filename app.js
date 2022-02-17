const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require('path');

server = http.createServer( function(req, res) {  //This code for open server
    console.log("server working")
    // This code for apply style css for website
    if (req.url.indexOf('css') !== -1) {
        res.writeHead(200, {'Content-type' : 'text/css'});
        let fileContents = fs.readFileSync(__dirname+'/css/bootstrap.min.css', {encoding: 'utf8'});
        res.write(fileContents);
        res.end();
    }
    let q = url.parse(req.url, true);
    let pat=q.pathname;
    let quer=q.query;
    if(! (Object.keys(quer).length === 0)){
        //Check if role is admin will convert admin into admin into admin page else will convert into login page
        if(quer.role=="admin"){
            fs.readFile('admin.html', function(err, page) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(page);
            });
            
        }else{
            fs.readFile('login.html', function(err, page) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(page);
            });
        }
    }
    else 
    {
        // This code for open pages
        if( req.url== "/home.html"){
            fs.readFile('home.html', function(err, page) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(page);
            });
        }else if( req.url=="/blog.html"){
            fs.readFile('blog.html', function(err, page) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(page);
            });
        }else if( req.url=="/login.html"){
            fs.readFile('login.html', function(err, page) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(page);
            });
        }
        else {
            // This code if enter page not found in website will return 404 status code
            res.writeHead(404, {'Content-Type': 'text/html'});

                res.end()
        }
    }

});

server.listen(8080);// this port that will enter into localhost for open pages