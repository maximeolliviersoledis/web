import { Component, OnInit } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html',
    providers: [ThemeableBrowser, BarcodeScanner]
})
export class HomePage implements OnInit{
  
  browser: ThemeableBrowserObject;
  urlBeforeClose: string = "";
  
  constructor(
  	public navCtrl: NavController,
    private tb:ThemeableBrowser,
    private platform:Platform,
    private navParams: NavParams,
    private barcodeScanner:BarcodeScanner
  ) {}

  	ngOnInit(){
        this.urlBeforeClose = 'https://www.champion-direct.com';
	 } 

   ionViewDidEnter(){
       //Permet peut-être de régler le bug de la page qui ne se lance pas au démarrage en attendant que la page
       //Devienne la page active
       this.reopenBrowser(); 
   }

   reopenBrowser(){
     if(this.isIos()){
        const options: ThemeableBrowserOptions = {
          statusbar: {
            color: '#f53d3d'
          },
          toolbar: {
            height: 44,
            color: '#ffffff'
          },     
          title: {
            color: '#003264ff',
            showPageTitle: true
          },
          backButton: {
            image: 'ic_action_previous_item',
            imagePressed: 'ic_action_previous_item',    
            align: 'left',
            event: 'backPressed'
          },
          forwardButton: {
              image: 'ic_action_next_item',
              imagePressed: 'ic_action_next_item',
              align: 'left',
              event: 'forwardPressed'
          },
          closeButton: {
            //image: 'ic_action_remove',
            //imagePressed: 'ic_action_remove',
            image: 'scan',
            imagePressed: 'scan',
            align: 'right',
            event: 'closePressed'
          },
          /*customButtons: [
            {
              image: 'scan',
              imagePressed: 'scan',
              align: 'right',
              event: 'scanPressed'
            }
          ],*/
         /* menu: {
            image: 'scan',
            imagePressed: 'scan',
            title: 'Menu',
            cancel: 'Cancel',
            align: 'right',
            items: [
              {
                event: 'menuScanPressed',
                label: 'Scanner un code barre'
              }
            ]
          },*/
          backButtonCanClose: false //Pour éviter des effets indésirables
        };

       this.browser = this.tb.create(this.urlBeforeClose,'_blank', options);
       this.browser.on('closePressed').subscribe((event) => {
         this.browser. close();
         console.log('launching scanner after close');
         this.urlBeforeClose = event.url;
         this.openScanner();
       }, (error)=>{
         console.log(JSON.stringify(error));
       });
     }else{
       const options: ThemeableBrowserOptions = {
          statusbar: {
            color: '#f53d3d'
          },
          toolbar: {
            height: 44,
            color: '#ffffff'
          },     
          title: {
            color: '#003264ff',
            showPageTitle: true
          },
          backButton: {
            image: 'ic_action_previous_item',
            imagePressed: 'ic_action_previous_item',    
            align: 'left',
            event: 'backPressed'
          },
          forwardButton: {
              image: 'ic_action_next_item',
              imagePressed: 'ic_action_next_item',
              align: 'left',
              event: 'forwardPressed'
          },
          closeButton: {
            image: 'ic_action_remove',
            imagePressed: 'ic_action_remove',
            align: 'left',
            event: 'closePressed'
          },
          customButtons: [
            {
              image: 'scan',
              imagePressed: 'scan',
              align: 'right',
              event: 'scanButtonPressed'
            }
          ],
          backButtonCanClose: false //Pour éviter des effets indésirables
        };

       this.browser = this.tb.create(this.urlBeforeClose,'_blank', options);
       this.browser.on('closePressed').subscribe((event) => {
         this.platform.exitApp();
       }, (error)=>{
         console.log(JSON.stringify(error));
       });
     }

     this.browser.on('scanButtonPressed').subscribe((event)=>{
       this.browser.close();
       this.urlBeforeClose = event.url;
       this.openScanner();
     })

   }

   openScanner(){
     this.barcodeScanner.scan().then((result) => {
       if(!result.cancelled)
         this.urlBeforeClose = 'https://www.champion-direct.com/module/ambjolisearch/jolisearch?search_query='+result.text;
       this.reopenBrowser();
     })
   }

   isIos(){
     return this.platform.is('ios');
   }
}
