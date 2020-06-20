import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage : StorageService, public alertCtrl : AlertController){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj); // <- if error is a text format, convert to json.
      }
      console.log("Error intecept by Interceptor: ");
      console.log(errorObj);
      // Para tratar erros específicos
      switch(errorObj.status) {
        case 401:
          this.handle401();
          break;
        case 403:
          this.handle403();
          break;
        default:
          this.handleDefaultError(errorObj);
          break;
      }

      return Observable.throw(error);
    }) as any;
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });
    alert.present();
  }

  handle403() {
    // caso não autenticado, remove o possível localUser armazenado.
    this.storage.setLocalUser(null);
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
