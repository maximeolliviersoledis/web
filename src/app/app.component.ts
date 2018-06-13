import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';


import { FcmProvider } from '../providers/fcm/fcm';
import { SldnotificationProvider } from '../providers/sldnotification/sldnotification';
import { ToastController } from 'ionic-angular';


//import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    fcm: FcmProvider, 
    sldnotification: SldnotificationProvider, 
    toastCtrl: ToastController, 
    private device: Device
  ){
    
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Get a FCM token
      //let token;
      fcm.getToken().then(token => {
        
        sldnotification.save(this.device.uuid, token);

      });

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          console.log(msg);
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe();

      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

}

