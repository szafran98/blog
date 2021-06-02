import { AxiosRequestConfig } from 'axios';
import axios from '@/utils/http-common';
import { app } from '@/main';
import Cookies from 'js-cookie';

class TokenDataService {
  private TOKEN_KEY = 'token';

  setToken(tokenData: any) {
    Cookies.set(this.TOKEN_KEY, tokenData, { expires: 1 });
  }

  removeToken() {
    Cookies.remove(this.TOKEN_KEY);
  }

  getAccessToken() {
    try {
      return Cookies.getJSON(this.TOKEN_KEY).access;
    } catch (e) {
      return null;
    }
  }

  getRefreshToken() {
    return Cookies.getJSON(this.TOKEN_KEY).refresh;
  }

  async isAccessTokenUpToDate() {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      return await axios
        .post('http://127.0.0.1:8000/auth/jwt/verify/', {
          token: this.getAccessToken(),
        })
        .then((res) => {
          console.log('edsadsa');
          return true;
        })
        .catch((err) => {
          console.log('catch');
          console.log(err.response);
          this.removeToken();
          return false;
        });
    }
  }

  isAccessTokenTerminated() {
    try {
      const tokenExpTimestamp = this.decodePayload(this.getAccessToken()).exp;
      return Date.now() / 1000 > tokenExpTimestamp;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  isRefreshTokenTerminated() {
    try {
      const tokenExpTimestamp = this.decodePayload(this.getRefreshToken()).exp;
      return Date.now() / 1000 > tokenExpTimestamp;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async refreshTokenApiRequest() {
    return await axios
      .post('http://127.0.0.1:8000/auth/jwt/refresh/', {
        refresh: this.getRefreshToken(),
      })
      .then((res) => {
        console.log('refresh method');
        Cookies.set(this.TOKEN_KEY, {
          access: res.data.access,
          refresh: this.getRefreshToken(),
        });
      });
  }

  getTokenHeaders() {
    return {
      headers: {
        Authorization: `JWT ${this.getAccessToken()}`,
      },
    };
  }

  decodePayload(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
}

export default new TokenDataService();
