import { Auth } from 'aws-amplify';
import config from './aws-exports';
import axios from 'axios';


const apiService = {

  // TODO refactor to handle all http methods
  async request(endpoint, options = {}) {

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      // No access token found, handle unauthorized access
      throw new Error('Unauthorized');
    }

    const isAccessTokenExpired = await this.checkAccessTokenExpiration();

    if (isAccessTokenExpired) {
      await this.refreshAccessToken();
    }

    const url = config.aws_invoke_url + endpoint

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };

    const cfg = {
      headers: headers,
    }

    const response = await axios.get(url, cfg);

    if (response.status === 200) {
      const body = response.data.body;
      // deserialize json body
      return JSON.parse(body);
    } else {
      throw new Error('Request failed');
    }
  },

  async checkAccessTokenExpiration() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return true; // Access token not found, consider expired
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpirationTime = this.decodeAccessToken(accessToken).exp;

    return currentTime > tokenExpirationTime;
  },

  async refreshAccessToken() {
    try {

      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();

      const session = await new Promise((resolve, reject) => {
        cognitoUser.refreshSession(currentSession.getRefreshToken(), (err, refreshedSession) => {
          if (err) {
            reject(err);
          } else {
            resolve(refreshedSession);
          }
        })
      });

      const { idToken, refreshToken, accessToken } = session;
      localStorage.setItem('accessToken', idToken.jwtToken);

    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  },

  decodeAccessToken(accessToken) {
    const tokenPayload = accessToken.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));

    return decodedToken;
  },

};

export default apiService;
