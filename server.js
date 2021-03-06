const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart_brain'
    }
  });



const app = express();
app.use(bodyParser.json());
app.use(cors());

//Home
app.get('/', (req,res) => {
    res.send(console.log('Success'));
});

//Sign-IN
app.post('/signin', (req,res) => {signin.handleSignin(req,res,bcrypt,db)});
//Register
app.post('/register', (req,res) => {register.handleRegister(req,res,db, bcrypt)})
//UserProfile
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});
//Ranking
app.put('/image',(req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

