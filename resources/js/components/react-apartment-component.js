import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ApartmentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartments:[]
    }
    if (this.props.sponsoreds) {
      this.getSponsoreds();
    } else {
      this.getResults();
    }
  }

  getSponsoreds(){
    axios.get(`/sponsoreds`)
    .then(res => {
      this.setState({apartments:res.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getSponsoreds(){
    //Qui dovresti chiamare la funzione search del componente addressSearch e farti ritornare i risultati
    axios.get(`/search`, {
      params: {
        advancedSearch:true,

      }
    })
    .then(res => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="d-flex flex-wrap">
      {this.state.apartments.map((value, index) => {
        return <div  key={index} className="apartment col-lg-4 p-5">
        <div className="apartment-wrapper">
        <a href="showIndex">
        <img src={value.image} className="img-fluid"/>
        <div className="content-apartment">
        <span className="description">{value.description}</span>
        <span className="address">{value.address}</span>
        <span>{value.visuals.length} visualizzazione</span>
        <span>{value.visuals.length} visualizzazioni</span>
        </div>
        </a>
        </div>
        </div>
      })}
      </div>
    );
  }
}

if (document.getElementById('apartments-component-wrapper')) {
  const apartmentComponent = document.querySelector('[data-sponsoreds]');
  const props = Object.assign({},apartmentComponent.dataset);
  ReactDOM.render(<ApartmentComponent {...props}/>, document.getElementById('apartments-component-wrapper'));
}
