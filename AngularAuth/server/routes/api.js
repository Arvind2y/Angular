/* Define all API endpoints */
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb://eventusr1:password1@ds235833.mlab.com:35833/meventsdb';

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) { console.log(`Error! ${err}`) }
    else { console.log('Sucess! connected to mongo mEventdb') }
})

router.get('/', (req, res) => {
    res.send('From API route');
});

// For testing if data is getting inserted sucessfully or not.
/*
const userObj = {
    email: 'a@a.com',
    password: 'Steak'
  };
  
  const userDataObj = JSON.stringify(userObj);
*/

router.post('/register', (req, res) => {
    // let userData = userObj;
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            consol.log('Error!' + error);
        }
        else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token });
        }

    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            consol.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password != userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: userData._id };
                    let token = jwt.sign(payload, 'secretKey')
                    //res.status(200).send(user);
                    res.status(200).send({ token });
                }
            }
        }
    });
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "10",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
    ];
    res.json(events);
});


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo Spl",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo  Spl",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Motor car Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Tokyo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Delhi",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo London",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo Italy",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo Zurich",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "9",
            "name": "Auto Expo NY",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "10",
            "name": "Auto Expo Mumbai",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
    ];
    res.json(events);
});

module.exports = router;