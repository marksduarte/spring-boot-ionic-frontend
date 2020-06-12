import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage() // habilita referenciar a classe usando string. ex: 'HomePage'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

  // ionic livecicle events
  ionViewWillEnter(){
   this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
   this.menu.swipeEnable(true);
  }

}
