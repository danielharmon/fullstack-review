import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      users: []
    }

  }

  componentDidMount() {
    $.ajax('/repos', {
      method: 'GET',
      success: (results) => {
        console.log('GET Results : ', results)
        this.setState({repos: results})
      }
    })
    $.ajax('/users', {
      method: 'GET',
      success: (results) => {
        console.log('GET Results : ', results)
        this.setState({users: results})
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax('/repos', {
      method: 'POST',
      data: {username: term},
      success: (results) => {
        console.log('POST SUCCESS');
        this.setState({repos: results});
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Users users={this.state.users}/>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));