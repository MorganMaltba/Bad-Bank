const express = require('express');
const path = require('path')
const cors = require('cors');
const dal = require('./dal.js');
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/account/create/:name/:email/:password', (req, res) => {

  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      res.send(user);
    });
});

app.get('/account/login/:email/:password', (req, res) => {

  dal.find(req.params.email, req.params.password)
    .then((user) => {
      res.send(user);
    });
});

app.get('/account/update/:email/:amount', (req, res) => {
  dal.find(req.params.email)
    .then((user) => {
      let amount = Number(req.params.amount);
      dal.update(req.params.email, amount)
        .then((response) => {
          res.send(response);
        });
    });
});

app.get('/account/all', (req, res) => {
  dal.all()
    .then((users) => {
      res.send(users);
    });
});

app.get('/account/:email', (req, res)=> {
  dal.findAccount(req.params.email)
    .then( (user) => {
    res.send(user)
  });
}); 

app.get('/account/delete/:email', (req, res) => {
  dal.deleteAccount(req.params.email)
    .then( ()=> res.send('User Deleted'))
    .catch( (err) => console.log(err))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running on Port ${port}...`);
});