import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AddressSearchComponent extends Component {
  constructor(props) {
    super(props);

    let address="";


    if (this.props.address!=null) {
      address=this.props.address;
    }

    if (address=="") {
      address="Roma - RM";
    }

    this.preventInfiniteLoading={};

    this.state = {
      realTimeAddress: address,
      results:[],
      addressesSelected:false,
      latComp:'',
      lonComp:'',
      showClose:false
    }

    this.addressFocus=this.addressFocus.bind(this);
    this.closeButtonClicked=this.closeButtonClicked.bind(this);
    this.addressSelected=this.addressSelected.bind(this);
    this.handleOutsideClick=this.handleOutsideClick.bind(this);
    this.addressChanged=this.addressChanged.bind(this);
  }

  componentDidMount(){
    this.search(true);
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillReceiveProps() {
    if (this.props.updateNow) {
      this.search(true);
    }
  }

  stopUpdate(){
    this.props.stopUpdate();
  }

  updateResults(resultsArray){
    this.props.updateResults(resultsArray);
  }

  handleOutsideClick(e){
    e.stopPropagation();
    //FIXME La classe esclusa è troppo scriptata.
    if (e.target.className!=="address-search-spa" && e.target.className!=="fas fa-times" && e.target.className!=="query-selector-spa") {
      this.setState({results:[],showClose:false});
    }
  }

  closeButtonClicked(){
    this.setState({realTimeAddress: "",showClose:false});
  }

  addressSelected(e){
    let selectedAddress=$(e.target).text();
    this.setState({realTimeAddress:selectedAddress,results:[],addressesSelected:true,showClose:false},function(){
      this.search(true);
    });
  }

  addressFocus(e){
    this.setState({addressesSelected:false,showClose:true},function () {
      this.search();
    });
  }

  addressChanged(e){
    var queryIsEmpty;

    if (e.target.value!="") {
      queryIsEmpty=true;
    } else {
      queryIsEmpty=false;
    }

    this.setState({realTimeAddress:e.target.value,addressesSelected:false,showClose:queryIsEmpty},function () {
      this.search();
    });
  };

  search(addressesSelected,advancedData){
    let self= this;
    let query=this.state.realTimeAddress;

    const outData = {
      access_token:"pk.eyJ1IjoiYm9vbGVhbmdydXBwbzQiLCJhIjoiY2p4YnN5N3ltMDdkbjNzcGVsdW54eXFodCJ9.BP8Cf-t-evfHO22_kDFzbg",
      types:"place,address",
      autocomplete:true,
      limit:6
    };

    $.ajax({
      url:'https://api.mapbox.com' + '/geocoding/v5/mapbox.places/' + query +'.json',
      method:"GET",
      data:outData,
      success:function(inData,state){
        let resultsArray = inData['features'];
        let addressArray=[];

        // Crea i risultati di ricerca in tempo reale.
        for (let i = 0; i < resultsArray.length; i=i+1) {
          let resultAddress=resultsArray[i]['place_name'];
          addressArray.push(resultAddress);
        }

        //Popola di nuovo i risultati soltanto se sto digitando un indirizzo. Non lo fa in tutti gli altri casi.
        if (!addressesSelected) {
          self.setState({results:addressArray});
        }

        let myQuery = resultsArray[0];
        let myCoordinates = myQuery['center'];
        let lat = myCoordinates[1];
        let lon = myCoordinates[0];
        self.setState({latComp:lat,lonComp:lon});

        //Se è nella pagina iniziale, si è ormai salvato già i dati sul componente (indirizzo, lat e lon), quindi può tranquillamente finire qui.
        if (self.props.home) {
          return true;
        }

        var numberOfRooms = self.props.number_of_rooms;
        var bedrooms = self.props.bedrooms;
        var radius = self.props.radius;
        var services = self.props.queryServices;

        self.apartmentsDatabaseSearch(lat,lon,numberOfRooms,bedrooms,radius,services);
      },
      error:function(request, state, error){
        console.log(request);
        console.log(state);
        console.log(error);
      }
    });
  }

  apartmentsDatabaseSearch(lat,lon,rooms,bedrooms,radius,services){
    let self=this;
    $.ajax({
      url:"/search",
      method:"GET",
      data:{
        lat:lat,
        lon:lon,
        number_of_rooms: rooms,
        bedrooms: bedrooms,
        radius: radius,
        services:services,
        advancedSearch:self.props.advancedSearch,
      },
      success:function(inData,state){
        let resultsArray = JSON.parse(inData);
        self.updateResults(resultsArray);
        self.stopUpdate();
      },
      error:function(request, state, error){
        console.log(request);
        console.log(state);
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div className="form-group address-search-wrapper search-bar">
        <input type="hidden" name="lat" value={this.state.latComp}/>
        <input type="hidden" name="lon" value={this.state.lonComp}/>
        <div className="close-results-wrapper">
          <input name="address" onFocus={this.addressFocus} onChange={this.addressChanged} value={this.state.realTimeAddress} className="address-search-spa" type="text" placeholder="Insert address..."/><i className={this.state.showClose ? 'fas fa-times' : ''} onClick={this.closeButtonClicked}></i>
        </div>
        <div className="query-results">
          {this.state.results.map((value, index) => {
            return <div className="query-selector-spa" onClick={this.addressSelected.bind(this)} key={index}>{value}</div>
          })}
        </div>
      </div>
    );
  }
}

if (document.getElementById('address-search-component-wrapper')) {
  const addressSearchComponent = document.getElementById('address-search-component-wrapper');
  const props = Object.assign({},addressSearchComponent.dataset);
  ReactDOM.render(<AddressSearchComponent {...props}/>, document.getElementById('address-search-component-wrapper'));
}
