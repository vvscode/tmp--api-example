import express from 'express';
import session from 'express-session';
import body from 'body-parser';

const port = process.env.PORT || 3000;

declare module 'express-session' {
    interface SessionData {
      message?: string;
      username?: string;
    }
  }

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/public/templates')

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

app.get('/msg', (req, res) => {
    res.render('message', { lastMessage: String(req.session.message) });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});