import express from 'express';
import session from 'express-session';
import body from 'body-parser';
import { glob } from 'glob';
import path from 'node:path';

const port = process.env.PORT || 3000;

declare module 'express-session' {
    interface SessionData {
      message?: string;
      username?: string;
    }
  }

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public/templates')

const jsonBody = body.json({
    type: '*/*'
});

app.use(session({
    secret: 'xxxxkeyboard cat',
}));
app.use(express.static('public', {
    // https://expressjs.com/en/resources/middleware/serve-static.html
    index: 'index.htm'
}));

app.post('/msg', jsonBody, (req, res) => {
    const { login, passwd } = req.body;
    // check if valid
    if (login === 'admin' && passwd === 'admin') {
        req.session.username = 'admnin';
    }
    req.session.message = String(req.body.msg);
    res.send('Thanks');
});

app.get('/list', (req, res) => {
    let cwdList = glob.sync('**/**', {
        ignore: ['node_modules/**'] 
    });
    let dirList = glob.sync('**/**', {
        cwd: __dirname + '/..',
        ignore: ['node_modules/**'] 
    })
    res.send({ cwdList, dirList, __dirname: path.resolve(__dirname, '..'), cwd: process.cwd(),views: app.get('views') });
})

app.get('/msg', (req, res) => {
    res.render('message', { lastMessage: String(req.session.message), cwd: process.cwd(), __dirname });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});