import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
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
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax('/repos', {
      method: 'POST',
      data: term,
      success: () => {
        console.log('POST SUCCESS');
        this.componentDidMount();
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));