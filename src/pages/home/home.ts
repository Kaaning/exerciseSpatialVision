import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: string = "";

  constructor(public navCtrl: NavController) {
    
  }

  /*
    Simply open the profile page
  */
  openProfilePage() {
    this.navCtrl.push(ProfilePage, {email: this.email});
  }

}
