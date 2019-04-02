import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: Observable<any>;
  user: Observable<any>;


  constructor(public navCtrl: NavController,public httpClient: HttpClient) {

  }

  login(){
    var jsonData = {
      "username":"admin",
      "password":"hookedontalent123"
    }

    var jsonData2 = {
      "userName":"admin",
      "password":"hookedontalent123"
    }
    this.token = this.httpClient.post('https://qa.hookedontalent.com/security/auth',jsonData);
     this.token.subscribe((data:any) => {
       console.log('token: ', data.token);

       this.user = this.httpClient.post('https://qa.hookedontalent.com/hot/newLogin',jsonData2,{
         headers: new HttpHeaders().set('Authorization', data.token)
                                   .append('Accept', 'application/json;odata=verbose')
                                   .append('Content-Type','application/json')
                                   .append('Access-Control-Allow-Origin','*')
                                   .append('Access-Control-Allow-Methods','*')
                                   .append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
       });

        this.user.subscribe(user => {
          console.log('user: ', user);

        })

     })
  }

}
