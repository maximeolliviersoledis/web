import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FcmProvider } from '../providers/fcm/fcm';

const firebase = {
  apiKey: "AIzaSyAF7lnc_tO1nQTPsex4TM1rp1wLPI9D11w",
  authDomain: "capsule-f4a8a.firebaseapp.com",
  databaseURL: "https://capsule-f4a8a.firebaseio.com",
  projectId: "capsule-f4a8a",
  storageBucket: "capsule-f4a8a.appspot.com",
  messagingSenderId: "708163343895"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Firebase,
    FcmProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FcmProvider,
    FcmProvider
  ]
})
export class AppModule {}
