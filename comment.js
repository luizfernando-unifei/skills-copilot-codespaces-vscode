//create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = [];
const server = http.createServer((req, res) => {
    //parse url
    const {pathname} = url.parse(req.url);
    const method = req.method;
    if (pathname === '/' && method === 'GET') {
        fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('500 Server Error');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (pathname === '/comments' && method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else if (pathname === '/comments' && method === 'POST') {
        let str = '';
        req.on('data', data => {
            str += data.toString();
        });
        req.on('end', () => {
            const comment = JSON.parse(str);
            comments.push(comment);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(comment));
        });
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('404 Not Found');
    }
});
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});