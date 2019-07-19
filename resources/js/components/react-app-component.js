import React, { Component } from 'react';
import AdvancedSearch from '../components/react-advanced-search-component';
import Apartments from '../components/react-apartment-component';
import ReactDOM from 'react-dom';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      searchedAddress:"",
      results:[],
      updateResults:false
    }

    this.updateResults=this.updateResults.bind(this);
  }

  updateResults(resultsArray){
    this.setState({results:resultsArray,updateResults:true});
  }

  render() {
    return (
      <div>
        <AdvancedSearch address={this.props.address} updateAddress={this.updateSearchedAddress} updateResults={this.updateResults}/>
        <h1>Risultati in evidenza:</h1>
        <Apartments sponsoreds={true} />
        <h1>Risultati ricerca:</h1>
        <Apartments results={this.state.results} updateResults={this.state.updateResults} sponsoreds={false} lat={this.props.lat} lon={this.props.lon} advancedSearch={true}/>
      </div>
    )
  }
}

if (document.getElementById('app')) {
  const el = document.getElementById('app')
  const props = Object.assign({}, el.dataset)
  ReactDOM.render(<App {...props}/>, document.getElementById('app'));
}
