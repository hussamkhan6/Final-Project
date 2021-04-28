const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'Content-type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const PORT = 3000;

const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey, 
    algorithms: ['HS256']
});

let users = [
    {
        id: 1,
        username: 'fabio',
        password: '123'
    },
    {
        id: 2,
        username: 'nolasco',
        password: '456'
    }
]

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    /* console.log('This is me', username, password);
    res.json({ data: 'It works'}); */

    for (let user of users) {
        if(username == user.username && password == user.password) {
            let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '7d'});
            res.json({
                success: true,
                err: null,
                token
            });
            break;
        }
        else{
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password incorrect'
            })
        }
    }
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    /* console.log(req); */
    res.json({
        success: true,
        myContent: 'Secret content that only logged in people can see.'
    });
});

//this is step 1 for quiz 7
app.get('/api/settings', jwtMW, (req, res) => {
    res.json({
        success: true,
        myContent: 'Create 1 more route (called settings) and protect this route with the JWT solution'
    });
});

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use(function (err, req, res, next) {
/*     console.log(err.name == 'UnauthorizedError');
    console.log(err); */
    if (err.name == 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            offcialError: err, 
            err: 'Username or password is incorrect 2'
        });
    }
    else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});