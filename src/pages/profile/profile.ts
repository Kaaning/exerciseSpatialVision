import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';

declare var google;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = {
    name: "",
    email: "",
    dateOfBirth: "",
    latitude: 0,
    longitude: 0
  };
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  editMode = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    let email = navParams.get("email"); //Retrieve the email from params
    this.storage.get("users") //Get the users collection
      .then((data) => {
        if(data) { //If at least one user has been created, the collection exists and we can check if the provided email already exists
          if(data[email]) { //If it does, we get the user details
            this.user = data[email];
            this.loadMap();
          }
        }
        if(!this.user.email) { //If no user has been returned (because the collection does not exist yet or because the user does not exist)
          this.user.email = email; //We assign the provided email to the empty user
          this.toggleEditMode(); //And we enable the edit mode
        }
      });
  }
  
  /*
    Get the user position
  */
  geolocateUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user.latitude = position.coords.latitude;
        this.user.longitude = position.coords.longitude;
        this.loadMap();
      }, null, {enableHighAccuracy: true});
    } else {
      alert("Geolocation is not supported by this browser. Please use another one.");
    }
  }
 
  /*
    Display the map
  */
  loadMap(){
 
    let latLng = new google.maps.LatLng(this.user.latitude, this.user.longitude);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    this.showUserPosition();
 
  }

  /*
    Show user position on the map
  */
  showUserPosition() {
    let location = new google.maps.LatLng(this.user.latitude, this.user.longitude);
    this.map.panTo(location);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    
  }

  /*
    Save current user details
  */
  saveUser() {
    let users;
    this.storage.get("users") //We get the users collection
      .then((data) => {
        if(data) users = data;
        else users = {}; //If it does not exist yet, we initialise it

        users[this.user.email] = this.user; //We then add the new user to the collection
        this.storage.set('users', users); //And save the collection
        this.toggleEditMode();
      });
  }

  /*
    Toggle edit mode. If edit mode is enabled, regeolocate user to update his position.
  */
  toggleEditMode() {
    this.editMode = !this.editMode;
    if(this.editMode) {
      this.geolocateUser();
    }
  }

}
