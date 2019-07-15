@extends('layouts.home')

@section('content-header')

  @include('layouts.header')

  <div id="advanced-search-component-wrapper">
    <advanced-search-component data-searched-address="{{$address}}" data-rooms="@php
    if (isset($numberOfRooms)){
      echo $numberOfRooms;
    } else {
      echo 0;
    }
    @endphp" data-bedrooms="@php
    if (isset($bedrooms)){
      echo $bedrooms;
    } else {
      echo 0;
    }
    @endphp" data-radius="{{$maxDistance}}" data-lat={{$lat}} data-lon={{$lon}}></advanced-search-component>
  </div>

@endsection

@section('content')

  <h3 class="ml-5">Appartamenti in evidenza:</h3>

  <div class="container-fluid mt-5">
    <div id="apartments-component-wrapper" class="d-flex flex-wrap justify-content-center">
      <div class="apartment col-lg-4">
        <apartment-component data-sponsoreds=true></apartment-component>
      </div>
    </div>
  </div>

  <div class="result-box ml-5">
    <h3>Risultati:</h3>

    <div id="apartments-component-wrapper">
      <apartments-component v-bind:apartments-prop="{{$queryApartments}}"></apartments-component>
    </div>
  </div>
@stop
