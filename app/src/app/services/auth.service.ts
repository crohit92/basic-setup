import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment.dev';
import { StorageKeys } from '../models/storage-keys';
import { LocalStorageService } from './local-storage.service';
import { LoggerService } from './logger.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly sessionStorage: SessionStorageService,
    private readonly http: HttpClient,
    private readonly logger: LoggerService
  ) {}

  async showLoginScreen() {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallengeFromVerifier(
      codeVerifier
    );
    this.sessionStorage.setItem('codeverifier', codeVerifier);
    window.open(
      `${environment.AUTH_SERVER_DOMAIN}/authorize?scope=profile&audience=${environment.AUTH_SERVER_AUDIENCE}&response_type=code&client_id=${environment.AUTH_SERVER_CLIENT_ID}&redirect_uri=${environment.AUTH_SERVER_REDIRECT_URI}&code_challenge=${codeChallenge}&code_challenge_method=S256`,
      '_self'
    );
  }

  getAccessToken(authCode: string) {
    const codeVerifier = this.sessionStorage.getItem('codeverifier')!;
    this.sessionStorage.removeItem('codeverifier');
    return this.http
      .post<{ access_token: string }>(
        environment.AUTH_SERVER_DOMAIN + '/oauth/token',
        new HttpParams({
          fromObject: {
            grant_type: 'authorization_code',
            client_id: environment.AUTH_SERVER_CLIENT_ID,
            code: authCode,
            redirect_uri: environment.AUTH_SERVER_REDIRECT_URI,
            code_verifier: codeVerifier,
          },
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .pipe(
        tap((res) => {
          this.sessionStorage.setItem(
            StorageKeys.ACCESS_TOKEN,
            res.access_token
          );
        })
      );
  }
  // GENERATING CODE VERIFIER
  private dec2hex(dec: number) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, this.dec2hex).join('');
  }

  private sha256(plain: string) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64urlencode(a: ArrayBuffer) {
    var str = '';
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private async generateCodeChallengeFromVerifier(v: string) {
    var hashed = await this.sha256(v);
    var base64encoded = this.base64urlencode(hashed);
    return base64encoded;
  }
}
