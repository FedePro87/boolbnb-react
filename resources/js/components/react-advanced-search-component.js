import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AdvancedSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.optionSelected=this.optionSelected.bind(this);
    this.checkboxSelected=this.checkboxSelected.bind(this);
  }

  render() {
    return (
      <div class="search-wrapper">
        <address-search-component address="searchedAddress"></address-search-component>

        <div class="address-search-wrapper search-bar row">
          <div class="col-lg-2 p-3 m-4">
            <label for="number_of_rooms"><h2>Rooms</h2></label>
            <select onChange={this.optionSelected} name="number_of_rooms">
              <option v-for="i in 11" value="i-1">
                <span v-if="i-1==0">*</span>
                <span v-else>{{}}</span>
              </option>
            </select><br/>
          </div>

          <div class="col-lg-2 p-3 m-4">
            <label for="bedrooms"><h2>Bedrooms</h2></label>
            <select onChange={this.optionSelected.bind(this)} name="bedrooms">
              <option v-for="i in 11" value="i-1">
                <span v-if="i-1==0">*</span>
                <span v-else>{{}}</span>
              </option>
            </select><br/>
          </div>

          <div class="col-lg-2 p-3 m-4">
            <label for="radius"><h2>Distanza</h2></label>
            <select onChange={this.optionSelected.bind(this)} name="radius">
              <option v-for="i in 5" value="i*200">{{}} km</option>
            </select><br/>
          </div>
        </div>

        <div class="col-lg-6 service-wrapper">
          <label class="title" for="service">Services</label><br/>
          <div class="d-flex justify-content-around service-box">
            <div v-for="service in services">
              <label><input class="text-center" onChange={this.checkboxSelected} type="checkbox" name="services[]" value="service.id"><br/></input></label><br/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

if (document.getElementById('advanced-search-component-wrapper')) {
  ReactDOM.render(<AdvancedSearchComponent />, document.getElementById('advanced-search-component-wrapper'));
}
