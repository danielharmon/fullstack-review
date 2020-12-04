import React from 'react';

const RepoList = (props) => {
  var repoLinks
  if(props.repos.length > 0) {
    repoLinks = props.repos.map(repo => (
      <tr key={repo._id}>
        <td><a href={repo.html_url}>{repo.name}</a></td>
        <td>{repo.owner}</td>
        <td>{repo.forks_count}</td>
      </tr>))
  }
  return (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tr>
        <th>Repo Name</th>
        <th>Repo Owner</th>
        <th>Forks Count</th>
      </tr>
      {repoLinks}
    </table>
  </div>
)
}

export default RepoList;