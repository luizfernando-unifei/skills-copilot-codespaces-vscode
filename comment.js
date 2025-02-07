//create web server
//create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const { parse: parseUrl } = require('url');

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === '/') {
        fs.createReadStream(path.resolve(__dirname, 'index.html')).pipe(res);
    } else if (url === '/comment' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { comment } = parse(body);
            fs.appendFileSync(path.resolve(__dirname, 'comments.txt'), `${comment}\n`);
            res.end();
        });
    } else if (url === '/comments' && req.method === 'GET') {
        const comments = fs.readFileSync(path.resolve(__dirname, 'comments.txt'), 'utf8');
        res.end(comments);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});