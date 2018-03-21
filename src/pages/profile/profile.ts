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
    this.storage.get('user')
      .then((data) => {
        if(data) { //If a user has been created, get his details and show his position
          this.user = data;
          this.loadMap();
          this.showUserPosition();
        }
        else this.toggleEditMode(); //If no user has been created yet, enable edit mode
      });
  }

  ionViewDidLoad(){
    if( this.user ) {
      console.log(this.user);
      
    }
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
        this.showUserPosition();
      });
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
    console.log(this.map);
 
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
    this.storage.set('user', this.user);
    this.toggleEditMode();
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
