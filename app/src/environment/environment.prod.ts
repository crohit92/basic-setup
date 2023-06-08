class Environment {
  AUTH_SERVER_DOMAIN = 'https://dev-6mfzolif.auth0.com';
  AUTH_SERVER_AUDIENCE = 'https://dev-6mfzolif.auth0.com/api/v2/';
  AUTH_SERVER_CLIENT_ID = 'J2koRuq2opiv54RZCXYhojqHJWv8mH5C';
  AUTH_SERVER_REDIRECT_ROUTE_PATH = 'login-success';
  AUTH_SERVER_REDIRECT_URI = `${window.origin}/${this.AUTH_SERVER_REDIRECT_ROUTE_PATH}`;
  API_DOMAIN = 'http://localhost:5163/';
}
export const environment = new Environment();
