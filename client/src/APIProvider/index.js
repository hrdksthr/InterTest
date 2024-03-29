import axios from "axios";
import { ServerLink } from "./../utils/environment";

class APIProvider {
  constructor() {
    this.instance = axios.create();
  }
  serialize = obj => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === "boolean" || obj[p] === 0 || obj[p]) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
    }
    return str.join("&");
  };
  get = (url, obj, headers) => {
    return new Promise((resolve, reject) => {
      this.instance
        .get(`${ServerLink}/${url}${obj ?'?' + this.serialize(obj) : ''}`, {
          headers: headers
        })
        .then(res => {
          let data = { ...res.data, status: res.status };
          resolve(data);
        })
        .catch(({ response = {} }) => {
          let err = {
            ...response.data,
            status: response.status,
            statusText: response.statusText
          };
          reject(err);
        });
    });
  };

  post = (url, data, headers) => {
    return new Promise((resolve, reject) => {
      this.instance
        .post(`${ServerLink}/${url}`, data, {
          headers: headers
        })
        .then(res => {
          let data = { ...res.data, status: res.status };
          resolve(data);
        })
        .catch(({ response = {} }) => {
          console.log("response", response);

          let err = {
            ...response.data,
            status: response.status,
            statusText: response.statusText
          };
          reject(err);
        });
    });
  };
}

export default new APIProvider();
