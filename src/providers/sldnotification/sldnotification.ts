import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SldnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SldnotificationProvider {

  	constructor(public http: HttpClient) {
    	console.log('Hello SldnotificationProvider Provider');
  	}

  	save(uuid, token) {

   	 	let url = 'http://www.bizztofly.com/modules/sld_notification/mobile-notification.php?uuid='+uuid+'&fcm='+token;
      return new Promise(resolve => {
        this.http.get(url)
        .subscribe();
      });
    	/*let response = await this.http.get(url);
      console.log(response);
    	return response;*/
	} 

}
