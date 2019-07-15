import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddressSearchComponent from './react-address-search-component';

export default class AdvancedSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services:[]
    };

    this.buildServices=this.buildServices.bind(this);
    this.optionSelected=this.optionSelected.bind(this);
    this.checkboxSelected=this.checkboxSelected.bind(this);

    this.buildServices();
  }

  buildOptions(){
    let arr = [];

    for (let i = 0; i <= 10; i=i+1) {
      if (i==0) {
        arr.push(<option key={i} value={i}>*</option>)
      } else {
        arr.push(<option key={i} value={i}>{i}</option>)
      }
    }

    return arr;
  }

  buildRadius(){
    let arr = [];

    for (let i = 1; i <= 5; i=i+1) {
      arr.push(<option key={i} value="{i*200}">{i*200}</option>)
    }

    return arr;
  }

  buildServices() {
    let services=-1;

    axios.get(`/services`)
    .then(res => {
      this.setState({services:res.data});
    })
    .catch((error) => {
      console.log(error);
    });

  }

  optionSelected(e) {
    switch (e.target.name) {
      case 'number_of_rooms':
      this.realTimeRooms=e.target.value;
      break;
      case 'bedrooms':
      this.realTimeBedrooms=e.target.value;
      break;
      case 'radius':
      this.realTimeRadius=e.target.value;
      break;
    }

    this.eventHub.$emit('search', {
      "number_of_rooms":this.realTimeRooms,
      "bedrooms":this.realTimeBedrooms,
      "radius":this.realTimeRadius,
      "services":this.selectedCheckboxes
    });
  }

  checkboxSelected(e){
    if (e.target.checked) {
      this.selectedCheckboxes.push(e.target.defaultValue);
    } else {
      for( let i = 0; i < this.selectedCheckboxes.length; i=i+1){
        if (this.selectedCheckboxes[i]===e.target.defaultValue) {
          this.selectedCheckboxes.splice(i, 1);
        }
      }
    }

    this.search(true);
  }

  render() {
    return (
      <div className="search-wrapper">
        <AddressSearchComponent address={this.props.searchedAddress}/>

        <div className="address-search-wrapper search-bar row">
          <div className="col-lg-2 p-3 m-4">
            <label htmlFor="number_of_rooms"><h2>Rooms</h2></label>
            <select onChange={this.optionSelected} name="number_of_rooms">
              {this.buildOptions()}
            </select><br/>
          </div>

          <div className="col-lg-2 p-3 m-4">
            <label htmlFor="bedrooms"><h2>Bedrooms</h2></label>
            <select onChange={this.optionSelected.bind(this)} name="bedrooms">
              {this.buildOptions()}
            </select><br/>
          </div>

          <div className="col-lg-2 p-3 m-4">
            <label htmlFor="radius"><h2>Distanza</h2></label>
            <select onChange={this.optionSelected.bind(this)} name="radius">
              {this.buildRadius()}
            </select><br/>
          </div>
        </div>

        <div className="col-lg-6 service-wrapper">
          <label className="title" htmlFor="service">Services</label><br/>
          <div className="d-flex justify-content-around service-box">
            {this.state.services.map((value, index) => {
              return <label key={index}><input className="text-center" onChange={this.checkboxSelected} type="checkbox" name="services[]" value="{value.id}"/>
                {value.name}</label>
            })}
          </div>
        </div>
      </div>
    );
  }
}

if (document.getElementById('advanced-search-component-wrapper')) {
  const advSearcComponent = document.querySelector('[data-rooms]');
  const props = Object.assign({},advSearcComponent.dataset);

  ReactDOM.render(<AdvancedSearchComponent {...props}/>, document.getElementById('advanced-search-component-wrapper'));
}
