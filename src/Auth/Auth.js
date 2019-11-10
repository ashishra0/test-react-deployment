import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_KEYS } from './auth0-vars';


export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_KEYS.domain,
    clientID: AUTH_KEYS.clientId,
    redirectUri: AUTH_KEYS.callbackUrl,
    audience: `https://${AUTH_KEYS.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('auth0:access_token', authResult.accessToken);
    localStorage.setItem('auth0:id_token', authResult.idToken);
    localStorage.setItem('auth0:expires_at', expiresAt);
    localStorage.setItem('auth0:id_token:sub', authResult.idTokenPayload.sub)
    history.replace('/home');
  }

  logout() {
    localStorage.removeItem('auth0:access_token');
    localStorage.removeItem('auth0:id_token');
    localStorage.removeItem('auth0:expires_at');
    localStorage.removeItem('auth0:id_token:sub');
    history.replace('/home');
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('auth0:expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
