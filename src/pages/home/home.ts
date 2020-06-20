import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage() // habilita referenciar a classe usando string. ex: 'HomePage'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      let authorization = response.headers.get('Authorization');
      if (authorization) {
        this.auth.successfulLogin(authorization);
        this.navCtrl.setRoot('CategoriasPage');
      }
    },
      error => { })
  }

  // ionic livecicle events
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
