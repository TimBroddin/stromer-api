import "@babel/register";
import "@babel/polyfill";
import request from "request-promise";
import qs from "qs";
import cheerio from "cheerio";
import moment from "moment";

import Bike from "./Bike";

// require("request-debug")(request);

class Stromer {
  constructor(options) {
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.username = options.username;
    this.password = options.password;
    this.jar = request.jar();
    this.bike = new Bike(this);

    this.LOGIN_URL = "https://api3.stromer-portal.ch/users/login/";
    this.TOKEN_URL = "https://api3.stromer-portal.ch/o/token/";
    this.API_URL = "https://api3.stromer-portal.ch/rapi/mobile/v2/";
  }

  async getCode() {
    const loginPage = await request({
      url: this.LOGIN_URL,
      jar: this.jar
    });
    const cookies = this.jar.getCookieString(this.LOGIN_URL);
    const [_, csrf] = cookies.split("=");

    const queryString = qs.stringify({
      client_id: this.client_id,
      response_type: "code",
      redirect_url: "stromerauth://auth",
      scope:
        "bikeposition bikestatus bikeconfiguration bikelock biketheft bikedata bikepin bikeblink userprofile"
    });

    const $ = cheerio.load(loginPage);

    const formCsrf = $("input[name=csrfmiddlewaretoken]").val();

    const form = {
      username: this.username,
      password: this.password,
      csrfmiddlewaretoken: formCsrf,
      next: `/o/authorize/?${queryString}`
    };

    let code = "";
    try {
      const redirect = await request({
        url: this.LOGIN_URL,
        method: "post",
        form,
        jar: this.jar,
        followRedirect: false,
        headers: {
          Referer: this.LOGIN_URL
        }
      });
    } catch (e) {
      if (e && e.response && e.response.headers) {
        try {
          const authorize = await request({
            url: "https://api3.stromer-portal.ch" + e.response.headers.location,
            followRedirect: false,
            jar: this.jar
          });
        } catch (e) {
          try {
            const location = e.response.headers.location;
            const [_, code] = location.split("=");
            return code;
          } catch (e) {
            console.log(e.response);
            console.log("beep");
          }
        }
      } else {
        throw new Error(e);
      }
    }
  }

  async getAccessToken(code) {
    const data = {
      grant_type: "authorization_code",
      client_id: this.client_id,
      client_secret: this.client_secret,
      code,
      redirect_uri: "stromerauth://auth"
    };
    const json = await request({
      url: this.TOKEN_URL,
      method: "post",
      formData: data,
      jar: this.jar
    });
    return JSON.parse(json).access_token;
  }

  async call(endpoint) {
    if (this.accessToken) {
      return await this._callApi(this.accessToken, endpoint);
    } else {
      const code = await this.getCode();
      this.accessToken = await this.getAccessToken(code);
      if (this.accessToken) {
        return await this._callApi(this.accessToken, endpoint);
      } else {
        throw new Error("No access token could be retrieved");
      }
    }
  }

  async _callApi(access_token, endpoint) {
    const url = `${this.API_URL}${endpoint}`;
    const response = await request({
      url,
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const json = JSON.parse(response);
    if (json.data && Object.keys(json.data).length) {
      return json.data;
    } else if (json.result) {
      throw new Error(json.result);
    } else {
      throw new Error(`Something went wrong calling: ${url}`);
    }
  }

  async post(endpoint, data) {
    if (this.accessToken) {
      return await this._postApi(this.accessToken, endpoint, data);
    } else {
      const code = await this.getCode();
      this.accessToken = await this.getAccessToken(code);
      if (this.accessToken) {
        return await this._postApi(this.accessToken, endpoint, data);
      } else {
        throw new Error("No access token could be retrieved");
      }
    }
  }

  async _postApi(access_token, endpoint, data) {
    const url = `${this.API_URL}${endpoint}`;
    console.log(url);
    const response = await request({
      url,
      headers: { Authorization: `Bearer ${access_token}` },
      method: "POST",
      json: true,
      body: data
    });
    const json = response;
    if (json.data && Object.keys(json.data).length) {
      return json.data;
    } else if (json.result) {
      return json.result;
    } else {
      throw new Error(`Something went wrong calling: ${url}`);
    }
  }
}

export default Stromer;
