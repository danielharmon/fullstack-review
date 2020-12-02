const axios = require('axios');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var TOKEN = process.env.TOKEN
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${TOKEN}`
    }
  };
  return axios.request(options)
    .then(response => {
      //console.log(response);
      return response})
    .catch(err => console.log(err))
}

module.exports.getReposByUsername = getReposByUsername;