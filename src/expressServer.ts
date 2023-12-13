import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public', {
    // https://expressjs.com/en/resources/middleware/serve-static.html
    index: 'index.htm'
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});