import React from 'react';

const RepoList = (props) => {
  var repoLinks = props.repos.map(repo => <a href={repo.html_url}>{repo.name}</a>)

  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {repoLinks}
  </div>
)
}

export default RepoList;