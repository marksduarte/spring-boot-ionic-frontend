import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storage: StorageService) {

  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text', // para evitar erro de parse do json vazio retornado pela api

      });
  }

  successfulLogin(authorizationValue: String) {
    if (authorizationValue) {
      let _token = authorizationValue.substring(7); // Bearer -> token
      let user: LocalUser = {
        token: _token,
        email: this.jwtHelper.decodeToken(_token).sub
      };
      this.storage.setLocalUser(user);
    }
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
