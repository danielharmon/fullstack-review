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
  github.getReposByUsername(req.body.username)
  .then(response => dbHelpers.save(response.data))
  .then((info) => {
    var newCount = 0

    return dbHelpers.getTop()})
  .then(result => {
    res.send(result)}
  )
  .catch(err => console.log(err))

});

app.get('/users', function (req, res) {
  console.log('users request received')
  dbHelpers.getUsers()
    .then(documents => {
      var userList = {}
      documents.forEach(doc => userList[doc.owner] = doc.owner)
      res.send(userList)
})

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get request received')
  dbHelpers.getTop()
    .then(results => {
      res.send(results)})
    .catch(err => console.log(err))
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

