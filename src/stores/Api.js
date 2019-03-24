import axios from "axios";
import { action, observable, decorate, computed } from "mobx";

class Api {
  api = axios.create({
    baseURL: "http://localhost:5000/"
  });

  getUsers = () => {
    return this.api.get("getName")
  }
}

decorate(Api, {
  getUsers: action
});

export default Api;
