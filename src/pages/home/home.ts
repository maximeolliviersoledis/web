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
    	this.iab.create('https://www.champion-direct.com/la-selection-100-ans-facom/servante-roll-edition-limitee-100-ans','_self',{
    		location:'no',
    		//toolbar:'no'
    	});
	} 

}
