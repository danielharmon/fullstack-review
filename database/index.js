const mongoose = require('mongoose');
const DBKEY = process.env.DBKEY
mongoose.connect(DBKEY).then(()=>console.log('connected')).catch(err=>console.log(err));

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  html_url: String,
  owner: String,
  forks_count: Number
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);
let updateDatabase = (repo, dbRepo) => {
  return new Promise((resolve, reject) => {
    Repo.findOneAndUpdate({_id: repo.id}, dbRepo, {upsert: true, new: true}, function(err, doc) {
      if (err) { throw new Error(err) }
      resolve(doc)
    })
  })
}
let getUsers = () => {
  return Repo
  .find({})
  .exec(function(err, results) {
    if(err) {console.log(err)}
    return results;
  })
}
let save = (repos) => {
  let promises = [];
  repos.forEach(repo => {
    var dbRepo = new Repo({
      _id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      owner: repo.owner.login,
      forks_count: repo.forks_count
    })
   promises.push(updateDatabase(repo, dbRepo))
  })
  return Promise.all(promises)

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
        //console.log('Mongo find results: ', results)
        return results }
    })

}
module.exports.getTop = getTop;
module.exports.save = save;