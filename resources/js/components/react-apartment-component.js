import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ApartmentComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apartments:[]
    }

    this.getSponsoreds();
  }

  getSponsoreds(){
    axios.get(`/`)
    .then(res => {
      this.setState({apartments:res.data.apartments},function() {
        console.log(this.state.apartments);
      });
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
  ReactDOM.render(<ApartmentComponent />, document.getElementById('apartments-component-wrapper'));
}
