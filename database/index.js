const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  html_url: String,
  owner: String,
  forks_count: Number
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  repos.forEach(repo =>{
    var dbRepo = new Repo({
      _id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      owner: repo.owner.login,
      forks_count: repo.forks_count
    })
    Repo.findOneAndUpdate({_id: repo.id}, dbRepo, {upsert: true}, function(err, results) {
      if (err) {console.log(err)}
      else { console.log('successfully written', results) }
    })
  })
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}
let getTop = () => {
  Repo.find({}).sort({forks_count: 1}).limit(25).exec(function(err, results) {
      if(err) { console.log(err) }
      else { return results }
    })

}
module.exports.getTop = getTop;
module.exports.save = save;