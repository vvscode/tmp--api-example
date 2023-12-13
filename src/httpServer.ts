import http from 'node:http';
const { URL } = require('node:url');
import fs from 'node:fs';
import util from 'node:util';
import path from 'node:path';

const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);



const server = http.createServer(async (req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);

    const pathNameWithoutLeadingSlash = url.pathname.replace(/^\/+/, '');
    const pathname = path.resolve(__dirname, '../public', pathNameWithoutLeadingSlash || 'index.html');

    if (await exists(pathname)) {
        const data = await readFile(pathname);
        res.write(data);
        res.end();
    } else {
        res.writeHead(404);
        res.write(JSON.stringify({status: 'not found'}))
        res.end();
    }
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
