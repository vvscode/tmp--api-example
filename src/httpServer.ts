import http from 'node:http';

const server = http.createServer((req, res) => {
    res.write('Hello');
    res.end();
});


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
