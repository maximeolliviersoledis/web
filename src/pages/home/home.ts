import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  	constructor(
  		public navCtrl: NavController,
  		private iab: InAppBrowser
  	) {}

  	ngOnInit(){
    	const browser = this.iab.create('https://www.champion-direct.com/','_self',{location:'no'});
	} 

}
