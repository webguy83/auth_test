const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth', {useMongoClient: true});

const {User} = require('./models/user');
const {auth} = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    
    user.save((err, doc) => {
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.post('/api/user/login', (req, res) => {
    User.findOne({'email':req.body.email},(err,user) => {
        if(!user) res.json({message: "Auth failed bitch"});
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message:'Wrong Password you cunt'
            })
            user.generateToken(() => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).send('ok');
            })
        })
    })
})

app.get('/user/profile', auth, (req, res) => {
    res.status(200).send(req.token);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`started on port ${port}`)
})