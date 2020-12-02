import React from 'react';

const RepoList = (props) => {
  var repoLinks
  if(props.repos.length > 0) {
    repoLinks = props.repos.map(repo => <p key={repo._id}><a href={repo.html_url}>{repo.name}</a></p>)
  }
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {repoLinks}
  </div>
)
}

export default RepoList;