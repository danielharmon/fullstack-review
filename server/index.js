const express = require('express');
const github = require('../helpers/github.js')
const dbHelpers = require('../database/index.js')
const bodyParser = require('body-parser')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', bodyParser.urlencoded(), function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('served post request', req.body)
  github.getReposByUsername(Object.keys(req.body)[0])
    .then(response => dbHelpers.save(response.data))
    .then(()=> {

      res.status(200).end();
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get request received')
  dbHelpers.getTop()
    .then(results => {
      console.log('served get request with: ',results)
      res.send(results)})
    .catch(err => console.log(err))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

