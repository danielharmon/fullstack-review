const mongoose = require('mongoose');
const DBKEY = process.env.DBKEY
mongoose.connect(DBKEY);

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
  // console.log('Repos from github: ',repos)
  repos.forEach(repo => {
    var dbRepo = new Repo({
      _id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      owner: repo.owner.login,
      forks_count: repo.forks_count
    })
    Repo.findOneAndUpdate({_id: repo.id}, dbRepo, {upsert: true}, function(err, results) {
      if (err) { console.log(err) }
      console.log(results)
    })
  })
  console.log('save complete')

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}
let getTop = () => {
  return Repo
  .find({})
  .sort({forks_count: -1})
  .limit(25)
  .exec(function(err, results) {
      if(err) { console.log(err) }
      else {
        return results }
    })

}
module.exports.getTop = getTop;
module.exports.save = save;